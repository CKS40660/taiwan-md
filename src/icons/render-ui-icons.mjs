import { parse } from 'parse5';
import { emojiIcons, iconSvg } from './taiwan-icons.mjs';
const symbols = Object.keys(emojiIcons).sort((a, b) => b.length - a.length);
const expression = new RegExp(
  symbols.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
  'gu',
);
const protectedTags = new Set([
  'head',
  'script',
  'style',
  'pre',
  'code',
  'textarea',
  'svg',
  'blockquote',
]);
const protectedClass =
  /(?:^|\s)(?:prose|article-content|diary-content)(?:\s|$)/;

/** Transform only rendered interface text. Source offsets preserve HTML, attributes,
 * quoted prose, and scripts byte-for-byte. No client observer or runtime dependency.
 *
 * Runs on every generated page (src/middleware.ts). A full parse5 tree with source
 * locations cost ~25 of the 31 minutes of a 19k-page CI build (2026-10-20 profile), so
 * pages go through `scanUiIcons` first: a single forward pass that tracks only element
 * nesting and the protected regions. It reproduces parse5's tree for well-formed
 * documents and returns null wherever parse5 would repair the markup (misnesting,
 * implied end tags, foster parenting, head closed early, …); those pages fall back to
 * the parse5 reference below, so the output stays identical either way.
 * tests/ui-icons.test.mjs compares the two paths; scripts/tools/verify-ui-icons.mjs
 * compares them over a whole build. */
export function renderUiIcons(html, { onFallback } = {}) {
  expression.lastIndex = 0;
  if (!expression.test(html)) return html;
  const edits = scanUiIcons(html);
  if (edits === null) {
    onFallback?.(html);
    return renderUiIconsReference(html);
  }
  if (edits.length === 0) return html;
  let out = '';
  let pos = 0;
  for (const e of edits) {
    out += html.slice(pos, e.startOffset) + e.replaced;
    pos = e.endOffset;
  }
  return out + html.slice(pos);
}

/** The original parse5 implementation: canonical behaviour and fallback. */
export function renderUiIconsReference(html) {
  expression.lastIndex = 0;
  if (!expression.test(html)) return html;
  const root = parse(html, { sourceCodeLocationInfo: true });
  const edits = [];
  function walk(node, protectedContent = false) {
    const attrs = Object.fromEntries(
      (node.attrs ?? []).map((a) => [a.name, a.value]),
    );
    const blocked =
      protectedContent ||
      protectedTags.has(node.tagName) ||
      'data-preserve-emoji' in attrs ||
      protectedClass.test(attrs.class ?? '');
    if (node.nodeName === '#text' && !blocked && node.sourceCodeLocation) {
      const { startOffset, endOffset } = node.sourceCodeLocation;
      const raw = html.slice(startOffset, endOffset);
      expression.lastIndex = 0;
      const replaced = raw.replace(expression, (emoji) => {
        // Standalone symbols retain their accessible name; paired labels remain quiet.
        const parent = node.parentNode;
        const hasLabel = parent?.attrs?.some((a) => a.name === 'aria-label');
        const paired = (parent?.childNodes ?? []).some(
          (n) =>
            n.nodeName === '#text' && n.value.replace(expression, '').trim(),
        );
        return iconSvg(emojiIcons[emoji], hasLabel || paired ? '' : emoji);
      });
      if (raw !== replaced) edits.push({ startOffset, endOffset, replaced });
    }
    for (const child of node.childNodes ?? []) walk(child, blocked);
  }
  walk(root);
  for (const e of edits.sort((a, b) => b.startOffset - a.startOffset))
    html = html.slice(0, e.startOffset) + e.replaced + html.slice(e.endOffset);
  return html;
}

// ── Fast path ──────────────────────────────────────────────────────────────
// Every rule below mirrors one tokenizer / tree-construction step of the WHATWG
// parser (as implemented by parse5). Anything outside that subset bails.

const BAIL = null;
const probe = new RegExp(expression.source, 'u');
// Code points that can be part of an emoji match. A character outside this set
// survives both entity decoding and emoji removal, so it proves a text non-empty.
const emojiParts = new Set(symbols.flatMap((s) => [...s]));
const ws = (c) => c === 32 || c === 10 || c === 9 || c === 12 || c === 13;
const VOID = new Set(
  'area base basefont bgsound br col embed hr image img input keygen link meta param source track wbr'.split(
    ' ',
  ),
);
// script data / raw text / RCDATA: content runs to the matching end tag.
const RAW = new Set(
  'script style xmp iframe noembed noframes noscript textarea title'.split(' '),
);
// Start tags that close an open <p> ("close a p element" in the spec).
const CLOSES_P = new Set(
  'address article aside blockquote center details dialog dir div dl fieldset figcaption figure footer header hgroup main menu nav ol p search section summary ul h1 h2 h3 h4 h5 h6 pre listing form li dd dt plaintext table hr xmp'.split(
    ' ',
  ),
);
const HEADINGS = new Set('h1 h2 h3 h4 h5 h6'.split(' '));
const SPECIAL = new Set(
  'address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input keygen li link listing main marquee menu meta nav noembed noframes noscript object ol p param plaintext pre script search section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp'.split(
    ' ',
  ),
);
// Tags whose handling depends on parser state this scan does not model.
const UNMODELLED = new Set(
  'html head body frameset frame plaintext isindex math listing select optgroup rb rp rt rtc nobr colgroup menuitem'.split(
    ' ',
  ),
);
const TABLE_CTX = new Set(['table', 'tbody', 'thead', 'tfoot', 'tr']);
// HTML start tags that end SVG foreign content.
const BREAKOUT = new Set(
  'b big blockquote body br center code dd div dl dt em embed h1 h2 h3 h4 h5 h6 head hr i img li listing menu meta nobr ol p pre ruby s small span strike strong sub sup table tt u ul var'.split(
    ' ',
  ),
);
const SVG_INTEGRATION = new Set(['foreignobject', 'desc', 'title']);
// Elements that end "button scope" when looking for an open <p>.
const BUTTON_SCOPE = new Set(
  'applet caption html table td th marquee object template button'.split(' '),
);
const HEAD_VOID = new Set(['meta', 'link', 'base', 'basefont', 'bgsound']);
const HEAD_RAW = new Set(['title', 'style', 'noframes', 'noscript', 'script']);

/** Tokenise the tag or markup declaration at html[i] === '<'.
 * Returns { kind: 'text' } when the '<' is literal text, null on anything this scan
 * does not model, else { kind, name, attrs, selfClosing, end }. */
function readTag(html, i, foreign) {
  const n = html.length;
  let j = i + 1;
  const c = html.charCodeAt(j);
  if (c === 33 /* ! */) {
    if (html.startsWith('--', j + 1)) {
      const k = j + 3;
      if (html.charCodeAt(k) === 62) return { kind: 'comment', end: k + 1 };
      if (html.startsWith('->', k)) return { kind: 'comment', end: k + 2 };
      // Ends at the first "-->" or "--!>". Scan "--" once, so a comment never
      // costs a search to the end of the document.
      for (
        let d = html.indexOf('--', k);
        d !== -1;
        d = html.indexOf('--', d + 1)
      ) {
        const e = html.charCodeAt(d + 2);
        if (e === 62) return { kind: 'comment', end: d + 3 };
        if (e === 33 && html.charCodeAt(d + 3) === 62)
          return { kind: 'comment', end: d + 4 };
      }
      return BAIL;
    }
    if (foreign && html.startsWith('[CDATA[', j + 1)) {
      const e = html.indexOf(']]>', j + 8);
      return e === -1 ? BAIL : { kind: 'cdata', end: e + 3 };
    }
    if (html.slice(j + 1, j + 8).toLowerCase() === 'doctype') {
      const e = html.indexOf('>', j);
      return e === -1
        ? BAIL
        : { kind: 'doctype', end: e + 1, text: html.slice(i, e + 1) };
    }
    return BAIL; // bogus comment
  }
  let endTag = false;
  if (c === 47 /* / */) {
    const d = html.charCodeAt(j + 1);
    if (j + 1 >= n) return { kind: 'text' };
    if (!((d >= 65 && d <= 90) || (d >= 97 && d <= 122))) return BAIL; // </> or bogus
    endTag = true;
    j++;
  } else if (!((c >= 65 && c <= 90) || (c >= 97 && c <= 122))) {
    return c === 63 /* ? */ ? BAIL : { kind: 'text' };
  }
  // tag name
  let k = j;
  while (k < n) {
    const d = html.charCodeAt(k);
    if (ws(d) || d === 47 || d === 62) break;
    k++;
  }
  if (k >= n) return BAIL;
  const name = html.slice(j, k).toLowerCase();
  // attributes (tokenizer states: before/after attribute name, values, self-closing)
  const attrs = [];
  let selfClosing = false;
  for (;;) {
    while (k < n && ws(html.charCodeAt(k))) k++;
    if (k >= n) return BAIL;
    let d = html.charCodeAt(k);
    if (d === 62) {
      k++;
      break;
    }
    if (d === 47) {
      if (html.charCodeAt(k + 1) === 62) {
        selfClosing = true;
        k += 2;
        break;
      }
      k++;
      continue;
    }
    // attribute name ('=' as first character belongs to the name)
    const ns = k;
    k++;
    while (k < n) {
      d = html.charCodeAt(k);
      if (ws(d) || d === 47 || d === 62 || d === 61) break;
      k++;
    }
    const attrName = html.slice(ns, k).toLowerCase();
    while (k < n && ws(html.charCodeAt(k))) k++;
    let value = '';
    if (html.charCodeAt(k) === 61 /* = */) {
      k++;
      while (k < n && ws(html.charCodeAt(k))) k++;
      d = html.charCodeAt(k);
      if (d === 34 || d === 39) {
        const e = html.indexOf(d === 34 ? '"' : "'", k + 1);
        if (e === -1) return BAIL;
        value = html.slice(k + 1, e);
        k = e + 1;
      } else if (d !== 62) {
        const vs = k;
        while (k < n) {
          d = html.charCodeAt(k);
          if (ws(d) || d === 62) break;
          k++;
        }
        value = html.slice(vs, k);
      }
    }
    if (!attrs.some((a) => a[0] === attrName)) attrs.push([attrName, value]);
  }
  return { kind: endTag ? 'end' : 'start', name, attrs, selfClosing, end: k };
}

/** End offset of raw-text / RCDATA / script content opened at `from`, i.e. the index
 * of its appropriate end tag, or -1. */
function rawEnd(html, from, name) {
  const lower = name;
  let k = from;
  for (;;) {
    const e = html.indexOf('</', k);
    if (e === -1) return -1;
    if (html.slice(e + 2, e + 2 + lower.length).toLowerCase() === lower) {
      const d = html.charCodeAt(e + 2 + lower.length);
      if (ws(d) || d === 47 || d === 62) {
        // Script data escape states change where </script> ends: not modelled.
        if (lower === 'script' && html.slice(from, e).includes('<!--'))
          return -1;
        return e;
      }
    }
    k = e + 2;
  }
}

/** Skip a raw-text element's content and end tag. Returns [contentEnd, after] or null. */
function skipRaw(html, from, name) {
  const e = rawEnd(html, from, name);
  if (e === -1) return BAIL;
  const t = readTag(html, e, false);
  if (!t || t.kind !== 'end') return BAIL;
  return [e, t.end];
}

/** Skip a <template>'s content (parse5 stores it in .content, which the walk never
 * visits). Returns the offset after the matching </template>, or null. */
function skipTemplate(html, from) {
  let depth = 1;
  let svg = 0;
  let k = from;
  for (;;) {
    const j = html.indexOf('<', k);
    if (j === -1) return BAIL;
    const t = readTag(html, j, svg > 0);
    if (!t) return BAIL;
    if (t.kind === 'text') {
      k = j + 1;
      continue;
    }
    k = t.end;
    if (t.kind === 'comment' || t.kind === 'cdata') continue;
    if (t.kind === 'doctype') return BAIL;
    if (svg > 0) {
      if (t.kind === 'start') {
        if (BREAKOUT.has(t.name) || t.name === 'font' || t.name === 'template')
          return BAIL;
        if (t.name === 'svg' && !t.selfClosing) svg++;
      } else if (t.name === 'svg') svg--;
      else if (t.name === 'template' || t.name === 'p' || t.name === 'br')
        return BAIL;
      continue;
    }
    if (t.kind === 'start') {
      if (t.name === 'template') depth++;
      else if (t.name === 'svg') {
        if (!t.selfClosing) svg = 1;
      } else if (t.name === 'math' || t.name === 'plaintext') return BAIL;
      else if (RAW.has(t.name)) {
        const r = skipRaw(html, k, t.name);
        if (!r) return BAIL;
        k = r[1];
      }
    } else if (t.name === 'template' && --depth === 0) return k;
  }
}

function attr(attrs, name) {
  for (const a of attrs) if (a[0] === name) return a[1];
  return undefined;
}

// Character references that decode to one exact character. Tailwind arbitrary
// variants put `&amp;` / `&gt;` in nearly every class list.
const NAMED = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: '\u00a0',
};
/** Decode a text or attribute value, or undefined when a reference is outside the
 * unambiguous subset (missing ';', unknown name, non-ASCII code point). */
function decode(value) {
  if (!value.includes('&')) return value;
  let ok = true;
  const out = value.replace(/&([#A-Za-z0-9]*)(;?)/g, (m, body, semi) => {
    if (body === '') return m; // '&' not starting a reference stays literal
    if (semi) {
      if (body in NAMED) return NAMED[body];
      const cp = /^#[xX][0-9a-fA-F]{1,6}$/.test(body)
        ? parseInt(body.slice(2), 16)
        : /^#[0-9]{1,7}$/.test(body)
          ? parseInt(body.slice(1), 10)
          : 0;
      if (cp >= 1 && cp < 0x80) return String.fromCharCode(cp);
    }
    ok = false;
    return m;
  });
  return ok ? out : undefined;
}

function isBlocked(parentBlocked, name, attrs) {
  if (parentBlocked || protectedTags.has(name)) return true;
  if (attr(attrs, 'data-preserve-emoji') !== undefined) return true;
  const cls = attr(attrs, 'class');
  if (cls === undefined) return false;
  const value = decode(cls);
  return value === undefined ? undefined : protectedClass.test(value);
}

/** Collect replacement edits in document order, or null when the page needs the
 * full parser. */
export function scanUiIcons(html) {
  const n = html.length;
  if (html.includes('\0') || html.charCodeAt(0) === 0xfeff) return BAIL;
  const edits = [];
  const stack = [];
  const open = new Map(); // tag name -> count on the stack
  let k = 0;

  const push = (name, attrs, ns) => {
    const parent = stack[stack.length - 1];
    const blocked =
      ns === 'svg'
        ? true
        : isBlocked(parent ? parent.blocked : false, name, attrs);
    if (blocked === undefined) return false;
    stack.push({
      name,
      ns,
      blocked,
      label: ns === 'html' && attr(attrs, 'aria-label') !== undefined,
      integration: ns === 'svg' && SVG_INTEGRATION.has(name),
      texts: null,
      paired: false,
      unsure: false,
    });
    open.set(name, (open.get(name) ?? 0) + 1);
    return true;
  };
  const pop = () => {
    const f = stack.pop();
    open.set(f.name, open.get(f.name) - 1);
    if (!f.texts) return true;
    if (!f.label && !f.paired && f.unsure) return false;
    const quiet = f.label || f.paired;
    for (const [s, e] of f.texts) {
      expression.lastIndex = 0;
      const replaced = html
        .slice(s, e)
        .replace(expression, (emoji) =>
          iconSvg(emojiIcons[emoji], quiet ? '' : emoji),
        );
      edits.push({ startOffset: s, endOffset: e, replaced });
    }
    return true;
  };
  // A text node child of the current element, given as the source segments that
  // form its value (one segment, except where parse5 merges text across
  // </body>, </html> and comments that it files outside <body>). The node's source
  // range runs from the first segment's start to the last one's end. `decoded` is
  // false for raw-text content, whose value is the source exactly.
  const text = (segs, decoded = true) => {
    const f = stack[stack.length - 1];
    if (f.blocked || segs.length === 0) return;
    const s = segs[0][0];
    const e = segs[segs.length - 1][1];
    const raw = html.slice(s, e);
    const value =
      segs.length === 1 ? raw : segs.map(([a, b]) => html.slice(a, b)).join('');
    if (probe.test(raw)) (f.texts ??= []).push([s, e]);
    if (f.paired) return;
    const rest = probe.test(value) ? value.replace(expression, '') : value;
    if (!rest.trim()) return;
    if (!decoded || !value.includes('&')) {
      f.paired = true;
      return;
    }
    const decodedValue = decode(value);
    if (decodedValue !== undefined) {
      if (decodedValue.replace(expression, '').trim()) f.paired = true;
      return;
    }
    const literal = rest.replace(/&[#A-Za-z0-9]*;?/g, '');
    for (const ch of literal)
      if (!/\s/.test(ch) && !emojiParts.has(ch)) {
        f.paired = true;
        return;
      }
    f.unsure = true;
  };
  const wsOnly = (s, e) => {
    for (let p = s; p < e; p++) if (!ws(html.charCodeAt(p))) return false;
    return true;
  };
  // Index of the <p> in button scope, or -1.
  const pInScope = () => {
    for (let s = stack.length - 1; s >= 0; s--) {
      if (stack[s].name === 'p') return s;
      if (BUTTON_SCOPE.has(stack[s].name)) return -1;
    }
    return -1;
  };
  // Next token after optional whitespace / comments (document prologue, head).
  const nextToken = (allowText) => {
    for (;;) {
      const j = html.indexOf('<', k);
      if (j === -1) {
        if (!wsOnly(k, n)) return BAIL;
        k = n;
        return { kind: 'eof' };
      }
      if (!wsOnly(k, j) && !allowText) return BAIL;
      const t = readTag(html, j, false);
      if (!t || t.kind === 'text' || t.kind === 'cdata') return BAIL;
      k = t.end;
      if (t.kind !== 'comment') return t;
    }
  };

  // ── prologue: <!DOCTYPE html><html><head>…</head><body>
  let t = nextToken(false);
  if (!t || t.kind !== 'doctype' || !/^<!doctype\s+html\s*>$/i.test(t.text))
    return BAIL;
  t = nextToken(false);
  if (!t || t.kind !== 'start' || t.name !== 'html') return BAIL;
  if (!push('html', t.attrs, 'html')) return BAIL;
  t = nextToken(false);
  if (!t || t.kind !== 'start' || t.name !== 'head') return BAIL;
  for (;;) {
    t = nextToken(false);
    if (!t || t.kind === 'eof' || t.kind === 'doctype') return BAIL;
    if (t.kind === 'end') {
      if (t.name !== 'head') return BAIL;
      break;
    }
    if (HEAD_VOID.has(t.name)) continue;
    if (HEAD_RAW.has(t.name)) {
      const r = skipRaw(html, k, t.name);
      if (!r) return BAIL;
      k = r[1];
    } else if (t.name === 'template') {
      const e = skipTemplate(html, k);
      if (e === null) return BAIL;
      k = e;
    } else return BAIL;
  }
  t = nextToken(false);
  if (!t || t.kind !== 'start' || t.name !== 'body') return BAIL;
  if (!push('body', t.attrs, 'html')) return BAIL;

  // ── body
  // mode 0: in body; 1: after </body>; 2: after </html>. In modes 1–2 parse5 keeps
  // inserting text into <body> while filing comments on <html> / the document, so
  // those tokens do not end body's trailing text node.
  let mode = 0;
  let chunkStart = k;
  let segs = [];
  const flush = () => {
    if (segs.length === 0) return true;
    const top = stack[stack.length - 1];
    if (TABLE_CTX.has(top.name) && segs.some(([a, b]) => !wsOnly(a, b)))
      return false; // text directly in a table is foster-parented
    text(segs);
    segs = [];
    return true;
  };
  for (;;) {
    const j = html.indexOf('<', k);
    const top = stack[stack.length - 1];
    if (j === -1) {
      if (n > chunkStart) segs.push([chunkStart, n]);
      if (!flush()) return BAIL;
      break;
    }
    const foreign = top.ns === 'svg';
    const tok = readTag(html, j, foreign);
    if (!tok) return BAIL;
    if (tok.kind === 'text') {
      k = j + 1;
      continue;
    }
    if (j > chunkStart) {
      segs.push([chunkStart, j]);
      if (mode !== 0 && !wsOnly(chunkStart, j)) mode = 0;
    }
    k = chunkStart = tok.end;
    if (mode !== 0 && tok.kind === 'comment') continue;
    if (
      !foreign &&
      tok.kind === 'end' &&
      (tok.name === 'body' || tok.name === 'html')
    ) {
      if (top.name !== 'body') return BAIL;
      mode = tok.name === 'html' ? 2 : 1;
      continue;
    }
    if (mode !== 0) {
      if (tok.kind !== 'start') return BAIL;
      mode = 0; // any start tag sends parse5 back to "in body"
    }
    if (!flush()) return BAIL;
    if (tok.kind === 'comment' || tok.kind === 'cdata') continue;
    if (tok.kind === 'doctype') return BAIL;
    const { name } = tok;

    if (foreign) {
      if (tok.kind === 'end') {
        if (top.name !== name || !pop()) return BAIL;
        continue;
      }
      if (stack.some((f) => f.integration)) return BAIL;
      if (BREAKOUT.has(name) || name === 'font') return BAIL;
      if (!tok.selfClosing) push(name, tok.attrs, 'svg');
      continue;
    }

    if (tok.kind === 'end') {
      if (top.name === name) {
        if (!pop()) return BAIL;
        continue;
      }
      // </p> with no <p> in button scope inserts an empty <p>, which only splits
      // the surrounding text (done above). Other unmatched end tags: not modelled.
      if (name === 'p' && pInScope() === -1 && !TABLE_CTX.has(top.name))
        continue;
      return BAIL;
    }

    // start tag in HTML content
    if (UNMODELLED.has(name)) return BAIL;
    if (TABLE_CTX.has(top.name)) {
      const ok =
        name === 'script' ||
        name === 'style' ||
        name === 'template' ||
        (top.name === 'table' &&
          (name === 'caption' ||
            name === 'col' ||
            name === 'tbody' ||
            name === 'thead' ||
            name === 'tfoot' ||
            name === 'tr')) ||
        (top.name !== 'table' && top.name !== 'tr' && name === 'tr') ||
        (top.name === 'tr' && (name === 'td' || name === 'th'));
      if (!ok) return BAIL;
    } else if (
      name === 'td' ||
      name === 'th' ||
      name === 'tr' ||
      name === 'tbody' ||
      name === 'thead' ||
      name === 'tfoot' ||
      name === 'caption' ||
      name === 'col'
    ) {
      return BAIL;
    }
    if (name === 'li' || name === 'dd' || name === 'dt') {
      for (let s = stack.length - 1; s >= 0; s--) {
        const f = stack[s].name;
        if (f === name || (name !== 'li' && (f === 'dd' || f === 'dt')))
          return BAIL;
        if (SPECIAL.has(f) && f !== 'address' && f !== 'div' && f !== 'p')
          break;
      }
    }
    if ((name === 'form' || name === 'button') && open.get(name)) return BAIL;
    if (CLOSES_P.has(name)) {
      // "Close a p element": modelled when that <p> is the current node, so
      // closing it pops nothing else.
      const p = pInScope();
      if (p !== -1 && (p !== stack.length - 1 || !pop())) return BAIL;
    }
    const current = stack[stack.length - 1];
    if (HEADINGS.has(name) && HEADINGS.has(current.name)) return BAIL;
    if (name === 'a' && open.get('a')) return BAIL;
    if (name === 'option' && current.name === 'option') return BAIL;

    if (name === 'svg') {
      if (!tok.selfClosing) push('svg', tok.attrs, 'svg');
      continue;
    }
    if (name === 'template') {
      const e = skipTemplate(html, k);
      if (e === null) return BAIL;
      k = chunkStart = e;
      continue;
    }
    if (VOID.has(name)) continue;
    if (!push(name, tok.attrs, 'html')) return BAIL;
    if (RAW.has(name)) {
      const r = skipRaw(html, k, name);
      if (!r) return BAIL;
      // RCDATA (title, textarea) decodes entities; raw text does not.
      if (r[0] > k) text([[k, r[0]]], name === 'title' || name === 'textarea');
      if (!pop()) return BAIL;
      k = chunkStart = r[1];
    }
  }
  while (stack.length) if (!pop()) return BAIL;
  return edits.sort((a, b) => a.startOffset - b.startOffset);
}

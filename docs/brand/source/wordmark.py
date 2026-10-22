#!/usr/bin/env python3
"""Taiwan.md 標準字外框產生器（識別系統 v2）。

字（全部 OFL，檔案與授權在 docs/brand/fonts/）：
  Taiwan             Source Serif 4，wght 700、opsz 60（展示用光學尺寸）
  .md                IBM Plex Mono SemiBold，縮放到跟 Taiwan 同一個 x 字高
  開源台灣知識庫       Noto Serif TC 600（＝思源宋體 TC，教育部標準字形）；字檔太大不進 repo，
                     第一次跑會下載到 .cache/ 並子集化成 fonts/NotoSerifTC-wordmark-subset.ttf
手調（單位：字級的千分之一，寫在 KERN，改了重跑就好）：
  n → .   點不用等寬格的左半，緊貼 n 的墨邊後留 KERN['n.'] 的空
  . → m   點跟 m 之間留 KERN['.m']
  中文副標 字距 KERN['zh-track']，左緣對齊 T 的墨邊
執行：uv run --with fonttools python3 docs/brand/source/wordmark.py
輸出：docs/brand/source/wordmark.json（路徑＋度量；產生器只讀它，不讀字檔）
"""
import json, pathlib, urllib.request
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.misc.transform import Transform
from fontTools import subset

HERE = pathlib.Path(__file__).parent
FONTS = HERE.parent / 'fonts'
CACHE = HERE / '.cache'
ZH = '開源台灣知識庫'
KERN = {'n.': 72, '.m': 26, 'zh-track': 240, 'zh-size': 0.30, 'zh-gap': 0.42}

def serif():
    p = FONTS / 'SourceSerif4-Display-Bold.ttf'
    if not p.exists():
        src = CACHE / 'SourceSerif4-var.ttf'
        CACHE.mkdir(exist_ok=True)
        if not src.exists():
            urllib.request.urlretrieve('https://raw.githubusercontent.com/google/fonts/main/ofl/sourceserif4/SourceSerif4%5Bopsz,wght%5D.ttf', src)
        f = TTFont(str(src))
        instantiateVariableFont(f, {'wght': 700, 'opsz': 60}, inplace=True)
        f.save(str(p))
    return TTFont(str(p))

def zh():
    p = FONTS / 'NotoSerifTC-wordmark-subset.ttf'
    if not p.exists():
        CACHE.mkdir(exist_ok=True)
        src = CACHE / 'NotoSerifTC.ttf'
        if not src.exists():
            urllib.request.urlretrieve('https://raw.githubusercontent.com/google/fonts/main/ofl/notoseriftc/NotoSerifTC%5Bwght%5D.ttf', src)
        f = TTFont(str(src))
        instantiateVariableFont(f, {'wght': 600}, inplace=True)
        opts = subset.Options(); opts.layout_features = []; opts.name_IDs = ['*']
        s = subset.Subsetter(opts); s.populate(text=ZH + '台灣'); s.subset(f)
        f.save(str(p))
    return TTFont(str(p))

def glyph(font, ch, scale, x, y=0):
    gs = font.getGlyphSet(); name = font.getBestCmap()[ord(ch)]
    pen = SVGPathPen(gs); bp = BoundsPen(gs)
    gs[name].draw(TransformPen(pen, Transform(scale, 0, 0, -scale, x, y)))
    gs[name].draw(bp)
    b = bp.bounds or (0, 0, 0, 0)
    return pen.getCommands(), font['hmtx'][name][0] * scale, (x + b[0] * scale, x + b[2] * scale)

def main():
    S, M, Z = serif(), mono(), zh()
    FS = 1000.0
    su = FS / S['head'].unitsPerEm
    capH = S['OS/2'].sCapHeight * su; xH = S['OS/2'].sxHeight * su
    mu = (xH / M['OS/2'].sxHeight)  # Plex Mono 縮到同 x 字高
    paths = []; x = 0.0
    for ch in 'Taiwan':
        d, adv, ink = glyph(S, ch, su, x); paths.append({'d': d, 'role': 'taiwan'}); x += adv
    taiwan_ink_right = ink[1]
    # 「.」：拿掉等寬格左側空白，墨邊貼 n 的墨邊 + KERN['n.']
    gs = M.getGlyphSet(); dot = M.getBestCmap()[ord('.')]
    bp = BoundsPen(gs); gs[dot].draw(bp); dl, _, dr, _ = bp.bounds
    dx = taiwan_ink_right + KERN['n.'] - dl * mu
    d, _, dink = glyph(M, '.', mu, dx); paths.append({'d': d, 'role': 'md'})
    mx = dink[1] + KERN['.m']
    gs[M.getBestCmap()[ord('m')]].draw(bp2 := BoundsPen(gs)); ml = bp2.bounds[0]
    mx -= ml * mu
    for ch in 'md':
        d, adv, ink = glyph(M, ch, mu, mx); paths.append({'d': d, 'role': 'md'}); mx += adv
    width = ink[1]
    # 中文副標
    zs = KERN['zh-size'] * FS / Z['head'].unitsPerEm
    zy = KERN['zh-gap'] * FS + KERN['zh-size'] * FS * 0.88
    T_ink_left = glyph(S, 'T', su, 0)[2][0]
    zx = T_ink_left; zpaths = []
    for i, ch in enumerate(ZH):
        d, adv, ink = glyph(Z, ch, zs, zx, zy)
        if i == 0:
            zx += T_ink_left - ink[0]; d, adv, ink = glyph(Z, ch, zs, zx, zy)
        zpaths.append(d); zx += adv + KERN['zh-track'] * zs * Z['head'].unitsPerEm / 1000
    out = {
        'unit': '字級 1000', 'capHeight': capH, 'xHeight': xH,
        'ascender': S['OS/2'].sTypoAscender * su, 'descender': S['OS/2'].sTypoDescender * su,
        'width': width, 'inkLeft': T_ink_left,
        'paths': paths, 'zh': {'text': ZH, 'paths': zpaths, 'baseline': zy, 'width': zx - KERN['zh-track'] * zs * Z['head'].unitsPerEm / 1000},
        'kern': KERN,
        'fonts': {'taiwan': 'Source Serif 4 Bold opsz60 (OFL)', 'md': 'IBM Plex Mono SemiBold (OFL)', 'zh': 'Noto Serif TC 600 / 思源宋體 TC (OFL)'},
    }
    (HERE / 'wordmark.json').write_text(json.dumps(out, ensure_ascii=False))
    print('capH', round(capH), 'xH', round(xH), 'width', round(width), 'zh width', round(out['zh']['width']))

def mono():
    return TTFont(str(FONTS / 'ibmplexmono-IBMPlexMono-SemiBold.ttf'))

if __name__ == '__main__':
    main()

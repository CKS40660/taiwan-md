---
title: 'Jay Chou (周杰倫)'
description: 'Pemuda pemalu yang bermain piano di acara pencarian bakat ini mengubah sejarah musik pop Mandarin melalui album pertamanya; dengan gaya orisinal, ia membuktikan bahwa kreativitas dapat bernilai komersial dan membawa musik Tionghoa ke panggung dunia.'
date: 2026-03-23
category: 'People'
tags:
  [
    'Tokoh',
    'Jay Chou',
    'Musik Pop Mandarin',
    'Penyanyi',
    'Kreasi',
    'R&B',
    'Gaya Tiongkok (Zhongguofeng)',
  ]
subcategory: '音樂與表演'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-03-23
lastHumanReview: false
lifeTree:
  protagonist: '周杰倫'
  birthYear: 1979
  span: '1979–2024'
  source:
    article: 'knowledge/People/周杰倫.md'
    commit: '6409f519'
    commitDate: '2026-03-23'
    extractedBy: 'Taiwan.md (Semiont) β-r5'
    extractedAt: '2026-04-26 13:30 +0800'
    note: '原文 references = 維基 / Time / IFPI / 鏡週刊 / 華視 / Block Tempo / Dcard 等。Counterfactual 主要對照同代華語流行（孫燕姿、王力宏、陶喆、吳青峰）的路徑。'
  intro: '一個 1997 年在《超級新人王》上彈鋼琴的害羞 18 歲男孩，三年後改寫華語流行音樂歷史。從寫歌被退稿三年的助理到全球銷量冠軍。每個 turning（被退稿、自創公司、跨界導演、政治模糊）都有他沒走的路。'
  themes:
    - id: 'original-mainstream'
      label: '原創 vs 主流公式'
      color: '#8B5CF6'
    - id: 'artist-boss'
      label: '藝人 vs 老闆'
      color: '#EC4899'
    - id: 'cross-medium'
      label: '單一媒介 vs 跨界'
      color: '#10B981'
    - id: 'cross-strait'
      label: '兩岸表態 vs 模糊'
      color: '#F59E0B'
  nodes:
    - id: 'birth'
      year: 1979
      age: 0
      type: 'given'
      theme: 'original-mainstream'
      label: '1979 年生於台北'
      scene: '家庭背景小康。從小學鋼琴。內向、害羞。'
    - id: 'super-newcomer'
      year: 1997
      month: 8
      age: 18
      type: 'choice'
      theme: 'original-mainstream'
      scene: '台視《超級新人王》舞台。為高中同學伴奏的鋼琴手，害羞到不敢看鏡頭'
      chose:
        label: '上節目當伴奏'
        consequence: '主持人吳宗憲注意到他樂譜寫得工工整整、和弦進行有想法。被簽進阿爾發音樂當助理。月薪兩萬，泡茶買便當 + 無止境創作。'
      alternatives:
        - label: '不上節目'
          plausibility: 'structural'
          note: '同代會彈鋼琴的高中生很多沒被注意到，最後走音樂老師或考音樂系。如果他不上 1997 那場節目，吳宗憲不會看見他，後面 25 年華語樂壇歷史完全不同。'
        - label: '上節目想當主角自己唱'
          plausibility: 'structural'
          note: '常規選秀路徑：主動爭取唱主歌位置。如果走，會被當「另一個唱抒情歌的男生」評估，可能淘汰，不會以「鋼琴助理」身份建立品味。'
    - id: 'three-years-rejected'
      year: 1999
      age: 21
      type: 'choice'
      theme: 'original-mainstream'
      scene: '寫了上百首歌，全部被退稿。劉德華退《眼淚知道》、張惠妹退《忍者》。原因都是「太奇怪、太超前、市場接受不了」'
      chose:
        label: '繼續寫不放棄 + 等到江蕙收下《落雨聲》'
        consequence: '第一首被採用的歌。為《Jay》專輯鋪路。三年退稿期養成「我的東西不是給別人改的，我自己唱」的決心。'
      alternatives:
        - label: '退稿後改寫成市場喜歡的版本'
          plausibility: 'structural'
          note: '常規路徑：年輕製作助理會根據退稿 feedback 不斷修改。如果走，可能更早有歌被採用但失去獨特風格，後來《Jay》不會發生。'
        - label: '放棄音樂'
          plausibility: 'structural'
          note: '三年退稿足以讓多數人轉行。如果走，會去做別的工作，可能成為一個小有才華的素人音樂人。'
    - id: 'jay-album-2000'
      year: 2000
      month: 11
      age: 21
      type: 'choice'
      theme: 'original-mainstream'
      scene: '阿爾發音樂決定讓他自己出專輯'
      chose:
        label: '《Jay》全自製 + 融合 Rap/R&B/搖滾/古典/二胡 Hip-Hop'
        consequence: '亞洲賣破百萬。改變唱片工業生態：證明音樂人可以做自己、創新可以賺錢。「華語樂壇相信公式」變「相信冒險」。'
      alternatives:
        - label: '走標準偶像歌手路'
          plausibility: 'structural'
          note: '常規 21 歲新人路徑：抒情主打 + 包裝偶像。如果走，可能短期更賺但失去「華語樂壇分水嶺」的歷史地位。'
    - id: 'china-style'
      year: 2003
      age: 24
      type: 'choice'
      theme: 'original-mainstream'
      scene: '《葉惠美》專輯時思考下一個音樂方向'
      chose:
        label: '《東風破》+ 方文山詞 → 開創「中國風流行音樂」'
        consequence: '把古箏、琵琶、二胡用現代錄音技術 + R&B 節奏。後來《菊花台》《青花瓷》《蘭亭序》成系列。Time Asia 同年封面「The New King of Asian Pop」。'
      alternatives:
        - label: '繼續走 R&B/嘻哈路線'
          plausibility: 'structural'
          note: '同代陶喆走純 R&B 路徑。如果走，會跟陶喆同象限競爭，少了「中國風」這個獨特標誌。'
        - label: '純抒情路線'
          plausibility: 'structural'
          note: '更安全選擇（如 1990s 王力宏前期）。如果走，市場接受度更高但失去文化辨識度。'
    - id: 'jvr-music'
      year: 2007
      age: 28
      type: 'choice'
      theme: 'artist-boss'
      scene: '與阿爾發音樂合約期滿'
      chose:
        label: '成立杰威爾音樂自己當老闆'
        consequence: '從藝人變老闆。完全創作自由。後來專輯品質更穩、商業成績更好。2022 《最偉大的作品》IFPI 全球銷量冠軍 720 萬張（華語首例）。'
      alternatives:
        - label: '續簽阿爾發 / 跳到 Sony 或環球'
          plausibility: 'structural'
          note: '常規路徑：頂級藝人多選擇大廠合約。如果走，能獲得國際發行渠道但失去製作節奏的自主控制。'
    - id: 'secret-direct'
      year: 2007
      age: 28
      type: 'choice'
      theme: 'cross-medium'
      scene: '同年除了開公司還有導演機會'
      chose:
        label: '導演《不能說的秘密》'
        consequence: '從歌手變導演。2011 《青蜂俠》進好萊塢。2016 《中國好聲音》當導師。打開「華語音樂人可以做什麼」的範圍。'
      alternatives:
        - label: '專心做音樂不跨界'
          plausibility: 'structural'
          note: '同代多數歌手選擇單一身份深耕。如果走，可能音樂作品更多但失去文化偶像跨領域影響力。'
        - label: '只演不導'
          plausibility: 'structural'
          note: '部分歌手以演員身份試水（如張學友）。如果走，會失去「導演 + 編劇」這層創作主導權，《不能說的秘密》的音樂與敘事整合性會打折。'
    - id: 'cross-strait-2008'
      year: 2008
      age: 29
      type: 'choice'
      theme: 'cross-strait'
      scene: '北京奧運期間'
      chose:
        label: '說「期待奧運在自己的國家舉辦」+ 公開「我是中國人，也是台灣人」雙重表態'
        consequence: '在兩岸都保持商業成功。引發台灣綠營批評，但中國市場保留。「模糊的表態」成為他的長期策略，後來 2020 中國官媒引用他的話為其他藝人辯護。'
      alternatives:
        - label: '明確表態台灣立場'
          plausibility: 'structural'
          note: '同代部分藝人選邊（如張惠妹《站在高崗上》事件）。如果走，會失去中國市場但保住台灣輿論支持。'
        - label: '完全沉默'
          plausibility: 'structural'
          note: '另一部分藝人選擇不談政治。如果走，能避開兩邊質疑但失去「中國人 + 台灣人」雙重身份的彈性。'
    - id: 'nft-phanta'
      year: 2022
      age: 43
      type: 'choice'
      theme: 'artist-boss'
      scene: 'Instagram 換上 Phanta Bear NFT 頭像，引發市場炒作。一天交易額 2.8 億台幣'
      chose:
        label: '杰威爾急澄清「未參與商業策劃、未收益」'
        consequence: '突顯名人效應在加密貨幣市場的爭議性。同年合作好友蔣先威 PHANTACi 品牌的關係處理。但「明星 NFT 風波」這個 pattern 已成型。'
      alternatives:
        - label: '直接公開合作不澄清'
          plausibility: 'structural'
          note: '走完整 NFT 商業合作路徑。如果走，會分享 2.8 億的部分收益但會被綁進加密貨幣監管風險。'
        - label: '從一開始拒絕掛 NFT 頭像'
          plausibility: 'structural'
          note: '保守路徑：不沾。如果走，避開風波但失去與好友的合作關係。'
    - id: 'world-tour'
      year: 2024
      age: 45
      type: 'choice'
      theme: 'cross-medium'
      scene: '「嘉年華世界巡迴演唱會」自 2019 開始'
      chose:
        label: '持續全球巡演 75+ 場 + 馬來西亞武吉加里爾單場 6 萬人'
        consequence: '足跡英國、法國、澳洲、泰國、日本。YouTube MV 總觀看 51 億，《告白氣球》單一影片 2 億。新生代音樂人「我是聽周杰倫長大的」跨世代影響力確立。'
      alternatives:
        - label: '半退休 / 減少演出'
          plausibility: 'structural'
          note: '同代部分歌手 40 歲後減少巡演（如劉德華）。如果走，能保留體力與家庭時間但失去全球巡迴的文化資本。'
        - label: '只在華語區巡演'
          plausibility: 'structural'
          note: '常規華語天王路徑。如果走，能省成本但失去「亞洲流行天王」的國際品牌定位。'
translatedFrom: 'People/周杰倫.md'
sourceCommitSha: '2ad8c8cc2'
sourceContentHash: 'sha256:f7b44615a84043f8'
sourceBodyHash: 'sha256:15c277d38e9e5f3f'
translatedAt: '2026-10-15T12:42:56+08:00'
---

# Jay Chou (周杰倫)

> **Ringkasan 30 Detik:** Pada tahun 1997, seorang pemuda pemalu berusia 18 tahun bermain piano di acara _Super New King_, dan tiga tahun kemudian, album pertamanya mengubah sejarah musik pop Mandarin. Jay Chou bukan sekadar penyanyi; ia adalah sosok yang membuat seluruh industri musik percaya bahwa "karya orisinal dapat menghasilkan uang". Sejak tahun 2000 hingga kini, melalui 16 album, ia membuktikan bahwa musik Mandarin dapat mempertahankan karakteristik Timur sekaligus menaklukkan panggung dunia.

Pada tahun 1999, di dalam studio JVR Music, Jay Chou sedang mengalami penolakan naskah lagu untuk kesekian kalinya. Andy Lau tidak menginginkan lagunya yang berjudul "Tears Know" (眼淚知道), A-Mei menolak "Ninja" (忍者), seolah seluruh industri musik Mandarin sedang memberi tahu kreator muda ini: musikmu terlalu melampaui zamannya.

Tidak ada yang menyangka bahwa asisten produksi berusia 21 tahun ini akan menjungkirbalikkan segalanya setahun kemudian.

## Dari Figuran Pencarian Bakat Menjadi Revolusioner Musik

Pada Agustus 1997, di panggung _Super New King_ (超級新人王) milik TTV, Jay Chou bukanlah pemeran utama. Ia hanyalah seorang pemain piano pengiring untuk teman sekolah menengahnya, begitu pemalu hingga tidak berani menatap kamera. Namun, pembawa acara Wu Tsung-hsien (吳宗憲) memperhatikan detail ini: lembaran musik anak ini ditulis dengan sangat rapi dan progres akordnya sangat inovatif.

"Saat itu saya langsung merasa orang ini punya sesuatu yang istimewa," kenang Wu Tsung-hsien kemudian. Tidak ada yang mengingat siapa penyanyinya dalam ajang pencarian bakat tersebut, tetapi semua orang mengingat pemuda yang bermain piano itu. Setelah menghabiskan waktu tiga tahun untuk mengasah kemampuan di balik layar, Wu Tsung-hsien merekrut Jay Chou ke Alfa Music sebagai asisten dengan gaji bulanan NT$20.000. Tugasnya adalah menyeduh teh, membeli kotak makan siang, dan terus berkarya tanpa henti. Selama periode ini, Jay Chou menulis ratusan lagu, tetapi semuanya ditolak. Terlalu aneh, terlalu maju, pasar tidak bisa menerimanya—ia mendengar alasan-alasan ini selama tiga tahun.

Titik balik akhirnya datang pada tahun 1999. Jiang Hui (江蕙) menerima lagu "Rainy Sound" (落雨聲) hasil kolaborasinya dengan Vincent Fang (方文山), yang menjadi lagu pertama Jay Chou yang diterima.

## Tahun 2000: Revolusi Musik dalam Satu Album

Pada 7 November 2000, album pertama Jay Chou yang berjudul _Jay_ dirilis. Lagu pembuka "Cute Woman" (可愛女人) menggunakan perpaduan Rap dan ritme R&B, "Perfectism" (完美主義) mencampurkan rock dengan piano klasik, sementara "Nangong" (娘子) secara langsung membawa instrumen Erhu ke dalam dunia Hip-Hop.

> **💡 Tahukah Anda?**  
> _Jay_ melakukan sesuatu yang belum pernah dilakukan sebelumnya: membuktikan bahwa musik Mandarin dapat memadukan segalanya dan tetap laku keras. Album _Jay_ terjual lebih dari satu juta kopi di Asia, mengubah Jay Chou dari seorang asisten menjadi bintang dalam semalam.

Yang lebih penting, ia mengubah ekosistem seluruh industri rekaman. Sebelum era _Jay_, formula sukses musik Mandarin sangat sederhana: cari orang yang bisa menyanyi, beri mereka beberapa lagu balada, lalu kemas sebagai idola. Jay Chou membuktikan jalan lain: musisi dapat menjadi diri sendiri, dan inovasi dapat menghasilkan uang.

## Pelopor Musik Pop Gaya Tiongkok (Zhongguofeng)

Lagu "Dong Feng Po" (東風破) pada tahun 2003 merupakan tonggak sejarah lainnya bagi musik Mandarin. Lirik karya Vincent Fang, "Satu lentera kesedihan, berdiri kesepian di jendela," dipadukan dengan aransemen bergaya Tiongkok milik Jay Chou, menciptakan genre musik baru: Musik Pop Gaya Tiongkok (_Zhongguofeng_).

Ini bukanlah nostalgia budaya, melainkan inovasi budaya. Jay Chou mengemas instrumen tradisional seperti Guzheng, Pipa, dan Erhu dengan teknologi rekaman modern, dipadukan dengan ritme R&B. "Chrysanthemum Terrace" (菊花台), "Blue and White Porcelain" (青花瓷), "Lanting Xu" (蘭亭序)—setiap lagu adalah buku teks sempurna tentang perpaduan musik Timur dan Barat.

Media asing mulai memperhatikan fenomena ini. Pada tahun 2003, majalah _Time_ edisi Asia menampilkan Jay Chou di sampulnya dengan judul "The New King of Asian Pop". Ini bukan sekadar sensasi media—Jay Chou benar-benar melakukan sesuatu yang belum pernah dilakukan orang lain: memberikan tempat bagi elemen klasik Tiongkok dalam peta musik pop global.

## Pemegang Rekor Golden Melody Awards

| Tahun | Penghargaan                                                         | Karya                          |
| ----- | ------------------------------------------------------------------- | ------------------------------ |
| 2001  | Album Vokal Pop Terbaik                                             | _Jay_                          |
| 2002  | Album Vokal Pop Terbaik, Produser Album Terbaik, Komposer Terbaik   | _Fantasy_ (范特西)             |
| 2004  | Album Vokal Pop Terbaik                                             | _Ye Hui Mei_ (葉惠美)          |
| 2008  | Lagu Tahun Ini, Komposer Terbaik                                    | "Blue and White Porcelain"     |
| 2009  | Lagu Tahun Ini, Penyanyi Pria Mandarin Terbaik, Video Musik Terbaik | "稻香", "Magic Man" (魔術先生) |
| 2011  | Album Mandarin Terbaik, Penyanyi Pria Mandarin Terbaik              | _The Era_ (跨時代)             |

Jay Chou adalah salah satu artis dengan penghargaan terbanyak dalam sejarah Golden Melody Awards Taiwan, mengumpulkan total 15 penghargaan. Di antaranya, ia telah masuk nominasi "Album Tahun Ini" (kemudian diubah menjadi Album Mandarin Terbaik) sebanyak 10 kali dan menang 4 kali, memegang rekor nominasi dan kemenangan terbanyak.

## Dari Artis Menjadi Bos: Lahirnya JVR Music

Tahun 2007 merupakan titik balik lain dalam karier profesional Jay Chou—ia mendirikan JVR Music, bertransformasi dari seorang artis menjadi seorang bos. Keputusan ini memberinya kebebasan kreatif penuh, sekaligus menunjukkan kemungkinan lain kepada industri musik Mandarin: musisi tidak harus selamanya "disandera" oleh label rekaman.

Angka berbicara: setelah JVR berdiri, kualitas album Jay Chou menjadi lebih stabil dan pencapaian komersialnya semakin baik. Album _Greatest Works of Art_ (最偉大的作品) pada tahun 2022 menjadi album pemenang penjualan global yang disertifikasi oleh IFPI; ini adalah pertama kalinya album Mandarin mencapai posisi puncak tersebut dengan penjualan global mencapai 7,2 juta kopi.

## Terobosan Tidak Hanya di Musik

Ambisi Jay Chou tidak hanya terbatas pada musik. Film _Secret_ (不能說的秘密) pada tahun 2007 menjadikannya seorang sutradara, _The Green Hornet_ pada tahun 2011 membawanya ke Hollywood, dan _The Voice of China_ pada tahun 2016 membuktikan bahwa ia juga bisa menjadi mentor.

Namun, terobosan terbesarnya mungkin adalah perubahannya terhadap ekosistem industri secara keseluruhan. Ia tidak hanya menciptakan musik, tetapi juga mendefinisikan ulang apa yang dapat dilakukan dan dicapai oleh musisi Mandarin. Dari studio rekaman menuju layar lebar, dari Taipei menuju dunia, Jay Chou membuka kemungkinan yang tak terbatas.

## Penetapan Pengaruh Global

Pengaruh Jay Chou telah lama melampaui lingkup penutur bahasa Mandarin. "Carnival World Tour" yang dimulai sejak 2019 telah diadakan lebih dari 75 kali di seluruh dunia, menjangkau Inggris, Prancis, Australia, Thailand, dan Jepang. Pada Oktober 2024 di Stadion Nasional Bukit Jalil, Malaysia, satu konser dihadiri lebih dari 60.000 penonton, memecahkan rekor tertinggi penonton per sesi dalam konser pribadinya.

Di YouTube, total penayangan video musiknya telah melampaui 5,1 miliar, dengan video tunggal "Love Confession" (告白氣球) memiliki lebih dari 200 juta penayangan. Musisi generasi baru sering berkata, "Saya tumbuh besar mendengarkan Jay Chou," membuktikan bahwa pengaruhnya telah melintasi generasi.

## Kontroversi dan Pertanyaan yang Tak Terhindarkan

### Area Abu-abu Posisi Politik

Posisi politik Jay Chou selalu menjadi topik sensitif dalam diskusi lintas selat. Ia pernah menyatakan secara terbuka, "Saya orang Tiongkok," namun di saat yang sama juga berkata, "Saya lahir dan besar di Taiwan, saya juga orang Taiwan." Selama Olimpiade Beijing 2008, ia sempat mengatakan berharap Olimpiade diadakan di "negaranya sendiri," yang memicu kritik dari pihak pendukung kemerdekaan di Taiwan.

Sikap ambigu ini memungkinkannya untuk tetap sukses secara komersial di kedua sisi selat, namun sering kali dipertanyakan apakah pertimbangan bisnis lebih besar daripada posisi politiknya. Pada tahun 2020, media resmi Tiongkok pernah mengutip perkataannya untuk membela artis lain, yang kembali menyeretnya ke dalam kontroversi politik.

### Skandal NFT Phanta Bear

Pada awal 2022, Jay Chou terlibat dalam kontroversi NFT. Ia mengganti foto profil Instagram-nya dengan avatar NFT Phanta Bear, yang memicu spekulasi pasar; nilai transaksi proyek NFT tersebut mencapai NT$280 juta dalam satu hari. Namun, JVR Music segera memberikan klarifikasi bahwa Jay Chou "tidak terlibat dalam perencanaan atau pengelolaan aktivitas komersial ini, dan tidak menerima keuntungan apa pun."

> **⚠️ Sudut Pandang Kontroversi**  
> Agensi menjelaskan bahwa NFT tersebut bukanlah "kolaborasi" dengan Jay Chou, melainkan produk lisensi kerja sama dari merek PHANTACi milik sahabatnya, Chiang Hsien-wei (蔣先威). Namun, insiden ini menyoroti kontroversi efek selebritas dalam pasar mata uang kripto.

### Keraguan Mengenai Penulis Bayangan (_Ghostwriting_)

Dalam waktu yang lama, tim kreatif Jay Chou melibatkan banyak sosok di balik layar, termasuk penulis lirik Huang Chun-lang (黃俊郎). Huang Chun-lang pernah mengeluhkan tekanan proses kreatif di media sosial, yang memicu pertanyaan dari pihak luar mengenai apakah karya Jay Chou sepenuhnya orisinal. Meskipun kerja sama tim kreatif adalah hal lumrah dalam industri musik, bagi Jay Chou yang menekankan orisinalitas, keraguan semacam ini tetap ada.

## Perubahan Permanen pada Industri Musik Mandarin

Kontribusi terbesar Jay Chou bukanlah seberapa banyak piringan hitam yang ia jual, melainkan bagaimana ia mengubah imajinasi seluruh industri. Sebelum dia, industri musik Mandarin percaya pada "keamanan"—meniru formula yang sudah sukses. Setelah dia, industri mulai percaya pada "petualangan"—bahwa orisinalitas dan eksperimen juga bisa berhasil.

Industri musik Mandarin saat ini penuh dengan suara yang beragam: Rap, elektronik, folk, hingga musik eksperimental—akar dari ekosistem ini dapat ditelusuri kembali ke album _Jay_ tahun 2000 tersebut. Jay Chou menggunakan satu album untuk memberi tahu semua orang: batas musik Mandarin bisa menjadi sangat luas tanpa batas.

Dari seorang pengiring piano yang pemalu pada tahun 1997, hingga menjadi raja pop Mandarin pada tahun 2026, perjalanan Jay Chou bukan sekadar kisah sukses pribadi, melainkan sejarah evolusi musik pop Mandarin secara keseluruhan. Ia membuktikan satu hal: inovator sejati bukanlah mereka yang mengikuti tren, melainkan mereka yang menciptakan tren.

---

**Bacaan Lanjutan**:

- [Tzu-yu Chou (周子瑜)](/id/people/tzuyu) — Nama artis Taiwan dengan jumlah pengikut IG tertinggi kedua, tepat di bawah Jay Chou
- [Musik Pop Taiwan (台灣流行音樂)](/id/music/golden-melodies-legacy-taiwan-pop-music) — Seluruh ekosistem industri dan transisi generasi tempat Jay Chou bernaung
- [Stefanie Sun (孫燕姿)](/id/people/stefanie-sun/) — Nominasi pendatang baru terbaik pada Golden Melody Awards ke-12 yang sama, mendefinisikan dua jalur musik paralel di era 2000-an dengan selisih hanya satu suara
- [Chia Yung-chieh (賈永婕)](/id/people/chia-yung-chieh) — Jalur lain artis Taiwan dalam mengubah identitas menjadi pengaruh lintas bidang (Variety Show → Brand Pernikahan → Mobilisasi Publik → Tata Kelola Sektor Publik), sebagai perbandingan dengan jalur industri budaya Jay Chou

## Referensi

- [Daftar Penghargaan dan Nominasi Jay Chou - Wikipedia](https://zh.wikipedia.org/zh-tw/%E5%91%A8%E6%9D%B0%E5%80%AB%E8%8E%B7%E5%A5%96%E4%B8%8E%E6%8F%90%E5%90%8D%E5%88%97%E8%A1%A8)
- [Time Magazine Asia Edition - March 3, 2003](https://content.time.com/time/magazine/asia/0,9263,501030303,00.html)
- [Juara Daftar Penjualan Album Global IFPI 2022: Jay Chou "Greatest Works of Art"](https://tbotaiwan.com/ifpi-global-album-sales-chart-2022-jay-chou-greatest-works-of-art/)
- [Jay Chou NFT "Phanta Bear" Untung Cepat NT$280 Juta, Perusahaan Segera Klarifikasi: Tidak Terima Uang - Mirror Media](https://www.mirrormedia.mg/story/20220104ent036/)
- [Mengutip Pernyataan Jay Chou "Saya Orang Tiongkok", Media Resmi Tiongkok Menulis Dukungan untuk Ouyang Nana - CTS News](https://news.cts.com.tw/cts/politics/202009/202009292015341.html)
- [Carnival World Tour - Wikipedia](https://zh.wikipedia.org/zh-hant/%E5%98%89%E5%B9%B4%E8%8F%AF%E4%B8%96%E7%95%8C%E5%B7%A1%E8%BF%B4%E6%BC%94%E5%94%B1%E6%9C%83)
- [Greatest Works of Art - Wikipedia](https://en.wikipedia.org/wiki/Greatest_Works_of_Art)
- [Jay Chou YouTube Official Channel](https://www.youtube.com/channel/UC8CU5nVhCQIdAGrFFp4loOQ)
- [Situs Resmi JVR Music](https://www.jvrmusic.com/)
- ["NFT Beruang Jay Chou" Kabarnya Bisa Membeli Tiket Konser! PhantaBear Melonjak 120% Namun Mengundang Kemarahan Massa](https://www.blocktempo.com/rumor-has-it-you-can-snag-jay-chou-concert-tickets-phantabear-soars-by-120/)
- [Jay Chou Menyela Ucapan Penggemar di Konser yang "Diduga Pro-Kemerdekaan Taiwan" - Dcard](https://www.dcard.tw/f/entertainer/p/230941846)

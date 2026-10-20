---
title: 'Katalog Modul Visualisasi: Sembilan Belas Cara Melihat Data Taiwan'
description: 'Contoh langsung modul visualisasi artikel Taiwan.md — menggunakan data nyata perumahan, kependudukan, kesehatan, dan parlemen Taiwan, merender setiap jenis modul visual tw-* sekali, dipadukan dengan sintaksis dan prinsip desain graph.md.'
date: 2026-06-06
category: 'About'
tags:
  [
    'visualisasi data',
    'keadilan perumahan',
    'kebijakan perumahan',
    'data terbuka',
  ]
author: 'Taiwan.md'
readingTime: 11
featured: false
lastVerified: 2026-06-12
lastHumanReview: false
image: '/article-images/society/taipei-skyline-housing-2026.webp'
imageCredit: 'Heeheemalu'
imageLicense: 'CC BY-SA 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg'
relatedDiary: ['2026-07-16-222859-viz-evolution']
translatedFrom: 'About/視覺化模組型錄.md'
sourceCommitSha: '21298a7ae'
sourceContentHash: 'sha256:6a367e7b90a88190'
sourceBodyHash: 'sha256:f6a2ecc9e1606c44'
translatedAt: '2026-08-02T17:34:18.442783+00:00'
---

# Katalog Modul Visualisasi: Sembilan Belas Cara Melihat Data Taiwan

> **Ringkasan 30 detik:** Halaman ini adalah «contoh hidup» sistem visualisasi Taiwan.md — merender kesembilan belas modul visual dalam artikel sekaligus, semuanya menggunakan data Taiwan yang nyata (rasio harga rumah terhadap pendapatan, perumahan nasional, penuaan penduduk, referendum, rasio perawat-pasien, kursi legislatif). Ia adalah pasangan dari panduan editorial [graph.md](https://github.com/frank890417/taiwan-md/blob/main/docs/editorial/graph.md): **graph.md menjelaskan «kapan menggunakan yang mana, bagaimana caranya yang baik, sintaksnya seperti apa», halaman ini memungkinkan Anda langsung melihat «bentuknya seperti apa».** Setiap modul dirender dengan HTML/SVG murni, sehingga manusia, pembaca layar, Google, dan perayap AI semua membaca data yang sama persis — inilah alasan kami memilih visualisasi statis, bukan grafik interaktif.

Saat menulis artikel yang membahas angka, ketakutan terbesar adalah mengubah data menjadi tumpukan angka paragraf demi paragraf, pembaca jenuh di persentase ketiga. Pekerjaan visualisasi, adalah membalik «prosa angka yang padat» itu menjadi «struktur yang terbaca sekilas».

Tetapi visualisasi Taiwan.md memiliki satu disiplin yang tidak dimiliki orang lain: **kami hanya membuat visualisasi yang «dapat dibaca LLM»**. Grafik interaktif berbekal D3 atau Canvas memang menawan, tetapi GPTBot, PerplexityBot, ClaudeBot — perayap AI ini tidak mengeksekusi JavaScript, bagi mereka grafik itu hanya kanvas kosong. Sementara visualisasi kami yang dibangun dengan semantic HTML dan inline SVG, datanya ada di kode sumber, AI di enam bahasa pun bisa membaca, mengutip data Taiwan dari sudut pandang pertama. **Visualisasi yang bisa dibaca LLM, adalah visualisasi kedaulatan.**

Di bawah ini sembilan belas modul, dari «satu angka besar» paling sederhana hingga «peta bata kabupaten/kota» dan «busur kursi», ditampilkan berurutan. Sintaks penulisan dan prinsip desain versi lengkapnya ada di graph.md, di sini hanya diberi satu kalimat «ini apa, kapan dipakai».

## Angka Besar Data tw-figure

Jenis paling sederhana sekaligus paling berdaya dorong: menaruh satu angka dramatis sebesar-besarnya, konteks sebelum-sesudah menceritakan satu transformasi. Cocok jadi «statistik palu» pembuka artikel.

```tw-figure
6,7 ribu → 87 ribu / ping
Perumahan Nasional Sukses Taipei harga jual tersisa 1985, hingga harga rata-rata agen properti 2026 — alamat yang sama, kira-kira 13 kali lipat
Platform Informasi Properti Kementerian Dalam Negeri
```

## Data Group tw-stat

Saat sebuah paragraf berisi tiga hingga empat angka kunci berdampingan, alih-alih menulisnya sebagai satu kalimat panjang, lebih baik menyusunnya menjadi deretan kartu, agar pembaca bisa melihat sekilas semuanya.

```tw-stat
174.891 rumah tangga | Perumahan nasional dibangun langsung oleh pemerintah | 1976–1999
390.000+ rumah tangga | Total perumahan nasional dalam arti luas | Hingga dicabut 2015
84,4% | Tingkat kepemilikan rumah seluruh Taiwan | 2024
Sumber: Siaran Pers Kabinet Mengenai Pencabutan Undang-Undang Perumahan Nasional, Platform Informasi Properti Kementerian Dalam Negeri
```

Modul editor berisi data (grup data, kartu perbandingan, sumbu kebijakan) sama seperti modul grafik harus diberi label `Sumber:`. Audit seluruh situs Juli 2026 menemukan, modul yang dipantau gerbang otomatis memiliki tingkat penandaan sumber 100%, sedangkan yang tidak dipantau justru adalah ketiga modul berfrekuensi tinggi ini, empat puluh persen contohnya tanpa penandaan sumber. Sekarang mereka juga masuk ke gerbang viz-health.

## Kartu Perbandingan tw-versus

Perbandingan titik per titik antara dua sistem, dua posisi, atau dua kondisi sebelum-sesudah. Warna hangat di kiri, warna dingin di kanan, satu "vs" di tengah, memungkinkan perbedaan dibaca baris per baris.

```tw-versus
Perumahan Nasional Taiwan | Home Ownership Scheme Hong Kong
Subsidi pemerintah, dijual murah ke penghuni | Subsidi pemerintah, dijual murah ke penghuni
Setelah tinggal satu tahun bisa dijual kembali harga pasar penuh | Penjualan kembali di pasar terbuka harus "membayar nilai tanah" terlebih dahulu
Penambahan nilai hampir seluruhnya milik pribadi | Penambahan nilai dikembalikan ke kas negara sesuai proporsi diskon asal
Stok publik hilang sekaligus | Keuntungan publik bisa dikembalikan
Sumber: Berita Resmi Yuan Legislatif, Otoritas Perumahan Hong Kong
```

## Batang Proporsi tw-bars

Perbandingan atau peringkat nilai untuk sedikit kategori, panjang batang horizontal akan otomatis diskalakan sesuai nilai, nilai maksimum memenuhi lebar. Ingat tambahkan baris `Sumber:` di akhir modul data, akan otomatis menjadi keterangan sumber di bawah.

```tw-bars
Nasional 2014 | 8,41 kali
Nasional 2024 | 10,76 kali
Taipei 2024 | 16,60 kali | Puncak sejarah
Sumber: Platform Informasi Properti Kementerian Dalam Negeri, Pusat Penelitian Properti Universitas Chengchi
```

## Diagram Waffle tw-waffle

Komposisi proporsi bagian terhadap keseluruhan, seratus kotak mewakili seratus persen, lebih intuitif dari diagram pai—Anda benar-benar bisa menghitung kotaknya. Cocok untuk data "masing-masing kategori berapa persen" yang jumlahnya kira-kira 100.

```tw-waffle
Komposisi Perumahan Vienna (2023)
Perumahan Sosial Pemerintah Kota | 21,9
Perumahan Sosial Batas Laba | 21,4
Rumah Milik Sendiri | 20,4
Sewa Swasta | 36,3
Sumber: Pemerintah Kota Vienna (Stadt Wien) Statistik Perumahan
```

## Sumbu Kebijakan tw-timeline

Alur titik-titik kunci sistem atau kebijakan, dihubungkan dengan sumbu waktu titik. Perhatikan ini adalah "bantuan visual", berbeda dengan aturan judul kecil badan teks yang tidak boleh menggunakan gaya kronologis ("1975..." sebagai judul).

```tw-timeline
1975 | Undang-Undang Perumahan Nasional berlaku | Pemerintah bangun lalu jual, tetapkan "kualifikasi pembeli" sistem tertutup, subsidi tidak bisa lari
2002 | Dinding itu diruntuhkan | Perubahan undang-undang hapus batasan kualifikasi pembeli, perumahan nasional tinggal satu tahun bisa dijual ke siapa saja
2015 | Undang-Undang Perumahan Nasional dicabut | Alasan resmi: tingkat kepemilikan rumah sudah 85%, beralih ke perumahan sosial hanya sewa tidak jual
2026 | Taoyuan memasang gerbang kembali | Perumahan Terjangkau: penjualan kembali tidak boleh melebihi harga beli asal
Sumber: Berita Resmi Yuan Legislatif, Siaran Pers Kabinet Mengenai Pencabutan Undang-Undang Perumahan Nasional
```

## Kartu Kutipan tw-quote

Saat satu kalimat saja bisa mewakili ketegangan inti seluruh artikel, perbesarkan menjadi kartu kutipan. Kutipan tidak perlu ditambah「」 sendiri, modul akan menambahkannya. Kutipan harus kata per kata, dapat diverifikasi.

```tw-quote
Rumah harga pasar 30 juta yuan, jadi 60 hingga 70 juta yuan…… merampok miskin untuk kaya, negara mengeluarkan uang membantu orang kaya renovasi rumah
Lin Chih-chun | Pengacara, 2025 mengkritik usulan "Negara mengeluarkan uang untuk perbaikan Perumahan Nasional Chenggong"
```

## Chip Sumber tw-source

Mengumpulkan sumber data sebuah analisis menjadi satu chip yang tidak mencolok, diletakkan di sisi paragraf. Kepercayaan adalah bagian dari kurasi—media digital Taiwan sering lupa menandai sumber, inilah tempat kita bisa berbedaan.

```tw-source
Platform Informasi Properti Kementerian Dalam Negeri, Pendaftaran Harga Transaksi Nyata, Pusat Penelitian Properti Universitas Chengchi, Berita Resmi Yuan Legislatif, Otoritas Perumahan Hong Kong
```

## Kotak Penjelasan tw-note

Separuh kepercayaan artikel data ada pada "bagaimana Anda menghitungnya". Jurnalis di jurnalisme data menggunakan blok [Penjelasan] untuk menjelaskan metode perhitungan, menggunakan (Catatan) untuk menandai koreksi, kami jadikan konvensi ini menjadi modul. Baris pertama tulis `Penjelasan`/`Metode`/`Catatan`/`Koreksi`/`Pembaruan` salah satunya, sisanya setiap baris menjadi paragraf tersendiri.

```tw-note
Penjelasan
Halaman ini "Indeks Penuaan" = populasi 65 tahun ke atas ÷ populasi 0–14 tahun × 100. Sama dengan 100 berarti lansia dan anak-anak sama banyak, semakin tinggi angka semakin condong ke atas struktur penduduknya.
Tingkat penuaan dan indeks penuaan diambil dari Statistik Akhir Tahun 2025 Direktorat Jenderal Administrasi Kependudukan Kementerian Dalam Negeri, analisis lengkap 22 kabupaten/kota lihat 〈Melihat 22 Kabupaten/Kota Taiwan dengan Data〉.
```

## Grafik Garis tw-line

Tren untuk empat atau lebih titik waktu, digambarkan sebagai garis menggunakan SVG inline, batas atas dan bawah sumbu y ditampilkan agar pembaca dapat melihat rentangnya. Yang paling penting——komponen ini **secara otomatis menghasilkan tabel data tersembunyi**, memungkinkan pembaca layar dan perayap AI mengakses data mentah. Grafik untuk manusia, tabel untuk mesin, keduanya bersumber dari data yang sama.

```tw-line
Kenaikan Rasio Harga Rumah terhadap Pendapatan Nasional Sepuluh Tahun (kali)
Tahun | Nasional
2014 | 8.41
2016 | 9.32
2018 | 8.57
2020 | 9.20
2022 | 9.61
2024 | 10.76
Baseline: Titik Awal 2014 | 8.41
Sumber: Pusat Penelitian Properti Universitas Chengchi, Platform Informasi Properti Kementerian Dalam Negeri
```

Grafik garis juga mendukung **garis baseline**: menambahkan baris `Baseline: Label | Nilai` akan digambarkan sebagai garis putus-putus, tanpa titik akhir, hanya dengan satu label, terpisah secara visual dari deretan pengukuran aktual. Pembaca tidak akan salah mengira suatu ambang batas tetap sebagai data yang diukur.

## Grafik Kemiringan tw-slope

Ketika Anda hanya memiliki "dua titik waktu", grafik garis akan membuang ruang kosong di tengah. Grafik kemiringan langsung membiarkan kemiringan garis yang menghubungkan kedua ujungnya berbicara, siapa yang naik paling tajam, siapa yang mengejar siapa, terlihat sekilas. Menambahkan `*` di awal label dapat menonjolkan baris tertentu, baris lainnya otomatis menjadi abu-abu sebagai konteks.

```tw-slope
Rasio Harga Rumah terhadap Pendapatan: Siapa Naik Paling Tajam dalam Sepuluh Tahun (kali)
2014 | 2024
Nasional | 8.41 | 10.76
*Taipei | 12.0 | 16.60
Sumber: Platform Informasi Properti Kementerian Dalam Negeri, Pusat Penelitian Properti Universitas Chengchi
```

## Peta Panas tw-heatmap

Perbandingan matriks wilayah×indikator, atau tahun×kategori. Setiap kolom dinormalisasi secara terpisah menjadi kedalaman warna, semakin besar angka semakin hangat. Komponen ini sendiri adalah tabel HTML, sehingga secara alami dapat dibaca AI——inilah mengapa peta panas di sistem kami unggul dibanding "hanya sebuah gambar berwarna".

```tw-heatmap
Kabupaten/Kota | Rasio Harga Rumah terhadap Pendapatan (kali) | Tingkat Beban KPR (%)
Taipei | 16.60 | 63.9
Hsinpei | 13.03 | 56.9
Taichung | 11.11 | 48.0
Taoyuan | 9.0 | 40.0
Sumber: Platform Informasi Properti Kementerian Dalam Negeri
```

## tw-dot

Diagram batang membandingkan "kuantitas", diagram titik melihat "distribusi": semua titik jatuh pada skala yang sama, Anda bisa melihat siapa yang berkumpul bersama, siapa yang merupakan nilai pencilan (outlier). Satu nilai per baris disebut dot strip; diberikan dua nilai akan digambar sebagai interval "dari sini ke sana"; diberikan tiga nilai (`estimasi titik | batas bawah | batas atas`) akan digambar seperti survei "estimasi titik + pita ketidakpastian". Kesalahan pengambilan sampel ±3% tidak boleh diabaikan, ini adalah kejujuran yang paling sering dilanggar di tahun pemilu. `*` juga bisa digunakan untuk penekanan.

```tw-dot
Dua kutub tingkat penuaan: dari kabupaten/kota paling muda ke paling tua (persentase 65 tahun ke atas, %)
Hsinchu County | 15.08 | Paling muda di seluruh Taiwan
Taoyuan | 16.72
Taichung | 17.40
New Taipei | 19.95
Tainan | 20.48
Kaohsiung | 20.79
*Chiayi County | 24.11 | Paling tua di seluruh Taiwan
*Taipei | 24.18 | Paling tua di enam kota metropolitan
Sumber: Direktorat Jenderal Administrasi Kependudukan Kementerian Dalam Negeri, akhir 2025
```

## tw-stack

Diagram kotak (waffle chart) cocok untuk komposisi "satu kesatuan"; batang bertumpuk cocok untuk **membandingkan komposisi di beberapa baris**—setiap baris dinormalisasi otomatis menjadi 100%, segmen yang cukup lebar akan menampilkan nilainya langsung di blok warna.

```tw-stack
Tiga referendum nuklir: setuju vs tidak setuju (persentase suara sah %)
Referendum | Setuju | Tidak Setuju
2018 Nuklir untuk Hijau | 59 | 41
2021 Restart NPP-4 | 47 | 53
2025 Perpanjangan Operasi NPP-3 | 74 | 26
Sumber: Hasil resmi penilaian tiga referendum Komisi Pemilihan Umum Pusat
```

## Piramida tw-pyramid

Diagram batang back-to-back, dengan dua sisi masing-masing mewakili satu kelompok, berbagi label di tengah, adalah visualisasi klasik dalam demografi. Di sini digunakan untuk melihat «kepala berat kaki ringan» enam kabupaten/kota: sisi kiri adalah anak-anak, sisi kanan adalah lansia, membandingkan kedua sisi, penuaan tidak lagi hanya persentase abstrak.

```tw-pyramid
Kepala berat kaki ringan: Persentase populasi muda vs lansia enam kabupaten/kota (%)
Kabupaten/Kota | 0–14 tahun | 65 tahun ke atas
Kabupaten Hsinchu | 14,80 | 15,08
Taoyuan | 13,13 | 16,72
Taichung | 12,75 | 17,40
Taipei | 11,97 | 24,18
Keelung | 9,28 | 22,28
Kabupaten Chiayi | 8,27 | 24,11
Sumber: Direktorat Jenderal Administrasi Kependudukan Kementerian Dalam Negeri akhir 2025; persentase usia muda dihitung dari tingkat penuaan ÷ indeks penuaan × 100
```

## Peta Ubin tw-tiles

Peta choropleth Taiwan memiliki dua masalah lama: luasnya Hualien dan Taitung mencuri bobot visual, bentuk Taiwan hasil gambaran tangan AI sering kali "di antara zaitun dan kentang". Peta ubin menyusun 22 kabupaten/kota menjadi ubin berukuran sama (tata letak tertulis keras di sistem, mengikuti posisi relatif nyata), setiap ubin memiliki bobot yang sama, angka ditulis langsung di atas ubin. Bentuk selalu benar, karena pada dasarnya tidak menggambar bentuk.

```tw-tiles
Tingkat Penuaan 22 Kabupaten/Kota Seluruh Taiwan (Persentase Penduduk Usia 65 Tahun ke Atas, %)
Kota Taipei | 24,18
Kota New Taipei | 19,95
Kota Taoyuan | 16,72
Kota Taichung | 17,40
Kota Tainan | 20,48
Kota Kaohsiung | 20,79
Kota Keelung | 22,28
Kota Hsinchu | 16,16
Kota Chiayi | 19,90
Kabupaten Hsinchu | 15,08
Kabupaten Miaoli | 20,23
Kabupaten Changhua | 20,37
Kabupaten Nantou | 22,66
Kabupaten Yunlin | 21,76
Kabupaten Chiayi | 24,11
Kabupaten Pingtung | 21,84
Kabupaten Yilan | 20,77
Kabupaten Hualien | 21,52
Kabupaten Taitung | 20,93
Kabupaten Penghu | 21,03
Kabupaten Kinmen | 19,69
Kabupaten Lienchiang | 17,14
Sumber: Direktorat Jenderal Administrasi Kependudukan Kementerian Dalam Negeri, akhir 2025
```

## Peta Isotip tw-iso

"174.891 rumah tangga" adalah angka yang dibaca lalu dilupakan; sembilan titik yang bisa dihitung jari bukan. Peta isotip mengubah angka besar menjadi "satu simbol = berapa banyak" unit yang dapat dihitung, ini adalah cara berpikir pelapor saat membuat liputan perikanan samudra: mengubah angka masif yang tidak terasa, menjadi unit yang terasa oleh masyarakat. Simbol hanya menggunakan bilangan bulat (tidak memotong setengah), nilai presisi ditulis di samping.

```tw-iso
Berapa Banyak Perumahan Nasional yang Dibangun Pemerintah Selama 24 Tahun Ini
單位：● = 20.000 rumah tangga
Pembangunan langsung oleh pemerintah | 174.891 rumah tangga | 1976–1999
Total perumahan nasional dalam arti luas | 390.000 lebih rumah tangga | hingga dicabut tahun 2015
Sumber: Siaran Pers Kabinet Mengenai Pencabutan Undang-Undang Perumahan Nasional
```

## Busur Kursi tw-arc

Komposisi kursi parlemen memiliki visualisasi khusus: setengah lingkaran titik, satu kursi satu titik, partai disusun berurutan membentuk busur berkelanjutan. Diagram pai membandingkan sudut (mata manusia tidak mahir), busur kursi memungkinkan Anda menghitung titik langsung, garis mayoritas digambar tepat di posisinya. Di sini digunakan hasil Pemilu Legislatif 2024: 113 kursi, tiga partai tidak mencapai mayoritas, garis putus-putus itulah yang menjadi titik awal tarik tambang pembubaran massal kemudian. Perhatikan ini adalah diagram parlemen: jenis pemilihan "satu daerah satu pemenang" seperti 22 gubernur, seharusnya menggunakan peta ubin kabupaten/kota di atas.

```tw-arc
Kursi Dewan Legislatif 2024: Tiga Partai Tidak Mencapai Mayoritas (113 Kursi)
過半：57
KMT | 52
DPP | 51
Partai Rakyat Taiwan | 8
Independen | 2 | condong pan-Biru
Sumber: Komisi Pemilihan Umum Pusat
```

## Grid Kecil Violin tw-multiples

Menyisipkan lima garis dalam satu grafik akan membuat garis-garis tersebut berkelit seperti spageti; small multiples memisahkan setiap garis ke dalam sel kecilnya masing-masing, **semua sel menggunakan skala yang sama**, sehingga bentuk-bentuknya dapat dibandingkan. Di sini menggunakan rasio perawat-pasien tiga shift: heatmap (di atas) memberikan matriks yang presisi, small multiples memberikan bentuk "setiap level naik ke malam hari, level dasar naik paling curam". Data yang sama, pertanyaan yang berbeda, pilih grafik yang berbeda.

```tw-multiples
Semakin malam, semakin dasar rumah sakitnya, semakin banyak tempat tidur yang dijaga satu perawat (orang)
Kolom: Shift | Rasio Perawat-Pasien
--- Rumah Sakit Pusat Medis
Shift Pagi | 6
Shift Sore | 9
Shift Malam | 11
--- Rumah Sakit Regional
Shift Pagi | 7
Shift Sore | 11
Shift Malam | 13
--- *Rumah Sakit Distrik
Shift Pagi | 10
Shift Sore | 13
Shift Malam | 15
Sumber: Pengumuman Standar Rasio Perawat-Pasien Tiga Shift Kementerian Kesehatan dan Kesejahteraan, 2024
```

## Cara Menggunakan Modul-modul Ini

Setiap modul ditulis sebagai blok ` ```tw-* ` di dalam Markdown artikel, menggunakan `|` untuk memisahkan kolom, dan secara otomatis diubah menjadi tampilan di atas saat dibangun—penulis tidak perlu menulis HTML atau JavaScript apa pun. Sintaks lengkap, kapan menggunakan jenis mana, cara mengatur warna dan sumbu agar tidak menyesatkan, serta daftar pemeriksaan visualisasi sebelum publikasi, semuanya ada di [graph.md](https://github.com/frank890417/taiwan-md/blob/main/docs/editorial/graph.md)。

Sistem ini terinspirasi dari falsafah editorial media narasi visual [The Pudding](https://pudding.cool/)—masalah mendahului data, kesimpulan harus jelas, anotasi adalah protagonista—namun berkembang menjadi organ yang cocok untuk Taiwan.md: statis, multibahasa, dan dapat dibaca AI. Konteks desain lengkapnya tertulis di [Laporan Desain Sistem Visualisasi](https://github.com/frank890417/taiwan-md/blob/main/reports/article-visualization-design-2026-06-06.md)。

Untuk melihat bagaimana modul-modul ini disisipkan ke dalam narasi artikel mendalam yang nyata, baca [Perumahan Nasional dan Keadilan Tempat Tinggal](/id/society/public-housing-justice)—kebanyakan data di halaman ini berasal dari penelitian artikel tersebut。

## Sistem ini pun berkembang

Halaman yang Anda lihat ini, adalah hasil tiga putaran evolusi. Karena halaman ini membahas garis waktu, gunakan modul kebijakan untuk menceritakan sejarahnya sendiri:

```tw-timeline
2026-06-06 | Lahirnya Sepuluh Modul | Setelah mempelajari taksonomi grafik The Pudding dan FT, lahir batch pertama: teks besar, kartu perbandingan, batang proporsi, garis putus-putus
2026-06-12 | Seminggu Kemudian Jadi Tujuh Belas | Tambah kemiringan, diagram titik, bertumpuk, piramida, diagram bata kabupaten/kota, diagram unit; verifikator piksel viz-shot lahir hari yang sama, karena "markup ada" dan "tampilan benar" adalah dua hal berbeda
2026-07-16 | Sembilan Belas, dan Bicara Enam Bahasa | Busur kursi dan grid kelipatan kecil bergabung; "string sistem" seperti "Sumber Data" kini dirender enam bahasa, versi Inggris-Jepang diagram bata kabupaten/kota tidak lagi menurun jadi batang panjang
Sumber: Laporan Desain dan Evolusi Sistem Visualisasi Taiwan.md (2026-06 hingga 2026-07, GitHub publik)
```

Fokus putaran ketiga sebenarnya bukan grafik baru, melainkan pemeriksaan diri yang jujur. Audit seluruh situs menemukan: modul yang diawasi gerbang otomatis, tingkat penandaan sumber 100%; tiga modul frekuensi tinggi yang tidak diawasi, empat puluh persen tanpa sumber. Aturan tertulis di panduan editor dua bulan, perilaku却 sepenuhnya mengikuti bentuk instrumen, jadi kali ini instrumen disamakan lebarnya dengan aturan. Putaran yang sama juga menangkap string sistem di halaman Inggris, Jepang, Korea semuanya dirender ke bahasa China, bahkan satu karakter China tersederhana tercampur di tag aksesibilitas tak ada yang sadar. Bagi sistem yang mengklaim "biarkan LLM membaca data Taiwan di enam bahasa", sudut-sudut ini lebih penting dari fitur baru.

Penelitian terbaru juga mendukung jalur ini: akurasi AI multimodal merekonstruksi nilai grafik dari gambar tidak andal, node teks-lah yang benar-benar dibaca stabil mesin. Inilah alasan diagram bata menuliskan angka langsung di bata, setiap grafik dilengkapi tabel data tersembunyi. Proses penelitian lengkap dan keputusan desain, tertulis di [Laporan Penelitian Mendalam dan Implementasi Sistem Visualisasi v3.0](https://github.com/frank890417/taiwan-md/blob/main/reports/viz-module-evolution-2026-07-16.md).

**Bacaan Lanjutan**:

- [Perumahan Nasional dan Keadilan Tempat Tinggal](/id/society/public-housing-justice) — Cerita lengkap di balik data tempat tinggal ini: bagaimana perumahan nasional dari rumah murah jadi tangga aset, sumber data mayoritas modul halaman ini
- [Melihat 22 Kabupaten/Kota Taiwan dengan Data](/id/geography/data-taiwan-22-cities) — Data penuaan untuk diagram titik, piramida, diagram bata kabupaten/kota halaman ini semuanya dari analisis lengkap 22 kabupaten/kota artikel itu
- [Diskusi Taiwan dan Energi Nuklir](/id/society/taiwan-nuclear-debate) — Cerita lengkap tiga referendum batang bertumpuk itu: menang debat, kalah sistem
- [Undang-Undang Kesehatan](/id/society/medical-care-act) — Cerita lengkap angka rasio perawat-pasien tiga shift grid kelipatan kecil itu: undang-undang bisa tulis mengurus berapa tempat tidur, tak bisa tulis apakah ada sepasang tangan itu
- [Pemecatan Massal](/id/history/great-recall-movement-2024) — Lanjutan garis putus-putus mayoritas busur kursi itu: dewan legislatif tiga partai tak mayoritas bagaimana sampai 37 kasus pemecatan
- [Krisis Fertilitas Rendah Taiwan](/id/society/taiwan-low-birth-rate-crisis) — Beli tidak mampu rumah dan lahirkan tidak mampu anak, sisi lain keadilan generasi

## Sumber Gambar

Artikel ini menggunakan 1 gambar lisensi CC, cache di `public/article-images/society/`:

- [Horizon Perumahan Kota Taipei (Perspektif Gajah)](https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg) — Foto: Heeheemalu, 2026, CC BY-SA 4.0 (hero)

## Referensi

[^1]: [Platform Informasi Properti Kementerian Dalam Negeri](https://pip.moi.gov.tw/Publicize/Info/E1050) — Statistik perumahan resmi seperti rasio harga rumah terhadap pendapatan, rasio beban KPR, dan tingkat kepemilikan rumah.

[^2]: [Pusat Penelitian Properti Universitas Chengchi](https://rer.nccu.edu.tw/article/detail/2210058908437) — Indikator kemampuan membeli rumah tahunan, sumber data seri rasio harga rumah terhadap pendapatan nasional untuk grafik garis dan batang proporsi di halaman ini.

[^3]: [Siaran Pers Kabinet Mengenai Pencabutan Undang-Undang Perumahan Nasional](https://www.ey.gov.tw/Page/9277F759E41CCD91/d4afaf10-ece5-4b4f-9482-35ce16bdc657) — Data resmi seperti jumlah kumulatif unit perumahan nasional (sekitar 390.000 lebih unit).

[^4]: [Data Statistik Kependudukan Direktorat Jenderal Administrasi Kependudukan Kementerian Dalam Negeri](https://www.ris.gov.tw/app/portal/346) — Persentase penduduk berusia 65 tahun ke atas dan indeks penuaan tiap kabupaten/kota pada akhir 2025, sumber data untuk diagram titik, piramida, peta ubin kabupaten/kota, dan kotak penjelasan di halaman ini; rantai verifikasi lengkap lihat 〈[Melihat 22 Kabupaten/Kota Taiwan dengan Data](/id/geography/data-taiwan-22-cities)〉.

[^5]: [Hasil Referendum Kasus ke-16 Tahun 2018 Komisi Pemilihan Umum Pusat (PDF)](https://web.cec.gov.tw/api/file/0132581c-18b5-4951-bc24-3cc083924666.pdf) — Persentase persetujuan tiga referendum tenaga nuklir (59%／47%／74%) adalah hasil penetapan resmi KPU Pusat, rantai verifikasi per kasus lihat 〈[Diskusi Taiwan dan Tenaga Nuklir](/id/society/taiwan-nuclear-debate)〉.

[^6]: [CNA: Pemilu Legislatif 2024, Tidak Ada Partai yang Mendapat Mayoritas dari Tiga Partai](https://www.cna.com.tw/news/aipl/202401130361.aspx) — Distribusi 113 kursi pada busur kursi (KMT 52, DPP 51, TPP 8, Non-partai 2) adalah hasil penetapan KPU Pusat, rantai verifikasi lihat 〈[Pemecatan Massal](/id/history/great-recall-movement-2024)〉.

[^7]: [Pengumuman Standar Rasio Perawat-Pasien Tiga Shift Kementerian Kesehatan dan Kesejahteraan (2024)](https://www.mohw.gov.tw/) — Nilai standar rasio perawat-pasien tiga tingkat × tiga shift pada grid kelipatan kecil, rantai verifikasi lihat 〈[Undang-Undang Medis](/id/society/medical-care-act)〉.

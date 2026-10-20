---
title: 'Olhando Taiwan por dados: 22 condados e cidades — a diferença entre o mais superlotado e o mais vazio é de 151 vezes; entre o mais velho e o mais jovem, quase uma geração'
description: 'Na mesma ilha, a cidade mais superlotada, Taipei, tem 8.975 habitantes por km², enquanto o condado mais vazio, Taitung, tem apenas 59 — uma diferença de 151 vezes. A cidade com mais habitantes, Nova Taipei, tem 4,04 milhões; a com menos, o condado de Kinmen, 13.621 — uma diferença de 297 vezes. O condado mais jovem, Hsinchu, tem uma taxa de envelhecimento de 15,08%, enquanto o mais velho, Chiayi, tem 24,11% — uma diferença de quase uma geração. Com os dados oficiais do Departamento de Registro Civil do Ministério do Interior até o final de 2025, desenhamos um retrato da ilha com escala e verificável: 70% da população vive em 30% do território; a fronteira do envelhecimento não está nas cidades, mas no leste, ilhas e condados rurais; e em todos os 22 condados e cidades, as mortes já superam os nascimentos.'
date: 2026-06-06
category: 'Geography'
tags:
  [
    'estatísticas populacionais',
    'envelhecimento populacional',
    'sociedade superenvelecida',
    'seis cidades',
    'disparidade urbana-rural',
    'densidade populacional',
    'índice de envelhecimento',
    'declínio natalidade',
    'visualização de dados',
    'série 22 condados',
  ]
subcategory: '人口與區域'
author: 'Taiwan.md'
readingTime: 13
featured: false
lastVerified: 2026-06-06
lastHumanReview: false
image: '/article-images/geography/taiwan-island-nasa-mosaic.webp'
imageAlt: 'Visão aérea da ilha de Taiwan do espaço, com as planícies do oeste e a cordilheira central do leste claramente visíveis'
imageCredit: 'NASA'
imageLicense: 'Public domain（NASA）'
imageSource: 'https://commons.wikimedia.org/wiki/File:Taiwan_Main_Island_Mosaic_NASA_2020.jpg'
translatedFrom: 'Geography/用數據看台灣22縣市.md'
sourceCommitSha: 'd525e99ee'
sourceContentHash: 'sha256:426316f6a96d8460'
sourceBodyHash: 'sha256:035cd9cc6b8c328a'
translatedAt: '2026-10-15T03:20:05.142255+00:00'
---

# Olhando Taiwan por dados: 22 condados e cidades — a diferença entre o mais superlotado e o mais vazio é de 151 vezes; entre o mais velho e o mais jovem, quase uma geração

Dirigindo da Zona da Xinyi em Taipei, em direção ao sul e ao leste, até chegar ao centro da cidade de Taitung. O navegador mostra mais de 300 km, sem completar um dia de viagem. Mas se você prestar atenção em outra métrica — quantas pessoas vivem por km² — essa estrada parecerá atravessar dois países. A cidade de Taipei, onde fica a Zona da Xinyi, tem 8.975 pessoas por km². O condado de Taitung, onde fica o centro de Taitung, tem apenas 59 pessoas por km². A mesma ilha, o mesmo passaporte, com uma diferença de densidade de 151 vezes.

Esse número não é um jogo de valores extremos. É a realidade do desequilíbrio interno de Taiwan. Estamos acostumados a tratar "Taiwan" como uma unidade única — sua economia, suas eleições, seu declínço da natalidade — mas quando você abre os dados completos do Departamento de Registro Civil do Ministério do Interior até o final de 2025, descobre que não existe um Taiwan homogêneo. Algumas pessoas estão apertadas na selva de concreto esperando o sinal vermelho; outras dirigem por 10 minutos sem ver outro carro. Alguns condados ainda estão crescendo; a maioria está encolhendo. Os cantos mais jovens e mais velhos diferem por quase uma geração.

```tw-figure
151 vezes
Diferença de densidade populacional entre Taipei e Taitung: 8.975 pessoas/km² vs 59 pessoas/km²
Ministério do Interior, Departamento de Registro Civil, final de 2025
```

Este artigo pretende fazer uma coisa: com dados oficiais, desenhar um retrato com escala e verificável de toda a ilha. Depois de desenhado, você verá um rosto profundamente dividido e envelhecendo rapidamente.[^1]

> **30 segundos de resumo:** No final de 2025, a população total de Taiwan era de 23.299.132 pessoas (cerca de 23,3 milhões), já em declínio por 23 meses consecutivos, com o número de recém-nascidos caindo pela primeira vez abaixo de 110.000. No mesmo ano, Taiwan oficialmente entrou na "sociedade superenvelecida", com uma em cada cinco pessoas com mais de 65 anos. Mas a média nacional esconde grandes disparidades internas: a diferença entre os condados com maior e menor densidade populacional é de 151 vezes; a diferença entre os maiores e menores em termos de população é de 297 vezes; a diferença entre os mais envelhecidos e mais jovens é de quase uma geração. As pessoas se concentram nas seis grandes cidades; a fronteira do envelhecimento não está nas cidades, mas no leste, ilhas e condados rurais; o lugar mais jovem é o condado de Hsinchu, sustentado pelo parque tecnológico. Esta é uma Taiwan dividida e envelhecendo.

## Setenta por cento das pessoas, trinta por cento da terra

Primeiro, observe um fato que é facilmente ignorado: os taiwaneses vivem de forma extremamente concentrada.

No final de 2025, as seis cidades especiais (Taipé, Nova Taipei, Taoyuan, Taichung, Tainan e Kaohsiung) totalizavam 16.278.931 habitantes, o que representa 69,87% da população total de Taiwan. Em outras palavras, quase sete em cada dez taiwaneses vivem nessas seis cidades. No entanto, a área terrestre dessas seis cidades somadas ocupa apenas 30,12% do território de Taiwan. Setenta por cento das pessoas estão espremidas em trinta por cento da terra. Os outros trinta por cento da população estão espalhados pelos restantes setenta por cento do território. Esta é a primeira estrutura da distribuição populacional de Taiwan.

```tw-stat
23,3 milhões | População total de Taiwan | No final de 2025, em queda há 23 meses consecutivos
20,06% | Proporção da população com 65 anos ou mais | Em 2025, ultrapassou oficialmente o limiar da sociedade superenvelhecida
69,87% | Proporção da população nas seis cidades especiais | Mas vivem em apenas 30% do território
Fonte: Estatísticas Populacionais do Departamento de Registro Civil do Ministério do Interior (população total no final de 2025, proporção de pessoas com 65 anos ou mais, proporção populacional das seis cidades especiais) e dados sobre a reforma administrativa das cidades especiais[^1][^4]
```

Este cenário de sete para três não se formou naturalmente; ele tem um ponto de partida institucional claro. Em 25 de dezembro de 2010, Taiwan reestruturou seu mapa administrativo de uma só vez: o condado de Taipei foi elevado a Nova Taipei, os condados e cidades de Taichung, Tainan e Kaohsiung foram fundidos e, somando-se à cidade de Taipei original, cinco cidades especiais nasceram simultaneamente. Quatro anos depois, em 25 de dezembro de 2014, Taoyuan foi elevada à categoria de sexta cidade especial. Em apenas quatro anos, Taiwan passou de duas para seis cidades especiais, e a balança de recursos, orçamento e infraestrutura inclinou-se junto com essa mudança. [^4]

Uma elevação de status nunca é apenas uma mudança de nome. As transferências governamentais, o quadro de pessoal e as receitas fiscais próprias que uma cidade especial recebe são muito superiores aos de um condado ou cidade comum. Para onde a infraestrutura vai, as oportunidades de trabalho crescem; para onde elas vão, os jovens se mudam. O sistema traçou uma linha primeiro, e a população fluiu ao longo dela. A concentração nas seis cidades especiais que vemos hoje é, de certa forma, o fruto colhido mais de uma década após a reforma de 2010.

O gráfico abaixo detalha com mais clareza "onde os taiwaneses vivem". Apenas a cidade de Nova Taipei abriga 17,4% da população nacional; Taichung tem 12,3%, Kaohsiung 11,7%, Taipé 10,5%, Taoyuan 10,1% e Tainan 7,9% — as seis cidades especiais somadas chegam perto de 70%. Já os outros 16 condados e cidades espalhados por todo o país, do norte até as ilhas remotas, somam apenas 30,1%.

```tw-waffle
Onde vivem os taiwaneses (% da população nacional)
Nova Taipei | 17.4
Taichung | 12.3
Kaohsiung | 11.7
Taipé | 10.5
Taoyuan | 10.1
Tainan | 7.9
Outros 16 condados/cidades | 30.1
Fonte: Departamento de Registro Civil do Ministério do Interior, final de 2025
```

Se você observar este gráfico de quadrantes por um tempo, surgirá uma questão: que tipo de vida levam aquelas pessoas que compõem os 30% espalhados pelos 70% de território? A resposta está na densidade.

![Skyline de arranha-céus nas áreas de Xinyi e Nangang, em Taipé, com residências e escritórios comerciais densamente empilhados](/article-images/society/taipei-skyline-housing-2026.webp)
_O skyline de Taipé. O condado mais denso de Taiwan, com 8.975 pessoas por quilômetro quadrado. Photo: Heeheemalu, CC BY-SA 4.0 via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg)._

## Do mais denso ao mais vazio: uma diferença de 151 vezes

Quando falamos de concentração populacional, referimo-nos a "quantas pessoas" existem; quando falamos de densidade, referimo-nos a "quão apertado" é o espaço. Esta última dimensão é o que realmente permite sentir a distância entre os dois lados de Taiwan.

A cidade de Taipé possui 8.975 pessoas por quilômetro quadrado, sendo o lugar mais denso de todo o país. A lotação em Taipé é parte do cotidiano: o metrô (MRT) fica superlotado nos horários de pico, os semáforos exigem esperas prolongadas e as casas são construídas altas e estreitas. Logo em seguida, a cidade de Hsinchu possui 4.376 pessoas por quilômetro quadrado, menos da metade de Taipé. Depois vem a cidade de Keelung, com 2.710 pessoas. Somente entre essas três cidades mais densas, já se nota uma queda abrupta na densidade.

```tw-bars
Taipé | 8.975 pessoas/km²
Hsinchu | 4.376 pessoas/km²
Keelung | 2.710 pessoas/km²
Changhua | 1.126 pessoas/km²
Hualien | 68 pessoas/km²
Taitung | 59 pessoas/km² | O mais vazio de Taiwan
Fonte: Ministério do Interior, Departamento de Registro Civil, final de 2025
```

Ao deslocar o olhar para o outro extremo deste gráfico de barras, a disparidade torna-se realmente evidente. O condado de Changhua, com 1.126 pessoas por quilômetro quadrado, já é considerado relativamente denso para um condado agrícola. Ao chegar em [Hualien](/pt/geography/hualien-county/), o número cai para 68 pessoas. Na base da lista, o condado de Taitung tem apenas 59 pessoas por quilômetro quadrado. A quantidade de pessoas que cabe em um único quilômetro quadrado de Taipé equivale ao que caberia em 151 quilômetros quadrados de Taitung. Esta é a face real da diferença de 151 vezes — você dirige do distrito de Xinyi em direção a Taitung e vê, com seus próprios olhos, a população rarefeita pela janela.

Há um fato geográfico sustentando isso. O condado com a maior área de Taiwan é Hualien, com 4.628 quilômetros quadrados, abrangendo quase todo o lado leste da Cordilheira Central. Com grande extensão territorial, pouca gente e muitas montanhas, a densidade de Hualien e Taitung é naturalmente diluída para os níveis mais baixos do país. Já o menor, o [condado de Lienchiang](/pt/geography/lienchiang-county/), possui apenas 28,8 quilômetros quadrados. A questão da densidade é metade uma escolha humana e metade determinada pelo terreno.

É comum associar diretamente "alta densidade populacional" ao progresso e "baixa densidade" ao atraso, mas essa relação inverte a causalidade. A baixa densidade de Taitung não ocorre porque ela não consegue se desenvolver, mas sim porque está encostada nas montanhas e voltada para o Oceano Pacífico, possuindo condições geográficas natas de vastidão e pouca gente. O "vazio" de Hualien abriga Taroko, a Cordilheira Costeira e as paisagens montanhosas mais completas da parte posterior de Taiwan. Os números de densidade apenas dizem se o lugar é apertado ou não; eles não dizem nada sobre o valor daquela terra. Ao organizar os 22 condados e cidades de Taiwan em um espectro que vai do denso ao vazio, o que você vê é uma ilha desenvolvendo diferentes modos de vida conforme a sua topografia.

![Estrada de Chihshang, Taitung: uma estrada rural reta de cerca de 2,2 km, ladeada por campos de arroz abertos e sem postes de eletricidade](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/29-%E4%BC%AF%E6%9C%97%E5%A4%A7%E9%81%93_%2828896712393%29.jpg/1280px-29-%E4%BC%AF%E6%9C%97%E5%A4%A7%E9%81%93_%2828896712393%29.jpg)
_A Estrada de Chihshang em Taitung. O condado mais vazio da mesma ilha tem apenas 59 pessoas por quilômetro quadrado, sendo um centésimo e cinquenta e um avos de Taipé. Photo: Sinchen.Lin, CC BY 2.0 via [Wikimedia Commons](<https://commons.wikimedia.org/wiki/File:29-%E4%BC%AF%E6%9C%97%E5%A4%A7%E9%81%93_(28896712393).jpg>).\_

## Gigantes e partículas

Se a densidade compara "quão apertado", a escala populacional compara "quão grande". A diferença nessa dimensão é ainda mais impressionante.

A cidade com mais habitantes é Nova Taipei, com 4.044.831 pessoas — uma única cidade que equivale a muitos países. A cidade com menos habitantes é o condado de Kinmen (também conhecido como Matsu), com apenas 13.621 pessoas. A população de Nova Taipei é 297 vezes a de Kinmen. Se todos os habitantes de Kinmen fossem transferidos para Nova Taipei, nem chegariam perto de preencher a diferença. Com o mesmo passaporte da República da China (Taiwan), o "todo" de um condado é apenas uma partícula para outro.

Essa diferença de escala se torna diretamente um problema de governança. Nova Taipei precisa lidar com tráfego, moradia, cuidados de idosos e lixo para quatro milhões de pessoas; Kinmen precisa pensar em como evitar que uma ilha com 13.621 pessoas continue perdendo habitantes, como manter um hospital funcionando e como manter a última rota marítima operacional. A mesma lei e a mesma política central, aplicadas a uma diferença de 297 vezes na população, resultam em realidades completamente diferentes. Quando falamos em "governos locais", costumamos imaginar a escala urbana, mas Taiwan tem muitos condados operando uma máquina governamental em escala microscópica.

Mas aqui há um erro intuitivo: pequena escala não significa jovem população. Você pode achar que ilhas e pequenos condados, com jovens migrando para fora, ficam com poucos jovens e muitos idosos; e que grandes cidades, com mais recursos e oportunidades, ficam com muitos jovens. Os dados reais derrubam ambas as suposições. O condado de Kinmen tem a menor população, mas sua taxa de envelhecimento é de 17,14%, mais baixa que vários grandes condados; enquanto a quarta maior cidade em termos de população, Taipei, tem uma taxa de envelhecimento de 24,18%, a mais alta do país. Entre escala e envelhecimento, não há uma correspondência direta. Para entender como Taiwan está envelhecendo, precisamos de outro mapa.

## A fronteira do envelhecimento não está nas cidades

Em 2025, Taiwan cruzou uma linha: a proporção de pessoas com 65 anos ou mais atingiu 20,06%, oficialmente tornando-se uma "sociedade superenvelecida" segundo a definição da Organização Mundial da Saúde. Isso significa que 4,67 milhões de taiwaneses têm mais de 65 anos — uma em cada cinco pessoas é um idoso. E entre os 22 condados, 14 já ultrapassaram a marca de 20% de envelhecimento. Envelhecer já é a cor dominante em toda a ilha.

Mas essa média nacional de 20,06% esconde grandes disparidades internas. A tabela abaixo mostra a taxa de envelhecimento e o índice de envelhecimento dos 22 condados — é a tabela que merece mais atenção neste artigo. Primeiro, explicando como ler o "índice de envelhecimento": ele é calculado dividindo a população com 65 anos ou mais pela população de 0 a 14 anos e multiplicando por 100. Um valor de 100 significa que idosos e crianças estão em igualdade; quanto maior o número, mais "pesado o topo", mais idosos e menos crianças há.

```tw-heatmap
Condado | Taxa de envelhecimento 65+ (%) | Índice de envelhecimento
Taipei | 24.18 | 202.06
Nova Taipei | 19.95 | 185.54
Taoyuan | 16.72 | 127.33
Taichung | 17.40 | 136.45
Tainan | 20.48 | 184.96
Kaohsiung | 20.79 | 192.10
Keelung | 22.28 | 240.21
Hsinchu (cidade) | 16.16 | 106.59
Chiayi (cidade) | 19.90 | 164.47
Hsinchu (condado) | 15.08 | 101.88
Miaoli | 20.23 | 179.56
Changhua | 20.37 | 178.35
Nantou | 22.66 | 224.64
Yunlin | 21.76 | 206.78
Chiayi (condado) | 24.11 | 291.69
Pingtung | 21.84 | 218.72
Iilan | 20.77 | 189.67
Hualien | 21.52 | 200.53
Taitung | 20.93 | 194.71
Penghu | 21.03 | 223.65
Kinmen | 19.69 | 255.57
Matsu (condado de Jiangxi) | 17.14 | 180.23
Fonte: Ministério do Interior, Departamento de Registro Civil, final de 2025
```

Ao ler essa tabela, prestar especial atenção na coluna do índice de envelhecimento. O mais alto do país é Chiayi (condado), com 291,69 — significa que, em Chiayi, cada criança corresponde a cerca de três idosos. Logo depois vem Kinmen, com 255,57, e Keelung, com 240,21. Esses três têm algo em comum: todos são condados agrícolas, ilhas ou cidades antigas com indústrias em declínio, nenhum deles entra na lista das cidades mais prósperas de Taiwan. A fronteira mais avançada do envelhecimento está justamente nesses cantos que há muito perdem jovens para fora. Quando os jovens saem para trabalhar ou estudar, os que ficam vão envelhecendo; com poucos nascimentos para compensar, o índice de envelhecimento dispara.

Então, onde está o canto mais jovem de Taiwan? A resposta surpreenderá muitos: não em algum paraíso isolado, mas ao lado das fábricas de tecnologia. O condado de Hsinchu tem uma taxa de envelhecimento de apenas 15,08%, a mais baixa do país; seu índice de envelhecimento é de 101,88, quase um equilíbrio perfeito entre idosos e crianças, destacando-se em meio ao cenário geral de envelhecimento. A cidade de Hsinchu tem 16,16%, e Taoyuan tem 16,72%, logo atrás. A juventude desses três lugares tem quase sempre a mesma razão: o Parque Tecnológico de Hsinchu. A indústria de semicondutores e tecnologia atraiu muitos engenheiros e técnicos em idade fértil, que se estabelecem e têm filhos aqui, mantendo a estrutura etária desses condados inclinada para a juventude. Além de impulsionar as exportações de Taiwan, o Parque Tecnológico de Hsinchu também sustenta a porção mais jovem do mapa populacional da ilha.

Colocando os extremos mais jovens e mais velhos lado a lado, a diferença é ainda mais impactante.

```tw-versus
Hsinchu (condado) (mais jovem) | Chiayi (condado) (mais velho)
65+ representa 15.08% | 65+ representa 24.11%
Índice de envelhecimento 101.88 | Índice de envelhecimento 291.69
População ainda crescendo | População em declínio contínuo
Juventude impulsionada pelo parque tecnológico | Fronteira avançada do envelhecimento agrícola
Fonte: Ministério do Interior, Departamento de Registro Civil, final de 2025
```

Hsinchu (condado) com 15,08% versus Chiayi (condado) com 24,11% — a diferença na taxa de envelhecimento é de nove pontos percentuais; o índice de envelhecimento, de 101,88 para 291,69, uma diferença de quase três vezes. Um está crescendo, com população fluindo para dentro; o outro está em declínio, com população fluindo para fora. Os dois condados nessa mesma ilha diferem em quase uma geração em termos de envelhecimento. Nos parques de Hsinchu, você pode ver jovens pais com carrinhos de bebê; nas zonas rurais de Chiayi, as ruas podem estar cheias de idosos caminhando devagar. Esses dois Taiwans são calculados pelos mesmos números do Departamento de Registro Civil.

Aqui, precisamos corrigir um equívoco comum: muitos acreditam que o envelhecimento é exclusividade do interior e ilhas, e que as grandes cidades, com mais jovens e oportunidades, deveriam ser imunes ao envelhecimento. Os dados dizem que não. A cidade de Taipei tem uma taxa de envelhecimento de 24,18%, a mais alta do país; seu índice de envelhecimento de 202,06 também é o mais alto entre as seis grandes cidades. A cidade mais próspera e com mais recursos de Taiwan é, ao mesmo tempo, a mais envelhecida entre as seis grandes cidades. A razão é simples: os preços imobiliários em Taipei são altos, e jovens casais são empurrados para Nova Taipei e Taoyuan para ter filhos; quem permanece na cidade são os que se estabeleceram cedo e agora estão envelhecendo. A prosperidade urbana não impede o envelhecimento — apenas o faz de outra forma. O envelhecimento não é uma doença de alguns condados; é a condição comum de toda a ilha, apenas com ritmos diferentes.

## Uma ilha, envelhecendo junta

Ao afastar o foco dos condados e cidades para o nível nacional, a história do envelhecimento em Taiwan revela uma dimensão ainda mais alarmante: a velocidade.

Taiwan não começou a envelhecer agora. Em 1993, a proporção da população com 65 anos ou mais ultrapassou 7%, entrando na fase de "sociedade em processo de envelhecimento", de acordo com as definições internacionais. Em 2018, esse número atingiu 14,05%, entrando na "sociedade envelhecida". Em 2025, ultrapassou novamente os 20%, tornando-se uma "sociedade superenvelhecida". Esses três marcos parecem ser apenas anos distintos, mas escondem uma descida cada vez mais acelerada.

```tw-timeline
1993 | Sociedade em processo de envelhecimento | 65+ acima de 7%, Taiwan começa a envelhecer
2018 | Sociedade envelhecida | 65+ atinge 14%, 25 anos após o estágio anterior
2025 | Sociedade superenvelhecida | 65+ ultrapassa 20%, esta etapa levou apenas 7 anos
Fonte: Estatísticas populacionais do Ministério do Interior e definições internacionais de envelhecimento (7% em 1993, 14,05% em 2018, 20% em 2025) [^1]
```

Observe os intervalos entre esses pontos na linha do tempo. De 7% para 14%, Taiwan levou 25 anos; mas de 14% para 20%, levaram apenas 7 anos. Este último trecho consumiu menos de um terço do tempo do anterior. Taiwan está envelhecendo, e cada vez mais rápido. Isso é considerado abrupto mesmo em comparação com outros países; enquanto outras nações têm décadas para ajustar gradualmente seus sistemas de cuidados de longa duração, pensões e saúde, Taiwan foi comprimida em apenas sete anos, tendo que construir todo um sistema de assistência à terceira idade dentro de uma janela de tempo curtíssima.

```tw-line
Aumento da proporção da população com 65 anos ou mais ( %)
Ano | Proporção 65+
2000 | 8,6
2010 | 10,7
2020 | 16,1
2025 | 20,06
Fonte: Ministério do Interior, Conselho Nacional de Desenvolvimento
```

Esta linha ascendente torna a aceleração ainda mais clara. Em 2000, a proporção nacional de pessoas com 65 anos ou mais era de 8,6%; em 2010, era de 10,7% — um aumento de pouco mais de 2 pontos percentuais em dez anos. No entanto, nos dez anos entre 2010 e 2020, o número saltou de 10,7% para 16,1%, chegando a 20,06% em 2025. O final da linha é visivelmente mais íngreme que o início. A curva de envelhecimento de Taiwan está se curvando para cima.

O outro lado do envelhecimento é o colapso na base das nascimentos. Em 2025, o número de recém-nascidos em Taiwan caiu abaixo de 110 mil pela primeira vez, registrando apenas 107.812 bebês. A baixa natalidade e o envelhecimento populacional são dois lados da mesma moeda: quanto mais idosos há no topo, menos crianças entram pela base, tornando a estrutura populacional cada vez mais desequilibrada. É por isso que os índices de envelhecimento daqueles condados mencionados anteriormente são tão altos: há mais idosos no topo e pouquíssimas crianças na base.

> **📝 Nota do Curador**
> É fácil interpretar a "diminuição populacional" como "jovens mudando do campo para as cidades, logo o campo diminui e a cidade aumenta", como se fosse apenas uma mudança interna de residência. Mas os dados de 2025 revelam algo muito mais fundamental: o "crescimento natural" em todos os condados e cidades de Taiwan é negativo. Ou seja, em cada condado ou cidade de Taiwan, independentemente de ser urbano ou rural, grande ou pequeno, o número de mortes superou o de nascimentos. Isso não é mais uma questão de fluxo migratório; é a ilha inteira em um processo de retração vital. A migração apenas redistribui uma população que já está encolhendo; ela não cria pessoas novas.

Este fato merece uma reflexão profunda. Em 2025, restam apenas quatro condados e cidades com crescimento populacional em Taiwan: Taoyuan, condado de Hsinchu, Taichung e a cidade de Hsinchu. E o crescimento deles provém inteiramente do "crescimento social", ou seja, da migração de pessoas de outras regiões — eles sobrevivem atraindo habitantes de outros condados, não pelo próprio nascimento. Exceto por esses quatro, a população de todos os outros 18 condados e cidades diminuiu. Entre os que registraram as maiores quedas estão o condado de Kinmen, o condado de Lienchiang e Taipei. Note que até a próspera Taipei está nesta lista de perdas. Quando os nascimentos em cada canto do país não conseguem compensar as mortes, esses quatro condados que ainda crescem estão, na verdade, apenas apoiados temporariamente sobre a perda alheia.

É por isso que a população total diminuiu consecutivamente por 23 meses, caindo para 23.299.132 pessoas. É uma contração sincronizada de toda a ilha; cada condado está encolhendo. A diferença é que alguns lugares conseguem manter as aparências temporariamente graças à migração, enquanto outros não possuem sequer esse amortecedor.

## O retrato desenhado pelos dados

Voltando ao início dessa jornada. De Taipei, na Zona da Xinyi, até Taitung, a densidade populacional cai de 8.975 para 59 pessoas por km² — como atravessar dois países. Agora você sabe que isso não é apenas uma diferença de densidade. Ao longo do caminho, a escala populacional vai de gigantes a partículas, o envelhecimento vai da juventude sustentada pelo parque tecnológico de Hsinchu até a fronteira avançada do envelhecimento agrícola; o que não muda é que, não importa em que condado você pare, as mortes já superam os nascimentos.

Esta é a face de Taiwan em 2025: profundamente dividida e envelhecendo juntos. As disparidades internas são impressionantes — densidade diferindo em 151 vezes, escala populacional diferindo em 297 vezes, envelhecimento diferindo em quase uma geração; mas a condição compartilhada é surpreendente: toda a ilha morre mais do que nasce, a população total cai por 23 meses consecutivos, e em sete anos, passamos de sociedade envelhecida a superenvelhecida. O Conselho Nacional de Desenvolvimento projeta que, segundo as projeções, até 2070 a população total de Taiwan cairá para 14,97 milhões, e a proporção de pessoas com 65 anos ou mais atingirá 46,5%; em 2028, o "boom populacional" terminará. Esse retrato não melhorará sozinho.[^3]

Reconhecer que Taiwan é tão heterogênea internamente é o primeiro passo para entender os verdadeiros desafios dessa ilha: um lugar com disparidades tão grandes precisa de políticas que atendam tanto os quatro milhões apertados nas planícies quanto os 13.621 na ilha de Kinmen, que enfrentem ao mesmo tempo a juventude de Hsinchu e a velhice de Chiayi. A ilha é dividida, mas precisa agir como um todo; está envelhecendo, mas precisa enfrentar o envelhecimento juntos. Os dados desenham esse rosto para nós; como responder a esse rosto é a pergunta que toda a ilha precisa responder.

## Leituras recomendadas

- [Taipei](/pt/geography/taipei-city) — A cidade mais superlotada do país (8.975 pessoas/km²) e também a mais envelhecida entre as seis grandes cidades (índice de envelhecimento 202), o protagonista central tanto da densidade quanto do envelhecimento neste artigo.
- [Taitung (condado)](/pt/geography/taitung-county) — O outro extremo da vaziedade (59 pessoas/km²), onde as ilhas carregam o peso de toda a ilha.
- [Chiayi (condado)](/pt/geography/chiayi-county) — Índice de envelhecimento 291,69, o mais alto do país, cada criança corresponde a cerca de três idosos, representando a fronteira avançada do envelhecimento agrícola.
- [Hsinchu (condado)](/pt/geography/hsinchu-county) — Taxa de envelhecimento de 15,08%, a mais baixa do país, onde o parque tecnológico puxa a estrutura etária para a juventude.
- [Crise de baixa natalidade em Taiwan](/pt/society/taiwan-low-birth-rate-crisis) — A face do nascimento nesse retrato: recém-nascidos abaixo de 110.000, a outra face da ilha que morre mais do que nasce.

## Fontes das imagens

Este artigo usa três imagens, a hero é uma imagem de satélite de domínio público da NASA (armazenada em `public/article-images/`), e as duas imagens inline são licenciadas Creative Commons (Wikimedia Commons), com créditos completos:

- [Imagem de satélite da ilha de Taiwan (mosaico da NASA 2020)](https://commons.wikimedia.org/wiki/File:Taiwan_Main_Island_Mosaic_NASA_2020.jpg) (hero) — NASA, domínio público.
- [Horizonte de Taipei](https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg) (seção mais superlotada) — Foto: Heeheemalu, 2026, CC BY-SA 4.0.
- [Avenida de Boerlan em Taitung](<https://commons.wikimedia.org/wiki/File:29-%E4%BC%AF%E6%9C%97%E5%A4%A7%E9%81%93_(28896712393).jpg>) (seção mais vazia) — Foto: Sinchen.Lin, 2016, CC BY 2.0.

## Referências

[^1]: Ministério do Interior, Departamento de Registro Civil, Estatísticas Populacionais (final de 2025: 31 de dezembro de 2025, números populacionais, áreas territoriais, densidade populacional, proporção de pessoas com 65 anos ou mais, índice de envelhecimento). A soma da população dos 22 condados é exatamente 23.299.132, coincidindo perfeitamente com o total oficial.https://www.ris.gov.tw/app/portal/346

[^2]: Agência Central de Notícias / Ministério do Interior, "Taiwan oficialmente entra na sociedade superenvelecida", 9 de janeiro de 2026. A reportagem menciona que a população total no final de 2025 era de 23.299.132 pessoas, 20,06% com 65 anos ou mais (4,67 milhões), Taipei com 24,18% (mais alto), Hsinchu (condado) com 15,08% (mais baixo), e 107.812 recém-nascidos em 2025.https://www.cna.com.tw/news/ahel/202601090098.aspx

[^3]: Conselho Nacional de Desenvolvimento, "Projeção populacional da República da China (2024–2070)", publicado em 17 de outubro de 2024. A projeção indica que Taiwan entrará na sociedade superenvelecida em 2025, o "boom populacional" terminará em 2028 (população em idade ativa abaixo de 2/3 da população total), e até 2070, a população total cairá para 14,97 milhões, com 46,5% com 65 anos ou mais.https://www.ndc.gov.tw/nc_27_38548

[^4]: Ministério do Interior, reforma administrativa das cinco grandes cidades em 2010 (Taipei (condado) elevado a Nova Taipei, Taichung, Tainan e Kaohsiung (condados) fundidos com suas cidades, em vigor desde 25 de dezembro de 2010); Agência Central de Notícias, "A cidade de Taoyuan é oficialmente elevada à categoria de cidade administrativa, 25 de dezembro", 15 de dezembro de 2014.https://www.cna.com.tw/news/firstnews/201412150027.aspx

[^5]: Ministépio do Interior, "Taiwan oficialmente entra na sociedade envelhecida" (65+ representando 14,05%), 2018.https://www.moi.gov.tw/News_Content.aspx?n=2&s=11663

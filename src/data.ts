/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Novel, Poem, Artpiece, Blogpost } from "./types";

export const NOVELS: Novel[] = [
  {
    id: "campanile",
    title: "IL MISTERO DELL'OROLOGIO",
    genre: "Romanzo Mystery & Fantasy Temporale",
    synopsis: "Adam Venturi ha sedici anni e un'eredità che non ha mai chiesto. Nella sua famiglia, il passato non è mai veramente passato. Suo padre Carlo è un uomo segnato dal dolore, chiuso in un silenzio protettivo da quando la madre di Adam, Maria, se n'è andata consumata da una malattia che la medicina non ha mai saputo spiegare.\n\nTutto cambia quando Adam decide di scoprire il mistero che si cela dietro l'orologio misterioso datogli dalla madre prima di morire.\n\nTra il misterioso laboratorio del nonno orologiaio a Roma e gli antichi vicoli di Artena, Adam dovrà viaggiare indietro nel tempo per scoprire la verità sulla morte di sua madre e sciogliere il paradosso che condanna la sua famiglia.\n\nMa il tempo non perdona. E il cacciatore sta arrivando.",
    excerpt: "Tre passi avanti, tre passi indietro.",
    atmosphere: "Antico orologio d'oro, scacchiera prospettica, frammenti di specchio sospesi, toni indaco e smeraldo",
    coverQuery: "pocket_watch_chessboard_glass_shards",
    publishedYear: "2026",
    chapters: [
      {
        id: "c1-campanile",
        number: 1,
        title: "L'ingranaggio Spezzato",
        content: "Il ticchettio era l'unica costante nella casa di Adam. Un suono pesante, metallico, che sembrava provenire non dagli orologi appesi alla parete, ma dalle pareti stesse, dal legno dei mobili, forse dalle ossa di suo padre Carlo.\n\nQuella sera, la pioggia batteva contro i vetri delle finestre di Roma con una foga inusuale. Adam teneva tra le mani l'orologio d'oro promesso da sua madre Maria. Non si muoveva. Le lancette erano ferme alle tre e tre minuti di un giorno qualunque di dieci anni prima, l'istante esatto in cui lei era spirata.\n\nCarlo, seduto vicino al camino spento, fissava il vuoto. 'Mettilo via, Adam. Quel metallo porta solo cattivi ritorni', sussurrò senza voltarsi. Ma la curiosità di un sedicenne è un fiume in piena che non conosce dighe. Adam sentiva che dietro quel ticchettio fantasma si nascondeva l'anima stessa di sua madre."
      },
      {
        id: "c2-campanile",
        number: 2,
        title: "Il Guardiano del Tempo",
        content: "Artena sorgeva tra le rocce selvagge come una fortezza medievale dimenticata dal sole. Adam camminava lungo i vicoli ripidi pavimentati in pietra lavica scura, sentendo il peso della borsa di cuoio sulla spalla.\n\nNel vecchio e polveroso laboratorio di suo nonno, l'aria profumava di olio minerale, polvere fine e otone antico. C'erano centinaia di sveglie, pendoli e carillon accatastati sui ripiani, tutti curiosamente fermi allo stesso secondo.\n\n'Il tempo non scorre dritto, ragazzo mio', gli aveva detto una volta il vecchio orologiaio con voce roca e stanca. 'Il tempo gira su se stesso come un ingranaggio delicato. E a volte, se un dente si scheggia o si rompe, rimaniamo incastrati per sempre nello stesso identico giorno, a rivivere all'infinito lo stesso stupido dolore. Ma se trovi l'orologio regolatore... potrai riparare la ruota'. Adam estrasse l'orologio di Maria, e gli occhi stanchi del nonno si spalancarono per il terrore."
      },
      {
        id: "c3-campanile",
        number: 3,
        title: "La Regola dei Tre Passi",
        content: "Tre passi avanti, tre passi indietro. Quella era la regola misteriosa incisa sul retro dello scrigno d'acciaio nascosto sotto il tavolo da lavoro del nonno.\n\nCon dita tremanti, Adam inserì la piccola chiave d'oro nell'orologio di sua madre e iniziò a caricarlo lentamente. Udì un ronzio sommesso, un battito cardiaco artificiale che iniziò a vibrare intensamente nel palmo della sua mano.\n\nAll'improvviso, le ombre nella stanza si allungarono a dismisura, distorcendosi in sagome spaventose. Il rumore del vento fuori cessò di colpo. La pioggia si fermò a mezz'aria, gocce sospese a pochi centimetri dal vetro, come perle di cristallo fluttuanti.\n\nAdam guardò fuori dalla finestra: tutta Artena era immobile, pietrificata in un fotogramma sospeso. Aveva appena spezzato la sacra linea del presente. Ma l'orologio ora andava all'indietro, e un fischio acuto nell'aria avvertiva che il Guardiano del Paradosso stava già arrivando per cancellarlo."
      }
    ]
  },
  {
    id: "echialtrove",
    title: "PENSIERI DISPERSI",
    genre: "Poesie",
    synopsis: "Voglio guardarmi allo specchio e dire che sono solo io senza più paura di vedermi dentro, di nascondere ciò che sono davvero",
    excerpt: "Non siamo ciò che siamo, siamo ciò che gli altri dicono che siamo",
    atmosphere: "Vecchia libreria di Trieste, orologi ad acqua, polvere dorata, portali invisibili",
    coverQuery: "antique_library_dust_gold_accents",
    publishedYear: "2021",
    chapters: [
      {
        id: "c1-echialtrove",
        number: 1,
        title: "Forma",
        content: "Non siamo ciò che siamo\nma siamo ciò che gli altri dicono che siamo\n\nSiamo solo un punto\nin mezzo a mille punti\n\nNon abbiamo forma ne essenza\nma cerchiamo il nostro unico punto\n\nCerchiamo il senso nelle cose\nche non cambiano\n\nLa parte più profonda di noi rimane nascosta nel buio\nvista solo da pochi"
      },
      {
        id: "c2-echialtrove",
        number: 2,
        title: "Fenice",
        content: "Rubo il tempo oltre il passo\nche mi porta nel tuo spazio\nche si infrange con il mio respiro\n\nTutto intorno sembra bruciare su se stesso\nscavo nella cenere per trovare ciò che ho sepolto\nper farlo rinascere come una fenice libera nel cielo.\n\nI miei passi sono leggeri\nposso sentire le mie ossa che si rompono\nper la fatica di elevarsi.\n\nNon ho più paura, il fuoco arde dentro me\ndandomi il nutrimento per essere qualcos’altro\nqualcosa che sconfini nello spazio\n\nSenza ombre a consumarlo\nma semplicemente io nella mia pura essenza."
      }
    ]
  },
  {
    id: "lucciola",
    title: "LA PICCOLA LUCCIOLA",
    genre: "Urban fantasy, per ragazzi",
    synopsis: "Timothy è un ragazzo orfano, timido e un po’ impacciato passa tutto il suo tempo libero a leggeri libri di avventura e mistero. Desidera ardentemente conoscere le sue origini e il significato del bauletto lasciato dai genitori come ultimo dono prima di morire. L’arrivo di nuovi amici e il ritrovamento di alcune pietre misteriose lo aiuteranno a conoscere il suo passato e a trovare una nuova famiglia",
    excerpt: "La sera quando il buio fa accendere ogni luce e tutti si riuniscono in armonia intorno a un tavolo, li troverai colei che custodisce la gratitudine nel cuore. Affinché tu possa vedere questo dovrai imparare ad essere accogliente verso il prossimo.",
    atmosphere: "Lanterna incantata, barlumi di lucciole dorate, calore del focolare, sentimenti d'oro",
    coverQuery: "glowing_firefly_lantern_cozy_cabin",
    publishedYear: "2019",
    chapters: [
      {
        id: "c1-lucciola",
        number: 1,
        title: "Il Bauletto d'Ottone",
        content: "Timothy passava i lunghi pomeriggi invernali nella sua piccola soffitta polverosa, seduto su un baule di legno coperto da soffici coperte di lana.\n\nUn giorno, esplorando gli angoli più remoti del ripostiglio della zia, trovò un piccolo bauletto d'ottone lucido, protetto da una fitta tela di ragno. Era freddo al tatto, ma emanava un debole, rassicurante profumo di aghi di pino e resina fresca delle montagne selvagge.\n\nSul coperchio era incisa una lucciola con le ali spiegate. Timothy premette le dita sulla figura della lucciola e sentì un piccolo clic metallico. Il bauletto non si aprì del tutto, ma un barlume di polvere dorata filtrò dritto dalle fenditure esterne dell'oggetto, proiettando piccole stelle sulla parete buia."
      },
      {
        id: "c2-lucciola",
        number: 2,
        title: "I Barlumi Dorati",
        content: "Il buio della sera non faceva più paura a Timothy da quando aveva quel frammento di luce in camera. Quando arrivarono Beatrice e Leo, i suoi nuovi e bizzarri vicini, il mistero si arricchì di nuovi elementi sorprendenti.\n\nLeo teneva in mano una pietra verde scuro, ruvida all'esterno ma incredibilmente lucida sotto l'influenza della luna. Appena posarono la pietra vicino al bauletto della lucciola, le ali incise iniziarono a brillare di una luce calda come il focolare di una baita alpina.\n\n'Vedi Timothy?', sussurrò Beatrice colpita dallo stupore. 'La pietra risponde al richiamo della tua storia. Devi solo imparare ad accogliere ciò che incontri sul cammino, perché nessun orfano cammina mai davvero da solo, la foresta custodisce i segreti di chi sa guardare con occhio puro'."
      }
    ]
  }
];

export const POEMS: Poem[] = [
  {
    id: "eclissi",
    title: "Eclissi",
    category: "Riflessi di me",
    verses: [
      "Mi eclisso come il sole d’inverno",
      "unisco corpo e mente per capire questo mondo",
      "fatto solo di concetti astratti",
      "",
      "Cerco la verità in parole schiave",
      "dette da qualcuno che non sa",
      "",
      "Stiamo zitti davanti alle crudeltà",
      "ma siamo pronti a puntare il dito",
      "contro qualcosa che è diverso da noi"
    ],
    backdropCue: "sole oscurato o eclisse di luce dorata e fredda"
  },
  {
    id: "fenice",
    title: "Fenice",
    category: "Pensieri dispersi",
    verses: [
      "Rubo il tempo oltre il passo ",
      "che mi porta nel tuo spazio",
      "che si infrange con il mio respiro ",
      "",
      "Tutto intorno sembra bruciare su se stesso",
      "scavo nella cenere per trovare ciò che ho sepolto",
      "per farlo rinascere come una fenice libera nel cielo.",
      "",
      "I miei passi sono leggeri",
      "posso sentire le mie ossa che si rompono",
      "per la fatica di elevarsi.",
      "",
      "Non ho più paura, il fuoco arde dentro me",
      "dandomi il nutrimento per essere qualcos’altro ",
      "qualcosa che sconfini nello spazio",
      "",
      "Senza ombre a consumarlo",
      "ma semplicemente io nella mia pura essenza."
    ],
    backdropCue: "fenice che risorge dalle ceneri calde"
  },
  {
    id: "forma",
    title: "Forma",
    category: "Pensieri dispersi",
    verses: [
      "Non siamo ciò che siamo",
      "ma siamo ciò che gli altri dicono che siamo",
      "",
      "Siamo solo un punto",
      "in mezzo a mille punti",
      "",
      "Non abbiamo forma ne essenza",
      "ma cerchiamo il nostro unico punto",
      "",
      "Cerchiamo il senso nelle cose",
      "che non cambiano",
      "",
      "La parte più profonda di noi rimane nascosta nel buio",
      "vista solo da pochi"
    ],
    backdropCue: "una figura geometrica svelata nel buio profondo"
  }
];

export const ARTPIECES: Artpiece[] = [
  {
    id: "ore-perdute",
    title: "L'Archivio delle Ore Perdute",
    medium: "Digital Illustration & Ink Wash",
    story: "Questa opera raffigura un immenso orologio alchemico le cui lancette sono composte da rami d'ulivo secchi e fumo denso. Rappresenta il tentativo incessante di ordinare i frammenti della nostra memoria prima che svaniscano nel vento del dimenticatoio.",
    imageSeed: "alchemical_clock_ink_drawing",
    tags: ["Illustrazione", "Mistero", "Tempo"]
  },
  {
    id: "sussurri-rami",
    title: "Sussurri tra i Rami d'Inchiostro",
    medium: "Symbolic & Narrative Illustration",
    story: "Una foresta avvolta nella nebbia invernale, dove le silhouettes dei rami si intrecciano fino a formare la fisionomia di una mano protesa verso un raggio di luce argentea. Esprime la costante tensione umana tra solitudine e comunione.",
    imageSeed: "misty_forest_monochrome_silhouettes",
    tags: ["Illustrazione", "Simbolismo", "Natura"]
  },
  {
    id: "canale-mistero",
    title: "Silenzio di Pietra",
    medium: "Cinematic Mood Photography",
    story: "Scattata alle tre del mattino durante la marea autunnale, cattura l'istante in cui l'arco di un ponte in pietra si specchia nell'acqua nera immobile, creando un portale perfettamente simmetrico ad anello.",
    imageSeed: "venice_arch_bridge_night_reflection",
    tags: ["Fotografia", "Venezia", "Minimalista"]
  },
  {
    id: "penna-calamaio",
    title: "Il Custode dei Ricordi",
    medium: "Still Life Detail Photography",
    story: "La luce soffusa di una sola candela illumina la punta d'oro di un calamaio del diciannovesimo secolo, con un piccolo rivolo di inchiostro nero che penetra le fibre grezze di una lettera scritta a mano mai spedita.",
    imageSeed: "aged_parchment_pen_ink_spill",
    tags: ["Fotografia", "Strumenti", "Memoria"]
  }
];

export const BLOGPOSTS: Blogpost[] = [
  {
    id: "psicologia-segreti",
    title: "La psicologia del segreto nelle narrazioni mistery",
    date: "14 Maggio 2026",
    category: "Riflessioni e Scrittura",
    excerpt: "Un segreto non è solo un vuoto d'informazione: è una forza di gravità psicologica. Esploriamo come i personaggi si deformino attorno alle proprie ombre.",
    content: "Nelle storie di suspense, tendiamo a concentrarci sulla rivelazione finale, l'indizio nascosto, la risoluzione del puzzle. Ma il vero thriller psicologico abita nelle ore che precedono quel momento. Abita nella tensione di chi custodisce un segreto, nelle micro-fratture del comportamento quotidiano. Un personaggio timoroso di essere svelato parla meno, si muove con eccessiva precisione, evita lo specchio dell'interlocutore. Costruire la suspense significa dipingere questa invisibile gabbia psicologica.",
    readTime: "5 min"
  },
  {
    id: "arte-frammento",
    title: "L'arte del frammento: intrecciare romanzi partendo dal caos",
    date: "28 Aprile 2026",
    category: "Processo Creativo",
    excerpt: "Non scrivo mai in modo lineare. Preferisco appuntare frammenti di immagini, versi disallineati, volti intravisti sul treno, e poi unire i punti.",
    content: "C'è un'idea romantica dello scrittore che si siede alla scrivania e riversa fiumi ininterrotti di storie dall'inizio alla fine. Nella mia esperienza, la scrittura è un atto di restauro archeologico. Si trovano cocci, scaglie, brandelli sparsi di conversazioni mute. Solo in un secondo momento, mettendo insieme le tessere in un mosaico apparentemente caotico, scopro il disegno primordiale. Per questo la mia identità artistica è Frammenti d'Inchiostro: perché la vita stessa si manifesta solo a frammenti.",
    readTime: "4 min"
  }
];

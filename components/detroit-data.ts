export interface Landmark {
    id: string;
    title: string;
    description: string;
    coordinates: [number, number]; // [lng, lat]
    category: 'culture' | 'park' | 'architecture' | 'street' | 'neighborhood';
}

export const DETROIT_LANDMARKS: Landmark[] = [
    {
        id: 'dia',
        title: 'Detroit Institute of Arts (DIA)',
        description: 'Amerika\'nın en büyük ve en önemli sanat müzelerinden biridir. Özellikle Diego Rivera’nın "Detroit Industry" duvar resimleri görülmeye değerdir.',
        coordinates: [-83.0589, 42.3556],
        category: 'culture'
    },
    {
        id: 'motown',
        title: 'Motown Museum',
        description: 'Efsanevi plak şirketi Motown’un doğduğu ev. Stevie Wonder ve Michael Jackson gibi yıldızların ilk kayıtlarını yaptığı "Studio A"yı ziyaret edebilirsiniz.',
        coordinates: [-83.0885, 42.3641],
        category: 'culture'
    },
    {
        id: 'henry-ford',
        title: 'The Henry Ford Museum',
        description: 'Sadece otomobil tarihini değil, Rosa Parks’ın otobüsü ve JFK’in limuzini gibi Amerikan tarihinin dönüm noktalarını sergiler.',
        coordinates: [-83.2343, 42.3034],
        category: 'culture'
    },
    {
        id: 'belle-isle',
        title: 'Belle Isle Park',
        description: 'Detroit Nehri üzerinde bulunan bu ada parkı; akvaryumu, botanik bahçesi ve harika şehir manzarasıyla yerel halkın favorisidir.',
        coordinates: [-82.9993, 42.3377],
        category: 'park'
    },
    {
        id: 'eastern-market',
        title: 'Eastern Market',
        description: '1840\'lardan beri aktif olan, Amerika\'nın en büyük açık hava pazarlarından biri. Taze ürünler, sanat ve sokak yemekleri merkezidir.',
        coordinates: [-83.0402, 42.3486],
        category: 'culture'
    },
    {
        id: 'guardian',
        title: 'Guardian Building',
        description: '1928\'de inşa edilen bu gökdelen, "Art Deco" mimarisinin şaheseridir. Renkli çinilerle kaplı lobisini ücretsiz gezebilirsiniz.',
        coordinates: [-83.0458, 42.3297],
        category: 'architecture'
    },
    {
        id: 'mcs',
        title: 'Michigan Central Station',
        description: 'Ford tarafından restore edilen bu tarihi tren istasyonu, Corktown bölgesinin yeni teknoloji ve yaşam merkezi haline gelmiştir.',
        coordinates: [-83.0776, 42.3283],
        category: 'architecture'
    },
    {
        id: 'campus-martius',
        title: 'Campus Martius Park',
        description: 'Şehrin kalbinde yer alan bu park, kışın buz pateni, yazın plaj ve etkinlik alanı olarak hizmet verir.',
        coordinates: [-83.0464, 42.3311],
        category: 'park'
    },
    {
        id: 'woodward',
        title: 'Woodward Avenue',
        description: 'Şehrin ana damarıdır. Downtown’dan Midtown’a uzanır; mağazalar, müzeler ve tiyatrolar buradadır.',
        coordinates: [-83.0456, 42.3289],
        category: 'street'
    },
    {
        id: 'cass',
        title: 'Cass Avenue (Midtown)',
        description: 'Sanat galerileri, butik mağazalar ve restoranların bulunduğu, Midtown bölgesinin canlı caddesi.',
        coordinates: [-83.0645, 42.3456],
        category: 'street'
    },
    {
        id: 'michigan-ave',
        title: 'Michigan Avenue (Corktown)',
        description: 'Şehrin en eski bölgesi olan Corktown’un kalbidir. Tarihi dokusu ve ünlü restoranlarıyla bilinir.',
        coordinates: [-83.0642, 42.3317],
        category: 'street'
    },
    {
        id: 'monroe',
        title: 'Monroe Street (Greektown)',
        description: 'Gece hayatı, kumarhaneler ve geleneksel Yunan restoranları ile ünlü Greektown caddesi.',
        coordinates: [-83.0423, 42.3340],
        category: 'street'
    },
    {
        id: 'jefferson',
        title: 'Jefferson Avenue',
        description: 'Nehir kıyısı boyunca uzanan, harika Kanada manzaralarına sahip geniş cadde.',
        coordinates: [-83.0373, 42.3303],
        category: 'street'
    },
    {
        id: 'downtown',
        title: 'Downtown Detroit',
        description: 'Gökdelenler, Comerica Park, Ford Field ve nehir kenarı yürüyüş yolu (Riverwalk) buradadır.',
        coordinates: [-83.0481, 42.3384],
        category: 'neighborhood'
    },
    {
        id: 'heidelberg',
        title: 'Heidelberg Project',
        description: 'Evlerin ve sokakların sanat eserine dönüştürüldüğü dünyaca ünlü açık hava sanat enstalasyonu.',
        coordinates: [-83.0242, 42.3582],
        category: 'culture'
    }
];

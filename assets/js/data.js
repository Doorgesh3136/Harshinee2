/* =============================================================================
   Harshinee: shop data. Edit sarees, looks and contact details here.
   Photos are Unsplash photo IDs. To use your own photos, put them in
   assets/img/ and change HS.IMG to return 'assets/img/' + id.
   ============================================================================= */
window.HS = window.HS || {};

HS.SHOP = {
    name: 'Harshinee',
    full: 'Harshinee Fashion',
    whatsapp: '23057990933',
    whatsappLabel: '5799 0933',
    phones: [['5254 7777', '+23052547777'], ['418 2082', '+2304182082']],
    boutiques: [
        { name: 'Royal Road, Lallmatie', map: 'https://www.google.com/maps/search/?api=1&query=Harshinee+Fashion+Royal+Road+Lallmatie+Mauritius' },
        { name: "Bypass, St Julien d'Hotman", map: 'https://www.google.com/maps/search/?api=1&query=Harshinee+Fashion+St+Julien+d%27Hotman+Mauritius', isNew: true }
    ],
    social: [
        ['Facebook', 'https://www.facebook.com/harshineefashionofficial/', '40K+'],
        ['TikTok', 'https://www.tiktok.com/@harshineefashionofficial', '16K+'],
        ['Instagram', 'https://www.instagram.com/harshineefashionofficial/', '13K']
    ]
};

HS.IMG = (id, w = 800, h) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=78`;

/* Filters on the shop page. A filter matches a saree's fabric, occasion or kind. */
HS.FILTERS = [
    ['all', 'All'],
    ['banarasi', 'Banarasi'],
    ['kanjeevaram', 'Kanjeevaram'],
    ['silk', 'Soft silk'],
    ['organza', 'Organza & tissue'],
    ['georgette', 'Georgette'],
    ['chiffon', 'Chiffon'],
    ['handloom', 'Handloom cotton'],
    ['bridal', 'Bridal'],
    ['jewellery', 'Jewellery']
];
HS.FABRIC = {
    banarasi: 'Banarasi silk', kanjeevaram: 'Kanjeevaram silk', silk: 'Soft silk', organza: 'Organza & tissue',
    georgette: 'Georgette', chiffon: 'Chiffon', handloom: 'Handloom cotton', velvet: 'Silk velvet', jewellery: 'Jewellery'
};

/* id, name, kind (saree | jewellery), fabric, occasion, price (Rs), photo, second photo, tag, description */
HS.PRODUCTS = [
    ['panna-emerald-banarasi', 'Emerald Banarasi Silk Saree', 'saree', 'banarasi', 'festive', 6900, '1756483492198-8ca91227489b', '', 'Look 01',
        'Pure silk from the looms of Varanasi, with a gold zari border and a heavy woven pallu. Styled with an ornate contrast blouse.'],
    ['chandni-ivory-ruffle', 'Ivory Ruffle Georgette Saree', 'saree', 'georgette', 'party', 4200, '1756483510889-dd6c3d9e0a17', '', 'Look 02',
        'Featherlight georgette in ivory and tan, finished with cascading ruffles that move with every step.'],
    ['rani-red-velvet-bridal', 'Rani Red Velvet Bridal Saree', 'saree', 'velvet', 'bridal', 18900, '1756483496916-5ebab85028df', '', 'Look 03',
        'Deep red silk velvet worked by hand with dense gold zardozi. Made for the wedding day and the photographs after.'],
    ['kora-ivory-embroidered', 'Ivory Embroidered Silk Saree', 'saree', 'silk', 'festive', 5600, '1787753650890-bae0eb536cf5', '1787753650891-c6e2625071df', 'Look 04',
        'Cream silk with tonal floral embroidery along the border, worn with a red silk blouse.'],
    ['shubhra-pearl-white', 'Pearl White Embellished Saree', 'saree', 'organza', 'party', 7800, '1756483510837-e79455e52188', '', 'Look 05',
        'Sheer white organza scattered with pearl and sequin work. Quietly dramatic for receptions and evening functions.'],
    ['gulabi-rose-chiffon', 'Rose Pink Chiffon Saree', 'saree', 'chiffon', 'party', 3400, '1729101146067-4432849b7029', '', 'Look 06',
        'Soft rose chiffon that pleats beautifully and stays light through a long day of celebrations.'],

    ['red-banarasi', 'Red Banarasi Silk Saree', 'saree', 'banarasi', 'festive', 4500, '1610030469983-98e550d6193c', '', 'Bestseller',
        'A classic red Banarasi with a woven gold border. The saree every wardrobe needs once.'],
    ['purple-silver-banarasi', 'Purple & Silver Banarasi Saree', 'saree', 'banarasi', 'festive', 5200, '1698657169585-0fce00d3ad9c', '', '',
        'Royal purple silk with silver zari buttis across the body and a rich silver pallu.'],
    ['purple-gold-kanjeevaram', 'Purple & Gold Kanjeevaram Saree', 'saree', 'kanjeevaram', 'festive', 6500, '1641699862936-be9f49b1c38d', '', 'New',
        'Heavy mulberry silk from Kanchipuram with a contrast gold temple border.'],
    ['sindoor-red-silk', 'Sindoor Red Kanjeevaram Saree', 'saree', 'kanjeevaram', 'bridal', 5900, '1710449823856-b04144b66b8a', '', '',
        'Sindoor red silk with a fine gold border. A favourite for the haldi, the wedding and every puja after.'],
    ['temple-border-kanjeevaram', 'Red & Gold Temple Border Kanjeevaram', 'saree', 'kanjeevaram', 'bridal', 8900, '1732850195162-32afc5726455', '', 'Bridal',
        'Bridal Kanjeevaram with a wide temple border and a pallu woven solid in gold.'],
    ['coral-soft-silk', 'Coral Soft Silk Saree', 'saree', 'silk', 'festive', 2900, '1617627143750-d86bc21e42bb', '', '',
        'Pink and orange soft silk with a gold border. Light to wear, easy to drape.'],
    ['wedding-guest-silk', 'Wedding Guest Silk Saree', 'saree', 'silk', 'festive', 3500, '1727430228383-aa1fb59db8bf', '', '',
        'A rich festive silk that looks right at every wedding you are invited to this season.'],
    ['jade-tissue', 'Jade Embroidered Tissue Saree', 'saree', 'organza', 'festive', 5400, '1756483510818-060b42c7cecc', '', 'New',
        'Jade tissue with a shimmer in the weave and embroidery along the pallu.'],
    ['moonlight-organza', 'Moonlight White Organza Saree', 'saree', 'organza', 'party', 3900, '1670955108982-921a94cbe35f', '', '',
        'Crisp white organza that holds its pleats and catches the light.'],
    ['green-ruffle-gold', 'Green Ruffle Saree with Gold Trim', 'saree', 'georgette', 'party', 4600, '1756483509177-bbabd67a3234', '', '',
        'Bottle green georgette with soft ruffles edged in gold.'],
    ['scarlet-party', 'Scarlet Party Saree', 'saree', 'georgette', 'party', 3200, '1610030469668-8e9f641aaf27', '', '',
        'Scarlet georgette with a shimmer border, made for sangeet nights.'],
    ['printed-georgette', 'Printed Georgette Saree', 'saree', 'georgette', 'everyday', 1900, '1769275061202-cf3ef67d7279', '', '',
        'An easy printed georgette for office, temple and family lunches.'],
    ['red-floral-chiffon', 'Red Floral Chiffon Saree', 'saree', 'chiffon', 'party', 2500, '1610047520958-b42ebcd2f6cb', '', '',
        'Red chiffon covered in florals, light enough for the summer wedding season.'],
    ['lilac-floral-chiffon', 'Lilac Floral Chiffon Saree', 'saree', 'chiffon', 'everyday', 2700, '1610189026297-df356264479c', '', '',
        'Purple and white florals on flowing chiffon.'],
    ['laal-paar-tant', 'Laal Paar Bengal Tant Saree', 'saree', 'handloom', 'festive', 2200, '1726076584498-2064363f8b5a', '', 'Handloom',
        'The classic white Bengal cotton with a red border, worn for Durga Puja and every celebration after.'],
    ['marigold-handloom', 'Marigold Handloom Cotton Saree', 'saree', 'handloom', 'everyday', 1800, '1612273882937-44c5313400e5', '', '',
        'Yellow and purple handloom cotton that softens with every wash.'],
    ['mehendi-cotton', 'Mehendi Green Cotton Saree', 'saree', 'handloom', 'everyday', 1600, '1770838447151-05a876cdee3d', '', '',
        'Cool green cotton for warm days, with a woven border.'],
    ['indigo-mulmul', 'Indigo & White Mulmul Saree', 'saree', 'handloom', 'everyday', 1900, '1739429942576-61aa75c97403', '', '',
        'Soft mulmul cotton in indigo and white. Breathes in the Mauritian heat.'],

    ['antique-jhumkas', 'Antique Gold Jhumkas', 'jewellery', 'jewellery', 'festive', 1450, '1714733831162-0a6e849141be', '', '',
        'Antique finish bell jhumkas with fine filigree. Light enough to wear all evening.'],
    ['gold-beaded-bracelet', 'Gold Beaded Bracelet', 'jewellery', 'jewellery', 'party', 980, '1616756141603-6d37d5cde2a2', '', '',
        'Gold and silver beads on a soft stretch, made to stack with bangles.'],
    ['bridal-bangle-set', 'Bridal Bangle Set', 'jewellery', 'jewellery', 'bridal', 2200, '1612945578381-6481cdd73b0a', '', 'Bridal',
        'A full set of red and gold bridal bangles for both wrists.'],
    ['oxidised-silver-necklace', 'Oxidised Silver Necklace', 'jewellery', 'jewellery', 'festive', 3200, '1616756351484-798f37bdffa0', '', '',
        'A statement silver necklace that sits beautifully with ivory and cotton sarees.'],
    ['turquoise-pearl-set', 'Turquoise & Pearl Silver Set', 'jewellery', 'jewellery', 'party', 2600, '1767971958465-16d986fad8df', '', '',
        'Silver set with turquoise and pearl accents, for pastel and white drapes.'],
    ['glass-bangle-stack', 'Glass Bangle Stack', 'jewellery', 'jewellery', 'everyday', 450, '1709456533985-254ebb7b00db', '', '',
        'A colourful stack of glass bangles. Mix with gold for festive days.']
].map(r => ({
    id: r[0], name: r[1], kind: r[2], fabric: r[3], occasion: r[4], price: r[5], img: r[6], img2: r[7], tag: r[8], text: r[9]
}));

/* The six runway looks, in order. pos is the focal point of the photo. */
HS.LOOKS = [
    { name: 'Panna', title: 'Emerald Banarasi', img: '1756483492198-8ca91227489b', pos: '50% 22%', pieces: ['panna-emerald-banarasi', 'antique-jhumkas'],
      story: 'Emerald silk from Varanasi, worn the old way with an ornate blouse and antique gold at the ears.' },
    { name: 'Chandni', title: 'Ivory Ruffle', img: '1756483510889-dd6c3d9e0a17', pos: '50% 22%', pieces: ['chandni-ivory-ruffle', 'gold-beaded-bracelet'],
      story: 'Moonlight in georgette. Ruffles fall from the pallu and the whole drape moves like water.' },
    { name: 'Rani', title: 'Red Velvet Bridal', img: '1756483496916-5ebab85028df', pos: '50% 20%', pieces: ['rani-red-velvet-bridal', 'bridal-bangle-set'],
      story: 'For the bride. Red silk velvet, hand embroidered in gold zardozi, finished with a full set of bridal bangles.' },
    { name: 'Kora', title: 'Ivory Embroidered', img: '1787753650890-bae0eb536cf5', pos: '50% 25%', pieces: ['kora-ivory-embroidered', 'oxidised-silver-necklace'],
      story: 'Cream silk, a red blouse and old silver. Simple pieces that make a strong look together.' },
    { name: 'Shubhra', title: 'Pearl White', img: '1756483510837-e79455e52188', pos: '50% 20%', pieces: ['shubhra-pearl-white', 'turquoise-pearl-set'],
      story: 'White organza scattered with pearls, for receptions that run late into the night.' },
    { name: 'Gulabi', title: 'Rose Chiffon', img: '1729101146067-4432849b7029', pos: '50% 22%', pieces: ['gulabi-rose-chiffon', 'glass-bangle-stack'],
      story: 'Rose chiffon and a stack of glass bangles. Light, bright and made for dancing.' }
];

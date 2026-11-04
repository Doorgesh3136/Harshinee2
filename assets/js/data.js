/* =============================================================================
   Harshinee: shop data. Edit products, looks and contact details here.
   Photos are Unsplash photo IDs, the same photos as the main-branch site.
   To use your own photos, put them in assets/img/ and change HS.IMG to
   return 'assets/img/' + id.
   ============================================================================= */
window.HS = window.HS || {};

HS.SHOP = {
    name: 'Harshinee',
    full: 'Harshinee Fashion',
    whatsapp: '23057990933'
};

HS.IMG = (id, w = 800, h) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}&crop=top` : ''}&q=78`;

/* Filters on the shop page (the key is a product's category) */
HS.FILTERS = [
    ['all', 'All'],
    ['saree', 'Sarees'],
    ['bridal', 'Bridal lehengas'],
    ['lehenga', 'Party lehengas'],
    ['gown', 'Gowns & anarkalis'],
    ['groom', 'Groom sherwanis'],
    ['men', "Men's kurtas"]
];
HS.FABRIC = {
    saree: 'Saree', bridal: 'Bridal lehenga', lehenga: 'Party lehenga', gown: 'Gown & anarkali', groom: 'Groom sherwani', men: "Men's kurta"
};

/* id, name, kind (saree | outfit), category, occasion, price (Rs), photo, second photo, tag, description */
HS.PRODUCTS = [
    ["red-banarasi-silk-saree", "Red Banarasi Silk Saree", 'saree', 'saree', '', 4500, '1610030469983-98e550d6193c', '1610030469668-8e9f641aaf27', "Bestseller",
        "Pure silk from the looms of Varanasi with a woven gold zari border. The red saree every wardrobe needs once."],
    ["emerald-silk-saree", "Emerald Silk Saree", 'saree', 'saree', '', 3900, '1679006831648-7c9ea12e5807', '1727430228383-aa1fb59db8bf', "",
        "Deep emerald silk with a fine gold border that catches the light at every step."],
    ["purple-gold-kanjeevaram-saree", "Purple & Gold Kanjeevaram Saree", 'saree', 'saree', '', 6500, '1641699862936-be9f49b1c38d', '1610030469983-98e550d6193c', "New",
        "Heavy silk from Kanchipuram in royal purple with a rich gold border and pallu."],
    ["coral-silk-saree", "Coral Silk Saree", 'saree', 'saree', '', 2900, '1617627143750-d86bc21e42bb', '1769275061202-cf3ef67d7279', "",
        "Soft coral silk with a gold border. Light to wear and easy to drape."],
    ["printed-georgette-saree", "Printed Georgette Saree", 'saree', 'saree', '', 1900, '1769275061202-cf3ef67d7279', '1617627143750-d86bc21e42bb', "",
        "An easy printed georgette for office, temple and family lunches."],
    ["wedding-guest-saree", "Wedding Guest Saree", 'saree', 'saree', '', 3500, '1727430228383-aa1fb59db8bf', '1679006831648-7c9ea12e5807', "",
        "A rich festive saree that looks right at every wedding you are invited to this season."],
    ["red-floral-saree", "Red Floral Saree", 'saree', 'saree', '', 2500, '1610047520958-b42ebcd2f6cb', '1610030469668-8e9f641aaf27', "",
        "Red florals on a flowing drape, light enough for the summer wedding season."],
    ["scarlet-party-saree", "Scarlet Party Saree", 'saree', 'saree', '', 3200, '1610030469668-8e9f641aaf27', '1610047520958-b42ebcd2f6cb', "",
        "Scarlet with a shimmer border, made for sangeet nights."],
    ["crimson-zari-bridal-lehenga", "Crimson Zari Bridal Lehenga", 'outfit', 'bridal', 'bridal', 18500, '1721324807083-e9ddaa99310e', '1654764746225-e63f5e90facd', "Bestseller",
        "A bridal lehenga made for the wedding day: heavy work, a full flare and a matching dupatta."],
    ["royal-red-bridal-lehenga", "Royal Red Bridal Lehenga", 'outfit', 'bridal', 'bridal', 21900, '1610047614301-13c63f00c032', '1610047614256-023d7c028d0b', "New",
        "A bridal lehenga made for the wedding day: heavy work, a full flare and a matching dupatta."],
    ["wine-velvet-bridal-lehenga", "Wine Velvet Bridal Lehenga", 'outfit', 'bridal', 'bridal', 24500, '1740674570259-a47d713a2976', '1677691257363-eebd2abeafec', "",
        "A bridal lehenga made for the wedding day: heavy work, a full flare and a matching dupatta."],
    ["red-gold-bridal-set", "Red & Gold Bridal Set", 'outfit', 'bridal', 'bridal', 16900, '1677691257363-eebd2abeafec', '1707576618343-26a1b377ca7a', "",
        "A bridal lehenga made for the wedding day: heavy work, a full flare and a matching dupatta."],
    ["rose-bridal-lehenga", "Rose Bridal Lehenga", 'outfit', 'bridal', 'bridal', 19500, '1629118477133-b8b1499f2b8a', '1662714802102-9825504458ca', "",
        "A bridal lehenga made for the wedding day: heavy work, a full flare and a matching dupatta."],
    ["maroon-embroidered-bridal-lehenga", "Maroon Embroidered Bridal Lehenga", 'outfit', 'bridal', 'bridal', 14900, '1707576618343-26a1b377ca7a', '1737514996816-a034a795febe', "",
        "A bridal lehenga made for the wedding day: heavy work, a full flare and a matching dupatta."],
    ["ivory-red-bridal-lehenga", "Ivory & Red Bridal Lehenga", 'outfit', 'bridal', 'bridal', 22500, '1737514996816-a034a795febe', '1610047614301-13c63f00c032', "New",
        "A bridal lehenga made for the wedding day: heavy work, a full flare and a matching dupatta."],
    ["heritage-red-bridal-lehenga", "Heritage Red Bridal Lehenga", 'outfit', 'bridal', 'bridal', 12900, '1662714802102-9825504458ca', '1721324807083-e9ddaa99310e', "",
        "A bridal lehenga made for the wedding day: heavy work, a full flare and a matching dupatta."],
    ["pink-mirror-work-lehenga", "Pink Mirror-Work Lehenga", 'outfit', 'lehenga', '', 5900, '1733937140732-2cc70a1d7017', '1746372283841-dbb3838f9935', "New",
        "A festive lehenga for sangeet, mehendi and wedding-guest days, with a matching dupatta."],
    ["maroon-sequin-lehenga", "Maroon Sequin Lehenga", 'outfit', 'lehenga', '', 6500, '1756483488645-5973a1a92e33', '1610047614222-d33c39abfab2', "Bestseller",
        "A festive lehenga for sangeet, mehendi and wedding-guest days, with a matching dupatta."],
    ["lavender-floral-lehenga", "Lavender Floral Lehenga", 'outfit', 'lehenga', '', 4500, '1617039487629-6babdcb2a24b', '1733937140732-2cc70a1d7017', "",
        "A festive lehenga for sangeet, mehendi and wedding-guest days, with a matching dupatta."],
    ["mustard-bandhani-lehenga", "Mustard Bandhani Lehenga", 'outfit', 'lehenga', '', 3900, '1746372283841-dbb3838f9935', '1668371459824-094a960a227d', "",
        "A festive lehenga for sangeet, mehendi and wedding-guest days, with a matching dupatta."],
    ["red-festive-lehenga", "Red Festive Lehenga", 'outfit', 'lehenga', '', 4900, '1610047614222-d33c39abfab2', '1756483488645-5973a1a92e33', "",
        "A festive lehenga for sangeet, mehendi and wedding-guest days, with a matching dupatta."],
    ["rust-silk-lehenga", "Rust Silk Lehenga", 'outfit', 'lehenga', '', 3500, '1668371459824-094a960a227d', '1617039487629-6babdcb2a24b', "",
        "A festive lehenga for sangeet, mehendi and wedding-guest days, with a matching dupatta."],
    ["black-gold-anarkali", "Black & Gold Anarkali", 'outfit', 'gown', '', 4900, '1761571260010-8aa90a08c934', '1610202305255-746aa5b971c4', "New",
        "A floor-length piece with an easy fit, made for receptions and family celebrations."],
    ["red-embroidered-anarkali", "Red Embroidered Anarkali", 'outfit', 'gown', '', 4200, '1610202305255-746aa5b971c4', '1638457130899-121a2dc59513', "",
        "A floor-length piece with an easy fit, made for receptions and family celebrations."],
    ["blush-pink-anarkali-gown", "Blush Pink Anarkali Gown", 'outfit', 'gown', '', 3800, '1669195987863-f935f728e41b', '1649139798873-683a18de1151', "Bestseller",
        "A floor-length piece with an easy fit, made for receptions and family celebrations."],
    ["powder-blue-gown", "Powder Blue Gown", 'outfit', 'gown', '', 3500, '1616583936499-d4116e7e2e76', '1678536517273-f1ec164966ea', "",
        "A floor-length piece with an easy fit, made for receptions and family celebrations."],
    ["ivory-flared-gown", "Ivory Flared Gown", 'outfit', 'gown', '', 4500, '1678536517273-f1ec164966ea', '1744833341427-6f2b4eac91ff', "",
        "A floor-length piece with an easy fit, made for receptions and family celebrations."],
    ["sage-embellished-gown", "Sage Embellished Gown", 'outfit', 'gown', '', 5200, '1744833341427-6f2b4eac91ff', '1756483509254-3cc48a5a15b2', "",
        "A floor-length piece with an easy fit, made for receptions and family celebrations."],
    ["pink-festive-suit", "Pink Festive Suit", 'outfit', 'gown', '', 2800, '1649139798873-683a18de1151', '1669195987863-f935f728e41b', "",
        "A floor-length piece with an easy fit, made for receptions and family celebrations."],
    ["red-party-anarkali", "Red Party Anarkali", 'outfit', 'gown', '', 3900, '1638457130899-121a2dc59513', '1610202305255-746aa5b971c4', "",
        "A floor-length piece with an easy fit, made for receptions and family celebrations."],
    ["ivory-embroidered-groom-sherwani", "Ivory Embroidered Groom Sherwani", 'outfit', 'groom', 'bridal', 12900, '1760080838961-4208536db385', '1678805408312-04e5fd7a9dcc', "Groom",
        "A groom sherwani cut to sit sharp all day, ready to pair with a stole and mojaris."],
    ["royal-maroon-sherwani-set", "Royal Maroon Sherwani Set", 'outfit', 'groom', 'bridal', 14500, '1576470189712-50fe3ec06b04', '1759906766080-82b785c61f51', "Bestseller",
        "A groom sherwani cut to sit sharp all day, ready to pair with a stole and mojaris."],
    ["complete-groom-sherwani-with-safa", "Complete Groom Sherwani with Safa", 'outfit', 'groom', 'bridal', 15900, '1759906766080-82b785c61f51', '1760080838961-4208536db385', "",
        "A groom sherwani cut to sit sharp all day, ready to pair with a stole and mojaris."],
    ["navy-sherwani", "Navy Sherwani", 'outfit', 'groom', 'bridal', 9900, '1534217466718-ef4950786e24', '1729347917808-e3e35a462fec', "",
        "A groom sherwani cut to sit sharp all day, ready to pair with a stole and mojaris."],
    ["white-floral-sherwani", "White Floral Sherwani", 'outfit', 'groom', 'bridal', 8500, '1678805408312-04e5fd7a9dcc', '1534217466718-ef4950786e24', "",
        "A groom sherwani cut to sit sharp all day, ready to pair with a stole and mojaris."],
    ["green-embroidered-kurta-set", "Green Embroidered Kurta Set", 'outfit', 'men', '', 2500, '1727835523545-70ee992b5763', '1727835523550-18478cacefa2', "",
        "Men's festive wear for weddings, pujas and every family function."],
    ["yellow-festive-kurta", "Yellow Festive Kurta", 'outfit', 'men', '', 1900, '1768807478320-fcfd3929acb2', '1768807478287-9e7953cfdca3', "New",
        "Men's festive wear for weddings, pujas and every family function."],
    ["blue-kurta-with-jacket", "Blue Kurta with Jacket", 'outfit', 'men', '', 3500, '1767775498862-d4740ce574ce', '1768807478320-fcfd3929acb2', "Bestseller",
        "Men's festive wear for weddings, pujas and every family function."],
    ["black-kurta-pyjama", "Black Kurta Pyjama", 'outfit', 'men', '', 2200, '1711044871601-301f9b0ecf91', '1744551358303-46edae8b374b', "",
        "Men's festive wear for weddings, pujas and every family function."],
    ["ivory-indo-western-set", "Ivory Indo-Western Set", 'outfit', 'men', '', 6500, '1729347917808-e3e35a462fec', '1727835523550-18478cacefa2', "",
        "Men's festive wear for weddings, pujas and every family function."]
].map(r => ({
    id: r[0], name: r[1], kind: r[2], fabric: r[3], occasion: r[4], price: r[5], img: r[6], img2: r[7], tag: r[8], text: r[9]
}));

/* The six runway looks, in order. pos is the focal point of the photo; pieces are the two items shown in the rail. */
HS.LOOKS = [
    { name: 'Lal', title: 'Red Banarasi', img: '1610030469983-98e550d6193c', pos: '50% 18%', pieces: ['red-banarasi-silk-saree', 'scarlet-party-saree'],
      story: 'Red silk from Varanasi with a gold zari border. The saree of weddings, worn the classic way.' },
    { name: 'Panna', title: 'Emerald Silk', img: '1679006831648-7c9ea12e5807', pos: '50% 18%', pieces: ['emerald-silk-saree', 'printed-georgette-saree'],
      story: 'Emerald silk with a fine gold border, for the wedding guest who wants to be remembered.' },
    { name: 'Rani', title: 'Purple Kanjeevaram', img: '1641699862936-be9f49b1c38d', pos: '50% 18%', pieces: ['purple-gold-kanjeevaram-saree', 'crimson-zari-bridal-lehenga'],
      story: 'Heavy Kanchipuram silk in royal purple and gold. A saree with the presence of a bridal lehenga.' },
    { name: 'Gulabi', title: 'Coral Silk', img: '1617627143750-d86bc21e42bb', pos: '50% 18%', pieces: ['coral-silk-saree', 'pink-mirror-work-lehenga'],
      story: 'Coral and pink with gold at the border, made for haldi mornings and garden functions.' },
    { name: 'Utsav', title: 'Festive Silk', img: '1727430228383-aa1fb59db8bf', pos: '50% 18%', pieces: ['wedding-guest-saree', 'blush-pink-anarkali-gown'],
      story: 'A rich festive drape for the reception, the sangeet and every celebration in between.' },
    { name: 'Phool', title: 'Red Floral', img: '1610047520958-b42ebcd2f6cb', pos: '50% 18%', pieces: ['red-floral-saree', 'red-embroidered-anarkali'],
      story: 'Red florals on a light, flowing drape. Easy to wear from the first ceremony to the last dance.' }
];

import { heroImage } from './siteData';

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  h1: string;
  heroIntro: string;
  openingCopy: string;
  sectionTitle: string;
  sectionParagraphs: string[];
  detailsTitle: string;
  detailsParagraphs: string[];
  imageSrc: string;
  imageAlt: string;
  relatedLinks: Array<{
    href: string;
    label: string;
  }>;
};

export const siteUrl = 'https://www.luscious-lox.com';

export const homeSeo = {
  title: 'Hair Extensions & Hair Salon Neutral Bay | Luscious Lox',
  description:
    'Luscious Lox is a luxury hair salon in Neutral Bay specialising in nano extensions, tape extensions, balayage, colour, keratin treatments and styling.',
  canonical: `${siteUrl}/`,
};

export const hairSalonSchema = {
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  name: 'Luscious Lox',
  url: `${siteUrl}/`,
  telephone: '+61416595902',
  email: 'contact@lusciouslox.co.au',
  priceRange: '$$$',
  sameAs: ['https://www.instagram.com/lusciousloxhairboutique'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '156 Wycombe Rd',
    addressLocality: 'Neutral Bay',
    addressRegion: 'NSW',
    postalCode: '2089',
    addressCountry: 'AU',
  },
  areaServed: ['Neutral Bay', 'Mosman', 'Cammeray', 'Cremorne', 'North Sydney', 'Lower North Shore', 'Sydney'],
  makesOffer: [
    {
      '@type': 'Offer',
      name: 'Keratin Nanoplasty Special',
      description: 'Keratin nanoplasty smoothing treatment - half price for a limited time. Silky, frizz-free, glossy hair.',
      price: '200',
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer',
      name: 'Mobile Home Hair Services',
      description: 'Home visit hair services from colour to hair extensions, available 7 days a week including weekends.',
      availability: 'https://schema.org/InStock',
    },
  ],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Monday', opens: '10:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '10:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '10:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '10:00', closes: '19:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '10:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '16:00' },
  ],
};

export const seoPages: Record<string, SeoPage> = {
  '/hair-salon-neutral-bay': {
    path: '/hair-salon-neutral-bay',
    title: 'Hair Salon Neutral Bay | Luscious Lox',
    description:
      'Looking for a hair salon in Neutral Bay? Luscious Lox offers premium hair extensions, balayage, colour, keratin treatments, blow drys and styling.',
    h1: 'Hair Salon Neutral Bay',
    heroIntro:
      'Luscious Lox is a luxury hair salon in Neutral Bay, specialising in premium nano extensions, tape extensions, balayage, colour, keratin treatments, blow drys and styling.',
    openingCopy:
      'Located at 156 Wycombe Rd, Neutral Bay NSW 2089, our salon offers personalised consultations and seamless, natural-looking hair transformations using premium Remy human hair.',
    sectionTitle: 'A Neutral Bay salon focused on personalised results',
    sectionParagraphs: [
      'Every appointment starts with a detailed consultation so we can understand your hair goals, assess your natural hair, and recommend the right colour, treatment, or extension method for long-term wear.',
      'Clients visit Luscious Lox for precision colour work, glossy balayage, smoothing keratin treatments, event-ready styling, and extension applications designed to look soft, natural, and easy to maintain.',
      'If you are searching for a hairdresser in Neutral Bay who prioritises both luxury service and wearable results, our boutique salon offers a calm one-on-one experience close to Cremorne, North Sydney, and the Lower North Shore.',
    ],
    detailsTitle: 'What to expect at Luscious Lox',
    detailsParagraphs: [
      'We specialise in premium nano and tape extensions, balayage, colour correction, keratin smoothing, and polished blow dry styling for everyday wear or special occasions.',
      'Our salon uses premium Remy human hair for extensions and takes time to colour match, plan placement, and protect the condition of your natural hair.',
      'You can book a consultation through our homepage contact section or call the salon directly to discuss availability and the right service for your next visit.',
    ],
    imageSrc: '/lusciouslox/front.webp',
    imageAlt: 'Luscious Lox salon exterior in Neutral Bay',
    relatedLinks: [
      { href: '/hair-extensions-neutral-bay', label: 'Explore hair extensions in Neutral Bay' },
      { href: '/balayage-neutral-bay', label: 'See balayage services in Neutral Bay' },
    ],
  },
  '/hair-extensions-neutral-bay': {
    path: '/hair-extensions-neutral-bay',
    title: 'Hair Extensions Neutral Bay | Luscious Lox',
    description:
      'Discover premium hair extensions in Neutral Bay at Luscious Lox. We specialise in seamless nano extensions, tape extensions, colour matching and personalised consultations.',
    h1: 'Hair Extensions Neutral Bay',
    heroIntro:
      'Luscious Lox provides luxury hair extensions in Neutral Bay, Sydney, with personalised consultations, premium Remy human hair, and seamless blends designed for natural movement and comfort.',
    openingCopy:
      'Whether you want extra length, fuller volume, or a complete transformation, we recommend the right method for your hair type, lifestyle, and maintenance routine so your result feels effortless to wear.',
    sectionTitle: 'Seamless extension work for natural-looking volume and length',
    sectionParagraphs: [
      'Our extension appointments focus on colour matching, placement, and hair health so your final result feels balanced, lightweight, and believable from every angle.',
      'Clients across Neutral Bay choose Luscious Lox for premium extension work because we tailor each install around your density, haircut, desired finish, and how often you can return for maintenance.',
      'We work with both nano and tape methods, giving you expert guidance on which option suits your styling habits, scalp sensitivity, and long-term extension goals.',
    ],
    detailsTitle: 'Why clients book extension consultations with us',
    detailsParagraphs: [
      'Nano extensions are ideal when you want discreet attachment points and flexible placement through finer or more detailed areas.',
      'Tape extensions are a great option for fast volume and a smooth, flat finish that works beautifully through medium to thicker hair.',
      'If you are unsure which method is right for you, visit our homepage services section or contact the salon for a consultation in Neutral Bay.',
    ],
    imageSrc: heroImage,
    imageAlt: 'Long seamless hair extensions styled at Luscious Lox',
    relatedLinks: [
      { href: '/nano-hair-extensions-neutral-bay', label: 'Learn about nano hair extensions' },
      { href: '/tape-extensions-neutral-bay', label: 'Learn about tape extensions' },
    ],
  },
  '/balayage-neutral-bay': {
    path: '/balayage-neutral-bay',
    title: 'Balayage Neutral Bay | Luscious Lox',
    description:
      'Book balayage in Neutral Bay with Luscious Lox. We create soft, dimensional colour with personalised toning, glossing and styling for a polished salon finish.',
    h1: 'Balayage Neutral Bay',
    heroIntro:
      'Luscious Lox offers balayage in Neutral Bay for clients who want dimensional colour, soft grow-out, and a polished finish tailored to their complexion, haircut, and maintenance preferences.',
    openingCopy:
      'From brighter face-framing pieces to creamy blondes and rich brunette ribbons, we customise every balayage service to keep your colour wearable, glossy, and easy to maintain between appointments.',
    sectionTitle: 'Dimensional colour with a softer grow-out',
    sectionParagraphs: [
      'Balayage is ideal if you want a more natural-looking colour service that grows out softly without a harsh regrowth line.',
      'At Luscious Lox, each balayage appointment in Neutral Bay includes a consultation around tone, placement, brightness, and aftercare so your result complements both your features and your lifestyle.',
      'We can combine balayage with glossing, cutting, styling, or extension work when you want extra movement and depth through the mid-lengths and ends.',
    ],
    detailsTitle: 'Balayage designed around your finish',
    detailsParagraphs: [
      'Some clients want subtle lived-in colour, while others want a brighter statement result with clean ribbons and stronger contrast around the face.',
      'We plan your balayage around hair condition and maintenance, helping you keep tone and shine between appointments with the right salon and home care.',
      'Use the homepage booking section to request a colour consultation, or call the salon if you want guidance on balayage, glossing, or colour correction.',
    ],
    imageSrc: '/lusciouslox/neutral-bay-1.webp',
    imageAlt: 'Balayage result created by Luscious Lox in Neutral Bay',
    relatedLinks: [
      { href: '/hair-salon-neutral-bay', label: 'Visit our Neutral Bay salon page' },
      { href: '/keratin-treatment-neutral-bay', label: 'Pair balayage with keratin smoothing' },
    ],
  },
  '/tape-extensions-neutral-bay': {
    path: '/tape-extensions-neutral-bay',
    title: 'Tape Extensions Neutral Bay | Luscious Lox',
    description:
      'Looking for tape extensions in Neutral Bay? Luscious Lox offers premium tape-in hair extensions with seamless colour matching, natural movement and expert fitting.',
    h1: 'Tape Extensions Neutral Bay',
    heroIntro:
      'Luscious Lox specialises in tape extensions in Neutral Bay, creating lightweight, flat-lay installs that add length and fullness while keeping the finish smooth, soft, and natural.',
    openingCopy:
      'Tape extensions are a popular option for clients who want fast volume, comfortable wear, and a clean result that sits close to the head for easy styling and everyday versatility.',
    sectionTitle: 'Flat, lightweight tape extensions tailored to your hair',
    sectionParagraphs: [
      'Our tape extension consultations focus on matching colour, selecting the right amount of hair, and planning placement that blends naturally through your own haircut.',
      'Because tape methods sit flat and distribute weight evenly, they are often a strong choice for clients who want length and fullness without bulky attachment points.',
      'We fit tape extensions in Neutral Bay using premium Remy human hair so your finish moves naturally and can be styled straight, waved, or polished for special events.',
    ],
    detailsTitle: 'Who tape extensions suit best',
    detailsParagraphs: [
      'Tape extensions can work beautifully for medium to thicker hair, and they are especially effective when you want fuller ends, extra body, or a polished glam finish.',
      'Maintenance appointments are important for keeping tapes secure, comfortable, and discreet as your natural hair grows.',
      'For advice on whether tape or nano extensions are better for your goals, contact the salon or explore the services section on our homepage.',
    ],
    imageSrc: '/lusciouslox/neutral-bay-2.webp',
    imageAlt: 'Tape extension result with long silky hair',
    relatedLinks: [
      { href: '/hair-extensions-neutral-bay', label: 'Compare all hair extension services' },
      { href: '/nano-hair-extensions-neutral-bay', label: 'Compare tape and nano extensions' },
    ],
  },
  '/nano-hair-extensions-neutral-bay': {
    path: '/nano-hair-extensions-neutral-bay',
    title: 'Nano Hair Extensions Neutral Bay | Luscious Lox',
    description:
      'Luscious Lox offers nano hair extensions in Neutral Bay for discreet, natural-looking length and volume with personalised placement and premium Remy human hair.',
    h1: 'Nano Hair Extensions Neutral Bay',
    heroIntro:
      'Luscious Lox is known for nano hair extensions in Neutral Bay, delivering discreet attachment points, premium Remy hair, and custom placement for soft, undetectable results.',
    openingCopy:
      'Nano extensions are ideal for clients who want flexible placement and a detailed, lightweight finish that blends naturally through finer sections around the face and crown.',
    sectionTitle: 'Discreet extension work with precision placement',
    sectionParagraphs: [
      'Nano hair extensions are one of our most requested services because they offer a refined, low-profile result when applied thoughtfully and maintained correctly.',
      'We use consultation time to assess your natural density, colour, desired fullness, and daily styling habits before recommending the amount of hair and placement plan needed.',
      'Clients looking for nano hair extensions in Neutral Bay often choose this method when they want movement, comfort, and a highly natural finish that can be worn up or down.',
    ],
    detailsTitle: 'Why nano extensions are a signature service',
    detailsParagraphs: [
      'Nano bonds are small and discreet, making them a strong option for fine to medium hair where subtle placement matters.',
      'Our approach focuses on protecting the integrity of your natural hair while building length and fullness gradually and evenly.',
      'If you want to compare nano extensions with tape installs, visit the homepage services section or call us to organise a consultation at the salon.',
    ],
    imageSrc: '/lusciouslox/neutral-bay-3.webp',
    imageAlt: 'Nano hair extensions result by Luscious Lox',
    relatedLinks: [
      { href: '/hair-extensions-neutral-bay', label: 'See our hair extensions overview' },
      { href: '/tape-extensions-neutral-bay', label: 'See tape extension options' },
    ],
  },
  '/keratin-treatment-neutral-bay': {
    path: '/keratin-treatment-neutral-bay',
    title: 'Keratin Treatment Neutral Bay | Luscious Lox',
    description:
      'Book a keratin treatment in Neutral Bay with Luscious Lox for smoother, shinier, more manageable hair and personalised aftercare advice.',
    h1: 'Keratin Treatment Neutral Bay',
    heroIntro:
      'Luscious Lox offers keratin treatment services in Neutral Bay for clients who want smoother, shinier, more manageable hair with less frizz and easier styling between salon visits.',
    openingCopy:
      'A professional keratin treatment can soften texture, reduce puffiness, and improve daily manageability while helping your hair look glossier and more polished in Sydney humidity.',
    sectionTitle: 'Smoother, softer hair without losing movement',
    sectionParagraphs: [
      'Our keratin treatment appointments begin with a consultation around your hair texture, colour history, and styling routine so we can recommend the right smoothing approach for your goals.',
      'Many clients in Neutral Bay book keratin treatments to reduce frizz, cut down blow-dry time, and keep their hair looking smoother through busy weeks and changing weather.',
      'Keratin can also pair well with colour and styling services when you want a sleeker finish and more reflective shine through the mid-lengths and ends.',
    ],
    detailsTitle: 'What keratin treatment can help with',
    detailsParagraphs: [
      'Keratin smoothing is a strong option if your hair feels frizzy, difficult to style, or prone to expanding in humidity.',
      'We will talk you through aftercare, maintenance timing, and how to keep the result looking healthy without compromising your colour or condition.',
      'To book a consultation, head back to the homepage contact section or call the salon directly for current availability.',
    ],
    imageSrc: '/lusciouslox/neutral-bay-5.webp',
    imageAlt: 'Smooth glossy hair after keratin treatment at Luscious Lox',
    relatedLinks: [
      { href: '/hair-salon-neutral-bay', label: 'See our full Neutral Bay salon offering' },
      { href: '/balayage-neutral-bay', label: 'Explore balayage services' },
    ],
  },
  '/hair-extensions-mosman': {
    path: '/hair-extensions-mosman',
    title: 'Hair Extensions Mosman | Luscious Lox',
    description:
      'Looking for hair extensions near Mosman? Luscious Lox in Neutral Bay offers premium nano, tape and weft extensions with expert colour matching, minutes from Mosman.',
    h1: 'Hair Extensions Mosman',
    heroIntro:
      'Luscious Lox is the go-to hair extension specialist for Mosman clients, located just minutes away in Neutral Bay with premium Remy human hair, seamless blends, and personalised consultations.',
    openingCopy:
      'Many of our regular extension clients travel from Mosman, Balmoral, and Clifton Gardens for colour-matched installs that look natural, feel comfortable, and hold up to an active harbourside lifestyle.',
    sectionTitle: 'Trusted by Mosman clients for seamless extensions',
    sectionParagraphs: [
      'Our boutique salon on Wycombe Rd is a short drive from Mosman Junction, making maintenance appointments and move-ups easy to fit around school runs, work, and weekend plans.',
      'Every Mosman client starts with a one-on-one consultation where we colour match, assess your natural density, and recommend nano, tape, or weft extensions based on your hair and routine.',
      'We use premium Remy human hair for every install, so your extensions move naturally, style beautifully, and blend invisibly with your own hair.',
    ],
    detailsTitle: 'Too busy to come to us? We come to Mosman',
    detailsParagraphs: [
      'Our mobile home service brings the full salon experience to your Mosman home - from colour to hair extensions - with home visits available seven days a week, weekends included.',
      'Home appointments suit new mums, busy professionals, and anyone preparing for an event who would rather have their hair done at home.',
      'Use the homepage booking form and select Home Service Visit, or call the salon to arrange a Mosman home appointment or an in-salon consultation.',
    ],
    imageSrc: '/lusciouslox/neutral-bay-2.webp',
    imageAlt: 'Long seamless hair extensions for a Mosman client by Luscious Lox',
    relatedLinks: [
      { href: '/hair-extensions-neutral-bay', label: 'Explore our hair extensions overview' },
      { href: '/nano-hair-extensions-sydney', label: 'Learn about nano hair extensions' },
    ],
  },
  '/tape-hair-extensions-neutral-bay': {
    path: '/tape-hair-extensions-neutral-bay',
    title: 'Tape Hair Extensions Neutral Bay | Luscious Lox',
    description:
      'Premium tape hair extensions in Neutral Bay. Luscious Lox fits lightweight, colour-matched tape-in hair with seamless blending, gentle wear and easy maintenance.',
    h1: 'Tape Hair Extensions Neutral Bay',
    heroIntro:
      'Luscious Lox fits premium tape hair extensions in Neutral Bay using top-grade Remy human hair, precise colour matching, and placement planned around your haircut for an invisible finish.',
    openingCopy:
      'Tape hair extensions add instant length and fullness with slim, flexible panels that sit flat against the head - comfortable from day one and quick to maintain at move-up appointments.',
    sectionTitle: 'Why clients choose our tape hair extensions',
    sectionParagraphs: [
      'The quality of the hair matters as much as the application. We fit only premium Remy tape hair that keeps its softness and shine wash after wash, so your investment lasts.',
      'Each install is customised - we blend multiple shades where needed so the tapes disappear into your natural colour, including through face-framing sections.',
      'Move-up appointments every six to eight weeks keep tape extensions secure and discreet as your hair grows, and the same hair can usually be re-taped and reused.',
    ],
    detailsTitle: 'Gentle, reusable, and easy to live with',
    detailsParagraphs: [
      'Tape extensions distribute weight across a wide, flat panel, making them one of the gentlest options for adding volume - especially for fine to medium hair.',
      'They style effortlessly: straight, waved, or in an updo with the right placement, and washing and drying stays close to your normal routine.',
      'Book a tape hair extension consultation through the homepage booking form, or call the salon and we will plan colour, quantity, and placement together.',
    ],
    imageSrc: '/lusciouslox/neutral-bay-4.webp',
    imageAlt: 'Tape hair extensions styled with soft waves at Luscious Lox Neutral Bay',
    relatedLinks: [
      { href: '/weft-hair-extensions-neutral-bay', label: 'Compare weft hair extensions' },
      { href: '/hair-extensions-neutral-bay', label: 'See all extension methods' },
    ],
  },
  '/weft-hair-extensions-sydney': {
    path: '/weft-hair-extensions-sydney',
    title: 'Weft Hair Extensions Sydney | Luscious Lox',
    description:
      'Luscious Lox fits premium weft hair extensions in Sydney - seamless wefts applied for maximum volume and length with a flat, comfortable, damage-conscious finish.',
    h1: 'Weft Hair Extensions Sydney',
    heroIntro:
      'Luscious Lox offers premium weft hair extensions for Sydney clients who want serious volume and length in one appointment, with a flat, secure finish designed for comfortable everyday wear.',
    openingCopy:
      'Wefts are continuous curtains of hair applied in rows, making them ideal for thicker results, fewer attachment points, and a streamlined install that grows out cleanly between maintenance visits.',
    sectionTitle: 'Fuller results with fewer attachment points',
    sectionParagraphs: [
      'Because a weft covers a whole row in one piece, it can deliver dramatic fullness while keeping the install lightweight and low-profile against the head.',
      'Our wefts use premium Remy human hair, colour matched and cut to blend into your natural shape so the result looks like your own hair - only fuller and longer.',
      'Clients travel to our Neutral Bay salon from across Sydney for weft installs, and we plan every placement around your density, lifestyle, and how you like to wear your hair.',
    ],
    detailsTitle: 'Sydney-wide, in salon or at home',
    detailsParagraphs: [
      'Not sure whether wefts, tapes, or nanos suit you best? A consultation lets us assess your hair and recommend the method that will look and feel right long-term.',
      'We also offer a mobile home service across Sydney - from colour to hair extensions - with home visits available seven days a week, weekends included.',
      'Book through the homepage booking form or call the salon to arrange your weft consultation in Neutral Bay or at home.',
    ],
    imageSrc: '/lusciouslox/extensions-showcase.webp',
    imageAlt: 'Voluminous weft hair extensions result by Luscious Lox Sydney',
    relatedLinks: [
      { href: '/weft-hair-extensions-neutral-bay', label: 'Weft extensions in Neutral Bay' },
      { href: '/keratin-bond-hair-extensions-sydney', label: 'Explore keratin bond extensions' },
    ],
  },
  '/keratin-bond-hair-extensions-sydney': {
    path: '/keratin-bond-hair-extensions-sydney',
    title: 'Keratin Bond Hair Extensions Sydney | Luscious Lox',
    description:
      'Keratin bond hair extensions in Sydney by Luscious Lox. Discreet individual bonds, premium Remy hair and expert placement for natural movement and 360-degree wear.',
    h1: 'Keratin Bond Hair Extensions Sydney',
    heroIntro:
      'Luscious Lox applies keratin bond hair extensions for Sydney clients who want individual, strand-by-strand placement with natural movement and the freedom to wear hair up or down.',
    openingCopy:
      'Keratin bonds attach small sections of premium hair with a discreet keratin tip, giving 360-degree styling freedom and a result that moves exactly like your own hair.',
    sectionTitle: 'Strand-by-strand precision for a natural result',
    sectionParagraphs: [
      'Individual bonds allow detailed placement through partings, face-framing layers, and crown sections where panels and wefts cannot sit as discreetly.',
      'We tailor bond size, hair quantity, and colour blend to your natural hair so the finish stays undetectable at every angle - in ponytails, braids, and updos.',
      'As nano specialists, we work with the newest generation of small-bond methods and will recommend keratin bonds or nano tips depending on your hair type and goals.',
    ],
    detailsTitle: 'Planning your keratin bond install',
    detailsParagraphs: [
      'Every keratin bond service starts with a consultation covering colour matching, hair health, quantity, and the maintenance rhythm that fits your routine.',
      'Please note keratin bond extensions are different from our keratin nanoplasty smoothing treatment - currently half price at $200 - which we are happy to explain at your visit.',
      'Book through the homepage booking form or call the salon; clients visit us in Neutral Bay from across Sydney, and home visits are available seven days a week.',
    ],
    imageSrc: '/lusciouslox/neutral-bay-3.webp',
    imageAlt: 'Keratin bond hair extensions with glossy finish by Luscious Lox Sydney',
    relatedLinks: [
      { href: '/nano-hair-extensions-sydney', label: 'Compare nano hair extensions' },
      { href: '/hair-extensions-neutral-bay', label: 'See all extension methods' },
    ],
  },
  '/hair-extensions-cammeray': {
    path: '/hair-extensions-cammeray',
    title: 'Hair Extensions Cammeray | Luscious Lox',
    description:
      'Hair extensions near Cammeray - Luscious Lox in Neutral Bay fits premium nano, tape and weft extensions with expert colour matching, minutes from Cammeray.',
    h1: 'Hair Extensions Cammeray',
    heroIntro:
      'Cammeray locals choose Luscious Lox for premium hair extensions just minutes away in Neutral Bay - seamless nano, tape, and weft installs with personalised colour matching.',
    openingCopy:
      'Our boutique salon sits an easy few minutes from Cammeray, so consultations, installs, and maintenance appointments slot neatly into your week without a trip across the bridge.',
    sectionTitle: 'Your local extension specialists, minutes from Cammeray',
    sectionParagraphs: [
      'From first consultation to final styling, every appointment is one-on-one - we assess your natural hair, match colour precisely, and recommend the method that suits your lifestyle.',
      'Whether you want subtle thickening, noticeable length, or event-ready glamour, we plan quantity and placement so the result stays believable and easy to maintain.',
      'Cammeray clients also visit us for balayage, colour, keratin smoothing, and styling - so your extensions and colour can be planned together for a seamless overall result.',
    ],
    detailsTitle: 'In-salon or at your Cammeray home',
    detailsParagraphs: [
      'Prefer to stay home? Our mobile service covers everything from colour to hair extensions and travels to Cammeray, with home visits available seven days a week - weekends included.',
      'Extensions are maintained on a simple schedule, and we will map out your move-up timing before you leave your first appointment.',
      'Use the homepage booking form or call the salon to book your Cammeray consultation - in the salon chair or in your own living room.',
    ],
    imageSrc: '/lusciouslox/neutral-bay-5.webp',
    imageAlt: 'Vibrant hair extension transformation for a Cammeray client by Luscious Lox',
    relatedLinks: [
      { href: '/hair-extensions-neutral-bay', label: 'Explore our hair extensions overview' },
      { href: '/hair-salon-neutral-bay', label: 'Visit our Neutral Bay salon page' },
    ],
  },
  '/weft-hair-extensions-neutral-bay': {
    path: '/weft-hair-extensions-neutral-bay',
    title: 'Weft Hair Extensions Neutral Bay | Luscious Lox',
    description:
      'Weft hair extensions in Neutral Bay by Luscious Lox. Seamless rows of premium Remy hair for maximum volume, a flat comfortable fit and easy maintenance.',
    h1: 'Weft Hair Extensions Neutral Bay',
    heroIntro:
      'Luscious Lox installs weft hair extensions in Neutral Bay for clients who want maximum volume and length with a flat, comfortable row that disappears under your natural hair.',
    openingCopy:
      'A weft install builds fullness quickly with fewer attachment points than strand-by-strand methods, making it a favourite for thicker results and a clean, streamlined grow-out.',
    sectionTitle: 'The weft experience at Luscious Lox',
    sectionParagraphs: [
      'We begin with a consultation to check your density and hair health, then colour match premium Remy weft hair to blend invisibly with your own.',
      'Placement is planned around your parting, haircut, and how you wear your hair, so the row stays hidden whether your hair is down, half-up, or tied back.',
      'Maintenance visits keep the row snug and comfortable as your hair grows, and quality weft hair can be reused across multiple installs.',
    ],
    detailsTitle: 'Is a weft right for you?',
    detailsParagraphs: [
      'Wefts suit medium to thicker hair beautifully and are ideal when your priority is volume - hair that photographs full and styles with body.',
      'If your hair is finer, we may recommend nano or tape methods instead, and we will explain the trade-offs honestly at your consultation.',
      'Book through the homepage booking form or call the salon - we are on Wycombe Rd in Neutral Bay, with home visits available seven days a week.',
    ],
    imageSrc: '/lusciouslox/neutral-bay-1.webp',
    imageAlt: 'Full voluminous weft hair extensions styled at Luscious Lox Neutral Bay',
    relatedLinks: [
      { href: '/weft-hair-extensions-sydney', label: 'Weft extensions across Sydney' },
      { href: '/tape-hair-extensions-neutral-bay', label: 'Compare tape hair extensions' },
    ],
  },
  '/nano-hair-extensions-sydney': {
    path: '/nano-hair-extensions-sydney',
    title: 'Nano Hair Extensions Sydney | Luscious Lox',
    description:
      'Nano hair extensions in Sydney by specialists Luscious Lox. Ultra-discreet nano bonds, premium Remy hair and precision placement for undetectable length and volume.',
    h1: 'Nano Hair Extensions Sydney',
    heroIntro:
      'Luscious Lox is one of Sydney’s dedicated nano hair extension specialists - ultra-small bonds, premium Remy hair, and precision placement for a result nobody can detect.',
    openingCopy:
      'Nano bonds are among the smallest attachment points available, sitting flat and invisible even through fine partings - which is why clients travel from across Sydney for our installs.',
    sectionTitle: 'Why Sydney clients choose our nano work',
    sectionParagraphs: [
      'Nano extensions are our signature. We fit them daily, refining placement patterns that keep bonds hidden through crown sections, partings, and face-framing layers.',
      'Each install is fully customised: colour blended across multiple shades, quantity matched to your density, and bond placement planned for how you actually wear your hair.',
      'The method is designed to protect your natural hair - lightweight bonds, sensible tension, and a maintenance schedule that keeps everything healthy underneath.',
    ],
    detailsTitle: 'Visit Neutral Bay, or we come to you',
    detailsParagraphs: [
      'Our salon is in Neutral Bay on Sydney’s lower north shore - an easy trip from the CBD, eastern suburbs, and northern beaches, with parking nearby.',
      'We also run a mobile home service across Sydney covering everything from colour to hair extensions, with home visits available seven days a week.',
      'Start with a consultation booked through the homepage form, or call the salon and we will plan your nano transformation together.',
    ],
    imageSrc: '/lusciouslox/extensions-showcase.webp',
    imageAlt: 'Undetectable nano hair extensions by Luscious Lox Sydney',
    relatedLinks: [
      { href: '/nano-hair-extensions-neutral-bay', label: 'Nano extensions in Neutral Bay' },
      { href: '/keratin-bond-hair-extensions-sydney', label: 'Compare keratin bond extensions' },
    ],
  },
  '/balayage-north-sydney': {
    path: '/balayage-north-sydney',
    title: 'Balayage North Sydney | Luscious Lox',
    description:
      'Balayage near North Sydney - Luscious Lox in Neutral Bay creates dimensional, hand-painted colour with personalised toning and glossing, minutes from North Sydney.',
    h1: 'Balayage North Sydney',
    heroIntro:
      'Luscious Lox creates hand-painted balayage for North Sydney clients just minutes away in Neutral Bay - dimensional colour, soft grow-out, and a glossy, polished finish.',
    openingCopy:
      'A short trip from North Sydney offices and apartments, our boutique salon makes it easy to book balayage around work - including Thursday evenings and Saturday appointments.',
    sectionTitle: 'Dimensional colour designed around you',
    sectionParagraphs: [
      'Every balayage starts with a consultation on tone, brightness, and placement so your colour flatters your complexion and grows out softly without hard regrowth lines.',
      'From creamy blondes to rich caramel ribbons, we hand-paint each section and finish with toning and glossing for shine that reads expensive.',
      'Many North Sydney clients pair balayage with a keratin smoothing treatment or extensions for extra length and movement - we can plan the combination in one visit.',
    ],
    detailsTitle: 'Easy to reach from North Sydney',
    detailsParagraphs: [
      'We are on Wycombe Rd in Neutral Bay, minutes from North Sydney by car or bus, with parking available nearby.',
      'Prefer your colour done at home? Our mobile service covers North Sydney with home visits available seven days a week, weekends included.',
      'Book a colour consultation through the homepage booking form, or call the salon to talk through balayage, glossing, or a bigger transformation.',
    ],
    imageSrc: '/lusciouslox/neutral-bay-1.webp',
    imageAlt: 'Hand-painted balayage result for a North Sydney client by Luscious Lox',
    relatedLinks: [
      { href: '/balayage-neutral-bay', label: 'Balayage in Neutral Bay' },
      { href: '/keratin-treatment-neutral-bay', label: 'Pair colour with keratin smoothing' },
    ],
  },
};

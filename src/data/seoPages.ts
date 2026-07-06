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
  areaServed: ['Neutral Bay', 'Cremorne', 'North Sydney', 'Lower North Shore', 'Sydney'],
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
    imageSrc: '/lusciouslox/front.png',
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
    imageSrc: '/lusciouslox/neutral-bay-1.png',
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
    imageSrc: '/lusciouslox/neutral-bay-2.png',
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
    imageSrc: '/lusciouslox/neutral-bay-3.png',
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
    imageSrc: '/lusciouslox/neutral-bay-5.png',
    imageAlt: 'Smooth glossy hair after keratin treatment at Luscious Lox',
    relatedLinks: [
      { href: '/hair-salon-neutral-bay', label: 'See our full Neutral Bay salon offering' },
      { href: '/balayage-neutral-bay', label: 'Explore balayage services' },
    ],
  },
};

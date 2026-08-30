export const siteConfig = {
  name: 'Luscious Lox',
  fullName: 'Luscious Lox HAIR Neutral Bay',
  phone: '0416 595 902',
  phoneHref: 'tel:+61416595902',
  landline: '02 9099 4362',
  landlineHref: 'tel:+61290994362',
  email: 'contact@lusciouslox.co.au',
  emailHref: 'mailto:contact@lusciouslox.co.au',
  address: '156 Wycombe Rd, Neutral Bay NSW 2089',
  googleRating: 5.0,
  googleReviews: 7,
  instagram: '@lusciousloxhairboutique',
  instagramUrl: 'https://www.instagram.com/lusciousloxhairboutique/',
  instagramFollowers: '17K',
  instagramPosts: 578,
  bookingUrl: '#booking',
  directionsUrl: 'https://www.google.com/maps/dir//156+Wycombe+Rd+Neutral+Bay+NSW+2089',
  googleMapsEmbed: 'https://www.google.com/maps?q=156+Wycombe+Rd+Neutral+Bay+NSW+2089&output=embed',
  hours: [
    { day: 'Monday', hours: '10:00 AM - 6:00 PM' },
    { day: 'Tuesday', hours: '10:00 AM - 6:00 PM' },
    { day: 'Wednesday', hours: '10:00 AM - 6:00 PM' },
    { day: 'Thursday', hours: '10:00 AM - 7:00 PM' },
    { day: 'Friday', hours: '10:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ],
};

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Offers', href: '#offers' },
  { label: 'Extensions', href: '#extensions' },
  { label: 'Shop', href: '#shop' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#booking' },
];

export type ShopProduct = {
  id: string;
  name: string;
  tagline: string;
  batch: string;
  /** Display price, e.g. '$340'. Leave null to show "Enquire for pricing" until a price is set. */
  price: string | null;
  priceNote: string;
  description: string;
  specs: { label: string; value: string }[];
  features: string[];
  /** First image is the main product photo; the rest show as gallery thumbnails. */
  images: { src: string; alt: string }[];
  /** Value sent to the inquiry API when someone places an order. Must match api/inquiry.ts allowlist. */
  orderService: string;
};

export const shopIntro = {
  eyebrow: 'Wigs & Toppers',
  title: 'The Topper Collection',
  description:
    'Premium Remy human hair toppers, hand-finished for natural blending and everyday comfort. Order online and we will confirm colour matching, delivery or in-salon fitting with you personally.',
};

export const shopProducts: ShopProduct[] = [
  {
    id: 'micro-topper',
    name: 'MICRO Hair Topper',
    tagline: 'Premium Remy Human Hair',
    batch: 'Batch 1',
    price: '$1,600',
    priceNote: 'Includes personal colour-match consultation',
    description:
      'Designed for lightweight, natural-looking coverage, our MICRO Hair Topper is crafted from premium Remy human hair and finished with a delicate Swiss lace base for a comfortable, barely-there feel. At 12 inches, it blends seamlessly through the crown and smaller areas where extra fullness is desired — a subtle result without the bulk of a traditional topper, and a great introduction for first-time topper wearers.',
    specs: [
      { label: 'Hair', value: '100% Premium Remy Human Hair' },
      { label: 'Length', value: '12" finished' },
      { label: 'Density', value: 'Ultra-light MICRO' },
      { label: 'Base', value: 'Lightweight Swiss lace' },
      { label: 'Base Size', value: '4.75" × 3.25"' },
      { label: 'Attachment', value: 'Four secure clips' },
    ],
    features: [
      'Natural blending and discreet crown coverage',
      'Ultra-light density — no bulk, all softness',
      'Comfortable enough for everyday wear',
      'Easy to secure — ideal for first-time wearers',
    ],
    images: [
      { src: '/lusciouslox/micro-topper-1.webp', alt: 'MICRO Hair Topper styled side view in dark brown Remy human hair' },
      { src: '/lusciouslox/micro-topper-2.webp', alt: 'MICRO Hair Topper Swiss lace base with four secure clips' },
      { src: '/lusciouslox/micro-topper-4.webp', alt: 'MICRO Hair Topper base and clip detail from above' },
      { src: '/lusciouslox/micro-topper-3.webp', alt: 'Close-up of MICRO Hair Topper premium Remy hair texture' },
    ],
    orderService: 'MICRO Hair Topper (Shop Order)',
  },
];

export const specialOffer = {
  name: 'Keratin Nanoplasty',
  wasPrice: '$400',
  nowPrice: '$200',
  badge: 'Half Price',
  tagline: 'Limited time offer',
  description:
    'Silky, frizz-free, glass-smooth hair with our premium keratin nanoplasty treatment — now half price for a limited time. Perfect before summer, events, or simply easier mornings.',
};

export const homeService = {
  title: 'We Come To You',
  eyebrow: 'Mobile Home Services',
  description:
    'Enjoy the full Luscious Lox experience without leaving home. Our mobile service brings everything from colour to hair extensions straight to your door.',
  availability: 'Home visits available 7 days — weekends included',
  points: [
    'Colour, balayage & styling at home',
    'Hair extensions fitted at your place',
    'Event & occasion hair on location',
    'Weekend home visits available',
  ],
};

export const services = [
  { title: 'Hair Extensions', desc: 'Premium nano, tape and Remy extensions for seamless length and volume.', category: 'extensions' },
  { title: 'Tape Extensions', desc: 'Lightweight, flat-lay tape wefts for natural movement and comfort.', category: 'extensions' },
  { title: 'Balayage', desc: 'Hand-painted sun-kissed colour with soft, natural grow-out.', category: 'colour' },
  { title: 'Hair Colouring', desc: 'Full colour, root touch-ups and creative colour transformations.', category: 'colour' },
  { title: 'Keratin Treatments', desc: 'Smoothing treatments for frizz-free, shiny, manageable hair.', category: 'treatments' },
  { title: 'Styling and Blowdry', desc: 'Professional blowdry, curly styling, and occasion hair.', category: 'styling' },
];

export const extensionBenefits = [
  {
    title: 'Undetectable Blend',
    description: 'Precision colour-matched to sit flush against your natural hair. Nobody will know.',
  },
  {
    title: 'Premium Remy Hair',
    description: 'Ethically sourced European and Remy human hair for natural movement and shine.',
  },
  {
    title: 'Reusable and Long-Lasting',
    description: 'Designed for multiple applications with proper care - invest once, wear for months.',
  },
  {
    title: 'Instant Transformation',
    description: 'Full length and volume in one appointment. Walk out with your dream hair.',
  },
  {
    title: 'Personalised Consultation',
    description: 'Every client receives a one-on-one colour and method consultation before we begin.',
  },
  {
    title: 'Damage-Free Methods',
    description: 'Nano and tape techniques designed to protect the integrity of your natural hair.',
  },
];

export const heroImage = '/lusciouslox/neutral-bay-1.webp';

export const galleryImages = [
  { id: 1, label: 'Honey Blonde', src: '/lusciouslox/neutral-bay-1.webp', alt: 'Honey blonde balayage and extension blend' },
  { id: 2, label: 'Silky Length', src: '/lusciouslox/neutral-bay-2.webp', alt: 'Long silky brunette extension result' },
  { id: 3, label: 'Espresso Gloss', src: '/lusciouslox/neutral-bay-3.webp', alt: 'Glossy brunette styling transformation' },
  { id: 4, label: 'Ruby Waves', src: '/lusciouslox/neutral-bay-4.webp', alt: 'Deep red curled hair transformation' },
  { id: 5, label: 'Statement Red', src: '/lusciouslox/neutral-bay-5.webp', alt: 'Straight vivid red hair result' },
  { id: 6, label: 'Salon Finish', src: '/lusciouslox/front.webp', alt: 'Luxury salon finish' },
];

export const reviews = [
  {
    id: 1,
    text: 'Absolutely beautiful work. The extensions look completely natural and I get compliments everywhere I go. Best in Sydney.',
    name: 'Verified Client',
    rating: 5,
  },
  {
    id: 2,
    text: 'The colour match was perfect and the blend is truly undetectable. I finally have the volume and length I have always dreamed of.',
    name: 'Verified Client',
    rating: 5,
  },
  {
    id: 3,
    text: 'A premium experience from start to finish. The consultation was thorough and the result exceeded all my expectations.',
    name: 'Verified Client',
    rating: 5,
  },
  {
    id: 4,
    text: 'Professional, talented, and genuinely caring. The salon feels luxurious and the results speak for themselves.',
    name: 'Verified Client',
    rating: 5,
  },
];

export const faqs = [
  {
    q: 'Do you offer home visits or mobile appointments?',
    a: 'Yes! We bring the full salon experience to you. Our home service covers everything from colour to hair extensions, and home visits are available seven days a week — weekends included. Choose "Home Service Visit" in the booking form or call us to arrange a time that suits you.',
  },
  {
    q: 'What is the keratin nanoplasty special?',
    a: 'For a limited time, our keratin nanoplasty smoothing treatment is half price — $200 instead of $400. It leaves hair silky, frizz-free and glossy for months. Select "Keratin Nanoplasty Special" in the booking form or call the salon to secure the offer.',
  },
  {
    q: 'Do you sell wigs and hair toppers?',
    a: 'Yes! Our Topper Collection features premium Remy human hair toppers, starting with the MICRO Hair Topper — an ultra-light 12" topper on a Swiss lace base, perfect for discreet crown coverage. Order through the Shop section and we will personally confirm colour matching, payment and delivery or in-salon fitting.',
  },
  {
    q: 'How long do hair extensions last?',
    a: 'With proper care and maintenance appointments, our premium extensions typically last 3-6 months per application. The hair itself can be reused for up to 12 months.',
  },
  {
    q: 'Will extensions damage my natural hair?',
    a: 'Our nano and tape methods are specifically designed to minimise stress on your natural hair. When applied and maintained professionally, they should not cause damage.',
  },
  {
    q: 'How do I know which extension method is right for me?',
    a: 'During your consultation, we assess your hair type, density, lifestyle and goals to recommend the ideal method - whether that is nano tip, tape-in, or another approach.',
  },
  {
    q: 'Do you colour match extensions?',
    a: 'Absolutely. We custom colour-match every set of extensions to your natural hair or desired colour for a seamless, undetectable blend.',
  },
  {
    q: 'How long does a full extension appointment take?',
    a: 'A full head of extensions typically takes 2-4 hours depending on the method and volume required. We never rush - precision is everything.',
  },
  {
    q: 'Do I need a consultation first?',
    a: 'Yes, we require an initial consultation before all extension services. This allows us to discuss your goals, assess your hair, and plan the perfect approach.',
  },
];

export const instagramPosts = [
  { id: 1, src: '/lusciouslox/neutral-bay-1.webp', alt: 'Luscious Lox Neutral Bay result 1' },
  { id: 2, src: '/lusciouslox/neutral-bay-2.webp', alt: 'Luscious Lox Neutral Bay result 2' },
  { id: 3, src: '/lusciouslox/neutral-bay-3.webp', alt: 'Luscious Lox Neutral Bay result 3' },
  { id: 4, src: '/lusciouslox/neutral-bay-4.webp', alt: 'Luscious Lox Neutral Bay result 4' },
  { id: 5, src: '/lusciouslox/neutral-bay-5.webp', alt: 'Luscious Lox Neutral Bay result 5' },
  { id: 6, src: '/lusciouslox/front.webp', alt: 'Luscious Lox Neutral Bay salon front' },
];

export const siteConfig = {
  name: 'Luscious Lox',
  fullName: 'Luscious Lox HAIR Leichhardt',
  phone: '0418 865 734',
  phoneHref: 'tel:+61418865734',
  address: '419 Parramatta Rd, Leichhardt NSW 2040',
  googleRating: 5.0,
  googleReviews: 7,
  instagram: '@lusciousloxau',
  instagramUrl: 'https://www.instagram.com/lusciousloxau/',
  instagramFollowers: '17K',
  instagramPosts: 578,
  // REPLACE: Add your booking link here (e.g., Fresha, Square, etc.)
  bookingUrl: '#booking',
  directionsUrl: 'https://www.google.com/maps/dir//419+Parramatta+Rd+Leichhardt+NSW+2040',
  // REPLACE: Add your Google Maps embed URL here
  googleMapsEmbed: '',
  hours: [
    { day: 'Monday', hours: 'Closed' },
    { day: 'Tuesday', hours: 'Closed' },
    { day: 'Wednesday', hours: 'Closed' },
    { day: 'Thursday', hours: '9:00 AM – 6:00 PM' },
    { day: 'Friday', hours: '9:00 AM – 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM – 5:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ],
};

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Extensions', href: '#extensions' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#booking' },
];

export const services = [
  { title: 'Hair Extensions', desc: 'Premium nano, tape & Remy extensions for seamless length and volume.', category: 'extensions' },
  { title: 'Tape Extensions', desc: 'Lightweight, flat-lay tape wefts for natural movement and comfort.', category: 'extensions' },
  { title: 'Balayage', desc: 'Hand-painted sun-kissed colour with soft, natural grow-out.', category: 'colour' },
  { title: 'Hair Colouring', desc: 'Full colour, root touch-ups and creative colour transformations.', category: 'colour' },
  { title: 'Keratin Treatments', desc: 'Smoothing treatments for frizz-free, shiny, manageable hair.', category: 'treatments' },
  { title: 'Styling & Blowdry', desc: 'Professional blowdry, curly styling, and occasion hair.', category: 'styling' },
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
    title: 'Reusable & Long-Lasting',
    description: 'Designed for multiple applications with proper care — invest once, wear for months.',
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

export const heroImage = '/lusciouslox/front.png';

export const galleryImages = [
  { id: 1, label: 'Length', src: '/lusciouslox/ChatGPT%20Image%20May%2014%2C%202026%2C%2007_10_32%20PM%20%281%29.png', alt: 'Hair extensions length transformation' },
  { id: 2, label: 'Volume', src: '/lusciouslox/ChatGPT%20Image%20May%2014%2C%202026%2C%2007_10_34%20PM%20%286%29.png', alt: 'Volume enhancement with extensions' },
  { id: 3, label: 'Balayage', src: '/lusciouslox/ChatGPT%20Image%20May%2014%2C%202026%2C%2007_10_33%20PM%20%282%29.png', alt: 'Seamless balayage colour blend' },
  { id: 4, label: 'Nano Blend', src: '/lusciouslox/ChatGPT%20Image%20May%2014%2C%202026%2C%2007_10_34%20PM%20%284%29.png', alt: 'Nano extensions undetectable finish' },
  { id: 5, label: 'Tape-In', src: '/lusciouslox/ChatGPT%20Image%20May%2014%2C%202026%2C%2007_10_35%20PM%20%287%29.png', alt: 'Tape-in extensions before and after' },
  { id: 6, label: 'Colour', src: '/lusciouslox/ChatGPT%20Image%20May%2014%2C%202026%2C%2007_10_34%20PM%20%285%29.png', alt: 'Hair colour transformation' },
];

// REPLACE: Insert real Google review text when available
export const reviews = [
  {
    id: 1,
    text: 'Absolutely beautiful work. The extensions look completely natural — I get compliments everywhere I go. Best in Sydney.',
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
    q: 'How long do hair extensions last?',
    a: 'With proper care and maintenance appointments, our premium extensions typically last 3–6 months per application. The hair itself can be reused for up to 12 months.',
  },
  {
    q: 'Will extensions damage my natural hair?',
    a: 'Our nano and tape methods are specifically designed to minimise stress on your natural hair. When applied and maintained professionally, they should not cause damage.',
  },
  {
    q: 'How do I know which extension method is right for me?',
    a: 'During your consultation, we assess your hair type, density, lifestyle and goals to recommend the ideal method — whether that\'s nano tip, tape-in, or another approach.',
  },
  {
    q: 'Do you colour match extensions?',
    a: 'Absolutely. We custom colour-match every set of extensions to your natural hair or desired colour for a seamless, undetectable blend.',
  },
  {
    q: 'How long does a full extension appointment take?',
    a: 'A full head of extensions typically takes 2–4 hours depending on the method and volume required. We never rush — precision is everything.',
  },
  {
    q: 'Do I need a consultation first?',
    a: 'Yes, we require an initial consultation before all extension services. This allows us to discuss your goals, assess your hair, and plan the perfect approach.',
  },
];

export const instagramPosts = [
  { id: 1, src: '/lusciouslox/front.png', alt: 'Luscious Lox Instagram post 1' },
  { id: 2, src: '/lusciouslox/ChatGPT%20Image%20May%2014%2C%202026%2C%2007_10_34%20PM%20%286%29.png', alt: 'Luscious Lox Instagram post 2' },
  { id: 3, src: '/lusciouslox/ChatGPT%20Image%20May%2014%2C%202026%2C%2007_10_34%20PM%20%284%29.png', alt: 'Luscious Lox Instagram post 3' },
  { id: 4, src: '/lusciouslox/ChatGPT%20Image%20May%2014%2C%202026%2C%2007_10_34%20PM%20%285%29.png', alt: 'Luscious Lox Instagram post 4' },
  { id: 5, src: '/lusciouslox/ChatGPT%20Image%20May%2014%2C%202026%2C%2007_10_35%20PM%20%287%29.png', alt: 'Luscious Lox Instagram post 5' },
  { id: 6, src: '/lusciouslox/ChatGPT%20Image%20May%2014%2C%202026%2C%2007_10_32%20PM%20%281%29.png', alt: 'Luscious Lox Instagram post 6' },
];

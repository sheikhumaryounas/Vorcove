// All website copy in one place, so text changes never touch the components.

const px = (id, w = 1400) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const EMAIL = 'hello@vorcove.com';

// hero slider: each line is a list of plain strings and { em } highlights
export const slides = [
  {
    tag: 'Revenue engineering',
    nav: 'Revenue engineering',
    lines: [['We engineer software'], ['that directly ', { em: 'expands' }], [{ em: 'your business revenue.' }]],
    text: 'Vorcove builds software and AI systems on top of your existing tools, processes and data, without replacing anything. We find where your business is losing time, customers and money, then build the systems that win them back.',
    primary: { label: 'Book a business review', href: '#contact' },
    secondary: { label: 'Explore services', href: '#services' },
    video: 'https://videos.pexels.com/video-files/853822/853822-hd_1920_1080_25fps.mp4',
    poster: 'https://images.pexels.com/videos/853822/free-video-853822.jpg?auto=compress&w=1600'
  },
  {
    tag: 'Leadsmith · In pilot',
    nav: 'Leadsmith · In pilot',
    lines: [['Every quote'], ['followed up.'], [{ em: 'Automatically.' }]],
    text: 'Quote intake and follow-up for UK metal fabrication shops. Turns photo and sketch enquiries into complete job requests and follows up on every quote automatically.',
    primary: { label: 'See Leadsmith', href: '#leadsmith' },
    secondary: { label: 'Book a demo', href: '#contact' },
    video: 'https://videos.pexels.com/video-files/10641848/10641848-hd_1920_1080_25fps.mp4',
    poster: 'https://images.pexels.com/videos/10641848/construction-worker-flare-industrial-machinery-industrial-plant-10641848.jpeg?auto=compress&w=1600'
  },
  {
    tag: 'Business review',
    nav: 'Business review',
    lines: [['Find the revenue'], ['hiding in your'], [{ em: 'current setup.' }]],
    text: "Tell us about your business and we'll get back within 24 hours with where we think you could grow.",
    primary: { label: 'Start the conversation', href: '#contact' },
    secondary: { label: 'How we work', href: '#process' },
    video: 'https://videos.pexels.com/video-files/8091892/8091892-hd_1920_1080_24fps.mp4',
    poster: 'https://images.pexels.com/videos/8091892/pexels-photo-8091892.jpeg?auto=compress&w=1600'
  }
];

export const stats = [
  { value: 24, unit: 'hrs', label: 'to reply to every enquiry' },
  { value: 2, unit: 'weeks', label: 'to a working first version' },
  { value: 0, label: 'tools you have to replace' },
  { value: 100, unit: '%', label: 'of the code and data owned by you' }
];

export const services = [
  { title: 'Automation', icon: 'automation', short: 'Removes repetitive manual work so the same people handle more business.', text: 'Removes the repetitive manual work that slows your team down, so the same people handle more business.', img: px(6804068), tags: ['Invoices', 'Order entry', 'Follow-ups'] },
  { title: 'Data & insights', icon: 'data', short: 'Reports and alerts that show where money is made and lost.', text: 'Turns the data sitting in your tools into reports and alerts that show where money is made and lost.', img: px(577210, 1000) },
  { title: 'AI integration', icon: 'ai', short: 'Practical AI for documents, drafting replies and forecasting.', text: 'Adds practical AI to your existing workflows: handling documents, drafting replies, forecasting.', img: px(12899153, 1000) },
  { title: 'Customer experience', icon: 'cart', short: 'Faster, easier ways for customers to buy, book or reorder.', text: 'Makes it faster and easier for customers to buy, book or reorder from you.', img: px(12935042, 1000) },
  { title: 'Custom internal tools', icon: 'wrench', short: "The tool you need when off-the-shelf software doesn't fit.", text: "Builds the tool your business needs when off-the-shelf software doesn't fit.", img: px(12899191, 1000) }
];

export const industries = [
  { title: 'Manufacturing & fabrication', icon: 'factory', short: 'Quote intake, job requests and follow-up.', text: 'Quote intake, complete job requests and follow-up on every quote, so the shop floor stays busy.', img: px(4400533), alt: 'A welder working with sparks in a metal workshop' },
  { title: 'Wholesale & distribution', icon: 'box', short: 'Orders and reorders without manual entry.', text: 'Orders, stock and reorders flowing into your systems without manual entry.', img: px(4487383), alt: 'Workers carrying parcels down a warehouse aisle' },
  { title: 'Retail & e-commerce', icon: 'cart', short: 'Faster ways to buy, book and reorder.', text: 'Faster, easier ways for customers to buy, book and reorder from you.', img: px(36730466), alt: 'A shop owner holding a tablet in a clothing store' },
  { title: 'Professional services', icon: 'briefcase', short: 'Less admin, faster replies, clear numbers.', text: 'Less admin, faster replies to enquiries and clear numbers on where money is made.', img: px(5668492), alt: 'Professionals discussing a plan at an office table' }
];

export const products = [
  {
    id: 'leadsmith',
    name: 'Leadsmith',
    dot: 'var(--mint)',
    switchLabel: 'Leadsmith · Metal fabrication',
    menuTag: 'In pilot · Metal fabrication',
    menuText: 'Quote intake and follow-up. Quotes it, chases it, wins it.',
    status: 'In pilot',
    badges: ['United Kingdom', 'Metal fabrication'],
    tagline: 'Quotes it. Chases it. Wins it.',
    text: 'Quote intake and follow-up for UK metal fabrication shops. Turns photo and sketch enquiries into complete job requests and follows up on every quote automatically.',
    features: [
      ['Reads every message', 'Website forms, emails and phone notes, including photos and sketches.'],
      ['Writes the reply', "Asks only for what's missing, ready for you to approve and send."],
      ['Quotes it and chases it', 'Check-ins go out on schedule until the customer replies.'],
      ['Shows the money', 'Every pound in your pipeline, in plain sight.']
    ],
    url: 'Leadsmith · product walkthrough',
    video: '/media/leadsmith.mp4',
    poster: '/media/leadsmith-poster.jpg'
  },
  {
    id: 'eventsmith',
    name: 'EventSmith',
    dot: '#F3E6D3',
    switchLabel: 'EventSmith · Event rental',
    menuTag: 'AI quoting · Event rental',
    menuText: 'Inquiry in. Quote out. Quotes built from your catalog and stock.',
    status: 'AI quoting',
    badges: ['Event rental businesses'],
    tagline: 'Inquiry in. Quote out.',
    text: 'AI quoting for event rental businesses. EventSmith reads each inquiry, builds the quote from your own catalog and stock, and follows up for you.',
    features: [
      ['Reads the inquiry', 'Picks out the date, venue, guest count and what the customer needs.'],
      ['Builds the quote', 'From your own catalog and live stock availability.'],
      ['Waits for your approval', 'Nothing goes out until you approve it.'],
      ['Follows up for you', 'Scheduled follow-ups on every open quote.'],
      ["Shows what you're missing", 'AI insights on lost demand, pricing signals and repeat events.']
    ],
    live: 'https://eventsmith.vercel.app',
    url: 'eventsmith.vercel.app',
    video: '/media/eventsmith.mp4',
    poster: '/media/eventsmith-poster.jpg'
  }
];

export const steps = [
  { title: 'Business review', text: 'We study your current setup and find where revenue is lost or capped.', get: 'a map of where revenue is lost' },
  { title: 'Plan', text: 'You get a short list of fixes, ranked by revenue impact.', get: 'fixes ranked by impact' },
  { title: 'Build', text: 'We put them in place on top of what you already use.', get: 'a working first version in 2 weeks' },
  { title: 'Measure & improve', text: 'We track the impact and keep improving it.', get: 'impact measured from launch' }
];

export const engagement = [
  { title: 'Revenue review', icon: 'searchPlus', text: 'We study your setup and show where revenue is lost or capped. Your project is scoped from what we find.' },
  { title: 'One-time build fee', icon: 'wrench', text: 'We build the systems on top of what you already use. You own all the code, data and IP.', featured: true },
  { title: 'Monthly plan', icon: 'trend', text: 'Ongoing support and improvements, with impact tracked from launch.', optional: true }
];

export const reasons = [
  { title: 'No rip-and-replace', icon: 'link', text: 'We work with your current systems.' },
  { title: 'Measured by revenue', icon: 'dollar', text: 'Success means more money, not more features.' },
  { title: 'You own everything', icon: 'lock', text: 'The code, the data and the IP are all yours.' },
  { title: 'Direct access', icon: 'chat', text: 'You work directly with the people building your system.' }
];

export const faqs = [
  ['Do we need to change our current software?', 'No. We build on top of the tools you already use.'],
  ['What size of business do you work with?', 'Small and mid-sized businesses that have a working setup and want more revenue from it.'],
  ['How soon do we see results?', "You'll have a working first version within two weeks, and impact is measured from launch."],
  ['How is pricing structured?', 'Each project is scoped after the revenue review: a one-time build fee, with an optional monthly plan for support and improvements.'],
  ['Who owns what you build?', 'You do. All code, data and IP are transferred to your business.']
];

export const images = {
  about: px(1181370),
  process: px(7693692),
  why: px(7698712, 1920),
  help: px(12899191, 900),
  menuLeadsmith: px(4400533, 700),
  menuIndustries: px(8377802, 700)
};

export const band = {
  video: 'https://videos.pexels.com/video-files/7989474/7989474-hd_1920_1080_25fps.mp4',
  poster: 'https://images.pexels.com/videos/7989474/pexels-photo-7989474.jpeg?auto=compress&w=1600'
};

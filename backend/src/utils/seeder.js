import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Service from '../models/Service.js';
import Blog from '../models/Blog.js';
import Testimonial from '../models/Testimonial.js';
import VastuDirection from '../models/VastuDirection.js';
import VastuMistake from '../models/VastuMistake.js';
import VastuRemedy from '../models/VastuRemedy.js';
import VastuSeason from '../models/VastuSeason.js';
import Admin from '../models/Admin.js';
import HomeContent from '../models/HomeContent.js';
import VastuBookPage from '../models/VastuBookPage.js';
import AboutContent from '../models/AboutContent.js';
import YogadhanContent from '../models/YogadhanContent.js';
import ContactInfo from '../models/ContactInfo.js';
import VastuContent from '../models/VastuContent.js';


// Load environmental variables
dotenv.config();

// Connect to database
connectDB();

// --- Static Data Definitions ---

const services = [
  {
    title: 'Vastu Discussion',
    category: 'Vastu Shastra',
    sub: 'Directions, Placements & Energy Corrections',
    desc: 'Vastu consultation balances the energy of your home or workplace environment. It provides guidance on directions, placements, and necessary corrections. These suggestions help create prosperity, peace, and overall well-being completely without demolition.',
    price: 5100,
    duration: 60,
    note: 'Vastu Consultation fees will decide after discussion',
    imgUrl: '/vastu_terracotta.png',
    list: [
      'Residential Vastu: Peaceful living & family well-being',
      'Office & Showroom Vastu: Enhanced sales & productivity',
      'Factory Vastu: Machinery alignment & operational safety',
      'School & College Vastu: Concentration & academic growth',
      'Hotel & Hospital Vastu: Fast healing & guest comfort'
    ],
    isActive: true,
    order: 0
  },
  {
    title: 'Numerology Consultation',
    category: 'Numerology',
    sub: 'Vibrational Frequency & Lo Shu Grid',
    desc: 'Numerology helps you understand how numbers influence your life path and personality. It provides guidance for career, relationships, and financial decisions with deeper clarity, utilizing classic birth grid alignments.',
    price: 3100,
    duration: 30,
    note: 'Lifetime Report + Remedies',
    imgUrl: '/numerology_terracotta.png',
    list: [
      'Name vibration tuning & correction',
      'Birth & Destiny numbers assessment',
      'Personal or corporate branding alignment',
      'Lucky dates, periods & cycle guides'
    ],
    isActive: true,
    order: 1
  },
  {
    title: 'Astrology Consultation',
    category: 'Astrology',
    sub: 'Kundli Readings & Planetary Cures',
    desc: 'Astrology consultation analyzes your birth chart to understand life challenges and opportunities. It gives clear answers related to career, marriage, health, and personal growth. Effective remedies are suggested to reduce obstacles and bring positivity.',
    price: 4100,
    duration: 45,
    note: '',
    imgUrl: '/astrology_terracotta.png',
    list: [
      'Birth chart (Kundli) assessment',
      'Major period (Dasha) analysis',
      'Practical gemstone & elemental remedies',
      'Negative star alignment corrections'
    ],
    isActive: true,
    order: 2
  },
  {
    title: 'Tarot Reading',
    category: 'Tarot Reading',
    sub: 'Intuitive Insight & Future Paths',
    desc: 'Tarot reading offers intuitive insights into your present situation and future possibilities. It helps you find answers about love, career, emotions, and important life choices. The session brings clarity, confidence, and peaceful direction to your mind.',
    price: 2100,
    duration: 45,
    note: '',
    imgUrl: '/tarot_terracotta.png',
    list: [
      'Love & relationship emotional insights',
      'Paragraph timing answers',
      'Decision-making clarity guidance',
      'Mindfulness & spiritual grounding'
    ],
    isActive: true,
    order: 3
  },
  {
    title: 'Relationship Counselling',
    category: 'Counselling',
    sub: 'Mutual Understanding & Connection',
    desc: 'Relationship counselling helps you improve understanding and emotional connection with your partner or family. It focuses on resolving conflicts, misunderstandings, and communication issues effectively.',
    price: 2400,
    duration: 60,
    note: '',
    imgUrl: '/relationship_terracotta.png',
    list: [
      'Couples communication mapping',
      'Resolving family grid conflicts',
      'Overcoming generational misunderstandings',
      'Deepening mutual trust & connection'
    ],
    isActive: true,
    order: 4
  },
  {
    title: 'Aura Scanner',
    category: 'Vastu Shastra',
    sub: 'Energy Vibrations & Environmental Scanning',
    desc: 'Aura scanning evaluates the energy fields around you or your physical properties. By checking the energy of land, homes, and factories, it helps identify blockages, geopathic stress, and positive vibrational hot spots.',
    price: 500,
    duration: 15,
    note: 'To check energy of land, homes, factories',
    imgUrl: '/vastu_terracotta.png',
    list: [
      'Detecting geopathic stress & energy leaks',
      'Checking energy frequency of lands & plots',
      'Home energy field alignment analysis',
      'Factory machinery & workspace vibe scan'
    ],
    isActive: true,
    order: 5
  },
  {
    title: 'Yogadhan System',
    category: 'Yogadhan',
    sub: 'Divine Alignment & Spatial Calibrations',
    desc: 'Yogadhan is an integrated, scientific method developed by Rudra Ji. It unites Vastu-Shastra, Numerology, and Horoscope Astrology into a single cohesive framework.',
    price: 0,
    duration: 30,
    note: 'Free Thursday Energy Calibrations',
    imgUrl: '/vastu_terracotta.png',
    list: [
      'Astrological Kundli alignment with home coordinates',
      'Numerological name vibration corrections',
      'Telluric earth energy grid calibrations'
    ],
    isActive: true,
    order: 6
  }
];

const blogs = [
  {
    title: 'How Vastu Shastra Can Transform Your Home and Life',
    category: 'Vastu Shastra',
    date: 'November 18, 2025',
    author: 'Rudra Ji',
    readTime: '4 Min Read',
    imgUrl: '/vastu_terracotta.png',
    summary: 'Vastu Shastra is an ancient Indian science that focuses on balancing the five elements—earth, water, fire, air, and space—within your living environment. Every home and workplace carries energy, and when this energy flows in the right direction, it brings peace, health, and prosperity.',
    content: [
      'Vastu Shastra is an ancient Indian science that focuses on balancing the five elements—earth, water, fire, air, and space—within your living environment. Every home and workplace carries energy, and when this energy flows in the right direction, it brings peace, health, and prosperity. Many people experience stress, financial blocks, or relationship problems simply because the energy structure of their space is disturbed. Vastu helps to identify these imbalances and correct them through simple yet powerful changes.',
      'The entrance of a house, placement of kitchen, bedroom direction, and even the position of mirrors play a major role in shaping your daily life. For example, sleeping in the wrong direction can cause anxiety and health issues, while an improper kitchen placement can affect finances and family harmony. Vastu does not demand expensive reconstruction; most corrections are done through rearranging furniture, colors, symbols, and energy remedies completely without demolition.',
      'Modern life has made people ignore the connection between space and mind. When your surroundings are aligned with natural laws, your thoughts become calmer and opportunities start flowing easily. Many clients have seen improvement in business growth, marriage harmony, and children’s education after following vastu guidance. Vastu is not superstition—it is practical energy management for better living.',
      'If you feel stuck despite hard work, your home energy might be the hidden reason. A professional vastu consultation analyzes your floor plan, directions, and personal problems to give customized solutions. Creating a vastu-balanced space is like opening a door for success to enter naturally.'
    ],
    isPublished: true
  },
  {
    title: 'Astrology – A Spiritual GPS for Your Life',
    category: 'Astrology',
    date: 'November 18, 2025',
    author: 'Rudra Ji',
    readTime: '3 Min Read',
    imgUrl: '/astrology_terracotta.png',
    summary: 'Astrology is often misunderstood as predicting the future, but its true purpose is to serve as a spiritual GPS. By analyzing the planetary positions at the time of your birth, astrology reveals your strengths, life purpose, and potential hurdles.',
    content: [
      'Astrology is often misunderstood as predicting the future, but its true purpose is to serve as a spiritual GPS. By analyzing the planetary positions at the time of your birth, astrology reveals your strengths, life purpose, and potential hurdles. It helps you navigate career shifts, relationship dynamics, and spiritual growth with clarity.',
      'Your birth chart (Kundli) is a map of the heavens at the exact millisecond you drew your first breath. It contains planetary angles that represent karma, subconscious desires, and energy grids. When planetary periods (Dashas) align, specific events or opportunities emerge. Knowing this timing lets you prepare instead of struggling blindly against cosmic tides.',
      'Through practical, simple remedies—such as wearing selected crystals, performing sound chanting, or balancing cosmic elements with water or fire—you can pacify active planets and strengthen weak ones. Astrology doesn\'t restrict your free will; it empowers you with divine foresight to make choices that align with your ultimate cosmic design.'
    ],
    isPublished: true
  },
  {
    title: 'Tarot Reading – Listening to Your Inner Voice',
    category: 'Tarot Reading',
    date: 'November 18, 2025',
    author: 'Rudra Ji',
    readTime: '3 Min Read',
    imgUrl: '/tarot_terracotta.png',
    summary: 'Tarot cards are powerful mirrors reflecting your subconscious mind. A tarot session doesn\'t just reveal what lies ahead; it unlocks your deep inner wisdom to help you solve present dilemmas, heal relationships, and restore mental peace.',
    content: [
      'Tarot cards are powerful mirrors reflecting your subconscious mind. A tarot session doesn\'t just reveal what lies ahead; it unlocks your deep inner wisdom to help you solve present dilemmas, heal relationships, and restore mental peace.',
      'Every tarot card holds archetype symbols, colors, and astrological frequencies. The cards chosen during a session represent energy grids in your life right now. By interpreting these symbols, a professional reader acts as a guide, revealing blocks or hidden paths that your active mind has missed.',
      'Whether you are at a crossroad in your career, feeling a distance in your relationships, or seeking spiritual clarity, Tarot reading brings a feeling of deep relief and absolute peace, allowing you to walk forward with strong purpose and renewed power.'
    ],
    isPublished: true
  },
  {
    title: 'Relationship Counselling – Healing Hearts, Not Just Problems',
    category: 'Counselling',
    date: 'November 18, 2025',
    author: 'Rudra Ji',
    readTime: '4 Min Read',
    imgUrl: '/relationship_terracotta.png',
    summary: 'Relationships are built on delicate energetic and emotional connections. Relationship counselling focuses on looking beneath arguments to heal deep communication filters, resolve core planetary/emotional blocks, and restore mutual trust.',
    content: [
      'Relationships are built on delicate energetic and emotional connections. Relationship counselling focuses on looking beneath arguments to heal deep communication filters, resolve core planetary/emotional blocks, and restore mutual trust.',
      'When communication breaks down, partners start reacting from childhood patterns or planetary imbalances in their birth charts. Counselling creates a safe, neutral portal where both sides can speak and actually be heard without judgment or defensive walls.',
      'By combining emotional mapping, empathetic communication training, and spiritual space clearing (such as cleansing Vastu energy grids), relationships can undergo a massive transformation, converting daily tension into deep mutual respect and divine connection.'
    ],
    isPublished: true
  },
  {
    title: 'Numerology – The Secret Language of Numbers',
    category: 'Numerology',
    date: 'November 18, 2025',
    author: 'Rudra Ji',
    readTime: '3 Min Read',
    imgUrl: '/numerology_terracotta.png',
    summary: 'Numbers are not just symbols for counting; they are active energetic vibrations. Numerology analyzes your name and birth date coordinates to map your personality traits, potential successes, and ideal cosmic frequencies.',
    content: [
      'Numbers are not just symbols for counting; they are active energetic vibrations. Numerology analyzes your name and birth date coordinates to map your personality traits, potential successes, and ideal cosmic frequencies.',
      'Using classic grids like the Lo Shu Grid, we analyze missing numbers and dominant frequencies. Your name vibration is incredibly powerful—a simple name correction or spelling shift can align your frequency with lucky numbers, unlocking career progression, luxury attraction, and deep harmony.',
      'Understanding your life path number and personal cycle numbers lets you sync with nature\'s seasons. Instead of pushing when the universe says "rest", or resting when opportunity gates are wide open, you learn to step forward in perfect numeric timing.'
    ],
    isPublished: true
  }
];

const testimonials = [
  {
    name: 'Loki',
    text: 'I got Worlds🌎 Best Astrologer. It is miracle for my life. All problems solved within three month. Nakshtra remedy is so powerful. …',
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 0
  },
  {
    name: 'Anand Ojha',
    text: 'Gwalior se badiya Jyotishi muze Rudra Jyotish me mile. Guruji ka knowledge bahut hi shandar hai. Nakshatra Photo ke upay se matra 20 din me mujhe apne kaam me safalta gai. Thanks Guruji 👍 …',
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 1
  },
  {
    name: 'Suraj Sharma',
    text: 'Mere sath mari life mai jo chal ra tha . Mai bhot jada preshan tha . Phir mai guru ji se mila unhone sari problem mere bolne se pehel hi sab bata diya . Phir muze guru ji ne upaye bataye mein kiye upaye se muze bhot jada fayada hua . Or ah bhot relief hai .',
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 2
  },
  {
    name: 'PrratYush S MohTTa',
    text: 'Hi I am Pratyush from Bengluru. My life was completely messed up in terms of personal and professional. I consulted RUDRA JYOTISH KENDRA INDORE for my problems to instant solution. Guruji examined my Horoscope with details. He gave me … More',
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 3
  },
  {
    name: 'Ashwin Gupta',
    text: 'Namste Gurudev. I am very lucky for pridicted my Horoscope. I have lot of troubles in my life, but your accurate pridiction is very useful to me. I am 100% satisfied to your remedies.',
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 4
  },
  {
    name: 'Kartavya Dhillon',
    text: 'Rudra Jyotish Kendra Indore truly provides clear and confidence-building guidance. The astrologer explained every point with patience and depth. I felt mentally relaxed after the session. very good service.',
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 5
  },
  {
    name: 'Bharat Kumar',
    text: 'I am from Burhanpur. I am suffering from Negetivity, Dipression and a lot of problems. I took my hocoroscpe in Rudra Jyotish kdndra Indore. Guruji gave me great remedy. Now I am very well and suitable position ❤️❤️❤️',
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 6
  },
  {
    name: 'Manmohan Sarkar',
    text: 'Jai shree krishna. I am Aashi Sharma from Khargone. Guruji ka Ashirvad hamesha bana rahe yahi kamna hai.',
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 7
  },
  {
    name: 'Mukesh Chokhatiya',
    text: "It's Indore best Astrology Centre. I am very dipression and tension. Now I am very happy Very Nice Result. Good remedy.",
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 8
  },
  {
    name: 'meenakshi chaudhary',
    text: 'Best astrologer..most accurate predictions..highly recommend to anyone ..ekdum sahi prediction hai',
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 9
  },
  {
    name: 'Manish Advertising',
    text: 'One of the best astrology centers I’ve ever visited. The Astrologer is polite, and the astrologer explains everything in detail with great patience.',
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 10
  },
  {
    name: 'Yash Chouhan',
    text: 'I got my girlfriend love. She is very angry 😠. But guru ji remedy is very powerful. lot of thanks sir. …',
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 11
  },
  {
    name: 'Suraj Damade',
    text: "Indore's Best astrologer. Very highly knowledgeable person. Very kind and Helpful nature. Thanks Guruji",
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 12
  },
  {
    name: 'Sandhya Thakur',
    text: 'Very best dicision and prediction for my two children. I always recommended for this astrology center.',
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 13
  },
  {
    name: 'Rijika Pradhan',
    text: 'I got very poweful remedy. It is a true Astrology center. I think I will get Govt. Job or a very good Husband. Thanks lot of Sir.',
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 14
  },
  {
    name: 'Pankaj Kumar (Yoga teacher)',
    text: 'My experience at Rudra Jyotish Kendra Indore was truly insightful as the astrologer shared accurate predictions and practical direction. The way they explained everything felt genuine and comforting. A great place for proper guidance. highly recommended.',
    rating: 5,
    role: 'Yoga Teacher',
    isVisible: true,
    order: 15
  },
  {
    name: 'Jaiveer Singh',
    text: 'Rudra Jyotish Kendra Indore offered me a very detailed and meaningful horoscope reading. The astrologer clearly explained every planetary influence and its impact on my life. I received practical remedies that were easy to follow. truly a dependable astrology centre.',
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 16
  },
  {
    name: 'Nikesh',
    text: 'Meri family ke matters ko lekar yahan se bohot sahi suggestion mila. Simple words mein sab samjhaya aur proper direction diya. Kaafi relief feel hua consultation ke baad. trusted place.',
    rating: 5,
    role: 'Verified Reviewer',
    isVisible: true,
    order: 17
  },
  {
    name: 'Piyush Sardiya',
    text: 'I have a lot of problems but guruji gave me best remedy now I am a SBI Officer. Thanks guruji.',
    rating: 5,
    role: 'SBI Officer',
    isVisible: true,
    order: 18
  }
];

const directions = [
  {
    code: 'N',
    name: 'North (Uttar)',
    deity: 'Kuber — Lord of Wealth',
    element: 'Water (Jal)',
    elementColor: 'var(--color-purple)',
    elementBg: 'rgba(59,130,246,0.12)',
    focus: 'Career, Wealth & New Opportunities',
    dos: [
      'Place mirrors on the North wall to amplify wealth energy.',
      'Keep this zone light, clean, and clutter-free.',
      'Decorate with blue, green, or a flowing water fountain.',
      'Store financial documents and valuables here.'
    ],
    donts: [
      'Avoid heavy furniture or storage in this zone.',
      'Never place a toilet or kitchen in the North.',
      'Do not use red or warm fire colors here.',
      'Avoid overhead water tank in the North (causes pressure on wealth).'
    ]
  },
  {
    code: 'NE',
    name: 'Northeast (Eeshan)',
    deity: 'Shiva / Supreme Divine',
    element: 'Water + Ether',
    elementColor: 'var(--color-purple)',
    elementBg: 'rgba(59,130,246,0.12)',
    focus: 'Wisdom, Spirituality & Mental Peace',
    dos: [
      'Perfect zone for a meditation or Pooja (prayer) room.',
      'Keep a bowl of fresh water with floating flowers.',
      'Ensure maximum windows to let in morning sunlight.',
      'Place a small crystal pyramid or pyramid grid here.'
    ],
    donts: [
      'Never place a toilet, kitchen, or septic tank here — major Vastu Dosha.',
      'Avoid storing junk, shoes, or heavy items.',
      'Do not build a bedroom in this corner.',
      'Never cut or slope the NE corner of your plot.'
    ]
  },
  {
    code: 'E',
    name: 'East (Purva)',
    deity: 'Indra & Surya — Lord of Light',
    element: 'Air / Wood (Vayu)',
    elementColor: 'var(--color-indigo)',
    elementBg: 'rgba(16,185,129,0.12)',
    focus: 'Social Connections, Health & Recognition',
    dos: [
      'Ideal for main entrance or large, open windows.',
      'Place wooden decor items and lush green plants.',
      'Hang a brass emblem of the Sun on the East wall.',
      'Face East while eating breakfast for health benefits.'
    ],
    donts: [
      'Avoid high walls or blockages that block morning sunlight.',
      'Do not place heavy metal cabinets or storage tanks here.',
      'Never place toilets directly in the East.',
      'Avoid storing waste or garbage in this direction.'
    ]
  },
  {
    code: 'SE',
    name: 'Southeast (Agneya)',
    deity: 'Agni — Lord of Fire',
    element: 'Fire (Agni)',
    elementColor: 'var(--color-gold)',
    elementBg: 'rgba(255,51,51,0.12)',
    focus: 'Cash Flow, Energy, Passion & Health',
    dos: [
      'Best direction for the Kitchen; stove should face East.',
      'Place electrical appliances, boilers, and invertors here.',
      'Use warm colors — red, orange, pink, or terracotta.',
      'Keep candles or lamps lit in the SE to boost financial flow.'
    ],
    donts: [
      'Avoid water tanks, sinks, or fountains in this zone.',
      'Do not build a toilet or master bedroom here.',
      'Never use blue or black decor colors in the SE.',
      'Avoid placing a fish tank or swimming pool here.'
    ]
  },
  {
    code: 'S',
    name: 'South (Dakshin)',
    deity: 'Yama — Lord of Justice',
    element: 'Fire / Earth',
    elementColor: 'var(--color-yellow)',
    elementBg: 'rgba(251,191,36,0.12)',
    focus: 'Fame, Relaxation & Restful Sleep',
    dos: [
      'Build high, solid walls and heavy structures here.',
      'Ideal for bedrooms and offices to ground your energy.',
      'Use wooden furniture and deep earth tones.',
      'Place tall, heavy bookshelves or wardrobes in the South wall.'
    ],
    donts: [
      'Do not place borewells, water pumps, or underground tanks.',
      'Avoid placing main entrances facing South without correction.',
      'Do not leave this area empty or open.',
      'Avoid sleeping with feet pointing South (toward Yama).'
    ]
  },
  {
    code: 'SW',
    name: 'Southwest (Nairutya)',
    deity: 'Niruthi — Lord of Ancestors',
    element: 'Earth (Prithvi)',
    elementColor: 'var(--color-yellow)',
    elementBg: 'rgba(251,191,36,0.12)',
    focus: 'Stability, Master Bedroom & Relationships',
    dos: [
      'Best zone for the Master Bedroom; headboard towards South or West.',
      'Place heavy safes, wardrobes, and structural columns here.',
      'Keep the area elevated, solid, and well-built.',
      'Use earth colors — beige, brown, clay, and cream.'
    ],
    donts: [
      'Never place a toilet or kitchen here; drains stability and wealth.',
      'Avoid water bodies, swimming pools, or underground tanks.',
      'Do not have large open windows or main doors in SW.',
      'Avoid cutting or removing the SW corner during renovation.'
    ]
  },
  {
    code: 'W',
    name: 'West (Paschim)',
    deity: 'Varuna — Lord of Water/Oceans',
    element: 'Space / Metal (Akash)',
    elementColor: 'var(--color-indigo)',
    elementBg: 'rgba(16,185,129,0.12)',
    focus: 'Gains, Profits & Child Prosperity',
    dos: [
      'Ideal for study rooms, dining areas, or overhead water tanks.',
      'Use white, grey, silver, or golden colors.',
      'Decorate with metal artifacts and circular shapes.',
      'Place children\'s study table here for academic success.'
    ],
    donts: [
      'Never construct a kitchen or fireplace in the West.',
      'Do not store tangled extension cords or wires here.',
      'Avoid low walls or large unshaded glass walls facing West.',
      'Never store medicines or healthcare items only in this zone.'
    ]
  },
  {
    code: 'NW',
    name: 'Northwest (Vayavya)',
    deity: 'Vayu — Lord of Wind',
    element: 'Air (Vayu)',
    elementColor: 'var(--color-indigo)',
    elementBg: 'rgba(16,185,129,0.12)',
    focus: 'Support System, Legal Matters & Travel',
    dos: [
      'Great location for guest bedrooms, toilets, or storage rooms.',
      'Ideal for finished goods storage, garage, or parking.',
      'Hang wind chimes, white crystals, and silver decor.',
      'Use light grey, silver, and off-white shades here.'
    ],
    donts: [
      'Never place the master bedroom here; causes instability in relationships.',
      'Do not lock up permanent financial assets here.',
      'Avoid tall trees directly blocking wind from the NW.',
      'Never keep expired or broken items in this zone.'
    ]
  }
];

const commonMistakes = [
  {
    mistake: 'Toilet in the Northeast',
    impact: 'Most severe Vastu Dosha — causes mental illness, financial collapse, and spiritual blockages.',
    remedy: 'Seal and discontinue use. Place a copper Swastika or pyramid on the toilet wall.',
    severity: 'critical',
    color: 'var(--color-gold)'
  },
  {
    mistake: 'Main Entrance Facing South',
    impact: 'Attracts obstacles, legal problems, conflicts, and sudden losses.',
    remedy: 'Place a lead metal strip at the threshold and hang a Vastu pyramid above the door.',
    severity: 'high',
    color: 'var(--color-gold)'
  },
  {
    mistake: 'Mirror Facing the Bed',
    impact: 'Disturbs sleep, drains vital energy (prana), causes relationship stress and health issues.',
    remedy: 'Cover the mirror at night with a cloth or permanently relocate the mirror.',
    severity: 'medium',
    color: 'var(--color-yellow)'
  },
  {
    mistake: 'Kitchen in the Northeast',
    impact: 'Fire in the water zone creates severe health issues, financial instability, and marital discord.',
    remedy: 'Apply a Vastu yantra on the kitchen wall. Place a copper tortoise in the NE area.',
    severity: 'critical',
    color: 'var(--color-gold)'
  },
  {
    mistake: 'Clutter in the North & Northeast',
    impact: 'Blocks wealth energy (Kuber\'s path), stagnates career growth, and causes anxiety.',
    remedy: 'Declutter immediately. Place a crystal cluster or blue gemstone bowl in the North.',
    severity: 'medium',
    color: 'var(--color-yellow)'
  },
  {
    mistake: 'Sleeping with Head pointing North',
    impact: 'Earth\'s magnetic field creates sleep disturbances, headaches, and energy drainage over time.',
    remedy: 'Rotate the bed so the headboard is on the South or East wall.',
    severity: 'medium',
    color: 'var(--color-yellow)'
  },
  {
    mistake: 'Broken or Non-Functional Items',
    impact: 'Broken clocks, dead plants, and leaking taps create stagnant, negative energy in the space.',
    remedy: 'Remove or repair immediately. Replace dead plants with fresh, thriving ones.',
    severity: 'low',
    color: 'var(--color-indigo)'
  },
  {
    mistake: 'Water Feature in Southeast',
    impact: 'Fire (SE) and Water conflict causes financial instability, accidents, and poor health.',
    remedy: 'Move the water feature to North or NE. Place a red or orange object in SE instead.',
    severity: 'high',
    color: 'var(--color-gold)'
  }
];

const quickRemedies = [
  {
    title: 'Rock Salt Bowl',
    icon: 'Shield',
    color: 'var(--color-purple)',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.22)',
    desc: 'Place a bowl of sea rock salt in corners of each room. Replace every 2 months. Absorbs negative energies instantly.'
  },
  {
    title: 'Camphor Purification',
    icon: 'Sparkles',
    color: 'var(--color-indigo)',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.22)',
    desc: 'Burn camphor (kapur) in a clay pot and carry it through every room on Fridays. Clears stagnant prana.'
  },
  {
    title: 'Copper Vastu Spiral',
    icon: 'TrendingUp',
    color: 'var(--color-yellow)',
    bg: 'rgba(251,191,36,0.08)',
    border: 'rgba(251,191,36,0.22)',
    desc: 'Bury a copper spiral in the center of the home (Brahmasthana). Activates the energetic core of the building.'
  },
  {
    title: 'Fresh Tulsi Plant',
    icon: 'Leaf',
    color: 'var(--color-indigo)',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.22)',
    desc: 'A Tulsi plant in the North or East purifies air and repels negative energies. Water it daily except Sundays.'
  },
  {
    title: 'Wind Chimes',
    icon: 'Wind',
    color: 'var(--color-purple)',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.22)',
    desc: 'Hang 6 or 8-rod metal wind chimes in the West or Northwest. They activate stagnant Vayu (Air) energy.'
  },
  {
    title: 'Crystal Pyramid',
    icon: 'Mountain',
    color: 'var(--color-yellow)',
    bg: 'rgba(251,191,36,0.08)',
    border: 'rgba(251,191,36,0.22)',
    desc: 'A clear quartz pyramid placed in the NE amplifies spiritual energy and protects the home from doshas.'
  }
];

const seasons = [
  {
    season: 'Spring (Vasant)',
    months: 'March — May',
    icon: 'Leaf',
    color: 'var(--color-indigo)',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.25)',
    tips: [
      'Deep-clean all corners — especially the North and NE zones.',
      'Introduce fresh green plants throughout the home.',
      'Open all windows daily for 2+ hours to renew air energy.',
      'Plant seeds or herbs in the East garden for prosperity rituals.'
    ]
  },
  {
    season: 'Summer (Grishma)',
    months: 'June — August',
    icon: 'Sun',
    color: 'var(--color-gold)',
    bg: 'rgba(255,51,51,0.08)',
    border: 'rgba(255,51,51,0.25)',
    tips: [
      'Place blue and indigo crystals in the North to cool water energy.',
      'Add a small indoor water fountain in the North to balance heat.',
      'Avoid red decor in the Southeast during peak summer.',
      'Use vetiver (khus) mats on doors to cool incoming air.'
    ]
  },
  {
    season: 'Monsoon (Varsha)',
    months: 'July — September',
    icon: 'Droplets',
    color: 'var(--color-purple)',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.25)',
    tips: [
      'Fix all leaking taps and pipes immediately — financial drain.',
      'Keep the Northeast and North zones extra dry and clean.',
      'Burn camphor every Friday to counter monsoon dampness.',
      'Place a salt lamp in damp corners to absorb moisture energy.'
    ]
  },
  {
    season: 'Autumn (Sharad)',
    months: 'October — November',
    icon: 'Clock',
    color: 'var(--color-yellow)',
    bg: 'rgba(251,191,36,0.08)',
    border: 'rgba(251,191,36,0.25)',
    tips: [
      'Ideal time for home renovation and structural repairs.',
      'Paint walls or refresh decor in preparation for Diwali.',
      'Perform a thorough declutter — donate or discard unused items.',
      'Light diyas (lamps) in the South and Southeast for divine fire blessings.'
    ]
  },
  {
    season: 'Winter (Shishir)',
    months: 'December — February',
    icon: 'Mountain',
    color: 'var(--color-purple)',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.25)',
    tips: [
      'Maximize sunlight entry from the East and Southeast.',
      'Use warm earth colors in decor to balance cold Vayu energy.',
      'Keep a lit lamp or diffuser in the NE for spiritual warmth.',
      'Earth-tone rugs in the Southwest bedroom enhance winter sleep.'
    ]
  }
];

const defaultHomeContent = {
  hero: {
    badge: 'CELESTIAL HARMONY',
    titleLine1: 'Rudra Jyotish',
    titleLine2: 'Transforming Spaces & Destiny',
    description: 'Unlock peace, wealth, and abundance through logical, scientific Vastu alignments and supportive numerological frequency corrections.',
    imageUrl: '/uploads/defaults/hero.png',
    ctaText: 'Book a Consultation',
    compassCtaText: 'Align Your Compass'
  },
  compass: {
    badge: 'INTERACTIVE STABILITY',
    title: 'Test Your Energy Direction',
    description: 'Our universe works through direct currents. Tap the Vastu Chakra on the left to rotate and align the spatial flow. In ancient Vastu, each of the 16 sectors governs a key area of life.',
    successText: 'Vastu Energy Flow Fully Calibrated!',
    instructionText: 'Tap the Vastu Chakra to calibrate space flow.'
  },
  methodology: {
    title: 'Our Three-Step Scientific Flow',
    steps: [
      {
        num: '01',
        title: 'Energy Mapping',
        desc: 'We map the precise directional layout of your premises against the cosmic horoscope coordinates of the primary resident.',
        icon: 'Compass'
      },
      {
        num: '02',
        title: 'No-Demolition Balancing',
        desc: 'Imbalances are rectified using natural colors, specific metal rods, or celestial crystals. 0% structural changes required.',
        icon: 'Sparkles'
      },
      {
        num: '03',
        title: 'Progressive Remedies',
        desc: 'We introduce subtle remedies and personal name corrections to align the environment’s frequency with supportive forces.',
        icon: 'Sun'
      }
    ]
  },
  whyUs: {
    badge: 'TRUST PRINCIPLES',
    title: 'Why Align With Us?',
    description: 'We provide clear, practical guides that adapt Vastu and Numerology principles to contemporary living standards.',
    benefits: [
      { text: '100% Scientific directional mapping', color: 'var(--color-purple)' },
      { text: 'Custom-tailored Lo Shu grid numerology analysis', color: 'var(--color-yellow)' },
      { text: 'Practical, modern Vastu guidelines (0% demolition)', color: 'var(--color-indigo)' },
      { text: 'Experienced consulting with direct remote guidance', color: 'var(--color-gold)' }
    ],
    stats: [
      { target: 98, suffix: '%', text: 'Harmony Success Rate', border: 'var(--color-purple)', shadow: 'rgba(59, 130, 246, 0.12)' },
      { target: 0, suffix: '%', text: 'Construction Demolitions', border: 'var(--color-indigo)', shadow: 'rgba(16, 185, 129, 0.12)' },
      { target: 16, suffix: '', text: 'Directions Balanced', border: 'var(--color-yellow)', shadow: 'rgba(251, 191, 36, 0.12)' },
      { target: 1500, suffix: '+', text: 'Homes & Offices Cured', border: 'var(--color-gold)', shadow: 'rgba(255, 51, 51, 0.12)' }
    ]
  },
  testimonialSpotlight: {
    quote: '"Through your guidance in Vastu, Astrology, and Numerology, I not only received the right direction but also gained confidence and mental peace. Your suggestions led to absolute clarity, balance, and positive changes in my life."',
    author: 'POOJA KASHYAP',
    role: 'Client & Testimony',
    ctaText: 'Read More Reviews'
  },
  ctaSection: {
    title: 'Ready to Align Your Life?',
    description: 'Take the first step towards a balanced environment. Request your directional mapping consult today.',
    ctaText: 'Schedule Consultation Now'
  }
};

const defaultBookPages = [
  { imageUrl: '/vastu_tips/vastu_page_1.png', caption: 'Vastu Shastra Tips — Page 1', order: 1 },
  { imageUrl: '/vastu_tips/vastu_page_2.png', caption: 'Vastu Shastra Tips — Page 2', order: 2 },
  { imageUrl: '/vastu_tips/vastu_page_3.jpeg', caption: 'Vastu Shastra Tips — Page 3', order: 3 },
  { imageUrl: '/vastu_tips/vastu_page_4.jpeg', caption: 'Vastu Shastra Tips — Page 4', order: 4 },
  { imageUrl: '/vastu_tips/vastu_page_5.png', caption: 'Vastu Shastra Tips — Page 5', order: 5 },
  { imageUrl: '/vastu_tips/vastu_page_6.png', caption: 'Vastu Shastra Tips — Page 6', order: 6 },
  { imageUrl: '/vastu_tips/vastu_page_7.png', caption: 'Vastu Shastra Tips — Page 7', order: 7 },
  { imageUrl: '/vastu_tips/vastu_page_8.png', caption: 'Vastu Shastra Tips — Page 8', order: 8 },
  { imageUrl: '/vastu_tips/vastu_page_9.png', caption: 'Vastu Shastra Tips — Page 9', order: 9 },
  { imageUrl: '/vastu_tips/vastu_page_10.png', caption: 'Vastu Shastra Tips — Page 10', order: 10 },
  { imageUrl: '/vastu_tips/vastu_page_11.png', caption: 'Vastu Shastra Tips — Page 11', order: 11 },
  { imageUrl: '/vastu_tips/vastu_page_12.png', caption: 'Vastu Shastra Tips — Page 12', order: 12 }
];

const defaultAboutContent = {
  header: {
    badge: 'COSMIC JOURNEY',
    title: 'About Rudra Ji',
    description: 'Meet the founder of Rudra Jyotish—a professional Vastu, Numerology, and Astrology consultant transforming lives across residences, commercial offices, and industrial hubs.'
  },
  profile: {
    badge: 'FOUNDER PROFILE',
    title: 'Rudra Ji',
    subtitle: 'Professional Vastu, Numerology & Astrology Consultant',
    desc1: 'I truly believe in the miraculous powers of the nature. The entire universe is there to take care of all our needs and help us to live a healthy and prosperous life. I am a firm believer in the fact that there is something more that meets the eye. Some more powers of the nature, that lie hidden and come forth when no scientific theories can prove their existence.',
    desc2: 'With over 20 years of diversified experience in Aviation, Hospitality, and Information Technology industries with global leaders like Kingfisher Airlines, Cyient Limited, and Alexandria Equities Management Company, I bridge ancient cosmic structures with logical scientific metrics.',
    imageUrl: '/uploads/defaults/profile.png'
  },
  doDont: {
    doTitle: 'What I Do',
    doList: [
      { title: 'Vastu & Earth Energy:', desc: 'Balance houses, offices, and factories by studying earth energy networks completely without demolition.' },
      { title: 'Numerology Alignment:', desc: 'Map birth dates and corrections for name tuning, corporate titles, or branding flow using classic Lo Shu Grids.' },
      { title: 'Astrology Guidance:', desc: 'Conduct detailed horoscope and Kundli readings focusing on planetary periods and remedies.' }
    ],
    dontTitle: "What I Don't Do",
    dontList: [
      { title: 'No Major Demolitions:', desc: 'We avoid recommending structural breakdowns or architectural rebuilds in 98% of Vastu cases.' },
      { title: 'No Forced Remedies:', desc: 'We do not advocate for expensive planetary symbols or forced prescriptions. All solutions are logical.' },
      { title: 'No Superstitions:', desc: 'Our processes are scientific energy alignments backed by structural geometry.' }
    ]
  },
  journey: {
    badge: 'THE PATH OF ALIGNMENT',
    title: 'My Journey',
    subtitle: 'Professional Vastu, Numerology & Astrology Consultant',
    desc1: 'With over 20 years of diversified experience in Aviation, Hospitality, and Information Technology industries with global leaders like Kingfisher Airlines, Cyient Limited, and Alexandria Equities Management Company, Rudra Ji is a successful figure during the course of her journey performing her duties very effectively.',
    desc2: 'Rudra Ji has a great sense of judgment and patience that comes from her initial start of career as an Cabin Crew, followed by a progressive career in the Real Estate Industry where she managed people and business with singular responsibilities. She is an excellent networker and possesses the quality of simplicity with brains.',
    desc3: 'Rudra Ji is MBA by qualification and thoroughly enjoys her working for social and professional reasons, bridging corporate strategy with elemental cosmic geometry.',
    desc4: 'Her years of learning practice, mentoring, and guiding hundreds of clients through Vastu shifts, balanced numbers, and Astrology remedies make her calculations unparalleled. Her attention to detail has built a legacy of reliance and success.',
    ctaText: 'Book Call with Rudra Ji',
    imageUrl: '/uploads/defaults/journey.png'
  }
};

const defaultYogadhanContent = {
  hero: {
    badge: 'THE DIVINE SCIENCE',
    title: 'Yogadhan System',
    description: 'Yogadhan is an integrated, scientific method developed by Rudra Ji. It unites ancient Vastu-Shastra, vibrational Numerology, and Horoscope Astrology into a single cohesive framework.'
  },
  split: {
    title: 'Why Yogadhan?',
    desc1: "Standard Vastu often treats spaces in isolation. Yogadhan recognizes that a house is connected to the birth chart (Kundli) of its residents. If a resident's destiny numbers mismatch the home's primary direction, blockages occur.",
    desc2: "Our methodology rectifies this mismatch through logical, non-demolition energy balancing. By matching name numbers and planetary coordinates, Yogadhan creates an abundant ecosystem."
  },
  pillars: [
    {
      title: 'Earth Energy Grid',
      desc: 'Mapping subtle electromagnetic and telluric currents of the plot. By balancing natural planetary lines (invisible energy grids), we clean the spatial template.',
      iconName: 'Compass',
      color: 'var(--color-indigo)',
      bg: 'rgba(16, 185, 129, 0.08)',
      border: 'rgba(16, 185, 129, 0.3)',
      shadow: 'rgba(16, 185, 129, 0.12)'
    },
    {
      title: 'Vibrational Numerology',
      desc: 'Matching personal or business name frequencies to the DOB destiny grid. Alignment blocks natural energy bottlenecks, accelerating smooth financial cycles.',
      iconName: 'Sparkles',
      color: 'var(--color-purple)',
      bg: 'rgba(59, 130, 246, 0.08)',
      border: 'rgba(59, 130, 246, 0.3)',
      shadow: 'rgba(59, 130, 246, 0.12)'
    },
    {
      title: 'Planetary Horoscope',
      desc: 'Looking into major/minor period star positions of the main resident. We place customized metal/color cures at high-frequency spatial hotspots.',
      iconName: 'Sun',
      color: 'var(--color-gold)',
      bg: 'rgba(255, 51, 51, 0.08)',
      border: 'rgba(255, 51, 51, 0.3)',
      shadow: 'rgba(255, 51, 51, 0.12)'
    }
  ],
  cta: {
    title: 'Calibrate Your Spatial Energies',
    description: 'Unlock the powerful abundant frequency inside your personal workspace or home. Get a remote Yogadhan assessment directly.',
    ctaText: 'Book Yogadhan Consult'
  }
};

const defaultContactInfo = {
  header: {
    badge: 'CONNECT',
    title: 'Book Consultation',
    description: 'Schedule a custom directional or numerological assessment session with Rudra Ji. Feel free to reach out to our Mumbai headquarters.'
  },
  location: {
    title: 'Our Headquarters',
    label: 'Office Location',
    addressLines: [
      'Maruti Chamber, Moti Tabela,',
      'Near Collector Office, Near Sandeep Kirana,',
      'Moti Tabela Rd, Indore, MP 452007'
    ]
  },
  whatsapp: {
    label: 'WhatsApp Number',
    number: '+91 91796 22537',
    link: 'https://wa.me/919179622537'
  },
  slots: ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM']
};

const defaultVastuContent = {
  hero: {
    badge: 'HARMONIZE YOUR ENVIRONMENT',
    title: 'Ancient Vastu Shastra Tips',
    description: 'Align your home and workplace with the five natural elements — Panchtattva — for lasting health, wealth, and peace. Explore room-by-room guidance, an interactive compass, common Vastu doshas, and simple non-demolition remedies.'
  },
  bookMeta: {
    coverTitle: 'Vastu Shastra\nTips Book',
    coverSubtitle: 'Sacred Wisdom',
    coverLogo: '/rudralogodark.png',
    introTitle: 'Introduction',
    introText: '"Harmonize your environment to balance the five natural elements, opening the doors to happiness and health."',
    outroTitle: 'Rudra Jyotish',
    outroText: 'Bringing ancient cosmic wisdom to contemporary homes and offices.',
    endTitle: 'RUDRA JYOTISH',
    endSubtitle: 'PEACE • WEALTH • HARMONY',
    endLogo: '/rudralogodark.png'
  }
};


const seedDB = async () => {
  try {
    // 1. Wipe current collections
    await Service.deleteMany({});
    await Blog.deleteMany({});
    await Testimonial.deleteMany({});
    await VastuDirection.deleteMany({});
    await VastuMistake.deleteMany({});
    await VastuRemedy.deleteMany({});
    await VastuSeason.deleteMany({});
    await HomeContent.deleteMany({});
    await VastuBookPage.deleteMany({});
    await AboutContent.deleteMany({});
    await YogadhanContent.deleteMany({});
    await ContactInfo.deleteMany({});
    await VastuContent.deleteMany({});

    console.log('Database wiped successfully.');

    // 2. Insert static assets
    const servicesWithAvailability = services.map(s => {
      if (s.title.toLowerCase().includes('yogadhan')) {
        return {
          ...s,
          availability: {
            activeDays: ['Thursday'],
            slots: [
              { label: 'Morning slots', times: ['10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM', '11:00 AM - 11:30 AM', '11:30 AM - 12:00 PM'] },
              { label: 'Afternoon slots', times: ['12:00 PM - 12:30 PM', '12:30 PM - 01:00 PM', '01:00 PM - 01:30 PM'] }
            ]
          }
        };
      }
      return {
        ...s,
        availability: {
          activeDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          slots: [
            { label: 'Morning slots', times: ['10:00 AM', '11:15 AM', '11:30 AM'] },
            { label: 'Afternoon slots', times: ['02:00 PM', '03:15 PM', '04:30 PM'] },
            { label: 'Evening slots', times: ['05:45 PM', '06:00 PM', '07:15 PM'] }
          ]
        }
      };
    });
    await Service.insertMany(servicesWithAvailability);
    console.log('Seeded Services.');

    await Blog.insertMany(blogs);
    console.log('Seeded Blogs.');

    await Testimonial.insertMany(testimonials);
    console.log('Seeded Testimonials.');

    await VastuDirection.insertMany(directions);
    console.log('Seeded Vastu Directions.');

    await VastuMistake.insertMany(commonMistakes);
    console.log('Seeded Vastu Mistakes.');

    await VastuRemedy.insertMany(quickRemedies);
    console.log('Seeded Vastu Remedies.');

    await VastuSeason.insertMany(seasons);
    console.log('Seeded Vastu Seasons.');

    await HomeContent.create(defaultHomeContent);
    console.log('Seeded Home Content.');

    await VastuBookPage.insertMany(defaultBookPages);
    console.log('Seeded Vastu Book Pages.');

    await AboutContent.create(defaultAboutContent);
    console.log('Seeded About Content.');

    await YogadhanContent.create(defaultYogadhanContent);
    console.log('Seeded Yogadhan Content.');

    await ContactInfo.create(defaultContactInfo);
    console.log('Seeded Contact Info Content.');

    await VastuContent.create(defaultVastuContent);
    console.log('Seeded Vastu Tips Hero Content.');


    console.log('Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error(`Database seeding failed: ${error.message}`);
    process.exit(1);
  }
};

// Start seeding
seedDB();

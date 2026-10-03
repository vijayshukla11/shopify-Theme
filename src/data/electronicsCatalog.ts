import { Product } from '../types/product';

export const CLINZA_ELECTRONICS_PRODUCTS: Product[] = [
  // 1. SMARTWATCHES
  {
    id: 'clinza-smartwatch-ultra-titanium',
    name: 'CLINZA Apex Ultra GPS Smartwatch',
    category: 'smartwatches',
    subcategory: 'Smartwatches',
    price: 3999,
    originalPrice: 6999,
    mrp: 6999,
    discount: '43% OFF',
    rating: 4.9,
    reviewsCount: 284,
    badge: { text: 'BEST SELLER', type: 'success' },
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1200&q=80'
    ],
    hoverImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=80',
    specs: [
      '1.96" Ultra AMOLED Always-On Display (1000 Nits)',
      'Dual-Frequency Precision GPS & Compass',
      'Bluetooth HD Calling with AI Noise Cancellation',
      'Continuous SpO2, Heart Rate & Sleep Tracking',
      'IP68 Water Resistant up to 50 Meters',
      '10-Day Long Battery Endurance on Single Charge'
    ],
    specifications: [
      { label: 'Display', value: '1.96-inch AMOLED (410x502 resolution)' },
      { label: 'Battery Life', value: 'Up to 10 days normal use, 4 days with AOD' },
      { label: 'Water Resistance', value: 'IP68 & 5ATM Water Resistant' },
      { label: 'Connectivity', value: 'Bluetooth 5.3 Low Latency BLE' },
      { label: 'Compatibility', value: 'Android 7.0+ & iOS 12.0+' },
      { label: 'Warranty', value: '1 Year Brand Replacement Warranty' }
    ],
    inStock: true,
    stockCount: 24,
    description: 'The CLINZA Apex Ultra is engineered for performance, precision, and everyday elegance. Featuring a vivid 1.96-inch AMOLED display with 1000 nits peak brightness, aerospace-grade alloy casing, dual-frequency GPS navigation, and comprehensive biometric monitoring. Take seamless calls with dual-mic AI ENC and enjoy up to 10 days of uninterrupted battery backup.',
    shortDescription: '1.96" AMOLED display, dual GPS, Bluetooth calling, 24/7 biometric tracking and 10-day battery life.',
    colors: [
      { name: 'Midnight Titanium', hex: '#1E293B', bgClass: 'bg-slate-900' },
      { name: 'Starlight Silver', hex: '#E2E8F0', bgClass: 'bg-slate-200' },
      { name: 'Desert Orange', hex: '#EA580C', bgClass: 'bg-orange-600' }
    ]
  },
  {
    id: 'clinza-smart-band-pro-pulse',
    name: 'CLINZA Pulse Fit Smart Band Pro',
    category: 'smart-bands',
    subcategory: 'Smart Bands',
    price: 1699,
    originalPrice: 2999,
    mrp: 2999,
    discount: '43% OFF',
    rating: 4.7,
    reviewsCount: 168,
    badge: { text: 'NEW', type: 'new' },
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      '1.47" Full Touch Curved AMOLED Screen',
      '120+ Sports Modes with Auto-Detection',
      'Real-Time Pulse, Blood Oxygen & Stress Monitor',
      'Ultra-Lightweight 18g Ergonomic Curved Body',
      '14-Day Marathon Battery Life with Fast Charge'
    ],
    inStock: true,
    stockCount: 35,
    description: 'Designed for active lifestyles, the CLINZA Pulse Fit combines featherlight comfort with 24/7 fitness intelligence. Track your workouts, monitor deep REM sleep cycles, and stay connected with call and app notifications directly on your wrist.',
    shortDescription: 'Ultra-lightweight 1.47" AMOLED fitness tracker with 120+ sports modes and 14-day battery.',
    colors: [
      { name: 'Obsidian Black', hex: '#0F172A', bgClass: 'bg-slate-950' },
      { name: 'Teal Blue', hex: '#0D9488', bgClass: 'bg-teal-600' }
    ]
  },
  {
    id: 'clinza-analog-watch-chronograph-noir',
    name: 'CLINZA Grand Tour Chronograph Analog Watch',
    category: 'analog-watches',
    subcategory: 'Analog Watches',
    price: 2499,
    originalPrice: 4499,
    mrp: 4499,
    discount: '44% OFF',
    rating: 4.8,
    reviewsCount: 142,
    badge: { text: 'POPULAR', type: 'info' },
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      'Precision Japanese Quartz Chronograph Movement',
      'Surgical 316L Solid Stainless Steel Case',
      'Scratch-Resistant Sapphire-Coated Mineral Crystal',
      'Genuine Italian Full-Grain Leather Strap',
      '50M (5 ATM) Water Resistance'
    ],
    inStock: true,
    stockCount: 19,
    description: 'Classic horological sophistication meets contemporary engineering. The CLINZA Grand Tour features a triple sub-dial chronograph, tachymeter bezel, hand-finished indices, and a quick-release genuine leather strap.',
    shortDescription: 'Japanese quartz chronograph movement, 316L stainless steel case, and genuine leather strap.',
    colors: [
      { name: 'Onyx Dial & Tan Strap', hex: '#78350F', bgClass: 'bg-amber-900' },
      { name: 'Classic Silver & Black', hex: '#1E293B', bgClass: 'bg-slate-900' }
    ]
  },

  // 2. TWS EARBUDS & AUDIO
  {
    id: 'clinza-tws-airbuds-anc-pro',
    name: 'CLINZA Echo Pro ANC Wireless Earbuds',
    category: 'tws-earbuds',
    subcategory: 'TWS Earbuds',
    price: 2299,
    originalPrice: 4999,
    mrp: 4999,
    discount: '54% OFF',
    rating: 4.9,
    reviewsCount: 310,
    badge: { text: 'BEST SELLER', type: 'success' },
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1200&q=80'
    ],
    hoverImage: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=80',
    specs: [
      '42dB Hybrid Active Noise Cancellation (ANC)',
      '12.4mm Titanium Dynamic Bass Boost Drivers',
      '4-Mic Quad ENC with AI Clear Voice Algorithm',
      'Ultra-Low 45ms Gaming Latency Mode',
      'Up to 48 Hours Playback with MagSafe Wireless Case',
      'Dual Pairing: Seamlessly Switch Between Laptop & Phone'
    ],
    inStock: true,
    stockCount: 42,
    description: 'Immerse yourself in studio-grade audio with the CLINZA Echo Pro. Engineered with 42dB hybrid noise cancellation to silence urban clamor and 12.4mm custom titanium drivers for punchy bass and crystalline highs. With instant Bluetooth 5.3 auto-pairing, 48-hour total playtime, and Type-C fast charging (10 mins = 5 hours).',
    shortDescription: '42dB hybrid ANC, 12.4mm titanium drivers, quad-mic ENC, and 48-hour total battery life.',
    colors: [
      { name: 'Phantom Black', hex: '#111827', bgClass: 'bg-gray-900' },
      { name: 'Glacier White', hex: '#F8FAFC', bgClass: 'bg-white' },
      { name: 'Cobalt Blue', hex: '#1D4ED8', bgClass: 'bg-blue-700' }
    ]
  },
  {
    id: 'clinza-neckband-sonic-flex-pro',
    name: 'CLINZA Sonic Flex Magnetic Bluetooth Neckband',
    category: 'neckbands',
    subcategory: 'Neckbands',
    price: 1199,
    originalPrice: 2499,
    mrp: 2499,
    discount: '52% OFF',
    rating: 4.8,
    reviewsCount: 195,
    badge: { text: 'HOT DEAL', type: 'sale' },
    image: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      'Magnetic Smart Hall Sensor On/Off',
      'Super Fast Charge: 10 Min Charge = 20 Hours Playback',
      '60 Hours Total Massive Battery Endurance',
      '13.6mm Deep Bass Dynamic Drivers',
      'IPX5 Sweat & Water Resistant for Workouts'
    ],
    inStock: true,
    stockCount: 28,
    description: 'The CLINZA Sonic Flex is built for non-stop daily grinds and workout sessions. Featuring memory silicone neckband contours, magnetic power switches, and industry-leading 60-hour marathon playtime.',
    shortDescription: '60-hour battery, 10 min fast charging, magnetic earbuds, and deep bass 13.6mm drivers.',
    colors: [
      { name: 'Carbon Black', hex: '#1E293B', bgClass: 'bg-slate-900' },
      { name: 'Electric Red', hex: '#DC2626', bgClass: 'bg-red-600' }
    ]
  },
  {
    id: 'clinza-headphones-anc-studio-max',
    name: 'CLINZA Studio Max Hybrid ANC Wireless Headphones',
    category: 'headphones',
    subcategory: 'Headphones',
    price: 4499,
    originalPrice: 7999,
    mrp: 7999,
    discount: '44% OFF',
    rating: 4.9,
    reviewsCount: 210,
    badge: { text: 'FLAGSHIP', type: 'new' },
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80'
    ],
    hoverImage: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80',
    specs: [
      '40mm Beryllium High-Resolution Acoustic Drivers',
      'Dual-Mode Active Noise Cancellation & Transparency',
      'Protein Memory Foam Cushions for All-Day Wear',
      '65 Hours Playtime (45 Hours with ANC Enabled)',
      'Foldable Swivel Aerospace-Alloy Chassis'
    ],
    inStock: true,
    stockCount: 16,
    description: 'Precision acoustic engineering tailored for music producers, travellers, and audiophiles. The CLINZA Studio Max combines ultra-plush memory foam comfort with exceptional hybrid noise cancellation and Hi-Res certified wireless clarity.',
    shortDescription: 'Hi-Res certified over-ear headphones with 40mm drivers, hybrid ANC, and 65H battery.',
    colors: [
      { name: 'Matte Space Gray', hex: '#334155', bgClass: 'bg-slate-700' },
      { name: 'Ivory Silver', hex: '#F1F5F9', bgClass: 'bg-slate-100' }
    ]
  },
  {
    id: 'clinza-speaker-blast-360-waterproof',
    name: 'CLINZA SoundStorm 360° Waterproof Bluetooth Speaker',
    category: 'speakers',
    subcategory: 'Speakers',
    price: 2499,
    originalPrice: 4999,
    mrp: 4999,
    discount: '50% OFF',
    rating: 4.8,
    reviewsCount: 176,
    badge: { text: 'POPULAR', type: 'info' },
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      '24W Room-Filling Omnidirectional 360° Sound',
      'Dual Passive Radiators for Deep Resonant Bass',
      'IPX7 Completely Submersible Waterproof Body',
      'TWS Stereo Pairing: Connect 2 Speakers Wirelessly',
      '20 Hours Playtime & Integrated Power Bank Feature'
    ],
    inStock: true,
    stockCount: 30,
    description: 'Take festival sound wherever you venture. The CLINZA SoundStorm pumps out 24 watts of immersive 360-degree sound with dual bass radiators. Built with rugged shock-absorbing rubber bumpers and IPX7 waterproofing.',
    shortDescription: '24W 360-degree audio, IPX7 waterproof, dual bass radiators, and 20-hour playback.',
    colors: [
      { name: 'Stealth Black', hex: '#0F172A', bgClass: 'bg-slate-950' },
      { name: 'Military Camo', hex: '#3F6212', bgClass: 'bg-lime-800' }
    ]
  },

  // 3. POWER & CHARGING
  {
    id: 'clinza-powerbank-20000-65w-fast',
    name: 'CLINZA TurboCharge 20,000mAh 65W PD Power Bank',
    category: 'power-banks',
    subcategory: 'Power Banks',
    price: 1999,
    originalPrice: 3999,
    mrp: 3999,
    discount: '50% OFF',
    rating: 4.9,
    reviewsCount: 228,
    badge: { text: 'ESSENTIAL', type: 'success' },
    image: 'https://images.unsplash.com/photo-1609592426868-b769ea84587c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609592426868-b769ea84587c?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      '65W Power Delivery (PD 3.0) — Charges Laptops & Phones',
      '20,000mAh Flight-Approved High-Density Lithium-Polymer',
      'Smart Real-Time Digital LED Percentage Display',
      'Triple Port Output: 2x USB-C + 1x USB-A QC 3.0',
      '12-Layer Smart Circuit Shield Overheat Protection'
    ],
    inStock: true,
    stockCount: 50,
    description: 'Fast charge your MacBook, iPhone, Galaxy, or iPad at peak speeds. The CLINZA TurboCharge 65W delivers laptop-grade power in a compact, airline-approved pocketable design.',
    shortDescription: '65W Power Delivery laptop-compatible power bank with 20000mAh capacity and digital display.',
    colors: [
      { name: 'Metallic Gray', hex: '#475569', bgClass: 'bg-slate-600' },
      { name: 'Matte Jet Black', hex: '#020617', bgClass: 'bg-slate-950' }
    ]
  },
  {
    id: 'clinza-charger-65w-gan-triple-port',
    name: 'CLINZA GaN Pro 65W Fast Wall Charger',
    category: 'chargers',
    subcategory: 'Chargers',
    price: 1499,
    originalPrice: 2799,
    mrp: 2799,
    discount: '46% OFF',
    rating: 4.8,
    reviewsCount: 182,
    badge: { text: 'BEST SELLER', type: 'success' },
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      'Gallium Nitride (GaN III) Technology: 50% Smaller Body',
      '65W Peak Output with Intelligent Dynamic Power Allocation',
      'Dual Type-C (65W) + USB-A (30W) Multi-Device Charging',
      'Universal Support: PPS, PD 3.0, QC 4.0, Apple 20W/30W',
      'Foldable Indian Pins for Seamless Travel Convenience'
    ],
    inStock: true,
    stockCount: 45,
    description: 'Replace all bulky power bricks with one miniature GaN powerhouse. Charges your laptop, tablet, and smartphone concurrently with cool thermal performance and full surge protection.',
    shortDescription: 'Miniature 65W GaN III wall adapter with dual Type-C and USB-A fast charging ports.',
    colors: [
      { name: 'Pure White', hex: '#F8FAFC', bgClass: 'bg-white' },
      { name: 'Graphite Black', hex: '#1E293B', bgClass: 'bg-slate-900' }
    ]
  },
  {
    id: 'clinza-cable-type-c-100w-braided',
    name: 'CLINZA ArmorSync 100W PD Type-C to Type-C Braided Cable (1.8m)',
    category: 'cables',
    subcategory: 'Cables',
    price: 499,
    originalPrice: 999,
    mrp: 999,
    discount: '50% OFF',
    rating: 4.9,
    reviewsCount: 340,
    badge: { text: 'ESSENTIAL', type: 'info' },
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      '100W (20V/5A) Power Delivery High-Speed Charging',
      'E-Marker Smart Chip for Safe Voltage Regulation',
      'Ballistic Military-Grade Nylon Braided Armor Exterior',
      '30,000+ Bend Tested Strain Relief Connectors',
      '480Mbps Data Transfer Rate & Anti-Tangle Velcro Tie'
    ],
    inStock: true,
    stockCount: 120,
    description: 'Built to outlast standard cables by 10x. Features gold-plated pins, zinc alloy shells, and a high-density double braided sheath tested to endure intense daily strain.',
    shortDescription: '100W 5A E-Marker fast charge nylon-braided Type-C cable with 30,000+ bend durability.',
    colors: [
      { name: 'Space Gray & Black', hex: '#334155', bgClass: 'bg-slate-700' }
    ]
  },

  // 4. MOBILE & COMPUTER ACCESSORIES
  {
    id: 'clinza-wireless-magsafe-car-mount',
    name: 'CLINZA MagGrip 15W Fast Wireless Magnetic Car Charger',
    category: 'mobile-accessories',
    subcategory: 'Mobile Accessories',
    price: 1299,
    originalPrice: 2299,
    mrp: 2299,
    discount: '43% OFF',
    rating: 4.7,
    reviewsCount: 112,
    badge: { text: 'NEW', type: 'new' },
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      '16x N52 Neodymium Ultra-Strong Rare Earth Magnets',
      '15W Qi-Certified Fast Wireless Charging',
      '360° Ball Joint for Portrait & Landscape Navigation',
      'Upgraded Steel-Core Air Vent Hook Clamp',
      'Intelligent LED Breathing Indicator Light'
    ],
    inStock: true,
    stockCount: 32,
    description: 'Keep your smartphone securely locked and charged over the bumpiest terrain. Strong magnetic snap with one-hand mounting and fast 15W Qi wireless output.',
    shortDescription: '15W MagSafe wireless car mount with 16x N52 magnets and steel-core vent clamp.',
    colors: [
      { name: 'Matte Black', hex: '#0F172A', bgClass: 'bg-slate-950' }
    ]
  },
  {
    id: 'clinza-laptop-stand-aluminum-ergonomic',
    name: 'CLINZA AeroDesk Foldable Ergonomic Aluminum Laptop Stand',
    category: 'computer-accessories',
    subcategory: 'Computer Accessories',
    price: 1199,
    originalPrice: 2199,
    mrp: 2199,
    discount: '45% OFF',
    rating: 4.9,
    reviewsCount: 220,
    badge: { text: 'POPULAR', type: 'info' },
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      'Solid CNC Sandblasted Aluminum Alloy Construction',
      '6-Level Adjustable Ergonomic Height & Angle Settings',
      'Hollow Open Airflow Design for 40% Better Laptop Cooling',
      'Anti-Slip Silicone Cushions & Protective Front Lips',
      'Ultra-Compact Foldable Design with Felt Travel Pouch'
    ],
    inStock: true,
    stockCount: 40,
    description: 'Elevate your screen to eye level to alleviate neck fatigue and improve desk posture. Precision-machined from solid aluminum with ventilation cutouts and universal support for all 10"-16" laptops.',
    shortDescription: 'CNC aluminum adjustable laptop stand with 6-level tilt and hollow ventilation design.',
    colors: [
      { name: 'Anodized Silver', hex: '#CBD5E1', bgClass: 'bg-slate-300' },
      { name: 'Space Gray', hex: '#475569', bgClass: 'bg-slate-600' }
    ]
  },
  {
    id: 'clinza-3in1-magnetic-charging-station',
    name: 'CLINZA TrioDesk 3-in-1 Foldable Wireless Charging Station',
    category: 'chargers',
    subcategory: 'Chargers',
    price: 2199,
    originalPrice: 3999,
    mrp: 3999,
    discount: '45% OFF',
    rating: 4.8,
    reviewsCount: 154,
    badge: { text: 'BEST SELLER', type: 'success' },
    image: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      'Charge Phone (15W) + Watch (2.5W) + Earbuds (5W) Together',
      'Foldable Travel-Ready Design: Folds Flat to 1.5cm',
      'Strong MagSafe Magnetic Alignment',
      'Nightstand Alarm Mode Compatibility',
      'Soft Silicone Hinges with Velvet Felt Coating'
    ],
    inStock: true,
    stockCount: 25,
    description: 'Declutter your nightstand and desk with one elegant wireless dock. Charges your phone, smartwatch, and TWS earbuds simultaneously from a single Type-C cable.',
    shortDescription: '3-in-1 foldable magnetic charging dock for phone, smartwatch, and wireless earbuds.',
    colors: [
      { name: 'Minimalist Black', hex: '#111827', bgClass: 'bg-gray-900' },
      { name: 'Opal White', hex: '#F9FAFB', bgClass: 'bg-gray-50' }
    ]
  },
  {
    id: 'clinza-executive-tech-bundle',
    name: 'CLINZA Executive Daily Tech Combo (Apex Ultra Watch + Echo Pro Buds + 65W GaN)',
    category: 'combos',
    subcategory: 'Curated Combos',
    price: 6499,
    originalPrice: 11999,
    mrp: 11999,
    discount: '46% OFF',
    rating: 5.0,
    reviewsCount: 88,
    badge: { text: 'SAVE ₹5,500', type: 'sale' },
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      'CLINZA Apex Ultra AMOLED Smartwatch Included',
      'CLINZA Echo Pro 42dB Hybrid ANC Earbuds Included',
      'CLINZA GaN Pro 65W Triple-Port Wall Adapter Included',
      '100W ArmorSync Braided Type-C Cable Included',
      'Complimentary 1-Year VIP Extended Replacement Warranty'
    ],
    inStock: true,
    stockCount: 15,
    description: 'The ultimate everyday productivity trio for modern executives, creators, and students. Everything you need to work, communicate, and travel at peak performance.',
    shortDescription: 'Apex Ultra Smartwatch, Echo Pro ANC Earbuds, 65W GaN Charger & 100W Cable bundle.',
    colors: [
      { name: 'Executive Stealth Bundle', hex: '#0F172A', bgClass: 'bg-slate-900' }
    ]
  }
];

export const CLINZA_ELECTRONICS_CATEGORIES = [
  { id: 'all', label: 'All Electronics' },
  { id: 'smartwatches', label: 'Smartwatches' },
  { id: 'analog-watches', label: 'Analog Watches' },
  { id: 'smart-bands', label: 'Smart Bands' },
  { id: 'tws-earbuds', label: 'TWS Earbuds' },
  { id: 'neckbands', label: 'Neckbands' },
  { id: 'headphones', label: 'Headphones' },
  { id: 'speakers', label: 'Speakers' },
  { id: 'chargers', label: 'Chargers' },
  { id: 'power-banks', label: 'Power Banks' },
  { id: 'cables', label: 'Cables' },
  { id: 'mobile-accessories', label: 'Mobile Accessories' },
  { id: 'computer-accessories', label: 'Computer Accessories' },
  { id: 'combos', label: 'Curated Combos' }
];

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  TrendingUp,
  Lightbulb,
  Video,
  FileText,
  Search,
  Filter,
  Award,
  CheckCircle,
  Clock,
  ArrowRight,
  X,
  Play,
  Pause,
  Volume2,
  Sparkles,
  Check,
  ChevronRight,
  Share2,
  Bookmark,
  BookmarkCheck,
  BarChart3,
  HelpCircle,
  Flame,
  Leaf,
  Zap,
  Globe,
  Droplets,
} from 'lucide-react'

const Learning = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [completedArticles, setCompletedArticles] = useState([1, 4])
  const [bookmarkedArticles, setBookmarkedArticles] = useState([2])
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [showAiSummary, setShowAiSummary] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Curated Learning Articles & Guides Database
  const articles = [
    {
      id: 1,
      title: 'The Complete Guide to Carbon Neutrality',
      subtitle: 'How individuals and households can achieve genuine net-zero impact',
      category: 'climate',
      categoryLabel: 'Climate Science',
      categoryIcon: '🌍',
      readTime: '8 min read',
      difficulty: 'Intermediate',
      points: 50,
      image: '🌱',
      trending: true,
      co2Impact: 'Saves up to 1,200 kg CO₂/yr',
      summary: [
        'Net-zero means balancing remaining emissions with verified carbon removal.',
        'Prioritize Scope 1 (direct fuels) and Scope 2 (electricity) reductions first.',
        'Energy efficiency and green mobility deliver 80% of personal carbon cuts.',
      ],
      content: [
        {
          heading: '1. What Does "Carbon Neutral" Really Mean?',
          body: 'Carbon neutrality does not require zero emissions from day one. Rather, it means measuring your total greenhouse gas footprint, eliminating every emission you reasonably can through efficiency and electrification, and neutralizing the unavoidable remainder through verified high-integrity offsets.',
        },
        {
          heading: '2. The 4-Step Personal Net-Zero Framework',
          body: 'Step 1: Measure with precision using GreenPulse AI.\nStep 2: Eliminate high-impact sources (switch home power to green tariff, cut solo car trips).\nStep 3: Optimize daily habits (insulation, plant-forward diet, 24°C AC rule).\nStep 4: Balance unavoidable emissions by supporting agroforestry and carbon capture.',
        },
        {
          heading: '3. Scope Breakdown for Everyday Living',
          body: 'Scope 1 covers direct fuel burned (gas stoves, petrol in your car). Scope 2 covers the grid electricity powering your appliances. Scope 3 covers supply-chain footprint from goods, clothing, and food you purchase.',
        },
      ],
      checklist: [
        'Perform a complete home energy audit',
        'Switch to a 100% renewable electricity supplier or rooftop solar',
        'Replace top 5 high-wattage incandescent bulbs with smart LEDs',
        'Offset remaining baseline footprint with verified Gold Standard credits',
      ],
      quiz: {
        question: 'Which of the following is considered a Scope 1 emission for a household?',
        options: [
          'Electricity consumed from the national grid',
          'Petrol or diesel burned directly in your car engine',
          'Emissions from the factory making your smartphone',
          'Water treatment by your city municipality',
        ],
        correct: 1,
        explanation:
          'Correct! Scope 1 covers direct combustion of fuels under your direct ownership, like your car fuel tank or home gas heater.',
      },
    },
    {
      id: 2,
      title: 'Zero-Waste Living: 5 Practical Swaps That Actually Work',
      subtitle: 'Eliminate 90% of household single-use plastic without disrupting your lifestyle',
      category: 'lifestyle',
      categoryLabel: 'Sustainable Living',
      categoryIcon: '♻️',
      readTime: '6 min read',
      difficulty: 'Beginner',
      points: 40,
      image: '🛍️',
      trending: true,
      co2Impact: 'Eliminates ~450 single-use items/yr',
      summary: [
        'Carry a double-walled steel bottle to eliminate 150+ disposable bottles yearly.',
        'Switch to solid shampoo and dishwashing bars to eradicate plastic bottles.',
        'Mesh organic cotton bags replace hundreds of thin fruit & vegetable bags.',
      ],
      content: [
        {
          heading: '1. The Myth of "Perfect Zero Waste"',
          body: 'The goal of zero-waste is not to fit an entire year of trash into a mason jar. It is about keeping recyclable and organic materials inside a circular loop so nothing heads to open landfills where it off-gases methane.',
        },
        {
          heading: '2. The 5 Foundational Swaps',
          body: '1. Stainless Steel or Copper Water Flask: Keeps drinks cold for 24 hours while saving money.\n2. Organic Cotton Mesh Produce Pouches: Keep vegetables fresh and prevent plastic bag buildup.\n3. Solid Shampoo & Body Soap Bars: Concentrated formulations that cut freight weight by 80%.\n4. Beeswax or Silicone Food Wraps: Replace single-use cling wraps.\n5. Ceramic or Stainless Travel Mug: Hand it to your barista for daily coffee.',
        },
      ],
      checklist: [
        'Keep 2 reusable tote bags in your backpack or vehicle glovebox',
        'Say "No plastic straw or cutlery needed" when ordering takeout',
        'Set up a 2-bin segregation system for dry recyclables vs wet waste',
      ],
      quiz: {
        question:
          'What is the primary greenhouse gas emitted when organic food decomposes in landfills?',
        options: ['Carbon Monoxide', 'Methane (CH₄)', 'Nitrous Oxide', 'Ozone'],
        correct: 1,
        explanation:
          'Methane (CH₄) is produced in anaerobic landfills and is over 28 times more potent at trapping heat than CO₂ over a 100-year timescale.',
      },
    },
    {
      id: 3,
      title: 'Electric Vehicles vs Petrol Cars: The Full Lifecycle Truth',
      subtitle: 'Debunking battery manufacturing emissions with verified lifecycle data',
      category: 'transport',
      categoryLabel: 'Mobility',
      categoryIcon: '⚡',
      readTime: '9 min read',
      difficulty: 'Advanced',
      points: 60,
      image: '🚗',
      trending: false,
      co2Impact: 'Cuts transport footprint by 65%',
      summary: [
        'EV manufacturing emits more upfront CO₂, but breaks even after 15,000–22,000 km.',
        'Over 150,000 km, an EV saves 30–70% lifecycle CO₂ even on mixed power grids.',
        'Battery recycling recovers up to 95% of lithium, nickel, and cobalt.',
      ],
      content: [
        {
          heading: '1. Upfront Manufacturing vs Operational Lifecycle',
          body: 'Building an EV battery creates roughly 35-50% more manufacturing emissions than building a combustion car. However, internal combustion engines burn fossil fuels on every single kilometer driven for 10-15 years.',
        },
        {
          heading: '2. The "Emissions Break-Even" Milepost',
          body: 'In typical grid environments (like US/Europe/India average mix), an electric car breaks even in emissions within 12 to 18 months of regular driving. From that moment forward, every single kilometer driven avoids petroleum emissions.',
        },
      ],
      checklist: [
        'Calculate your daily commute distance to see if an EV or E-bike fits',
        'Charge primarily during daytime if your region has high solar capacity',
        'Maintain proper tire pressure to maximize regenerative braking range',
      ],
      quiz: {
        question:
          'Around when does an electric car typically break even on emissions compared to petrol?',
        options: [
          'After 500,000 km',
          'After 15,000 - 25,000 km (roughly 1 to 2 years)',
          'It never breaks even',
          'On the very first day of purchase',
        ],
        correct: 1,
        explanation:
          'Due to vastly higher motor efficiency (90% vs 25% for internal combustion engines), EVs offset their manufacturing footprint after roughly 15,000 to 25,000 km.',
      },
    },
    {
      id: 4,
      title: 'The Hidden Water Footprint of Everyday Products',
      subtitle:
        'Uncovering the thousands of liters needed to produce clothing, electronics, and meals',
      category: 'energy',
      categoryLabel: 'Energy & Water',
      categoryIcon: '💧',
      readTime: '7 min read',
      difficulty: 'Intermediate',
      points: 45,
      image: '🌊',
      trending: true,
      co2Impact: 'Conserves 5,000+ liters/mo',
      summary: [
        'A single cotton T-shirt requires 2,700 liters of freshwater to grow and dye.',
        '1 kg of industrial beef requires over 15,400 liters of virtual water.',
        'Digital products have physical cooling water footprints in server data centers.',
      ],
      content: [
        {
          heading: '1. Direct Water vs "Virtual Water"',
          body: 'While your daily shower uses ~60 liters, the "virtual water" embedded in the products, clothing, and food you buy can exceed 4,000 liters per person per day.',
        },
        {
          heading: '2. Fast Fashion and Agricultural Impact',
          body: 'Cotton cultivation and synthetic textile dyeing are major drivers of regional water scarcity. Wearing clothes twice as long and shopping thrift or circular cuts textile water impact in half.',
        },
      ],
      checklist: [
        'Install aerator nozzles on kitchen and bathroom faucets (saves 50% flow)',
        'Choose second-hand or certified organic cotton apparel',
        'Adopt "Meatless Mondays" to conserve up to 1,500 liters of virtual water weekly',
      ],
      quiz: {
        question:
          'Approximately how much water is embedded in the production of one cotton T-shirt?',
        options: ['100 liters', '500 liters', '2,700 liters', '10,000 liters'],
        correct: 2,
        explanation:
          'A standard cotton T-shirt requires approximately 2,700 liters of water from cotton crop irrigation through dyeing and processing.',
      },
    },
    {
      id: 5,
      title: 'Home Energy Masterclass: Eradicate Phantom Electricity',
      subtitle: 'How idle electronics secretly add 10-15% to your monthly utility bills',
      category: 'energy',
      categoryLabel: 'Energy & Water',
      categoryIcon: '⚡',
      readTime: '5 min read',
      difficulty: 'Beginner',
      points: 35,
      image: '🔌',
      trending: false,
      co2Impact: 'Saves 250 kWh/year',
      summary: [
        'Vampire draw occurs when turned-off appliances remain in standby mode.',
        'Smart power strips automatically cut power to inactive peripherals.',
        'Setting air conditioning to 24°C saves 6% electricity per degree raised.',
      ],
      content: [
        {
          heading: '1. What is Vampire Power Draw?',
          body: 'Televisions, gaming consoles, microwave clocks, and laptop chargers draw continuous standby current 24 hours a day even when you are asleep or away from home.',
        },
        {
          heading: '2. The 24°C Air Conditioning Rule',
          body: 'Every degree below 24°C causes your compressor to work exponentially harder. Running your AC at 24°C with a gentle ceiling fan provides equivalent comfort while cutting cooling emissions by up to 24%.',
        },
      ],
      checklist: [
        'Unplug phone and laptop chargers when devices reach 100%',
        'Use smart multi-plug power boards with master shut-off switches',
        'Clean AC dust filters every 30 days to maintain airflow efficiency',
      ],
      quiz: {
        question:
          'What is the recommended eco-friendly temperature setting for home air conditioning?',
        options: ['16°C', '19°C', '24°C', '28°C'],
        correct: 2,
        explanation:
          '24°C is recognized globally as the optimal thermal comfort and efficiency sweet spot for room cooling.',
      },
    },
    {
      id: 6,
      title: 'Plant-Forward Nutrition: Cutting Diet Emissions by 50%',
      subtitle: 'Delicious dietary shifts that slash carbon without giving up your favorite foods',
      category: 'lifestyle',
      categoryLabel: 'Sustainable Living',
      categoryIcon: '🥗',
      readTime: '6 min read',
      difficulty: 'Beginner',
      points: 40,
      image: '🥑',
      trending: false,
      co2Impact: 'Cuts diet emissions by 40-50%',
      summary: [
        'Plant-based proteins generate 10–50x less emissions than ruminant livestock.',
        'Reducing food waste is ranked by Project Drawdown as the #1 climate solution.',
        'Eating locally seasonal crops avoids intercontinental refrigerated freight.',
      ],
      content: [
        {
          heading: '1. The Planetary Health Diet',
          body: 'You do not need to become 100% vegan overnight to make a gigantic climate difference. Shifting toward whole grains, pulses, lentils, nuts, and seasonal vegetables significantly reduces agricultural land usage.',
        },
        {
          heading: '2. Stop Wasting What You Buy',
          body: 'Roughly 30% of all food produced on Earth is thrown away before consumption. Planning weekly meals, storing herbs properly, and embracing creative leftover cooking directly curbs landfill methane.',
        },
      ],
      checklist: [
        'Plan a weekly meal schedule before supermarket visits',
        'Try 2 fully plant-based dinners every week',
        'Store bread in the freezer and herbs in water glasses to double shelf life',
      ],
      quiz: {
        question:
          'According to climate scientists, what is one of the most effective individual climate actions?',
        options: [
          'Buying bottled spring water',
          'Reducing household food waste to near zero',
          'Ironing clothes more frequently',
          'Using single-use paper plates',
        ],
        correct: 1,
        explanation:
          'Reducing food waste avoids the land, water, fertilizer, transport, and landfill emissions needed to produce discarded food.',
      },
    },
    {
      id: 7,
      title: 'Rooftop Solar & Home Batteries: The Complete Guide',
      subtitle: 'Economics, net metering, battery storage ROI, and grid independence',
      category: 'energy',
      categoryLabel: 'Energy & Water',
      categoryIcon: '☀️',
      readTime: '8 min read',
      difficulty: 'Intermediate',
      points: 55,
      image: '☀️',
      trending: true,
      co2Impact: 'Saves 2,400+ kg CO₂/yr',
      summary: [
        'A 3 kW to 5 kW rooftop array covers 70-100% of typical household electricity.',
        'Net metering allows selling surplus afternoon solar power back to the grid.',
        'Modern lithium iron phosphate (LFP) home batteries last over 10-15 years.',
      ],
      content: [
        {
          heading: '1. How Modern Rooftop Solar Works',
          body: 'Photovoltaic (PV) silicon cells absorb solar photons, releasing electrons to create Direct Current (DC) electricity. A microinverter or string inverter converts this into 230V Alternating Current (AC) for your lights, fans, and appliances.',
        },
        {
          heading: '2. Net Metering vs Battery Storage',
          body: 'With Net Metering, excess midday energy spins your electricity meter backwards. Adding a 5–10 kWh home battery allows you to store daytime sun to power your house throughout the night, protecting against power cuts and peak tariff spikes.',
        },
      ],
      checklist: [
        'Check roof shade and orientation (South/Southwest produces maximum yield)',
        'Review your annual electricity bills to calculate optimum kW array size',
        'Inquire with your local distribution utility about net metering policies',
      ],
      quiz: {
        question: 'What is the role of an inverter in a rooftop solar power system?',
        options: [
          'It cools down the solar panels in hot weather',
          'It converts Direct Current (DC) into Alternating Current (AC) for home appliances',
          'It stores water for cleaning the roof',
          'It acts as a lightning rod',
        ],
        correct: 1,
        explanation:
          'Solar panels generate Direct Current (DC), but household appliances run on Alternating Current (AC), which the inverter safely produces.',
      },
    },
    {
      id: 8,
      title: 'The Circular Wardrobe: Escaping the Fast Fashion Trap',
      subtitle:
        'Why 85% of cheap clothing ends up in landfills and how to build a 30-wear wardrobe',
      category: 'lifestyle',
      categoryLabel: 'Sustainable Living',
      categoryIcon: '👕',
      readTime: '6 min read',
      difficulty: 'Beginner',
      points: 40,
      image: '👗',
      trending: false,
      co2Impact: 'Avoids 350 kg CO₂/yr',
      summary: [
        'Fashion generates 10% of global greenhouse emissions—more than aviation and shipping combined.',
        'Synthetics like polyester shed microplastics into oceans every wash cycle.',
        'The #30Wears rule: only purchase items you realistically plan to wear at least 30 times.',
      ],
      content: [
        {
          heading: '1. The Real Cost of Cheap Clothing',
          body: 'Fast fashion brands release 52 micro-seasons a year using fossil-fuel derived polyester and nylon. These fabrics take over 200 years to break down and release thousands of microplastic fibers into our waterways during every laundry load.',
        },
        {
          heading: '2. How to Build a Sustainable Capsule Wardrobe',
          body: 'A capsule wardrobe focuses on 25-30 versatile, high-quality, durable garments that effortlessly interchange. Prioritize natural breathable fibers like organic linen, hemp, organic cotton, and recycled wool.',
        },
      ],
      checklist: [
        'Wash clothes in cold water (saves 90% washing machine heating electricity)',
        'Apply the 30-Wears test before buying any new apparel item',
        'Learn basic button mending and repair instead of throwing garments away',
      ],
      quiz: {
        question: 'What is polyester clothing primarily manufactured from?',
        options: [
          'Organic tree bark',
          'Petroleum / Crude oil derivatives',
          'Crushed seashells',
          'Agricultural corn stalks',
        ],
        correct: 1,
        explanation:
          'Polyester is a synthetic fiber derived from petroleum, making it essentially a wearable plastic polymer.',
      },
    },
    {
      id: 9,
      title: 'Carbon Offsets Deconstructed: What Truly Works?',
      subtitle: 'Navigating tree planting, biochar, direct air capture, and spotting greenwashing',
      category: 'climate',
      categoryLabel: 'Climate Science',
      categoryIcon: '🌲',
      readTime: '9 min read',
      difficulty: 'Advanced',
      points: 60,
      image: '🌲',
      trending: true,
      co2Impact: 'Neutralizes Scope 3 residual impact',
      summary: [
        'Avoidance offsets (protecting existing trees) differ fundamentally from permanent removal.',
        'High-durability removal includes Biochar, Enhanced Rock Weathering, and Direct Air Capture.',
        'Only purchase credits certified by Gold Standard or Verra VCS.',
      ],
      content: [
        {
          heading: '1. Avoidance vs Carbon Dioxide Removal (CDR)',
          body: 'Many historical cheap offsets paid people not to cut down trees that were never at real risk. True climate integrity requires CDR (Carbon Dioxide Removal), physically drawing CO₂ from the ambient atmosphere and sequestering it for centuries in biomass, biochar, or mineralized stone.',
        },
        {
          heading: '2. The Gold Standard Benchmark',
          body: 'High-integrity carbon credits must demonstrate: Additionality (would not have happened without funding), Permanence (stored for 100+ years), and Measurability (independently verified with satellite and ground sensors).',
        },
      ],
      checklist: [
        'Always prioritize internal emissions reduction before purchasing carbon offsets',
        'Verify registry serial numbers on Gold Standard or Puro.earth',
        'Support community-led agroforestry and mangrove restoration over monoculture plantations',
      ],
      quiz: {
        question: 'What does "Additionality" mean in verified carbon offset projects?',
        options: [
          'The project adds more trees to an existing botanical garden',
          'The emissions reduction would NOT have occurred without the financial revenue from carbon credits',
          'The project adds extra costs to airline tickets',
          'The project calculates numbers using additional mathematical formulas',
        ],
        correct: 1,
        explanation:
          'Additionality ensures carbon credits only reward new, real climate interventions that would have never taken place without carbon finance.',
      },
    },
    {
      id: 10,
      title: 'The 15-Minute City: E-Bikes, Micro-Mobility & Transit',
      subtitle: 'Why replacing car trips under 5 km delivers the fastest urban carbon reduction',
      category: 'transport',
      categoryLabel: 'Mobility',
      categoryIcon: '🛴',
      readTime: '7 min read',
      difficulty: 'Beginner',
      points: 45,
      image: '🚲',
      trending: false,
      co2Impact: 'Saves 680 kg CO₂/yr',
      summary: [
        'Over 60% of all urban car journeys are under 5 kilometers in distance.',
        'Electric bikes consume 30x less energy per kilometer than an electric car.',
        'Active transit lowers cardiovascular disease risk while eliminating parking stress.',
      ],
      content: [
        {
          heading: '1. The Urban Car Inefficiency Problem',
          body: 'Using a 2,000 kg metal machine to transport a 75 kg person 3 km to pick up groceries is mathematically one of the most energy-inefficient inventions in human history. Cold combustion engines run at their dirtiest on short journeys.',
        },
        {
          heading: '2. The E-Bike Revolution',
          body: 'An e-bike battery charges from a standard wall plug for pennies. It flattens hills, removes sweat concerns, and bypasses rush-hour traffic gridlocks while taking up 90% less urban road space.',
        },
      ],
      checklist: [
        'Commit to walking or cycling for all neighborhood errands under 2 km',
        'Test a local e-bike or public shared bicycle system for your weekly commute',
        'Advocate for protected bike lanes and pedestrian sidewalks in your municipality',
      ],
      quiz: {
        question:
          'Approximately what percentage of all personal car trips in urban cities are shorter than 5 km?',
        options: ['Around 5%', 'Around 15%', 'Over 60%', 'Almost 99%'],
        correct: 2,
        explanation:
          'Over 60% of daily car journeys are short neighborhood errands under 5 km—trips that can easily be replaced by walking, cycling, or micro-mobility.',
      },
    },
    {
      id: 11,
      title: 'The Invisible Cloud: Your Digital Carbon Footprint',
      subtitle: 'Every email, 4K stream, and AI prompt consumes server power and data center water',
      category: 'climate',
      categoryLabel: 'Climate Science',
      categoryIcon: '💻',
      readTime: '5 min read',
      difficulty: 'Intermediate',
      points: 35,
      image: '🌐',
      trending: false,
      co2Impact: 'Cuts 180 kg CO₂/yr from digital waste',
      summary: [
        'Global data centers consume over 1.5% of world electricity and gigaliters of cooling water.',
        'Storing years of unneeded promotional emails generates real server hosting carbon.',
        'Lowering video streaming from 4K to 1080p on laptops reduces data transmission energy by 70%.',
      ],
      content: [
        {
          heading: '1. The Physicality of the Internet',
          body: 'The "cloud" is not an ethereal mist—it is millions of warehouse-scale server buildings packed with silicon processors running 24/7 on high-voltage power lines and cooled by evaporative water chillers.',
        },
        {
          heading: '2. Digital Decluttering Habits',
          body: 'Unsubscribing from marketing newsletters, emptying email trash folders, disabling auto-play on social feeds, and dimming monitor brightness to 70% collectively saves meaningful grid kilowatt-hours.',
        },
      ],
      checklist: [
        'Unsubscribe from spam newsletters you never read using one-click tools',
        'Store files locally on an SSD rather than maintaining redundant cloud backups',
        'Stream music and video on standard HD instead of 4K when viewing on phone screens',
      ],
      quiz: {
        question: 'How do internet data centers primarily consume environmental resources?',
        options: [
          'By using paper printouts',
          'Through round-the-clock electricity consumption and water cooling towers',
          'By flying planes across the ocean',
          'By creating physical smoke in data rooms',
        ],
        correct: 1,
        explanation:
          'Data centers require enormous electrical power to run compute servers and millions of liters of water for cooling server racks.',
      },
    },
    {
      id: 12,
      title: 'Biophilic Living: Indoor Plants That Clean Your Air',
      subtitle:
        'The NASA Clean Air Study, VOC absorption, natural humidity, and cooling energy savings',
      category: 'lifestyle',
      categoryLabel: 'Sustainable Living',
      categoryIcon: '🪴',
      readTime: '6 min read',
      difficulty: 'Beginner',
      points: 40,
      image: '🌿',
      trending: true,
      co2Impact: 'Improves air quality & cuts cooling fan power',
      summary: [
        'NASA research confirmed house plants absorb toxic VOCs like formaldehyde and benzene.',
        'Plants naturally release water vapor through transpiration, cooling indoor rooms naturally.',
        'Snake Plants and Areca Palms convert CO₂ into oxygen even during night hours.',
      ],
      content: [
        {
          heading: '1. The NASA Clean Air Findings',
          body: 'Modern sealed homes accumulate volatile organic compounds (VOCs) emitted by synthetic paint, furniture glues, and plastics. Certain houseplants filter these airborne toxins through their leaves and root soil microbes.',
        },
        {
          heading: '2. Top 3 Air-Purifying Species',
          body: '1. Snake Plant (Sansevieria): Virtually indestructible; releases oxygen at night via Crassulacean Acid Metabolism.\n2. Spider Plant: Highly effective at filtering carbon monoxide.\n3. Peace Lily: Exceptional at neutralizing mold spores and airborne benzene.',
        },
      ],
      checklist: [
        'Place at least 1 indoor plant per 100 square feet of living space',
        'Wipe plant leaves with a damp cloth monthly to maximize photosynthesis and dust capture',
        'Use terracotta clay pots to maintain healthy root aeration without plastic waste',
      ],
      quiz: {
        question: 'Why is the Snake Plant particularly popular for bedrooms?',
        options: [
          'It glows in the dark',
          'It releases oxygen during the night through CAM photosynthesis',
          'It repels mosquitoes with noise',
          'It never needs any sunlight ever',
        ],
        correct: 1,
        explanation:
          'Snake Plants perform CAM (Crassulacean Acid Metabolism), opening their stomata to absorb CO₂ and emit fresh oxygen during nighttime hours.',
      },
    },
  ]

  // Filter Articles based on Category & Search Query
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
      const matchesQuery =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [articles, selectedCategory, searchQuery])

  // Open Article Reader Modal
  const handleOpenArticle = article => {
    setSelectedArticle(article)
    setShowAiSummary(false)
    setIsPlayingAudio(false)
    setQuizAnswer(null)
    setQuizSubmitted(false)
  }

  // Toggle Completion
  const toggleComplete = id => {
    if (completedArticles.includes(id)) {
      setCompletedArticles(completedArticles.filter(item => item !== id))
    } else {
      setCompletedArticles([...completedArticles, id])
    }
  }

  // Toggle Bookmark
  const toggleBookmark = (id, e) => {
    e?.stopPropagation()
    if (bookmarkedArticles.includes(id)) {
      setBookmarkedArticles(bookmarkedArticles.filter(item => item !== id))
    } else {
      setBookmarkedArticles([...bookmarkedArticles, id])
    }
  }

  // Audio Playback simulation
  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio)
  }

  // Handle Quiz Submission
  const handleQuizSubmit = () => {
    if (quizAnswer === null) return
    setQuizSubmitted(true)
    if (
      quizAnswer === selectedArticle.quiz.correct &&
      !completedArticles.includes(selectedArticle.id)
    ) {
      setCompletedArticles([...completedArticles, selectedArticle.id])
    }
  }

  // User Stats Calculation
  const totalPointsEarned = completedArticles.reduce((acc, id) => {
    const art = articles.find(a => a.id === id)
    return acc + (art ? art.points : 0)
  }, 0)

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ============================================================ */}
        {/* HEADER SECTION */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-3 mb-1">
            <div className="p-3 bg-gradient-analytics rounded-2xl shadow-glow-analytics">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Eco <span className="text-primary">Learning Hub</span>
            </h1>
          </div>
          <p className="text-textLight max-w-2xl mx-auto text-sm md:text-base">
            Master climate science, read interactive guides, pass quizzes, and level up your carbon
            intelligence! 🎓🌱
          </p>
        </motion.div>

        {/* ============================================================ */}
        {/* LEARNING STATS & PROGRESS OVERVIEW */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="glass-card p-4 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/20 text-primary border border-primary/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">
                {completedArticles.length}/{articles.length}
              </div>
              <div className="text-xs text-textMuted">Guides Completed</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">{totalPointsEarned} pts</div>
              <div className="text-xs text-textMuted">Knowledge Points</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">Level 2</div>
              <div className="text-xs text-textMuted">Eco Scholar Badge</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="p-3 rounded-xl bg-accent/20 text-accent border border-accent/30">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-white">
                {bookmarkedArticles.length} Saved
              </div>
              <div className="text-xs text-textMuted">Reading Bookmarks</div>
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* SEARCH & CATEGORY FILTER BAR */}
        {/* ============================================================ */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" />
              <input
                type="text"
                placeholder="Search guides (e.g., carbon neutrality, zero waste, EVs, water...)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-cardDark/80 border border-white/10 text-white placeholder-textMuted text-sm focus:border-primary focus:outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-textMuted hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Bookmarks Quick Filter */}
            <button
              onClick={() => {
                if (selectedCategory === 'bookmarked') setSelectedCategory('all')
                else setSelectedCategory('bookmarked')
              }}
              className={`px-5 py-3 rounded-2xl font-semibold text-xs flex items-center gap-2 transition cursor-pointer border ${
                selectedCategory === 'bookmarked'
                  ? 'bg-accent text-white border-accent shadow-glow-orange'
                  : 'bg-cardDark/70 text-textLight/80 border-white/10 hover:border-white/20'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Bookmarked ({bookmarkedArticles.length})</span>
            </button>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'All Topics', icon: '📚' },
              { id: 'climate', label: 'Climate Science', icon: '🌍' },
              { id: 'lifestyle', label: 'Sustainable Living', icon: '♻️' },
              { id: 'energy', label: 'Energy & Water', icon: '⚡' },
              { id: 'transport', label: 'Green Mobility', icon: '🚲' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition cursor-pointer border ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-primary text-white shadow-glow-blue border-primary'
                    : 'bg-cardDark/50 text-textLight/70 border-white/5 hover:border-white/20'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* ARTICLES GRID */}
        {/* ============================================================ */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => {
            const isCompleted = completedArticles.includes(article.id)
            const isBookmarked = bookmarkedArticles.includes(article.id)

            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => handleOpenArticle(article)}
                className={`glass-card p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isCompleted ? 'border-emerald-500/30' : 'border-white/10 hover:border-primary/50'
                }`}
              >
                {/* Top Badge Row */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{article.image}</span>
                      <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-textMuted font-medium flex items-center gap-1">
                        <span>{article.categoryIcon}</span> {article.categoryLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCompleted && (
                        <span
                          className="p-1 rounded-full bg-emerald-500/20 text-emerald-400"
                          title="Completed"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </span>
                      )}
                      <button
                        onClick={e => toggleBookmark(article.id, e)}
                        className={`p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer ${
                          isBookmarked ? 'text-accent' : 'text-textMuted hover:text-white'
                        }`}
                        title={isBookmarked ? 'Remove Bookmark' : 'Save for later'}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-textMuted line-clamp-2 mb-4 leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>

                {/* Footer Info */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-textMuted">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {article.readTime}
                    </span>
                    <span className="text-emerald-400 font-medium">+{article.points} pts</span>
                  </div>

                  <span className="text-primary font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Now <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Empty Search Result */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl border border-white/10 space-y-3">
            <HelpCircle className="w-12 h-12 text-textMuted mx-auto" />
            <h3 className="text-lg font-bold text-white">No Learning Guides Found</h3>
            <p className="text-xs text-textMuted max-w-sm mx-auto">
              We couldn't find any guides matching "{searchQuery}". Try searching for another topic
              or clear filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="btn-secondary text-xs py-2 px-4 inline-flex items-center gap-2"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* FULL ARTICLE READER & QUIZ MODAL */}
      {/* ============================================================ */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card max-w-3xl w-full p-6 md:p-8 rounded-3xl border border-white/20 bg-cardDark/95 relative shadow-2xl max-h-[92vh] overflow-y-auto space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-textMuted hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 font-semibold flex items-center gap-1.5">
                  <span>{selectedArticle.categoryIcon}</span> {selectedArticle.categoryLabel}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-textMuted border border-white/10">
                  {selectedArticle.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                  {selectedArticle.co2Impact}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2">
                  {selectedArticle.title}
                </h2>
                <p className="text-sm text-textMuted leading-relaxed">{selectedArticle.subtitle}</p>
              </div>

              {/* Action Toolbar: AI Summary & Audio */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-bgDark/60 border border-white/10">
                <div className="flex items-center gap-2">
                  {/* AI TL;DR Button */}
                  <button
                    onClick={() => setShowAiSummary(!showAiSummary)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                      showAiSummary
                        ? 'bg-gradient-analytics text-white border-primary shadow-glow-analytics'
                        : 'bg-white/5 text-textLight border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{showAiSummary ? 'Hide AI Summary' : '⚡ AI 60-Sec TL;DR'}</span>
                  </button>

                  {/* Audio Listen Button */}
                  <button
                    onClick={toggleAudio}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
                      isPlayingAudio
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-glow-green'
                        : 'bg-white/5 text-textLight border-white/10 hover:border-white/20'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                    <span>{isPlayingAudio ? 'Playing Audio...' : 'Listen to Guide'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-textMuted">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              {/* AI Summary Box */}
              <AnimatePresence>
                {showAiSummary && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/30 space-y-2 overflow-hidden"
                  >
                    <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> GreenPulse AI Quick Takeaways:
                    </div>
                    <ul className="space-y-1.5 text-xs text-textLight/90 pl-5 list-disc leading-relaxed">
                      {selectedArticle.summary.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Article Content */}
              <div className="space-y-6 text-sm text-textLight/90 leading-relaxed pt-2">
                {selectedArticle.content.map((sec, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-base font-bold text-white tracking-wide">{sec.heading}</h4>
                    <p className="whitespace-pre-line text-xs md:text-sm text-textLight/80 leading-relaxed">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Actionable Habits Checklist */}
              <div className="p-5 rounded-2xl bg-cardDark border border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Actionable Habit Checklist:
                </h4>
                <div className="space-y-2">
                  {selectedArticle.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-textLight/80">
                      <input
                        type="checkbox"
                        id={`check-${idx}`}
                        className="mt-0.5 accent-primary rounded cursor-pointer"
                      />
                      <label htmlFor={`check-${idx}`} className="cursor-pointer">
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Mini-Quiz */}
              {selectedArticle.quiz && (
                <div className="p-5 rounded-2xl bg-primary/10 border border-primary/30 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider">
                      <HelpCircle className="w-4 h-4" /> 60-Second Quick Quiz (+
                      {selectedArticle.points} pts)
                    </span>
                    {quizSubmitted && quizAnswer === selectedArticle.quiz.correct && (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <Check className="w-4 h-4" /> Correct Answer!
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-white">
                    {selectedArticle.quiz.question}
                  </p>

                  <div className="space-y-2">
                    {selectedArticle.quiz.options.map((opt, oIdx) => {
                      let btnStyle =
                        'border-white/10 bg-bgDark/50 text-textLight/80 hover:border-white/20'
                      if (quizSubmitted) {
                        if (oIdx === selectedArticle.quiz.correct) {
                          btnStyle = 'border-emerald-500 bg-emerald-950/60 text-white font-bold'
                        } else if (quizAnswer === oIdx) {
                          btnStyle = 'border-red-500 bg-red-950/60 text-white font-bold'
                        }
                      } else if (quizAnswer === oIdx) {
                        btnStyle = 'border-primary bg-primary/20 text-white'
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswer(oIdx)}
                          className={`w-full p-3 rounded-xl border text-left text-xs transition cursor-pointer ${btnStyle}`}
                        >
                          <span className="font-mono text-textMuted mr-2">
                            {String.fromCharCode(65 + oIdx)}.
                          </span>
                          <span>{opt}</span>
                        </button>
                      )
                    })}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      disabled={quizAnswer === null}
                      onClick={handleQuizSubmit}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition ${
                        quizAnswer !== null
                          ? 'bg-primary text-white hover:bg-primary/90 shadow-glow-blue cursor-pointer'
                          : 'bg-white/10 text-textMuted cursor-not-allowed'
                      }`}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <div className="p-3 rounded-xl bg-bgDark text-xs text-textMuted leading-relaxed border border-white/5">
                      <b className="text-white">Explanation:</b> {selectedArticle.quiz.explanation}
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => toggleComplete(selectedArticle.id)}
                  className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                    completedArticles.includes(selectedArticle.id)
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'btn-primary'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {completedArticles.includes(selectedArticle.id)
                      ? 'Completed (Click to Reopen)'
                      : `Mark as Completed (+${selectedArticle.points} pts)`}
                  </span>
                </button>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-textLight font-semibold text-xs transition cursor-pointer"
                >
                  Close Guide
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Learning

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  Send,
  Sparkles,
  Lightbulb,
  Target,
  Mic,
  MicOff,
  Copy,
  Check,
  RotateCcw,
  Trash2,
  ArrowRight,
  User,
  ThumbsUp,
  MessageSquare,
  Zap,
  Leaf,
  Compass,
  HelpCircle,
  ChevronRight,
  Share2,
  Award,
  Smile,
  Flame,
  BatteryCharging,
  Car,
  Droplets,
  Sun,
  ShoppingBag,
} from 'lucide-react'

const AIAdvisor = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      time: 'Just now',
      content: `Hey! 👋 I'm your **GreenPulse EcoAdvisor**.\n\nYou can chat with me normally—like texting a friend! No stiff science lectures or boring reports. Ask me anything about cutting your power bills, commuting, food, winning the 100-day real plant reward, or just how to start small.\n\n*What's on your mind today, bro?* 😊`,
      suggestions: [
        'Hey bro! How can I cut my AC bill?',
        'I drive 20 km daily, how much CO2 is that?',
        'How does the 100-day plant reward work?',
        'Suggest 3 easy eco habits for today',
      ],
    },
  ])

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [copiedId, setCopiedId] = useState(null)

  const chatContainerRef = useRef(null)
  const inputRef = useRef(null)
  const recognitionRef = useRef(null)

  // Auto-scroll inside chat container ONLY (does NOT scroll the window)
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Setup Web Speech API for voice dictation
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false

      recognitionRef.current.onresult = event => {
        const transcript = event.results[0][0].transcript
        setInput(prev => (prev ? `${prev} ${transcript}` : transcript))
        setIsListening(false)
        inputRef.current?.focus()
      }

      recognitionRef.current.onerror = () => setIsListening(false)
      recognitionRef.current.onend = () => setIsListening(false)
    }
  }, [])

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please type your message.')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  // ============================================================
  // Intelligent Natural Conversational Response Generator
  // ============================================================
  const generateIntelligentResponse = rawInput => {
    const text = rawInput.toLowerCase().trim()
    const usesBro =
      text.includes('bro') ||
      text.includes('dude') ||
      text.includes('bhai') ||
      text.includes('yaar')
    const broPrefix = usesBro ? 'Hey bro! ' : ''
    const broSuffix = usesBro ? ' bro!' : '!'

    // 1. Casual Greetings & Checking In (Only when message is purely a greeting)
    const isGreetingOnly =
      /^(hi|hello|hey|yo|sup|good morning|good evening|good afternoon|namaste|hola|what's up|whats up|howdy|heyy+)(\s+(bro|bhai|dude|there|yaar|mate|antigravity|ai))?[!?.]*$/i.test(
        text
      )
    if (isGreetingOnly) {
      return {
        content: `${broPrefix || 'Hey there! '}👋 Great to hear from you! How's your day going?\n\nWhether you're looking to save money on power bills, cut down your petrol costs, or just want some quick lifestyle hacks, I'm here. What would you like to talk about?`,
        suggestions: [
          'How can I save money on petrol?',
          'How can I cut my AC power bill?',
          'How does the 100-day plant reward work?',
        ],
      }
    }

    // 2. "How are you" / Personal Questions
    if (
      text.includes('how are you') ||
      text.includes('how r u') ||
      text.includes('how do you do') ||
      text.includes('how are u')
    ) {
      return {
        content: `I'm doing awesome, thanks for asking! 😊 Ready to help you make smart choices that save you money and keep the planet clean.\n\nHow's everything with you today? Need help with something in your routine?`,
        suggestions: [
          'Give me 3 money-saving eco tips',
          'Tell me about GreenPulse AI',
          'How to reduce plastic use?',
        ],
      }
    }

    // 3. Identity / "Who are you"
    if (
      text.includes('who are you') ||
      text.includes('what are you') ||
      text.includes('your name') ||
      text.includes('who made you') ||
      text.includes('what can you do')
    ) {
      return {
        content: `I'm your **GreenPulse EcoAdvisor**! 🤖🌱\n\nThink of me like your personal eco companion. You don't have to talk to me in fancy keywords—just type normally, like you'd text a friend!\n\nYou can ask me things like:\n• *"Why is my AC bill so high?"*\n• *"I drive 15 km every day, what can I do?"*\n• *"Is oat milk really better than cow milk?"*\n• *"How do I win the real plant delivered to my house?"*\n• *"Tell me a funny eco joke!"*`,
        suggestions: [
          'Why is my AC bill so high?',
          'How to win the 100-day real plant?',
          'Tell me an eco joke',
        ],
      }
    }

    // 4. Humor & Jokes
    if (text.includes('joke') || text.includes('funny') || text.includes('laugh')) {
      const jokes = [
        `Why did the sun go to school?\n\nTo get a little brighter! ☀️😄\n\n*(Speaking of the sun, putting solar panels on your roof can literally wipe out 80% of your power bill!)*`,
        `Why do trees make the best friends?\n\nBecause they always branch out to help, and they never leaf you hanging! 🌳😂\n\n*(Plus, every tree absorbs roughly 22 kg of CO₂ every year!)*`,
        `How do celebrities stay cool?\n\nThey have a lot of fans! 🪭😆\n\n*(Seriously though: using a ceiling fan with your AC at 24°C saves up to 25% on your electricity bill!)*`,
      ]
      return {
        content: jokes[Math.floor(Math.random() * jokes.length)],
        suggestions: [
          'Tell me another joke!',
          'How does the AC 24°C trick work?',
          'How to get a tree planted in my name?',
        ],
      }
    }

    // 5. Thanks & Appreciation
    if (
      text.includes('thank') ||
      text.includes('thx') ||
      text.includes('appreciate') ||
      text.includes('tq')
    ) {
      return {
        content: `You're super welcome${broSuffix} 🙌 Glad I could help! If you have any more questions down the road, just drop in anytime. Keep crushing it! 🌱`,
        suggestions: [
          'Give me one more tip',
          'Check my Streak in Challenges',
          'How to cut food waste?',
        ],
      }
    }

    // 6. Acknowledgments (ok, cool, nice, awesome)
    if (/^(ok|okay|cool|nice|awesome|got it|sure|alright|fine|bet|great|dope)\b/i.test(text)) {
      return {
        content: `Awesome! 👍 Have you logged your daily eco habit in **Challenges** yet today? Just snap a quick photo (like a steel bottle or public transit) to keep your streak burning! 🔥`,
        suggestions: [
          'How to upload an EcoSnap photo?',
          'Tell me about the 100-day reward',
          'Give me an eco habit for today',
        ],
      }
    }

    // 7. Petrol & Fuel Saving Advice (Explicit queries on fuel/mileage/petrol saving)
    if (
      text.includes('save') &&
      (text.includes('petrol') ||
        text.includes('fuel') ||
        text.includes('diesel') ||
        text.includes('gas') ||
        text.includes('mileage'))
    ) {
      return {
        content: `${broPrefix}Here are the 4 simplest, proven ways to save real cash on petrol every single month! ⛽💰\n\n1. **The Gentle Foot (Saves 15–20% fuel):** No aggressive revving or sudden braking. Accelerating smoothly and cruising between 50–70 km/h makes an immediate difference on your fuel gauge.\n2. **Tire Pressure Check (Saves 3–5% fuel):** If your tires are even 3–4 PSI low, the engine has to work harder against rolling resistance. Pump them to the recommended PSI once every two weeks.\n3. **Combine Short Errands (<3 km):** Your car's engine burns almost double the petrol when cold during the first 3 km. Grouping grocery runs into one trip avoids cold starts.\n4. **Highway vs City AC Rule:** In slow bumper-to-bumper traffic, rolling windows down uses less fuel than blasting the AC. On highways (>70 km/h), keep windows up and AC on—open windows create aerodynamic drag that burns more fuel than the AC compressor!\n5. **The 2-Day Transit Switch:** Carpool, take a bus, or hop on the metro just 2 days a week to instantly wipe out 40% of your weekly fuel bill.\n\nWhat do you drive right now—a car or a bike?`,
        suggestions: [
          'Tips for improving bike mileage',
          'Is an electric vehicle (EV) worth buying?',
          'Calculate my daily driving footprint',
        ],
      }
    }

    // 8. Distance & Commute Calculation (e.g. "I drive 20 km", "15 miles", "commute")
    const kmMatch = text.match(/(\d+)\s*(km|kms|kilometer|kilometers|miles|mile)/i)
    if (
      kmMatch ||
      text.includes('commute') ||
      text.includes('car') ||
      text.includes('petrol') ||
      text.includes('diesel') ||
      text.includes('drive') ||
      text.includes('driving') ||
      text.includes('traffic')
    ) {
      const distance = kmMatch ? parseInt(kmMatch[1], 10) : 20
      const isMiles = text.includes('mile')
      const distanceInKm = isMiles ? Math.round(distance * 1.609) : distance
      const dailyCo2 = (distanceInKm * 0.192).toFixed(1) // ~192g CO2/km for avg petrol car
      const monthlyCo2 = (dailyCo2 * 22).toFixed(0) // 22 work days

      return {
        content: `${broPrefix}Here is your travel impact breakdown:\n\n• **Your Numbers:** Driving **${distance} ${isMiles ? 'miles' : 'km'} daily** creates about **${dailyCo2} kg of CO₂ every single day**, totaling around **${monthlyCo2} kg of CO₂ each month**! 🚗💨\n\n• **The 2-Day Switch:** If you carpool, take a bus, or use the metro just **2 days a week**, you immediately save **${(monthlyCo2 * 0.4).toFixed(0)} kg of CO₂** and cut nearly 40% off your fuel bill!\n• **Smooth Acceleration:** Avoiding hard pedal stomps saves 10–15% petrol right away.\n• **Short Errands (<2 km):** Walking or taking a cycle for quick neighborhood trips saves the most petrol because engines burn excess fuel when cold.\n\nHow is the traffic on your daily route?`,
        suggestions: [
          'How to save money on petrol?',
          'Is an electric vehicle (EV) worth it?',
          'How much CO2 does a bus emit?',
        ],
      }
    }

    // 8. Electric Vehicles (EVs, Electric Cars, Scooters)
    if (
      text.includes('ev') ||
      text.includes('electric car') ||
      text.includes('electric vehicle') ||
      text.includes('tesla') ||
      text.includes('ather') ||
      text.includes('ola') ||
      text.includes('scooter') ||
      text.includes('battery')
    ) {
      return {
        content: `Electric vehicles are a massive win, especially if you drive regularly! ⚡\n\n• **The Real Cost:** Charging an EV at home costs roughly **1/4th to 1/5th** of what you'd spend on petrol for the same distance.\n• **Lifecycle Emissions:** Even when charged on today's power grid, EVs produce **50% to 70% fewer lifetime emissions** than petrol or diesel cars.\n• **E-Scooters & E-Bikes:** If you commute in the city, an electric scooter or e-bike is the ultimate cheat code: zero traffic stress, dirt-cheap charging, and super easy parking!\n\nAre you considering an electric car or an e-scooter?`,
        suggestions: [
          'How long do EV batteries last?',
          'Can I charge an EV with home solar?',
          'E-scooters vs petrol scooters',
        ],
      }
    }

    // 9. AC & Electricity Bills (Home Energy)
    if (
      text.includes('ac') ||
      text.includes('electricity') ||
      text.includes('power') ||
      text.includes('bill') ||
      text.includes('light') ||
      text.includes('fan') ||
      text.includes('kwh') ||
      text.includes('units') ||
      text.includes('cooler')
    ) {
      return {
        content: `${broPrefix}Electricity bills can get crazy, especially in summer! 💡⚡ Here are the 3 simplest hacks that make an immediate difference on your next bill:\n\n1. **The 24°C AC Sweet Spot:** Setting your AC to **24°C** instead of 18°C or 20°C cuts power consumption by nearly **24%**! Run a ceiling fan on low speed with it—it circulates the cool air and feels identical to 20°C.\n2. **Kill Vampire (Phantom) Power:** Devices left on standby (TV boxes, microwave clocks, laptop chargers) silently consume 8–10% of your home's total power 24/7. Turn off the wall switches when not in use.\n3. **Clean AC Filters:** A dusty filter forces the compressor to work 15% harder. Rinsing it once a month takes 2 minutes and saves real money.\n\nTry setting the AC to 24°C tonight and see how comfortable it feels!`,
        suggestions: [
          'Is rooftop solar worth the investment?',
          'What appliances consume the most electricity?',
          'How does phantom power work?',
        ],
      }
    }

    // 10. Rooftop Solar & Renewable Energy
    if (
      text.includes('solar') ||
      text.includes('renewable') ||
      text.includes('panel') ||
      text.includes('inverter') ||
      text.includes('net metering')
    ) {
      return {
        content: `Rooftop solar is honestly one of the best financial investments you can make for your home right now! ☀️🏡\n\n• **Payback Period:** A typical 3 kW to 5 kW rooftop system pays for itself in **3.5 to 5 years** from saved power bills.\n• **25 Years of Free Power:** Solar panels last 25+ years, meaning after the payback period, you get nearly 20 years of essentially free electricity.\n• **Net Metering:** When your panels produce excess power on sunny days, it feeds into the city grid and rolls your electricity meter backward!\n\nDo you live in an independent house or an apartment?`,
        suggestions: [
          'Do I need battery storage for solar?',
          'How much does a 3 kW solar system cost?',
          'Can apartment owners use solar?',
        ],
      }
    }

    // 11. Food, Diet & Meat vs Veg
    if (
      text.includes('food') ||
      text.includes('diet') ||
      text.includes('vegan') ||
      text.includes('vegetarian') ||
      text.includes('meat') ||
      text.includes('beef') ||
      text.includes('chicken') ||
      text.includes('milk') ||
      text.includes('eat') ||
      text.includes('protein') ||
      text.includes('waste')
    ) {
      return {
        content: `${broPrefix}Here's the honest truth: you don't need to turn 100% vegan overnight to make a big difference! 🥗🌱\n\n• **The 2-Meal Swap:** Just swapping out 2 meat-heavy meals a week for plant-rich options (like lentils, beans, chickpeas, or tofu) cuts your food emissions by about **25%**.\n• **What about Milk?** Oat milk and soy milk produce **70% less CO₂** and use 80% less land than cow's milk.\n• **The Secret Climate Killer: Food Waste!** Throwing food into the trash is actually worse than eating meat, because decomposing food in landfills produces methane gas. Finishing your leftovers is one of the highest-impact climate wins you can do!\n\nWhat are your favorite daily meals?`,
        suggestions: [
          'What are the best plant-based proteins?',
          'Oat milk vs dairy milk comparison',
          'How to stop wasting food at home',
        ],
      }
    }

    // 12. Plastic, Recycling & Zero Waste
    if (
      text.includes('plastic') ||
      text.includes('waste') ||
      text.includes('recycle') ||
      text.includes('trash') ||
      text.includes('bottle') ||
      text.includes('bag') ||
      text.includes('straw') ||
      text.includes('packaging')
    ) {
      return {
        content: `Cutting plastic is easiest when you make it zero-effort! 🛍️🥤 Here are 3 habits that require almost no willpower:\n\n1. **A Cool Reusable Steel Bottle:** Carry one bottle you genuinely like. That single habit stops over **150 single-use plastic bottles** every year.\n2. **Tuck a Cloth Bag in Your Backpack or Car:** Whenever you pick up groceries or takeout, you'll never need a plastic carry bag.\n3. **Skip Takeout Cutlery:** On food delivery apps, tap 'No plastic cutlery'. You're eating at home anyway!\n\nStart with those three and you're already ahead of 90% of people!`,
        suggestions: [
          'Does plastic actually get recycled?',
          'How to start home composting',
          'Easy zero-waste swaps',
        ],
      }
    }

    // 13. Water Conservation
    if (
      text.includes('water') ||
      text.includes('shower') ||
      text.includes('bath') ||
      text.includes('leak') ||
      text.includes('tap')
    ) {
      return {
        content: `Saving water is super straightforward and cuts water heating bills too! 💧🚿\n\n• **The 5-Minute Shower:** Standard showerheads spray 15–20 liters per minute. Shortening your shower by just 3 minutes saves over **50 liters of clean water every day**.\n• **Fix Leaky Taps:** A tap dripping once per second silently wastes over **30 liters of water a day**! Replacing the small rubber washer takes $1 and 5 minutes.\n• **Virtual Water Fact:** Did you know it takes **2,700 liters of water** to make one cotton T-shirt? Wearing clothes longer saves way more water than skipping a shower!\n\nWant tips on saving electricity when heating shower water too?`,
        suggestions: [
          'How to install a tap aerator',
          'Water-saving tips for washing machines',
          'What is virtual water footprint?',
        ],
      }
    }

    // 14. Challenges, Streaks & 100-Day Plant Delivery
    if (
      text.includes('streak') ||
      text.includes('challenge') ||
      text.includes('plant') ||
      text.includes('reward') ||
      text.includes('snap') ||
      text.includes('100 day') ||
      text.includes('100 days') ||
      text.includes('photo')
    ) {
      return {
        content: `${broPrefix}The **GreenPulse EcoStreak** works just like Snapchat streaks, but with real-world prizes! 🔥🪴\n\n• **How it works:** Everyday, do one small green action (using a reusable bottle, keeping AC at 24°C, taking the metro, or eating a plant meal).\n• **Take an EcoSnap:** Go to the **Challenges** page and take a quick 5-second photo using your camera or file upload.\n• **The 100-Day Grand Milestone:** When you reach 100 days unbroken streak, GreenPulse ships a **real live indoor plant** (Snake or Jade plant) directly to your doorstep for free, AND we plant a verified tree in your name with GPS coordinates! 🌲📦\n\nHave you logged your snap for today yet?`,
        suggestions: [
          'Take me to Challenges page',
          'What if I miss a day on my streak?',
          'What plant species get delivered?',
        ],
      }
    }

    // 15. Calculator & How GreenPulse Works
    if (
      text.includes('calculator') ||
      text.includes('how to calculate') ||
      text.includes('score') ||
      text.includes('footprint') ||
      text.includes('dashboard') ||
      text.includes('learning')
    ) {
      return {
        content: `Here is a quick tour of how the GreenPulse platform works: 🧭✨\n\n1. **🧮 Calculator:** Use the live sliders to adjust your daily commute, electricity, diet, and water. You get an instant circular score gauge comparing you to national averages!\n2. **🏆 Challenges & Streaks:** Snap daily proof of green habits to maintain your fire streak and unlock the 100-day real plant delivery.\n3. **📚 Learning Hub:** 12 bite-sized interactive modules with 60-second AI summaries, audio mode, and quizzes.\n4. **📊 Analytics & Dashboard:** Real-time charts showing your monthly carbon trends and breakdown.\n\nWant me to help you estimate your footprint right here in chat?`,
        suggestions: [
          'Estimate my carbon footprint right now',
          'How do I improve my calculator score?',
          'What is an average carbon footprint?',
        ],
      }
    }

    // 16. Daily Habits / "What should I do today?"
    if (
      text.includes('today') ||
      text.includes('habit') ||
      text.includes('action') ||
      text.includes('routine') ||
      text.includes('start') ||
      text.includes('beginner')
    ) {
      return {
        content: `${broPrefix}Here are 3 super easy, zero-stress green actions you can do today: 🎯\n\n1. **The 24°C AC Setting:** Keep your AC locked at 24°C with a fan running on low. It feels chilled and cuts your electricity usage by ~24%!\n2. **Clean Your Plate (Zero Food Waste):** Don't throw edible food in the trash. Decomposing leftovers in landfills generate potent methane.\n3. **Carry a Steel Bottle:** Refill a reusable bottle whenever you head out. Saves you money on bottled water and saves plastic.\n\nTake a 5-second photo of one of these in **Challenges** to lock in your daily streak! 🔥`,
        suggestions: [
          'How does the 100-day plant reward work?',
          'How to cut petrol costs?',
          'Go to Challenges',
        ],
      }
    }

    // 17. Save Money / Financial Savings
    if (
      text.includes('save money') ||
      text.includes('save cash') ||
      text.includes('cheap') ||
      text.includes('cost') ||
      text.includes('wallet')
    ) {
      return {
        content: `${broPrefix}The coolest part about being eco-friendly is that it puts serious money back in your pocket! 💰🌱\n\n• **Switching AC from 18°C to 24°C:** Saves roughly 20–25% on your monthly power bill.\n• **Carpooling / Transit 2 days a week:** Cuts petrol costs by nearly 40%.\n• **Reusable Water Bottle:** Saves $30–$50 a month if you normally buy bottled water outside.\n• **Unplugging Vampire Electronics:** Saves 8–10% on phantom power standby drain.\n\nCombined, that's an easy $50 to $100+ saved every single month!`,
        suggestions: [
          'How to save petrol in traffic?',
          'What is rooftop solar payback period?',
          'Easy zero-waste swaps',
        ],
      }
    }

    // 18. Carbon Footprint & Climate Basics
    if (
      text.includes('carbon footprint') ||
      text.includes('co2') ||
      text.includes('climate change') ||
      text.includes('global warming') ||
      text.includes('greenhouse')
    ) {
      return {
        content: `${broPrefix}Here is the simple, non-boring explanation of Carbon Footprint: 🌍\n\n• **What is it?** Every time you drive a petrol car, turn on the lights, eat meat, or buy a new shirt, a certain amount of greenhouse gases (mostly CO₂) is released into the air.\n• **Your Total Number:** Your "carbon footprint" is just the total weight of CO₂ created to power your lifestyle each year. The global average is around **4.5 metric tons**, while an eco-conscious target is under **2.5 tons**.\n• **Why it matters:** Trapped CO₂ acts like a heat-trapping blanket around the planet, causing extreme heatwaves, unseasonal storms, and rising sea levels.\n\nWant to check your exact personal score on our Calculator?`,
        suggestions: [
          'How does the Calculator work?',
          'What is an average carbon footprint?',
          'How do I reduce my footprint fast?',
        ],
      }
    }

    // 19. Motivation / "Does it really matter?"
    if (
      text.includes('matter') ||
      text.includes('point') ||
      text.includes('hopeless') ||
      text.includes('lazy') ||
      text.includes('too late') ||
      text.includes('small')
    ) {
      return {
        content: `I totally get why it feels overwhelming sometimes${broSuffix} When big corporations pollute, it feels like one person using a steel straw doesn't matter.\n\nHere's why it actually does:\n• **Collective Demand:** When millions of people start demanding plant-based foods, solar power, and EVs, huge companies and governments are forced to pivot.\n• **Personal Savings:** Living greener isn't just about saving polar bears—it puts real money back in your pocket (lower power bills, less petrol expense, less junk bought).\n• **You don't have to be perfect:** You don't need 100 people living zero-waste perfectly; we need billions doing it imperfectly.\n\nPick one easy thing today that saves you money or feels good!`,
        suggestions: [
          'What is 1 easy habit to start today?',
          'How can I save money on fuel?',
          'Tell me a fun eco fact',
        ],
      }
    }

    // 20. Natural, Context-Aware Fallback
    const firstWord = text.split(' ')[0]
    return {
      content: `${broPrefix}That's an interesting question! In daily life, the secret to tackling anything eco-friendly is to focus on what saves you the most **money and effort first**.\n\nFor most people, your daily commute and home power make up about **70% of your total footprint**, while small habits (like reusable bottles and zero food waste) keep your streak alive and build momentum.\n\nCould you tell me a little more about what you're thinking, or which part of your daily routine you'd like to look at?`,
      suggestions: [
        'How can I save money on my power bill?',
        'Calculate my daily driving footprint',
        'Tell me about the 100-day plant reward',
      ],
    }
  }

  // Format message text with bold (**text**), italics (*text*), and clean paragraphs
  const renderMessageContent = content => {
    if (!content) return null
    return content.split('\n').map((line, lIdx) => {
      const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g)
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="text-white font-semibold">
              {part.slice(2, -2)}
            </strong>
          )
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={pIdx} className="text-emerald-300 not-italic font-medium">
              {part.slice(1, -1)}
            </em>
          )
        }
        return part
      })

      if (line.trim() === '') {
        return <div key={lIdx} className="h-2" />
      }

      return (
        <div key={lIdx} className="min-h-[1.25rem]">
          {formattedParts}
        </div>
      )
    })
  }

  // Handle Send Message
  const handleSend = async messageText => {
    const textToSend = messageText || input
    if (!textToSend.trim() || isTyping) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: textToSend.trim(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    inputRef.current?.focus()

    // Natural responsive delay
    setTimeout(() => {
      const responseData = generateIntelligentResponse(textToSend)
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: responseData.content,
        suggestions: responseData.suggestions,
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 600)
  }

  // Copy message text
  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Clear chat
  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'ai',
        time: 'Just now',
        content: `✨ Chat reset! Feel free to ask me anything in plain, normal words. What would you like to talk about?`,
        suggestions: [
          'How can I cut my AC bill?',
          'I drive 20 km daily, what can I do?',
          'How does the 100-day plant reward work?',
        ],
      },
    ])
    inputRef.current?.focus()
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col max-w-4xl mx-auto p-3 sm:p-5">
      {/* ============================================================ */}
      {/* COMPACT TOP HEADER */}
      {/* ============================================================ */}
      <div className="glass-card px-4 py-3 rounded-2xl border border-white/10 flex items-center justify-between gap-3 shrink-0 shadow-lg mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-analytics rounded-xl shadow-glow-analytics shrink-0">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-white leading-tight">
                GreenPulse EcoAdvisor
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online
              </span>
            </div>
            <p className="text-[11px] text-textMuted hidden sm:block">
              Chat naturally like a friend • Instant practical eco advice
            </p>
          </div>
        </div>

        {/* Clear Chat Button */}
        <button
          onClick={handleClearChat}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-textMuted hover:text-white transition cursor-pointer flex items-center gap-1.5 text-xs font-medium border border-white/5 hover:border-white/10"
          title="Reset Chat"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* CHAT MESSAGES SCROLLABLE CONTAINER */}
      {/* ============================================================ */}
      <div
        ref={chatContainerRef}
        className="glass-card flex-1 rounded-2xl border border-white/10 p-3 sm:p-5 overflow-y-auto space-y-4 bg-cardDark/90 shadow-2xl"
      >
        {messages.map(msg => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2.5 sm:gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {/* AI Avatar */}
            {msg.type === 'ai' && (
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 shadow-glow-blue mt-0.5">
                <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-[88%] sm:max-w-[78%] space-y-2 ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`p-3.5 sm:p-4 rounded-2xl relative group ${
                  msg.type === 'user'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white rounded-tr-xs shadow-md'
                    : 'bg-cardDark border border-white/10 text-textLight rounded-tl-xs shadow-md'
                }`}
              >
                {/* Message Content */}
                <div className="text-xs sm:text-sm leading-relaxed font-sans space-y-1">
                  {renderMessageContent(msg.content)}
                </div>

                {/* Bubble Footer: Time & Copy */}
                <div
                  className={`flex items-center justify-between gap-3 pt-2 mt-1 text-[10px] border-t ${
                    msg.type === 'user'
                      ? 'border-white/20 text-white/70'
                      : 'border-white/5 text-textMuted'
                  }`}
                >
                  <span>{msg.time}</span>
                  <button
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="opacity-70 hover:opacity-100 transition cursor-pointer flex items-center gap-1"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Follow-up Suggestion Chips for AI messages */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {msg.suggestions.map((sugg, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSend(sugg)}
                      className="text-[11px] py-1 px-3 rounded-full bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 text-textLight/80 hover:text-white transition flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span>{sugg}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Avatar */}
            {msg.type === 'user' && (
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-accent flex items-center justify-center shrink-0 shadow-glow-orange mt-0.5">
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
            )}
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-7 h-7 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 shadow-glow-blue">
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="p-3 rounded-2xl bg-cardDark border border-white/10 flex items-center gap-2">
              <span className="text-xs text-textMuted">EcoAdvisor is thinking...</span>
              <div className="flex gap-1 items-center">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* ============================================================ */}
      {/* PINNED BOTTOM INPUT BAR */}
      {/* ============================================================ */}
      <div className="shrink-0 pt-3 space-y-2">
        <div className="glass-card p-2 sm:p-2.5 rounded-2xl border border-white/15 bg-cardDark/95 shadow-2xl flex items-center gap-2">
          {/* Voice Input Microphone Button */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-2.5 sm:p-3 rounded-xl transition cursor-pointer shrink-0 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50'
                : 'bg-white/5 hover:bg-white/10 text-textMuted hover:text-white'
            }`}
            title={isListening ? 'Listening... click to stop' : 'Click to Speak (Voice Input)'}
          >
            {isListening ? (
              <MicOff className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            ) : (
              <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          {/* User Input Text */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder={
              isListening
                ? 'Listening to your voice...'
                : "Ask me anything (e.g., 'hey bro', AC bills, commute, food)..."
            }
            className="flex-1 bg-transparent border-0 text-white placeholder-textMuted text-xs sm:text-sm focus:outline-none px-2"
          />

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!input.trim() || isTyping}
            onClick={() => handleSend()}
            className={`p-2.5 sm:p-3 rounded-xl font-bold transition flex items-center justify-center shrink-0 ${
              input.trim() && !isTyping
                ? 'bg-gradient-analytics text-white shadow-glow-analytics cursor-pointer'
                : 'bg-white/5 text-textMuted cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>

        {/* Quick Topics Footer */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-textMuted px-1">
          <span className="hidden sm:inline">Try asking:</span>
          {[
            '🚗 Daily Commute Footprint',
            '⚡ AC Electricity Reduction',
            '🥑 Plant Milk vs Cow Milk',
            '☀️ Rooftop Solar ROI',
            '🪴 100-Day Plant Reward',
          ].map((topic, tIdx) => (
            <button
              key={tIdx}
              onClick={() => handleSend(`Tell me about ${topic}`)}
              className="hover:text-primary transition underline cursor-pointer"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AIAdvisor

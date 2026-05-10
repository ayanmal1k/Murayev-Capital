"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Shield, Users, Coins, BarChart3, Lock, ExternalLink, CheckCircle, ArrowRight, Menu, Mail } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import localFont from "next/font/local"
import { LanguageSwitcher, type Language } from "@/components/ui/language-switcher"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const nhlPhoenix = localFont({
  src: "../public/fonts/NHL-Phoenix-Regular.ttf",
  display: "swap",
  variable: "--font-nhl-phoenix",
  weight: "100 900",
})

const milkFont = localFont({
  src: "../public/fonts/Milk(RUS BY LYAJKA) Regular.ttf",
  display: "swap",
  variable: "--font-milk",
  weight: "400",
})



const roadmapSteps = [
  {
    step: "Step 1",
    title: "Build Liquidity",
    description: "Dividends from token sales will be used to reach early goals.",
    distribution: {
      team: 50,
      liquidity: 30,
      pr: 20,
      
    },
    goal: "Build liquidity. Until all tokens are released, 30% of the treasury (earned through sales) will be allocated to grow the liquidity pool. This process will take place once a quarter until all tokens are put into circulation.",
  },
  {
    step: "Step 2",
    title: "Token Burning",
    description: "Treasury distribution for quarterly token burning.",
    distribution: {
      team: 50,
      burning: 30,
      pr: 20,
      
    },
    goal: "Token burning. This process will occur once every quarter until all tokens (10% of total supply) allocated for burning are fully destroyed.",
  },
]

const content = {
  en: {
    heroSection: {
      badge: "Now Live On Solana",
      subtitle: "A Fan-Driven Token Project Supporting Innovation In Politics, Technological Progress, And Justice",
      features: [
        { text: "MRV Token" },
        { text: "30M Supply" },
        { text: "Solana" }
      ]
    },
    about: {
      badge: "About MRV",
      title: "More Than Just A Token",
      description: " - It's A Fan-Driven Token Project Launched By A Young Team Inspired By The Views And Political Thinking Of Yevhen Murayev And His Community.",
      subDescription: "The Project Represents A Symbol Of Unity, Supporting Innovation In Politics, Technological Progress, And Justice.",
      mission: {
        title: "Our Mission",
        description: "MRV Is More Than A Digital Asset — It's A Symbol Of Support, Accountability, And A New Wave Of Political Thinking."
      },
      features: [
        {
          title: "Community Driven",
          description: "The platform lives and develops thanks to the community - people who care about the vector of movement",
          image: "/images/community.gif"
        },
        {
          title: "Innovation Focus",
          description: "Supporting technological progress and modern political thinking.",
          image: "/images/innovation.gif"
        },
        {
          title: "Security First",
          description: "Advanced security measures and transparent operations to protect our community.",
          image: "/images/shield.gif"
        }
      ]
    },
    tokenomics: {
      title: "Total Supply",
      subtitle: "Transparent Distribution Designed For Long-Term Value And Community Growth",
      stats: {
        totalSupply: {
          value: "30,000,000",
          label: "MRV Tokens"
        },
        initialBlock: {
          value: "180,000",
          label: "Available for purchase"
        },
        fee: {
          value: "0.5%",
          label: "Per buy/sell operation"
        }
      },
      distribution: {
        circulation: {
          percentage: "60%",
          description: "Gradually Released To The Community"
        },
        team: {
          percentage: "30%",
          description: "Reserved For Project Development"
        },
        burning: {
          percentage: "10%",
          description: "Allocated For Quarterly Burning"
        }
      }
    },
    howToBuy: {
      title: "How To Buy MRV",
      subtitle: "Follow These Simple Steps To Purchase MRV Tokens And Join Our Community",
      steps: [
        {
          title: "Set Up Wallet",
          description: "Install A Solana-Compatible Wallet Like Phantom Or Solflare. Create Your Wallet And Secure Your Seed Phrase.",
          image: "/images/wallet.gif"
        },
        {
          title: "Get SOL",
          description: "Purchase SOL From Any Major Exchange And Transfer It To Your Wallet. You'll Need SOL To Pay For Transaction Fees.",
          image: "/images/get-solana.gif"
        },
        {
          title: "Swap For MRV",
          description: "Connect Your Wallet To Raydium DEX, Paste The MRV Contract Address, And Swap Your SOL For MRV Tokens.",
          image: "/images/swap.gif"
        }
      ]
    },
    security: {
      title: "Security & Trust",
      subtitle: "Anti-Scam Protection",
      description: "We Strongly Reject Classic Scam Schemes Like Rug & Pull. Our Security Measures Ensure Fair Play And Prevent Manipulation.",
      features: [
        "Tokens Introduced To DEX In Small Blocks",
        "Mint Authority Set To None",
        "Freeze Authority Set To None",
        "Transparent Liquidity Model"
      ],
      liquidity: {
        title: "Liquidity Building",
        points: [
          "Built Step-By-Step With Every Sale",
          "Portion Of Each Sale Funds The Liquidity Pool",
          "Every Purchase Supports Price Stability",
          "Market-Driven Pricing Model"
        ]
      }
    },
    cta: {
      title: "Join The Movement",
      subtitle: "Buy The Token, Follow Updates, And Shape The Future With Us.",
      buttons: {
        primary: "SOLSCAN",
        secondary: "JOIN TELEGRAM"
      }
    },
    footer: {
      description: "Supporting Innovation In Politics, Technology, And Justice",
      copyright: "© 2025 Murayev Capital. All Rights Reserved."
    }
  },
  ru: {
    heroSection: {
      badge: "Теперь на Solana",
      subtitle: "- это фан проект с собственным токеном, поддерживающий инновации в политике, технологический прогресс и справедливость",
      features: [
        { text: "MRV Токен" },
        { text: "30М Токенов" },
        { text: "Solana" }
      ]
    },
    about: {
      badge: "О проекте",
      title: "Больше, чем просто токен",
      description: "- это фан проект с собственным токеном, запущенный молодой командой, вдохновленной взглядами и политическим мышлением Евгения Мураева и его сообщества.",
      subDescription: "Он символизирует объединение сторонников, стремящихся к обновлению политической культуры, технологическому прогрессу и справедливости.",
      mission: {
        title: "Наша миссия",
        description: "MRV - это больше, чем цифровой актив. Это символ поддержки, ответственности и новой волны политического мышления."
      },
      features: [
        {
          title: "Управляется сообществом",
          description: "Платформа живет и развивается благодаря сообществу - людям, которым важен вектор движения",
          image: "/images/community.gif"
        },
        {
          title: "Фокус на инновациях",
          description: "Поддержка технологического прогресса и современного политического мышления.",
          image: "/images/innovation.gif"
        },
        {
          title: "Безопасность превыше всего",
          description: "Передовые меры безопасности и прозрачные операции для защиты нашего сообщества.",
          image: "/images/shield.gif"
        }
      ]
    },
    tokenomics: {
      title: "Общее предложение",
      subtitle: "Прозрачное распределение для долгосрочной ценности и роста сообщества",
      stats: {
        totalSupply: {
          value: "30 000 000",
          label: "MRV Токенов"
        },
        initialBlock: {
          value: "180 000",
          label: "Доступно для покупки"
        },
        fee: {
          value: "0.5%",
          label: "За операцию покупки/продажи"
        }
      },
      distribution: {
        circulation: {
          percentage: "60%",
          description: "Постепенный выпуск в сообщество"
        },
        team: {
          percentage: "30%",
          description: "Зарезервировано для развития проекта"
        },
        burning: {
          percentage: "10%",
          description: "Выделено для квартального сжигания"
        }
      },
    },
    roadmap: {
      title: "Первые важные цели",
      subtitle: "Наш стратегический подход к созданию устойчивой ценности и росту сообщества",
      steps: [
        {
          step: "Шаг 1",
          title: "Построение ликвидности",
          description: "Для достижение целей будут использоваться полученные дивиденды от продаж.",
          distribution: {
            team: "50% команда",
            pr: "20% пиар",
            liquidity: "30% для пула"
          },
          goal: "Нарастить пул ликвидности. Для этого, до того момента когда все монеты будут введены в оборот, будет выделяться 30% с казны проекта, взятых с полученных процентов от продаж токена."
        },
        {
          step: "Шаг 2",
          title: "Сжигание токенов",
          description: "Распределение казны: 50% команда, 20% пиар, 30% сжигание.",
          distribution: {
            team: "50% команда",
            pr: "20% пиар",
            burning: "30% сжигание"
          },
          goal: "Сжигание токенов. Будет это происходить раз в квартал, до того момента пока не сожгутся все токены, выделенные для этого (10% от общего количества выпущенного)."
        }
      ]
    },
    security: {
      title: "Безопасность и доверие",
      subtitle: "Защита от мошенничества",
      description: "Мы ярые противники классической скам схемы <Rug&Pull>, где подразумевается предпродажа токенов и создание хорошего пула. Поэтому мы вынуждены не большими блоками вводить токены на децентрализованную биржу.",
      features: [
        "Токены вводятся на DEX небольшими блоками",
        "Mint Authority → отказ (установлено None)",
        "Freeze Authority → отказ (установлено None)",
        "Прозрачная модель ликвидности"
      ],
      liquidity: {
        title: "Построение ликвидности",
        points: [
          "Формируется поэтапно, синхронно с продажами",
          "Создается с каждой продажей: часть средств направляется на пополнение пула",
          "Каждая покупка токена поддерживает устойчивую цену",
          "Цены определяются рынком"
        ]
      }
    },
    cta: {
      title: "Присоединяйся к движению",
      subtitle: "Покупай токен, следи за обновлениями и формируй будущее вместе с нами",
      buttons: {
        primary: "SOLSCAN",
        secondary: "ПРИСОЕДИНИТЬСЯ К TELEGRAM"
      }
    },
    howToBuy: {
      title: "Как купить MRV",
      subtitle: "Следуйте этим простым шагам для покупки токенов MRV и присоединения к нашему сообществу",
      steps: [
        {
          title: "Настройте кошелек",
          description: "Установите кошелек, совместимый с Solana, такой как Phantom или Solflare. Создайте кошелек и сохраните свою seed-фразу.",
          image: "/images/wallet.gif"
        },
        {
          title: "Получите SOL",
          description: "Купите SOL на любой крупной бирже и переведите их в свой кошелек. SOL нужен для оплаты комиссий за транзакции.",
          image: "/images/get-solana.gif"
        },
        {
          title: "Обменяйте на MRV",
          description: "Подключите свой кошелек к Raydium DEX, вставьте адрес контракта MRV и обменяйте свои SOL на токены MRV.",
          image: "/images/swap.gif"
        }
      ]
    },
    footer: {
      description: "Поддерживаем инновации в политике, технологиях и справедливости",
      copyright: "© 2025 Murayev Capital. Все права защищены."
    }
  },
  common: {
    name: "MURAYEV CAPITAL",
    telegram: "@fan_club_MRV",
    contractAddress: "4UUh7nEwB2CRj5MVbE26FBimuoazEGFGzydBykWypHWZ"
  }
};

interface TokenomicsItem {
  name: string;
  value: number;
  color: string;
}

// Add types for distribution data
interface RoadmapStep {
  step: string;
  title: string;
  description: string;
  distribution: Record<string, number>;
  goal: string;
}

export default function MurayevCapitalSite() {
  const { toast } = useToast()
  const [language, setLanguage] = useState<'en' | 'ru'>('ru')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const roadmapSteps: RoadmapStep[] = [
    {
      step: language === 'en' ? "Step 1" : "Шаг 1",
      title: language === 'en' ? "Build Liquidity" : "Построение ликвидности",
      description: language === 'en' 
        ? "Dividends from token sales will be used to reach early goals." 
        : "Для достижение целей будут использоваться полученные дивиденды от продаж.",
      distribution: {
        team: 50,
        liquidity: 30,
        pr: 20,
      },
      goal: language === 'en'
        ? "Build liquidity. Until all tokens are released, 30% of the treasury (earned through sales) will be allocated to grow the liquidity pool. This process will take place once a quarter until all tokens are put into circulation."
        : "Нарастить пул ликвидности. Для этого, до того момента когда все монеты будут введены в оборот, будет выделяться 30% с казны проекта, взятых с полученных процентов от продаж токена. Этот процесс будет проходить раз в квартал, пока все токены не будут введены в обращение."
    },
    {
      step: language === 'en' ? "Step 2" : "Шаг 2",
      title: language === 'en' ? "Token Burning" : "Сжигание токенов",
      description: language === 'en'
        ? "Treasury distribution for quarterly token burning."
        : "Распределение казны для ежеквартального сжигания токенов.",
      distribution: {
        team: 50,
        burning: 30,
        pr: 20,
      },
      goal: language === 'en'
        ? "Token burning. This process will occur once every quarter until all tokens (10% of total supply) allocated for burning are fully destroyed."
        : "Сжигание токенов. Этот процесс будет происходить раз в квартал, пока все токены (10% от общего предложения), выделенные для сжигания, не будут полностью уничтожены."
    }
  ];
  
  const tokenomicsData: TokenomicsItem[] = [
    { name: language === 'en' ? "Circulation" : "В обращении", value: 60, color: "#1a1a1a" },
    { name: language === 'en' ? "Team Reserved" : "Резерв команды", value: 30, color: "#4a4a4a" },
    { name: language === 'en' ? "Token Burning" : "Сжигание токенов", value: 10, color: "#7a7a7a" }
  ];
  
  const [animatedValues, setAnimatedValues] = useState<number[]>(tokenomicsData.map(() => 0))
  const [isVisible, setIsVisible] = useState(false)
  const currentContent = content[language]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      tokenomicsData.forEach((_: TokenomicsItem, index: number) => {
        setTimeout(() => {
          setAnimatedValues((prev: number[]) => {
            const newValues = [...prev]
            newValues[index] = tokenomicsData[index].value
            return newValues
          })
        }, index * 200)
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const animatedData = tokenomicsData.map((item: TokenomicsItem, index: number) => ({
    ...item,
    value: animatedValues[index],
  }))

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang)
  }

  const getFontClass = (isRussian: boolean) => {
    return isRussian && language === 'ru' 
      ? 'font-[family-name:var(--font-milk)]'
      : 'font-[family-name:var(--font-nhl-phoenix)] font-light'
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("4UUh7nEwB2CRj5MVbE26FBimuoazEGFGzydBykWypHWZ")
    toast({
      title: language === 'en' ? "Contract Address Copied" : "Адрес контракта скопирован",
      description: language === 'en' 
        ? "The contract address has been copied to your clipboard" 
        : "Адрес контракта был скопирован в буфер обмена",
      duration: 2000,
    })
  }

  return (
    <div className={`min-h-screen bg-[#eeefea] text-[#0c0c0a] ${nhlPhoenix.variable} ${milkFont.variable}`}>
      {/* Navbar */}
      <nav className="bg-[#0c0c0a] text-[#eeefea] py-4 px-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Left section - Logo and brand name */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Murayev Capital" className="h-8 w-8 rounded-full object-cover" />
            <span className="font-nhl font-light">MURAYEV CAPITAL</span>
          </div>

          {/* Center section - Navigation links */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            <a href="#about" className={`hover:text-gray-300 transition-colors uppercase ${getFontClass(language === 'ru')}`}>
              {language === 'en' ? 'About' : 'О проекте'}
            </a>
            <a href="#tokenomics" className={`hover:text-gray-300 transition-colors uppercase ${getFontClass(language === 'ru')}`}>
              {language === 'en' ? 'Tokenomics' : 'Токеномика'}
            </a>
            <a href="#how-to-buy" className={`hover:text-gray-300 transition-colors uppercase ${getFontClass(language === 'ru')}`}>
              {language === 'en' ? 'How to Buy' : 'Как купить'}
            </a>
            <a href="#roadmap" className={`hover:text-gray-300 transition-colors uppercase ${getFontClass(language === 'ru')}`}>
              {language === 'en' ? 'Roadmap' : 'Цели'}
            </a>
          </div>

          {/* Right section - Language switcher and Buy button */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher onLanguageChange={handleLanguageChange} />
            <Button
              size="sm"
              className={`bg-[#eeefea] text-[#0c0c0a] hover:bg-gray-200 ${getFontClass(language === 'ru')}`}
              onClick={() =>
                window.open(
                  "https://raydium.io/swap/?outputMint=4UUh7nEwB2CRj5MVbE26FBimuoazEGFGzydBykWypHWZ&inputMint=sol",
                  "_blank",
                )
              }
            >
              {language === 'en' ? 'BUY MRV' : 'КУПИТЬ MRV'}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              className="text-[#eeefea] border-[#eeefea]"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Using Sheet component */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent className="bg-[#0c0c0a] text-[#eeefea] p-6">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">
              {currentContent.heroSection.badge}
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-4">
            <a
              href="#about"
              className={`block py-2 px-4 rounded-md hover:bg-[#eeefea] hover:text-[#0c0c0a] transition-colors ${getFontClass(language === 'ru')}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {language === 'en' ? 'About' : 'О проекте'}
            </a>
            <a
              href="#tokenomics"
              className={`block py-2 px-4 rounded-md hover:bg-[#eeefea] hover:text-[#0c0c0a] transition-colors ${getFontClass(language === 'ru')}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {language === 'en' ? 'Tokenomics' : 'Токеномика'}
            </a>
            <a
              href="#how-to-buy"
              className={`block py-2 px-4 rounded-md hover:bg-[#eeefea] hover:text-[#0c0c0a] transition-colors ${getFontClass(language === 'ru')}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {language === 'en' ? 'How to Buy' : 'Как купить'}
            </a>
            <a
              href="#roadmap"
              className={`block py-2 px-4 rounded-md hover:bg-[#eeefea] hover:text-[#0c0c0a] transition-colors ${getFontClass(language === 'ru')}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {language === 'en' ? 'Roadmap' : 'Цели'}
            </a>
          </div>

          {/* Language switcher in mobile menu */}
          <div className="mt-6">
            <LanguageSwitcher onLanguageChange={handleLanguageChange} />
          </div>

          {/* Buy button in mobile menu */}
          <div className="mt-8">
            <Button
              size="lg"
              className="w-full bg-[#eeefea] text-[#0c0c0a] hover:bg-gray-200"
              onClick={() =>
                window.open(
                  "https://raydium.io/swap/?outputMint=4UUh7nEwB2CRj5MVbE26FBimuoazEGFGzydBykWypHWZ&inputMint=sol",
                  "_blank",
                )
              }
            >
              {language === 'en' ? 'BUY MRV' : 'КУПИТЬ MRV'}
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Hero Section */}
      <section className="relative bg-[#EEEFEA] text-[#0c0c0a] py-20 px-4">
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content - Left Side */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-block">
                  <Badge className={`bg-[#0c0c0a] text-[#eeefea] px-4 py-2 text-sm font-semibold mb-4 ${getFontClass(false)}`}>
                     {currentContent.heroSection.badge}
                  </Badge>
                </div>
                <h1 className={`text-5xl md:text-7xl font-bold tracking-tight leading-tight ${getFontClass(false)}`}>
                  <span className="block">MURAYEV</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0c0c0a] to-gray-600">
                    CAPITAL
                  </span>
                </h1>
                <p className={`text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed ${getFontClass(true)}`}>
                  {currentContent.heroSection.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {currentContent.heroSection.features.map((feature) => (
                  <Badge
                    key={feature.text}
                    variant="outline"
                    className={`text-[#0c0c0a] border-[#0c0c0a] px-4 py-3 text-lg hover:bg-[#0c0c0a] hover:text-[#eeefea] transition-colors ${getFontClass(language === 'ru')}`}
                  >
                    {feature.text}
                  </Badge>
                ))}
              </div>

              {/* Hero buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className={`bg-[#0c0c0a] text-[#eeefea] hover:bg-gray-800 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${getFontClass(language === 'ru')}`}
                  onClick={() =>
                    window.open(
                      "https://raydium.io/swap/?outputMint=4UUh7nEwB2CRj5MVbE26FBimuoazEGFGzydBykWypHWZ&inputMint=sol",
                      "_blank",
                    )
                  }
                >
                  {language === 'en' ? 'Buy MRV Token' : 'Купить токен MRV'}
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`border-[#0c0c0a] text-[#0c0c0a] hover:bg-[#0c0c0a] hover:text-[#eeefea] px-8 py-4 text-lg font-semibold bg-transparent ${getFontClass(language === 'ru')}`}
                  onClick={() => document.getElementById("how-to-buy")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {language === 'en' ? 'How to Buy' : 'Как купить'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Logo - Right Side */}
            <div className="flex justify-center">
              <img
                src="/logo.png"
                alt="Murayev Capital Logo"
                className="h-[400px] md:h-[500px] w-auto transform transition-all duration-300 hover:scale-110 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Moved up */}
      <section id="about" className="py-20 px-4 bg-[#eeefea] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 border-2 border-[#0c0c0a] rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-[#0c0c0a] rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-[#0c0c0a] rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <Badge className={`bg-[#0c0c0a] text-[#eeefea] px-4 py-2 text-sm font-semibold mb-6 ${getFontClass(false)}`}>
              {currentContent.about.badge}
            </Badge>
            <h2 className={`text-4xl md:text-5xl font-bold mb-8 text-[#0c0c0a] ${getFontClass(language === 'ru')}`}>
              {currentContent.about.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left side - Main content */}
            <div className="space-y-8">
              <div className={`text-lg leading-relaxed space-y-6 ${getFontClass(true)}`}>
                <p className="text-gray-700">
                  <strong className="text-[#0c0c0a] text-xl">Murayev Capital</strong> {currentContent.about.description}
                </p>
                <p className="text-gray-700">
                  {currentContent.about.subDescription}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-[#0c0c0a] shadow-lg">
                <p className={`text-xl font-semibold text-[#0c0c0a] mb-4 ${getFontClass(language === 'ru')}`}>
                  {currentContent.about.mission.title}
                </p>
                <p className={`text-gray-700 ${getFontClass(true)}`}>
                  {currentContent.about.mission.description}
                </p>
              </div>
            </div>

            {/* Right side - Visual elements */}
            <div className="space-y-6">
              {currentContent.about.features.map((feature) => (
                <Card key={feature.title} className="border-2 border-[#0c0c0a] hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-4 text-center">
                    <div className="mb-4">
                      <img src={feature.image} alt={feature.title} className="w-20 h-20 mx-auto" />
                    </div>
                    <h3 className={`subheading text-xl font-bold mb-2 text-[#0c0c0a] ${getFontClass(language === 'ru')}`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-20 px-4 bg-[#eeefea] text-[#0c0c0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${getFontClass(language === 'ru')}`}>
              {language === 'en' ? 'TOKENOMICS' : 'ТОКЕНОМИКА'}
            </h2>
            <div className="text-4xl font-bold mb-2">30,000,000</div>
            <p className="text-xl text-gray-600">MRV Tokens</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-[#0c0c0a] hover:shadow-lg transition-shadow bg-[#eeefea]">
              <CardHeader>
                <CardTitle className={`card-title flex items-center text-[#0c0c0a] ${getFontClass(language === 'ru')}`}>
                  <BarChart3 className="w-6 h-6 mr-2" />
                  {language === 'en' ? 'Total Supply' : 'Общее предложение'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-2xl font-bold mb-2 text-[#0c0c0a]">30,000,000</p>
                <p className="text-gray-600">MRV Tokens</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#0c0c0a] hover:shadow-lg transition-shadow bg-[#eeefea]">
              <CardHeader>
                <CardTitle className={`card-title flex items-center text-[#0c0c0a] ${getFontClass(language === 'ru')}`}>
                  <Users className="w-6 h-6 mr-2" />
                  {language === 'en' ? 'Initial Block' : 'Начальный блок'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-2xl font-bold mb-2 text-[#0c0c0a]">180,000</p>
                <p className="text-gray-600">{language === 'en' ? 'Available for purchase' : 'Доступно для покупки'}</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#0c0c0a] hover:shadow-lg transition-shadow bg-[#eeefea]">
              <CardHeader>
                <CardTitle className={`card-title flex items-center text-[#0c0c0a] ${getFontClass(language === 'ru')}`}>
                  <Coins className="w-6 h-6 mr-2" />
                  {language === 'en' ? 'Transaction Fee' : 'Комиссия за транзакцию'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-2xl font-bold mb-2 text-[#0c0c0a]">0.5%</p>
                <p className="text-gray-600">{language === 'en' ? 'Per buy/sell operation' : 'За операцию покупки/продажи'}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={animatedData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={140}
                    paddingAngle={2}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {animatedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Allocation"]}
                    contentStyle={{
                      backgroundColor: "#eeefea",
                      color: "#0c0c0a",
                      border: "1px solid #0c0c0a",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-6">
              {tokenomicsData.map((item) => (
                <Card key={item.name} className="border-2 border-[#0c0c0a] bg-[#eeefea]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-semibold text-lg text-[#0c0c0a] ${getFontClass(language === 'ru')}`}>
                        {item.name}
                      </span>
                      <span className={`text-2xl font-bold text-[#0c0c0a] ${getFontClass(language === 'ru')}`}>
                        {item.value}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Buy Section */}
      <section id="how-to-buy" className="py-20 px-4 bg-[#eeefea] text-[#0c0c0a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${getFontClass(language === 'ru')}`}>
              {currentContent.howToBuy.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {currentContent.howToBuy.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {currentContent.howToBuy.steps.map((step, index) => (
              <Card key={step.title} className="border-2 border-[#0c0c0a] hover:shadow-lg transition-shadow text-center p-6">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-[#0c0c0a] text-[#eeefea] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">{index + 1}</span>
                  </div>
                  <img src={step.image} alt={step.title} className="w-16 h-16 mx-auto" />
                </div>
                <h3 className={`subheading text-xl font-bold mb-4 ${getFontClass(language === 'ru')}`}>
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-[#0c0c0a] text-[#eeefea] hover:bg-gray-800 px-8 py-4 text-lg font-semibold"
              onClick={() =>
                window.open(
                  "https://raydium.io/swap/?outputMint=4UUh7nEwB2CRj5MVbE26FBimuoazEGFGzydBykWypHWZ&inputMint=sol",
                  "_blank",
                )
              }
            >
              Buy on Raydium Now
              <ExternalLink className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contract Address Section - Moved below How to Buy */}
      <section className="py-12 px-4 bg-[#0c0c0a] text-[#eeefea]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className={`text-2xl font-bold mb-6 ${getFontClass(language === 'ru')}`}>
            {language === 'en' ? 'Contract Address' : 'Адрес контракта'}
          </h3>
          <div className="flex items-center justify-center gap-4 bg-[#0c0c0a] text-[#eeefea] p-4 rounded-lg border border-[#eeefea]/20">
            <code className={`text-sm md:text-base font-[family-name:var(--font-inter)] break-all`}>
              4UUh7nEwB2CRj5MVbE26FBimuoazEGFGzydBykWypHWZ
            </code>
            <Button
              size="sm"
              className="bg-[#eeefea] text-[#0c0c0a] hover:bg-gray-200 shrink-0"
              onClick={handleCopyAddress}
            >
              {language === 'en' ? 'Copy' : 'Копировать'}
            </Button>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-20 px-4 bg-[#eeefea] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-[#0c0c0a] rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 border border-[#0c0c0a] rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <Badge className="bg-[#0c0c0a] text-[#eeefea] px-4 py-2 text-sm font-semibold mb-6">
              {language === 'en' ? 'Project Roadmap' : 'План развития'}
            </Badge>
            <h2 className={`text-4xl md:text-5xl font-bold text-center mb-6 text-[#0c0c0a] ${getFontClass(language === 'ru')}`}>
              {language === 'en' ? 'First Key Goals' : 'Первые важные цели'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Our Strategic Approach To Building Sustainable Value And Community Growth'
                : 'Наш стратегический подход к созданию устойчивой ценности и росту сообщества'}
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Central Timeline Line - hidden on mobile, centered on larger screens */}
            <div className="absolute md:left-1/2 left-4 transform md:-translate-x-1/2 w-1 h-full bg-[#0c0c0a] opacity-20"></div>

            <div className="space-y-16">
              {roadmapSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start md:items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row gap-8`}
                >
                  {/* Timeline Content */}
                  <div className={`flex-1 md:flex-1 w-full pl-12 md:pl-0 ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  }`}>
                    <Card
                      className="border-2 border-[#0c0c0a] hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <CardHeader className="bg-[#0c0c0a] text-[#eeefea]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-[#eeefea] rounded-full flex items-center justify-center p-2">
                              <img
                                src={index === 0 ? "/images/liquidity.gif" : "/images/burning.gif"}
                                alt={index === 0 
                                  ? language === 'en' ? "Liquidity Animation" : "Анимация ликвидности"
                                  : language === 'en' ? "Burning Animation" : "Анимация сжигания"}
                                className="w-12 h-12"
                              />
                            </div>
                            <div>
                              <Badge className="bg-[#eeefea] text-[#0c0c0a] mb-2">
                                {language === 'en' ? step.step : `Шаг ${index + 1}`}
                              </Badge>
                              <CardTitle className={`text-2xl ${getFontClass(language === 'ru')}`}>
                                {language === 'en' ? step.title : index === 0 ? 'Построение ликвидности' : 'Сжигание токенов'}
                              </CardTitle>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 space-y-6">
                        <p className="text-lg text-gray-700">
                          {language === 'en' ? step.description : index === 0 
                            ? 'Дивиденды от продаж токенов будут использоваться для достижения начальных целей.'
                            : 'Распределение казны для ежеквартального сжигания токенов.'}
                        </p>

                        {/* Treasury Distribution Visualization */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className={`font-semibold text-[#0c0c0a] mb-4 ${getFontClass(language === 'ru')}`}>
                            {language === 'en' ? 'Treasury Distribution' : 'Распределение казны'}
                          </h4>
                          <div className="space-y-3">
                            {Object.entries(step.distribution).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-4 h-4 bg-[#0c0c0a] rounded-full"></div>
                                  <span className="capitalize font-medium">
                                    {language === 'en' 
                                      ? key === "pr" 
                                        ? "PR & Marketing" 
                                        : key.replace(/([A-Z])/g, " $1").trim()
                                      : key === "pr"
                                        ? "PR и маркетинг"
                                        : key === "liquidity"
                                          ? "Ликвидность"
                                          : key === "team"
                                            ? "Команда"
                                            : key === "burning"
                                              ? "Сжигание"
                                              : key}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-[#0c0c0a] rounded-full transition-all duration-1000"
                                      style={{ width: `${value}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-lg font-bold text-[#0c0c0a] min-w-[3rem]">{value}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Goal Section */}
                        <div className="bg-[#0c0c0a] text-[#eeefea] p-4 rounded-lg relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-[#eeefea] opacity-10 rounded-full -mr-10 -mt-10"></div>
                          <div className="relative">
                            <p className="font-semibold mb-2 flex items-center gap-2">
                              {language === 'en' ? 'PRIMARY GOAL:' : 'ОСНОВНАЯ ЦЕЛЬ:'}
                            </p>
                            <p className="leading-relaxed">
                              {language === 'en' ? step.goal : index === 0 
                                ? 'Нарастить пул ликвидности. Для этого, до того момента когда все монеты будут введены в оборот, будет выделяться 30% с казны проекта, взятых с полученных процентов от продаж токена. Этот процесс будет проходить раз в квартал, пока все токены не будут введены в обращение.'
                                : 'Сжигание токенов. Этот процесс будет происходить раз в квартал, пока все токены (10% от общего предложения), выделенные для сжигания, не будут полностью уничтожены.'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Node - absolute positioned on mobile, centered on larger screens */}
                  <div className="absolute md:relative left-0 md:left-auto top-0 md:top-auto md:transform-none">
                    <div className="w-8 h-8 bg-[#0c0c0a] rounded-full border-4 border-[#eeefea] shadow-lg z-10 flex items-center justify-center ml-0 md:mx-auto">
                      <div className="w-3 h-3 bg-[#eeefea] rounded-full"></div>
                    </div>
                  </div>

                  {/* Empty space for alternating layout - hidden on mobile */}
                  <div className="hidden md:block md:flex-1"></div>
                </div>
              ))}

              {/* Timeline End */}
              <div className="flex justify-center mt-12">
                <div className="bg-[#0c0c0a] text-[#eeefea] px-6 py-3 rounded-full font-semibold font-[family-name:var(--font-nhl-phoenix)] font-light">
                  {language === 'en' ? 'LAUNCH & BEYOND' : 'ЗАПУСК И РАЗВИТИЕ'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section id="security" className="py-20 px-4 bg-[#0c0c0a] text-[#eeefea]">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${getFontClass(language === 'ru')}`}>
            {currentContent.security.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className={`text-2xl font-bold mb-6 ${getFontClass(language === 'ru')}`}>
                {currentContent.security.subtitle}
              </h3>
              <p className="text-lg mb-8 text-zinc-300">
                {currentContent.security.description}
              </p>

              <div className="space-y-4">
                {currentContent.security.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" style={{ color: "#eeefea" }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-2 border-[#0c0c0a] bg-[#eeefea] text-[#0c0c0a]">
              <CardHeader>
                <CardTitle className={`flex items-center ${getFontClass(language === 'ru')}`}>
                  <Lock className="w-6 h-6 mr-2" />
                  {language === 'en' ? 'Liquidity Building' : 'Построение ликвидности'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentContent.security.liquidity.points.map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <ArrowRight className="w-5 h-5" />
                    <span>{point}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#eeefea] text-[#0c0c0a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${getFontClass(language === 'ru')}`}>
            {currentContent.cta.title}
          </h2>
          <p className="text-xl mb-8 text-gray-700">{currentContent.cta.subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-[#0c0c0a] text-[#eeefea] hover:bg-gray-800 px-8 py-4 text-lg font-semibold font-[family-name:var(--font-nhl-phoenix)] font-light"
              onClick={() =>
                window.open(
                  "https://solscan.io/token/4UUh7nEwB2CRj5MVbE26FBimuoazEGFGzydBykWypHWZ",
                  "_blank",
                )
              }
            >
              {currentContent.cta.buttons.primary}
              <ExternalLink className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#0c0c0a] text-[#0c0c0a] hover:bg-[#0c0c0a] hover:text-[#eeefea] px-8 py-4 text-lg font-semibold bg-transparent font-[family-name:var(--font-nhl-phoenix)] font-light"
              onClick={() => window.open("https://t.me/fan_club_MRV", "_blank")}
            >
              {currentContent.cta.buttons.secondary}
              <i className="fa-brands fa-telegram w-5 h-5 ml-2"></i>
            </Button>
          </div>

          
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#eeefea] to-[#e5e6e1] text-[#0c0c0a]">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border-2 border-[#0c0c0a]/10 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-[#0c0c0a] text-[#eeefea] px-8 py-3 rounded-full shadow-lg">
                <h2 className={`text-2xl font-bold ${getFontClass(language === 'ru')}`}>
                  {language === 'en' ? 'Contact Us' : 'Связаться с нами'}
                </h2>
              </div>
            </div>

            <div className="mt-8 space-y-8 text-center">
              <div className="flex items-center justify-center gap-4 p-6 bg-white/80 rounded-xl backdrop-blur-sm hover:bg-white transition-all duration-300">
                <div className="p-3 bg-[#0c0c0a] rounded-full">
                  <Mail className="w-6 h-6 text-[#eeefea]" />
                </div>
                <span className="text-xl font-medium">contact@murayevcapital.com</span>
              </div>

              <div className="flex flex-col items-center gap-6">
                <Button
                  size="lg"
                  className="group relative bg-[#0c0c0a] text-[#eeefea] hover:bg-gray-800 px-8 py-6 text-lg font-semibold rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl"
                  onClick={() => window.location.href = 'mailto:contact@murayevcapital.com'}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center gap-3">
                    {language === 'en' ? 'Send Email' : 'Отправить письмо'}
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Button>

                <p className="text-gray-600 text-sm max-w-md">
                  {language === 'en' 
                    ? 'We typically respond within 24 hours during business days.'
                    : 'Мы обычно отвечаем в течение 24 часов в рабочие дни.'}
                </p>
              </div>

              <div className="pt-6">
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full hover:scale-110 transition-transform duration-300 border-[#0c0c0a] text-[#0c0c0a] hover:bg-[#0c0c0a] hover:text-[#eeefea]"
                    onClick={() => window.open("https://t.me/fan_club_MRV", "_blank")}
                  >
                    <i className="fa-brands fa-telegram w-5 h-5"></i>
                  </Button>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#0c0c0a] text-[#eeefea]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <img src="/logo.png" alt="Murayev Capital Logo" className="h-16 w-auto mx-auto filter brightness-110" />
          </div>
          <p className="mb-4">{currentContent.footer.description}</p>
          <p className="text-sm">{currentContent.footer.copyright}</p>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}

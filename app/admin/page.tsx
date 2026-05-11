"use client"

import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth"
import { db, auth } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MousePointerClick, LogOut, Lock, BarChart3 } from "lucide-react"
import { LanguageSwitcher, type Language } from "@/components/ui/language-switcher"
import { motion, AnimatePresence } from "framer-motion"

export default function AdminPage() {
  const [clicks, setClicks] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [language, setLanguage] = useState<Language>("ru")

  const t = {
    en: {
      adminDashboard: "Admin Dashboard",
      monitorStats: "Monitor website statistics and interactions.",
      forumClicks: "Forum Join Clicks",
      totalClicks: "Total clicks on \"Join Us\" button",
      adminLogin: "Admin Login",
      email: "Email",
      password: "Password",
      login: "Login",
      logout: "Logout",
      loading: "Loading...",
      invalidCreds: "Invalid credentials",
      welcomeBack: "Welcome back to Murayev Capital"
    },
    ru: {
      adminDashboard: "Панель администратора",
      monitorStats: "Отслеживайте статистику и взаимодействия на сайте.",
      forumClicks: "Клики по кнопке форума",
      totalClicks: "Всего кликов по кнопке «Присоединиться»",
      adminLogin: "Вход администратора",
      email: "E-mail",
      password: "Пароль",
      login: "Войти",
      logout: "Выйти",
      loading: "Загрузка...",
      invalidCreds: "Неверные учетные данные",
      welcomeBack: "Добро пожаловать в Murayev Capital"
    }
  }

  const currentT = t[language]

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        // Subscribe to stats
        const unsubDoc = onSnapshot(doc(db, "stats", "forum_clicks"), (docSnapshot) => {
          if (docSnapshot.exists()) {
            setClicks(docSnapshot.data().count || 0)
          }
          setLoading(false)
        }, (error) => {
          console.error("Error fetching clicks:", error)
          setLoading(false)
        })
        return () => unsubDoc()
      } else {
        setLoading(false)
      }
    })
    return () => unsubAuth()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
      setLoginError(currentT.invalidCreds)
    }
  }

  const handleLogout = () => {
    signOut(auth)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#eeefea] text-[#0c0c0a] font-bold">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-4"
        >
          <img src="/logo.png" alt="Loading" className="w-16 h-16 rounded-full" style={{ animation: "spin 3s linear infinite" }} />
          <p>{currentT.loading}</p>
        </motion.div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#eeefea] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }} 
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[#0c0c0a] opacity-5 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }} 
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-[#0c0c0a] opacity-5 rounded-full blur-3xl"
          />
        </div>

        <div className="absolute top-4 right-4 z-20">
          <LanguageSwitcher invert onLanguageChange={setLanguage} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="w-full max-w-md z-10 relative"
        >
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
            <CardHeader className="pt-10 pb-6 text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                className="mx-auto bg-[#0c0c0a] p-1.5 rounded-full w-24 h-24 flex items-center justify-center mb-4 shadow-xl"
              >
                <img src="/logo.png" alt="Murayev Capital" className="w-full h-full object-cover rounded-full bg-white" />
              </motion.div>
              <CardTitle className="text-3xl font-black text-[#0c0c0a] tracking-tight">
                {currentT.adminLogin}
              </CardTitle>
              <p className="text-gray-500 mt-2 font-medium">{currentT.welcomeBack}</p>
            </CardHeader>
            <CardContent className="px-10 pb-10">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-1">
                  <Input
                    type="email"
                    placeholder={currentT.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 bg-gray-50/50 border-gray-200 focus-visible:ring-2 focus-visible:ring-[#0c0c0a] focus-visible:border-transparent rounded-xl text-lg transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <Input
                    type="password"
                    placeholder={currentT.password}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 bg-gray-50/50 border-gray-200 focus-visible:ring-2 focus-visible:ring-[#0c0c0a] focus-visible:border-transparent rounded-xl text-lg transition-all"
                  />
                </div>
                {loginError && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-red-500 font-semibold text-center"
                  >
                    {loginError}
                  </motion.p>
                )}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full h-14 bg-[#0c0c0a] text-[#eeefea] hover:bg-gray-800 transition-all rounded-xl text-lg font-bold uppercase tracking-widest shadow-md">
                    {currentT.login}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#eeefea] p-8 font-sans relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-gray-200/50 to-transparent pointer-events-none" />
      
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher invert onLanguageChange={setLanguage} />
      </div>
      
      <div className="max-w-5xl mx-auto space-y-12 mt-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-full shadow-sm" />
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-[#0c0c0a] tracking-tight">{currentT.adminDashboard}</h1>
              <p className="text-gray-600 font-medium">{currentT.monitorStats}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-2 border-[#0c0c0a] text-[#0c0c0a] hover:bg-[#0c0c0a] hover:text-[#eeefea] rounded-xl px-6 h-12 font-bold uppercase tracking-wider transition-all">
            <LogOut className="w-5 h-5 mr-2" />
            {currentT.logout}
          </Button>
        </motion.div>

        <div className="flex justify-center items-center mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="w-full max-w-2xl"
          >
            <Card className="border-0 bg-white shadow-2xl rounded-[2.5rem] overflow-hidden relative">
              <motion.div
                animate={{ x: ["-200%", "300%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
                className="absolute inset-0 z-20 pointer-events-none w-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[25deg] mix-blend-overlay"
              />
              
              <CardHeader className="bg-[#0c0c0a] text-[#eeefea] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <motion.div 
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 10 }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  className="absolute -right-8 -top-8 opacity-10 text-white"
                >
                  <BarChart3 className="w-64 h-64" />
                </motion.div>
                
                <div className="bg-white/10 p-5 rounded-2xl mb-6 backdrop-blur-sm relative z-10 border border-white/20">
                  <MousePointerClick className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold uppercase tracking-widest relative z-10 text-white/90">
                  {currentT.forumClicks}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-16 flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 relative">
                <div className="relative overflow-hidden h-36 flex items-center justify-center w-full">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={clicks}
                      initial={{ y: 50, opacity: 0, scale: 0.5 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -50, opacity: 0, scale: 1.5 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        mass: 1 
                      }}
                      className="text-[7rem] leading-none md:text-[9rem] font-black text-[#0c0c0a] tabular-nums tracking-tighter drop-shadow-md absolute"
                    >
                      {clicks.toLocaleString()}
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 flex items-center justify-center gap-3 bg-gray-100/80 px-6 py-2.5 rounded-full border border-gray-200"
                >
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-[0.2em]">
                    {currentT.totalClicks}
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}



"use client"

import Link from 'next/link';
import { Leaf, Trophy, LayoutDashboard, AlertCircle, User, ArrowRight, LayoutGrid, Gift } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const navItems = [
  { href: '/home', label: 'الرئيسية', icon: LayoutDashboard },
  { href: '/challenges', label: 'التحديات', icon: Leaf },
  { href: '/rewards', label: 'المكافآت', icon: Gift },
  { href: '/leaderboard', label: 'المتصدرين', icon: Trophy },
  { href: '/reports', label: 'البلاغات', icon: AlertCircle },
];

const pageTitles: Record<string, string> = {
  '/home': 'حيّان',
  '/challenges': 'التحديات',
  '/rewards': 'المكافآت',
  '/leaderboard': 'لوحة الشرف',
  '/reports': 'البلاغات البيئية',
  '/profile': 'الملف الشخصي',
  '/settings': 'الإعدادات',
};

const LOGO_URL = "https://res.cloudinary.com/ddznxtb6f/image/upload/v1770654493/image-removebg-preview_31_vmwvas.png";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname === '/auth' || pathname === '/') return null;

  const currentTitle = pageTitles[pathname] || 'حيّان';
  const isHome = pathname === '/home';
  const isProfile = pathname === '/profile';

  if (!mounted) return null;

  return (
    <>
      {/* Mobile Top Header */}
      {!isProfile && (
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="md:hidden sticky top-0 z-[60] w-full bg-black h-20 flex items-center justify-between px-6 shadow-2xl"
        >
          <div className="flex items-center gap-4">
            {!isHome && (
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => router.back()}
                className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white transition-transform"
              >
                <ArrowRight className="h-7 w-7" />
              </motion.button>
            )}
            <h1 className="text-2xl font-black text-primary font-headline tracking-tight">
              {currentTitle}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {isHome ? (
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center p-1.5 overflow-hidden"
              >
                <Image src={LOGO_URL} alt="Logo" width={40} height={40} className="object-contain" />
              </motion.div>
            ) : (
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push('/home')}
                className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white"
              >
                 <LayoutGrid className="h-6 w-6" />
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* Desktop Top Nav */}
      {!isProfile && (
        <nav className="sticky top-0 z-50 w-full bg-background/80 dark:bg-zinc-950/80 backdrop-blur-md border-none hidden md:block">
          <div className="container mx-auto flex h-20 items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <Link href="/home" className="flex items-center gap-3">
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  className="rounded-2xl bg-white p-1.5 shadow-lg border border-primary/10 overflow-hidden w-12 h-12 flex items-center justify-center"
                >
                  <Image src={LOGO_URL} alt="Logo" width={32} height={32} className="object-contain" />
                </motion.div>
                <span className="text-2xl font-bold tracking-tight text-foreground font-headline">حيّان</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-8 bg-white/50 dark:bg-zinc-900/50 px-6 py-2 rounded-full border border-white/20 shadow-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-semibold transition-all hover:text-primary relative",
                    pathname === item.href ? "text-primary scale-105" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                  {pathname === item.href && (
                    <motion.div 
                      layoutId="activeTabDesktop"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/profile" className={cn(
                "h-10 w-10 rounded-2xl flex items-center justify-center border-2 shadow-sm overflow-hidden transition-all",
                pathname === '/profile' ? "bg-primary text-white border-primary" : "bg-muted text-muted-foreground border-white hover:border-primary"
              )}>
                 <User className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </nav>
      )}
      
      {/* Mobile Bottom Nav */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="md:hidden fixed bottom-6 left-6 right-6 h-20 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-[2.5rem] flex justify-around items-center z-50 shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-white/40 px-3 py-2"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-14 h-14"
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeTabMobile"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 bg-primary rounded-2xl shadow-xl shadow-primary/40"
                  />
                )}
              </AnimatePresence>
              <motion.div
                whileTap={{ scale: 0.8 }}
                className={cn(
                  "relative flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 z-10",
                  isActive ? "text-white scale-110" : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("h-7 w-7", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
              </motion.div>
            </Link>
          );
        })}
        <Link
          href="/profile"
          className="relative flex flex-col items-center justify-center w-14 h-14"
        >
          <AnimatePresence>
            {pathname === '/profile' && (
              <motion.div
                layoutId="activeTabMobile"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-0 bg-primary rounded-2xl shadow-xl shadow-primary/40"
              />
            )}
          </AnimatePresence>
          <motion.div 
            whileTap={{ scale: 0.8 }}
            className={cn(
              "relative flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 z-10",
              pathname === '/profile' ? "text-white" : "text-muted-foreground"
            )}
          >
            <User className="h-7 w-7" />
          </motion.div>
        </Link>
      </motion.div>
    </>
  );
}

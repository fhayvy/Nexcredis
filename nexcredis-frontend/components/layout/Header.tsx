'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bars3Icon, 
  XMarkIcon, 
  BellIcon, 
  UserCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  WalletIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../../hooks/useAuth'
import { useWeb3 } from '../../hooks/useWeb3'
import WalletConnect from '../auth/WalletConnect'
import NotificationCenter from '../dashboard/NotificationCenter'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Courses', href: '/courses' },
  { name: 'Credentials', href: '/credentials' },
  { name: 'Marketplace', href: '/marketplace' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { account, balance, disconnect } = useWeb3()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
    await disconnect()
    setUserMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-neutral-navy/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container-responsive">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-hedera rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-gold rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-display font-bold gradient-text">Nexcredis</h1>
              <p className="text-xs text-neutral-silver">Web3 Education</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  pathname.startsWith(item.href)
                    ? 'text-primary'
                    : 'text-neutral-silver hover:text-neutral-white'
                }`}
              >
                {item.name}
                {pathname.startsWith(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-silver" />
              <input
                type="text"
                placeholder="Search courses, credentials..."
                className="w-full pl-10 pr-4 py-2 bg-neutral-slate/50 border border-neutral-silver/20 rounded-xl text-sm text-neutral-white placeholder-neutral-silver focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Wallet Info */}
                {account && (
                  <div className="hidden sm:flex items-center space-x-2 bg-hedera/10 border border-hedera/20 rounded-xl px-3 py-2">
                    <WalletIcon className="w-4 h-4 text-hedera" />
                    <span className="text-sm font-medium text-hedera">
                      {balance?.toFixed(2)} HBAR
                    </span>
                  </div>
                )}

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2 text-neutral-silver hover:text-neutral-white transition-colors duration-200"
                  >
                    <BellIcon className="w-6 h-6" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-accent-coral rounded-full"></span>
                  </button>
                  
                  <AnimatePresence>
                    {notificationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 top-12 w-80 z-50"
                      >
                        <NotificationCenter onClose={() => setNotificationsOpen(false)} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-xl hover:bg-neutral-slate/50 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-hedera rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <ChevronDownIcon className="w-4 h-4 text-neutral-silver" />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 top-12 w-64 bg-neutral-slate border border-neutral-silver/20 rounded-xl shadow-xl z-50"
                      >
                        <div className="p-4 border-b border-neutral-silver/20">
                          <p className="font-semibold text-neutral-white">{user.name}</p>
                          <p className="text-sm text-neutral-silver">{user.email}</p>
                          <div className="flex items-center mt-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'instructor' 
                                ? 'bg-accent-gold/20 text-accent-gold'
                                : user.role === 'admin'
                                ? 'bg-accent-coral/20 text-accent-coral'
                                : 'bg-hedera/20 text-hedera'
                            }`}>
                              {user.role}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-2">
                          <Link
                            href="/profile"
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-neutral-charcoal/50 transition-colors duration-200"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <UserCircleIcon className="w-5 h-5 text-neutral-silver" />
                            <span className="text-sm text-neutral-white">Profile</span>
                          </Link>
                          
                          <Link
                            href="/profile/settings"
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-neutral-charcoal/50 transition-colors duration-200"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <CogIcon className="w-5 h-5 text-neutral-silver" />
                            <span className="text-sm text-neutral-white">Settings</span>
                          </Link>
                          
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent-coral/10 text-accent-coral transition-colors duration-200"
                          >
                            <ArrowRightOnRectangleIcon className="w-5 h-5" />
                            <span className="text-sm">Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <WalletConnect />
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-silver hover:text-neutral-white transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="btn-primary text-sm"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-silver hover:text-neutral-white transition-colors duration-200"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-neutral-silver/20 mt-4"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                      pathname.startsWith(item.href)
                        ? 'bg-primary/10 text-primary'
                        : 'text-neutral-silver hover:text-neutral-white hover:bg-neutral-slate/50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {!user && (
                  <div className="pt-4 border-t border-neutral-silver/20 space-y-2">
                    <Link
                      href="/login"
                      className="block px-4 py-3 text-base font-medium text-neutral-silver hover:text-neutral-white transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="block mx-4 py-3 px-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl text-center transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

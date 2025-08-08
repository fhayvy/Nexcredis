'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  AcademicCapIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'

const footerLinks = {
  platform: [
    { name: 'Courses', href: '/courses' },
    { name: 'Credentials', href: '/credentials' },
    { name: 'Instructors', href: '/instructors' },
    { name: 'Marketplace', href: '/marketplace' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api-docs' },
    { name: 'Community', href: '/community' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: '#', icon: '𝕏' },
  { name: 'LinkedIn', href: '#', icon: 'in' },
  { name: 'Discord', href: '#', icon: '💬' },
  { name: 'GitHub', href: '#', icon: '⚡' },
]

export default function Footer() {
  return (
    <footer className="bg-neutral-charcoal border-t border-neutral-silver/20">
      <div className="container-responsive py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-hedera rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold gradient-text">Nexcredis</h3>
                <p className="text-sm text-neutral-silver">Web3 Education Platform</p>
              </div>
            </Link>
            
            <p className="text-neutral-silver mb-6 leading-relaxed">
              Revolutionizing education through blockchain technology. Secure, verifiable, 
              and globally recognized credentials for the digital age.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-neutral-slate hover:bg-primary rounded-lg flex items-center justify-center text-neutral-silver hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-semibold text-neutral-white mb-4">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-silver hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-silver hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-silver hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-silver hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-neutral-silver/20 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="w-5 h-5 text-primary" />
              <span className="text-neutral-silver">hello@nexcredis.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <PhoneIcon className="w-5 h-5 text-primary" />
              <span className="text-neutral-silver">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPinIcon className="w-5 h-5 text-primary" />
              <span className="text-neutral-silver">San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-silver/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-neutral-silver text-sm mb-4 md:mb-0">
            © 2024 Nexcredis. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-neutral-silver">
            <span>Powered by Hedera Network</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-hedera rounded-full animate-pulse"></div>
              <span>Network Status: Active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

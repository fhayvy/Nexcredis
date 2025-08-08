import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../contexts/AuthContext'
import { Web3Provider } from '../contexts/Web3Context'
import { ThemeProvider } from '../contexts/ThemeContext'
import { NotificationProvider } from '../contexts/NotificationContext'
import { ModalProvider } from '../contexts/ModalContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nexcredis - Web3 Educational Platform',
  description: 'Revolutionary blockchain-powered educational platform for academic credentials, skill-based learning, and instructor certification on Hedera network.',
  keywords: ['Web3', 'Education', 'Blockchain', 'Hedera', 'NFT', 'Credentials', 'Learning'],
  authors: [{ name: 'Nexcredis Team' }],
  creator: 'Nexcredis',
  publisher: 'Nexcredis',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nexcredis.com'),
  openGraph: {
    title: 'Nexcredis - Web3 Educational Platform',
    description: 'Revolutionary blockchain-powered educational platform for academic credentials, skill-based learning, and instructor certification.',
    url: 'https://nexcredis.com',
    siteName: 'Nexcredis',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nexcredis Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexcredis - Web3 Educational Platform',
    description: 'Revolutionary blockchain-powered educational platform for academic credentials, skill-based learning, and instructor certification.',
    images: ['/twitter-image.jpg'],
    creator: '@nexcredis',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
          <AuthProvider>
            <Web3Provider>
              <NotificationProvider>
                <ModalProvider>
                  <div className="min-h-screen bg-gradient-to-br from-neutral-navy via-neutral-slate to-neutral-navy">
                    {children}
                    <Toaster position="top-right" />
                  </div>
                </ModalProvider>
              </NotificationProvider>
            </Web3Provider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

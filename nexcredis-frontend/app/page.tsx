'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  AcademicCapIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  SparklesIcon,
  ArrowRightIcon,
  PlayIcon,
  CheckIcon,
  StarIcon,
  TrophyIcon,
  UsersIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const features = [
  {
    icon: AcademicCapIcon,
    title: 'Blockchain Credentials',
    description: 'Secure, verifiable academic credentials stored as NFTs on Hedera network',
    color: 'from-primary to-primary-light'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Instructor Certification',
    description: 'Verified instructor profiles with blockchain-backed qualifications',
    color: 'from-hedera to-hedera-mint'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Token Rewards',
    description: 'Earn HBAR tokens for learning achievements and course completions',
    color: 'from-accent-gold to-accent-orange'
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Recognition',
    description: 'Internationally recognized credentials accepted by institutions worldwide',
    color: 'from-accent-coral to-primary'
  }
]

const stats = [
  { label: 'Active Learners', value: '50,000+', icon: UsersIcon },
  { label: 'Verified Instructors', value: '2,500+', icon: AcademicCapIcon },
  { label: 'Courses Available', value: '10,000+', icon: BookOpenIcon },
  { label: 'Credentials Issued', value: '125,000+', icon: TrophyIcon },
]

const testimonials = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Computer Science Professor',
    institution: 'MIT',
    content: 'Nexcredis has revolutionized how we issue and verify academic credentials. The blockchain integration ensures authenticity while the platform remains user-friendly.',
    rating: 5,
    avatar: '/professional-woman-diverse.png'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Software Engineer',
    institution: 'Google',
    content: 'The skill-based learning modules helped me advance my career. Having blockchain-verified credentials gave me a competitive edge in job applications.',
    rating: 5,
    avatar: '/professional-man.png'
  },
  {
    name: 'Prof. Emily Watson',
    role: 'Dean of Engineering',
    institution: 'Stanford University',
    content: 'We\'ve integrated Nexcredis into our curriculum. The token reward system motivates students, and the credential verification is seamless.',
    rating: 5,
    avatar: '/professional-woman-dean.png'
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 lg:pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-hedera/20 rounded-full blur-3xl animate-float animation-delay-400"></div>
        </div>
        
        <div className="relative container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <SparklesIcon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Powered by Hedera Blockchain</span>
              </div>
              
              <h1 className="responsive-text-5xl font-display font-bold text-balance mb-6">
                The Future of{' '}
                <span className="gradient-text">Web3 Education</span>{' '}
                is Here
              </h1>
              
              <p className="responsive-text-xl text-neutral-silver text-balance max-w-3xl mx-auto mb-8">
                Revolutionary blockchain-powered educational platform for academic credentials, 
                skill-based learning, and instructor certification. Secure, verifiable, and globally recognized.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
            >
              <Link href="/register" className="btn-primary text-lg px-8 py-4 group">
                Start Learning Today
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <button className="flex items-center space-x-3 text-neutral-white hover:text-primary transition-colors duration-200 group">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                  <PlayIcon className="w-6 h-6 ml-1" />
                </div>
                <span className="font-medium">Watch Demo</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="responsive-text-2xl font-bold text-neutral-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-silver">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-slate/30">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="responsive-text-4xl font-display font-bold text-neutral-white mb-6">
              Why Choose <span className="gradient-text">Nexcredis</span>?
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              Experience the next generation of educational technology with blockchain-verified credentials, 
              token rewards, and global recognition.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link 
                  href={
                    feature.title === 'Blockchain Credentials' ? '/blockchain-credentials' :
                    feature.title === 'Instructor Certification' ? '/instructor-certification' :
                    feature.title === 'Token Rewards' ? '/token-rewards' :
                    feature.title === 'Global Recognition' ? '/global-recognition' :
                    '#'
                  }
                  className="block glass-morphism rounded-2xl p-8 h-full card-hover"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-neutral-white mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-neutral-silver leading-relaxed">
                    {feature.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="responsive-text-4xl font-display font-bold text-neutral-white mb-6">
              Trusted by <span className="gradient-text">Educators</span> Worldwide
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              Join thousands of institutions and professionals who trust Nexcredis for their educational needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism rounded-2xl p-8 card-hover"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-accent-gold fill-current" />
                  ))}
                </div>
                
                <p className="text-neutral-silver mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-neutral-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-neutral-silver">
                      {testimonial.role}, {testimonial.institution}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-hedera to-primary">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="responsive-text-4xl font-display font-bold text-white mb-6">
              Ready to Transform Your Educational Journey?
            </h2>
            <p className="responsive-text-xl text-white/90 mb-8">
              Join the Web3 education revolution. Start earning blockchain-verified credentials today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/register" 
                className="bg-white text-primary hover:bg-neutral-white/90 font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
              >
                Get Started Free
              </Link>
              <Link 
                href="/courses" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-4 px-8 rounded-xl transition-all duration-200"
              >
                Explore Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

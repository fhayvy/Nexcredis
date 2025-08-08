'use client'

import { motion } from 'framer-motion'
import { 
  GlobeAltIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  CheckBadgeIcon,
  MapPinIcon,
  UserGroupIcon,
  TrophyIcon,
  StarIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Link from 'next/link'

const recognitionFeatures = [
  {
    icon: GlobeAltIcon,
    title: 'Worldwide Acceptance',
    description: 'Our credentials are recognized by leading institutions and employers across 50+ countries.',
    color: 'from-primary to-primary-light'
  },
  {
    icon: BuildingOfficeIcon,
    title: 'Industry Partnerships',
    description: 'Partnerships with Fortune 500 companies and top universities ensure credential validity.',
    color: 'from-hedera to-hedera-mint'
  },
  {
    icon: AcademicCapIcon,
    title: 'Academic Standards',
    description: 'Curriculum designed to meet international educational standards and accreditation requirements.',
    color: 'from-accent-gold to-accent-orange'
  },
  {
    icon: CheckBadgeIcon,
    title: 'Verified Authenticity',
    description: 'Blockchain verification ensures your credentials cannot be forged or disputed.',
    color: 'from-accent-coral to-primary'
  }
]

const partnerInstitutions = [
  {
    name: 'Massachusetts Institute of Technology',
    type: 'University',
    location: 'Cambridge, MA, USA',
    logo: '/mit-logo.png',
    partnership: 'Academic Recognition',
    description: 'MIT recognizes Nexcredis blockchain development certifications for graduate program applications.'
  },
  {
    name: 'Stanford University',
    type: 'University',
    location: 'Stanford, CA, USA',
    logo: '/stanford-logo.png',
    partnership: 'Research Collaboration',
    description: 'Joint research initiatives in blockchain education and curriculum development.'
  },
  {
    name: 'University of Oxford',
    type: 'University',
    location: 'Oxford, UK',
    logo: '/oxford-logo.png',
    partnership: 'Credit Transfer',
    description: 'Nexcredis courses can be transferred as credits toward Oxford\'s blockchain specialization.'
  },
  {
    name: 'Google',
    type: 'Technology Company',
    location: 'Mountain View, CA, USA',
    logo: '/google-logo.png',
    partnership: 'Hiring Partner',
    description: 'Google actively recruits Nexcredis certified developers for Web3 and blockchain roles.'
  },
  {
    name: 'Microsoft',
    type: 'Technology Company',
    location: 'Redmond, WA, USA',
    logo: '/microsoft-logo.png',
    partnership: 'Technology Integration',
    description: 'Integration with Microsoft Azure blockchain services and developer certification paths.'
  },
  {
    name: 'ConsenSys',
    type: 'Blockchain Company',
    location: 'Brooklyn, NY, USA',
    logo: '/consensys-logo.png',
    partnership: 'Industry Validation',
    description: 'ConsenSys validates our Ethereum development curriculum and provides internship opportunities.'
  }
]

const globalStats = [
  {
    number: '50+',
    label: 'Countries',
    description: 'Credentials recognized worldwide'
  },
  {
    number: '500+',
    label: 'Universities',
    description: 'Academic institutions accepting our credentials'
  },
  {
    number: '1,000+',
    label: 'Companies',
    description: 'Employers actively hiring our graduates'
  },
  {
    number: '95%',
    label: 'Success Rate',
    description: 'Graduates finding relevant employment'
  }
]

const recognitionBenefits = [
  {
    title: 'Career Advancement',
    description: 'Open doors to new opportunities with globally recognized credentials',
    icon: '🚀',
    examples: ['Promotion to senior developer roles', 'Transition to Web3 companies', 'Freelance consulting opportunities']
  },
  {
    title: 'Academic Pathways',
    description: 'Use credentials for university applications and degree programs',
    icon: '🎓',
    examples: ['Graduate school applications', 'Professional degree programs', 'Research opportunities']
  },
  {
    title: 'Professional Network',
    description: 'Connect with a global community of verified professionals',
    icon: '🌐',
    examples: ['Industry networking events', 'Mentorship programs', 'Collaboration opportunities']
  },
  {
    title: 'Continuous Learning',
    description: 'Build upon recognized credentials with advanced certifications',
    icon: '📈',
    examples: ['Specialization pathways', 'Expert-level certifications', 'Leadership programs']
  }
]

const testimonials = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Hiring Manager',
    company: 'Google',
    quote: 'Nexcredis graduates consistently demonstrate exceptional blockchain knowledge. Their credentials give us confidence in their abilities.',
    avatar: '/testimonial-sarah.png'
  },
  {
    name: 'Prof. James Chen',
    role: 'Department Head',
    company: 'MIT',
    quote: 'The rigor and quality of Nexcredis courses match our academic standards. We\'re proud to recognize their certifications.',
    avatar: '/testimonial-james.png'
  },
  {
    name: 'Maria Rodriguez',
    role: 'Blockchain Developer',
    company: 'ConsenSys',
    quote: 'My Nexcredis certification opened doors globally. I\'ve worked in 3 countries and employers immediately recognize the credential.',
    avatar: '/testimonial-maria.png'
  }
]

export default function GlobalRecognitionPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 lg:pt-32 pb-16 bg-gradient-to-br from-neutral-navy via-neutral-slate to-neutral-navy">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-hedera/10 border border-hedera/20 rounded-full px-4 py-2 mb-6">
              <GlobeAltIcon className="w-5 h-5 text-hedera" />
              <span className="text-sm font-medium text-hedera">Internationally Recognized</span>
            </div>
            
            <h1 className="responsive-text-5xl font-display font-bold text-neutral-white mb-6">
              <span className="gradient-text">Global Recognition</span> That Opens Doors
            </h1>
            
            <p className="responsive-text-xl text-neutral-silver mb-8">
              Your Nexcredis credentials are recognized by leading universities, Fortune 500 companies, 
              and institutions worldwide. Build a career that transcends borders.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/credentials" className="btn-primary text-lg px-8 py-4 group">
                View My Credentials
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <Link href="/courses" className="flex items-center space-x-3 text-neutral-white hover:text-primary transition-colors duration-200 group">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                  <AcademicCapIcon className="w-6 h-6" />
                </div>
                <span className="font-medium">Start Learning</span>
              </Link>
            </div>

            {/* Global Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              {globalStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  className="glass-morphism rounded-xl p-4 text-center"
                >
                  <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm font-medium text-neutral-white mb-1">{stat.label}</div>
                  <div className="text-xs text-neutral-silver">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recognition Features */}
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
              Why Our Credentials Are <span className="gradient-text">Globally</span> Recognized
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              Built on rigorous standards and backed by blockchain technology, our credentials meet international requirements.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recognitionFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism rounded-2xl p-8 card-hover"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-neutral-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-neutral-silver leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Institutions */}
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
              Trusted by <span className="gradient-text">Leading</span> Institutions
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              Our partnerships with top universities and companies ensure your credentials are valued worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerInstitutions.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism rounded-2xl p-8 card-hover"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="w-12 h-12 rounded-lg object-contain bg-white p-2"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-white text-sm">{partner.name}</h3>
                    <div className="flex items-center space-x-2 text-xs text-neutral-silver">
                      <span>{partner.type}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <MapPinIcon className="w-3 h-3" />
                        <span>{partner.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                    {partner.partnership}
                  </span>
                </div>

                <p className="text-neutral-silver text-sm leading-relaxed">
                  {partner.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Benefits */}
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
              Benefits of <span className="gradient-text">Global</span> Recognition
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              Discover how internationally recognized credentials can transform your career and educational journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {recognitionBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism rounded-2xl p-8 card-hover"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl">{benefit.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-white">{benefit.title}</h3>
                    <p className="text-neutral-silver">{benefit.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-neutral-white mb-3">Examples:</h4>
                  {benefit.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckBadgeIcon className="w-4 h-4 text-hedera flex-shrink-0" />
                      <span className="text-neutral-silver text-sm">{example}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              What <span className="gradient-text">Leaders</span> Say
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              Hear from industry leaders and academic institutions about the value of Nexcredis credentials.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
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
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-accent-gold fill-current" />
                  ))}
                </div>
                
                <p className="text-neutral-silver mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
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
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="py-20">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="responsive-text-4xl font-display font-bold text-neutral-white mb-6">
                <span className="gradient-text">Instant</span> Global Verification
              </h2>
              <p className="text-neutral-silver mb-8 leading-relaxed">
                Employers and institutions can verify your credentials instantly using our blockchain-based 
                verification system. No need for lengthy verification processes or third-party services.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <DocumentCheckIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-white">QR Code Verification</h3>
                    <p className="text-neutral-silver text-sm">Instant verification via QR code scanning</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-hedera/20 rounded-xl flex items-center justify-center">
                    <ShieldCheckIcon className="w-6 h-6 text-hedera" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-white">Blockchain Proof</h3>
                    <p className="text-neutral-silver text-sm">Cryptographic proof of authenticity</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center">
                    <GlobeAltIcon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-white">24/7 Availability</h3>
                    <p className="text-neutral-silver text-sm">Verify credentials anytime, anywhere</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-morphism rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-neutral-white mb-6">Verification Steps</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-neutral-charcoal/30 rounded-xl">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-white">Scan QR Code</h4>
                    <p className="text-sm text-neutral-silver">Use any QR scanner to access credential</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-neutral-charcoal/30 rounded-xl">
                  <div className="w-8 h-8 bg-hedera rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-white">Blockchain Lookup</h4>
                    <p className="text-sm text-neutral-silver">System queries Hedera blockchain</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-neutral-charcoal/30 rounded-xl">
                  <div className="w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-white">Instant Results</h4>
                    <p className="text-sm text-neutral-silver">View verified credential details</p>
                  </div>
                </div>
              </div>
            </motion.div>
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
              Ready to Earn Globally Recognized Credentials?
            </h2>
            <p className="responsive-text-xl text-white/90 mb-8">
              Join the thousands of professionals who have advanced their careers with Nexcredis credentials.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/register" 
                className="bg-white text-primary hover:bg-neutral-white/90 font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
              >
                Start Your Journey
              </Link>
              <Link 
                href="/courses" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-4 px-8 rounded-xl transition-all duration-200"
              >
                Browse Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

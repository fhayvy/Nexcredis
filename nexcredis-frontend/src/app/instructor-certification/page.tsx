'use client'

import { motion } from 'framer-motion'
import { 
  AcademicCapIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  TrophyIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  PresentationChartLineIcon,
  StarIcon,
  ArrowRightIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Link from 'next/link'

const certificationBenefits = [
  {
    icon: CheckBadgeIcon,
    title: 'Verified Expertise',
    description: 'Blockchain-verified credentials that prove your teaching qualifications and subject matter expertise.',
    color: 'from-primary to-primary-light'
  },
  {
    icon: UserGroupIcon,
    title: 'Global Reach',
    description: 'Access to our worldwide community of learners and expand your teaching impact globally.',
    color: 'from-hedera to-hedera-mint'
  },
  {
    icon: TrophyIcon,
    title: 'Premium Recognition',
    description: 'Stand out as a certified instructor with special badges and priority placement in course listings.',
    color: 'from-accent-gold to-accent-orange'
  },
  {
    icon: PresentationChartLineIcon,
    title: 'Teaching Analytics',
    description: 'Advanced analytics and insights to help you improve your courses and student engagement.',
    color: 'from-accent-coral to-primary'
  }
]

const certificationLevels = [
  {
    level: 'Associate Instructor',
    requirements: ['Bachelor\'s degree or equivalent experience', '2+ years industry experience', 'Complete teaching methodology course'],
    benefits: ['Teach beginner-level courses', 'Basic instructor badge', 'Community access'],
    icon: '🥉',
    color: 'border-accent-orange/30 bg-accent-orange/5'
  },
  {
    level: 'Certified Instructor',
    requirements: ['Master\'s degree or 5+ years experience', 'Published work or contributions', 'Advanced teaching certification'],
    benefits: ['Teach all course levels', 'Verified instructor badge', 'Priority support', 'Revenue sharing bonus'],
    icon: '🥈',
    color: 'border-neutral-silver/30 bg-neutral-silver/5'
  },
  {
    level: 'Expert Instructor',
    requirements: ['PhD or 10+ years expertise', 'Industry recognition', 'Proven teaching excellence'],
    benefits: ['Create specialization programs', 'Expert instructor badge', 'Mentorship opportunities', 'Premium revenue share'],
    icon: '🥇',
    color: 'border-accent-gold/30 bg-accent-gold/5'
  }
]

const applicationProcess = [
  {
    step: 1,
    title: 'Submit Application',
    description: 'Complete our comprehensive instructor application with your credentials and experience',
    icon: DocumentTextIcon,
    duration: '15 minutes'
  },
  {
    step: 2,
    title: 'Document Review',
    description: 'Our team reviews your qualifications, experience, and teaching materials',
    icon: ClipboardDocumentCheckIcon,
    duration: '3-5 days'
  },
  {
    step: 3,
    title: 'Teaching Demo',
    description: 'Demonstrate your teaching skills with a sample lesson in your area of expertise',
    icon: PresentationChartLineIcon,
    duration: '30 minutes'
  },
  {
    step: 4,
    title: 'Certification',
    description: 'Receive your blockchain-verified instructor certification and start teaching',
    icon: CheckBadgeIcon,
    duration: '1-2 days'
  }
]

const requirements = [
  {
    category: 'Education & Experience',
    items: [
      'Relevant degree or equivalent professional experience',
      'Minimum 2 years of industry experience',
      'Demonstrated expertise in Web3/blockchain technology',
      'Previous teaching or training experience (preferred)'
    ]
  },
  {
    category: 'Technical Skills',
    items: [
      'Proficiency in relevant programming languages',
      'Understanding of blockchain fundamentals',
      'Experience with development tools and frameworks',
      'Ability to explain complex concepts clearly'
    ]
  },
  {
    category: 'Teaching Qualifications',
    items: [
      'Strong communication and presentation skills',
      'Curriculum development experience',
      'Student assessment and feedback capabilities',
      'Commitment to continuous learning and improvement'
    ]
  }
]

export default function InstructorCertificationPage() {
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
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <AcademicCapIcon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Blockchain-Verified Teaching Credentials</span>
            </div>
            
            <h1 className="responsive-text-5xl font-display font-bold text-neutral-white mb-6">
              Become a <span className="gradient-text">Certified Instructor</span>
            </h1>
            
            <p className="responsive-text-xl text-neutral-silver mb-8">
              Join our elite community of blockchain-verified educators and share your Web3 expertise 
              with learners worldwide. Earn recognition, rewards, and make a global impact.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/instructor-application" className="btn-primary text-lg px-8 py-4 group">
                Apply to Teach
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <Link href="/instructors" className="flex items-center space-x-3 text-neutral-white hover:text-primary transition-colors duration-200 group">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                  <UserGroupIcon className="w-6 h-6" />
                </div>
                <span className="font-medium">Meet Our Instructors</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Why Become a <span className="gradient-text">Certified</span> Instructor?
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              Our certification program provides you with the credibility, tools, and community to excel as a Web3 educator.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certificationBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism rounded-2xl p-8 card-hover"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-neutral-white mb-4">
                  {benefit.title}
                </h3>
                
                <p className="text-neutral-silver leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Levels */}
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
              Certification <span className="gradient-text">Levels</span>
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              Choose the certification level that matches your experience and teaching goals.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {certificationLevels.map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`glass-morphism rounded-2xl p-8 border-2 ${level.color} card-hover`}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{level.icon}</div>
                  <h3 className="text-xl font-semibold text-neutral-white">{level.level}</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-neutral-white mb-3">Requirements:</h4>
                    <ul className="space-y-2">
                      {level.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckBadgeIcon className="w-4 h-4 text-hedera mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-silver text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-neutral-white mb-3">Benefits:</h4>
                    <ul className="space-y-2">
                      {level.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <StarIcon className="w-4 h-4 text-accent-gold mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-silver text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button className="w-full mt-6 btn-primary">
                  Apply for {level.level}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
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
              Application <span className="gradient-text">Process</span>
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              Our streamlined certification process ensures we maintain high teaching standards while making it accessible for qualified educators.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applicationProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-hedera rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-gold rounded-full flex items-center justify-center">
                    <span className="text-neutral-navy font-bold text-sm">{step.step}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-neutral-white mb-3">
                  {step.title}
                </h3>
                
                <p className="text-neutral-silver text-sm leading-relaxed mb-3">
                  {step.description}
                </p>
                
                <div className="inline-flex items-center space-x-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                  <span>⏱️</span>
                  <span>{step.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
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
              Certification <span className="gradient-text">Requirements</span>
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              We maintain high standards to ensure our students receive the best possible education.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {requirements.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism rounded-2xl p-8"
              >
                <h3 className="text-xl font-semibold text-neutral-white mb-6 text-center">
                  {category.category}
                </h3>
                
                <ul className="space-y-4">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <ShieldCheckIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-silver text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
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
              Ready to Share Your Web3 Expertise?
            </h2>
            <p className="responsive-text-xl text-white/90 mb-8">
              Join our community of certified instructors and help shape the future of Web3 education.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/instructor-application" 
                className="bg-white text-primary hover:bg-neutral-white/90 font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
              >
                Start Application
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-4 px-8 rounded-xl transition-all duration-200"
              >
                Have Questions?
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

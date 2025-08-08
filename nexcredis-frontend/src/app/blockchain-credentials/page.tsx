'use client'

import { motion } from 'framer-motion'
import { 
  ShieldCheckIcon,
  CubeTransparentIcon,
  DocumentCheckIcon,
  GlobeAltIcon,
  QrCodeIcon,
  LinkIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
  LockClosedIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Link from 'next/link'

const credentialFeatures = [
  {
    icon: ShieldCheckIcon,
    title: 'Tamper-Proof Security',
    description: 'Credentials are secured by blockchain cryptography, making them impossible to forge or alter.',
    color: 'from-primary to-primary-light'
  },
  {
    icon: CubeTransparentIcon,
    title: 'Transparent Verification',
    description: 'Anyone can verify the authenticity of your credentials using blockchain explorers.',
    color: 'from-hedera to-hedera-mint'
  },
  {
    icon: DocumentCheckIcon,
    title: 'Instant Verification',
    description: 'Employers and institutions can verify your credentials instantly without contacting issuers.',
    color: 'from-accent-gold to-accent-orange'
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Accessibility',
    description: 'Access your credentials from anywhere in the world, 24/7, without intermediaries.',
    color: 'from-accent-coral to-primary'
  }
]

const credentialTypes = [
  {
    name: 'Course Completion Certificates',
    description: 'Blockchain-verified certificates for completed courses',
    icon: '🎓',
    examples: ['Web3 Development Bootcamp', 'Smart Contract Security', 'DeFi Fundamentals']
  },
  {
    name: 'Skill Badges',
    description: 'Micro-credentials for specific skills and competencies',
    icon: '🏆',
    examples: ['Solidity Expert', 'React Developer', 'Blockchain Analyst']
  },
  {
    name: 'Professional Certifications',
    description: 'Industry-recognized professional certifications',
    icon: '🎖️',
    examples: ['Certified Blockchain Developer', 'DeFi Specialist', 'Web3 Architect']
  },
  {
    name: 'Achievement Tokens',
    description: 'NFT-based achievements for learning milestones',
    icon: '🏅',
    examples: ['Learning Streak Master', 'Community Contributor', 'Innovation Award']
  }
]

const verificationSteps = [
  {
    step: 1,
    title: 'Earn Credential',
    description: 'Complete courses and assessments to earn your credential',
    icon: DocumentCheckIcon
  },
  {
    step: 2,
    title: 'Blockchain Recording',
    description: 'Credential is recorded on Hedera blockchain with unique hash',
    icon: CubeTransparentIcon
  },
  {
    step: 3,
    title: 'NFT Minting',
    description: 'Your credential is minted as an NFT in your wallet',
    icon: ShieldCheckIcon
  },
  {
    step: 4,
    title: 'Global Verification',
    description: 'Anyone can verify your credential using blockchain explorer',
    icon: GlobeAltIcon
  }
]

export default function BlockchainCredentialsPage() {
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
              <ShieldCheckIcon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by Hedera Blockchain</span>
            </div>
            
            <h1 className="responsive-text-5xl font-display font-bold text-neutral-white mb-6">
              <span className="gradient-text">Blockchain Credentials</span> That Matter
            </h1>
            
            <p className="responsive-text-xl text-neutral-silver mb-8">
              Earn tamper-proof, globally verifiable credentials that showcase your Web3 expertise. 
              Built on Hedera blockchain for maximum security and trust.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/courses" className="btn-primary text-lg px-8 py-4 group">
                Start Earning Credentials
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <Link href="/credentials" className="flex items-center space-x-3 text-neutral-white hover:text-primary transition-colors duration-200 group">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                  <QrCodeIcon className="w-6 h-6" />
                </div>
                <span className="font-medium">View My Credentials</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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
              Why <span className="gradient-text">Blockchain</span> Credentials?
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              Traditional credentials can be lost, forged, or difficult to verify. Blockchain credentials solve these problems forever.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {credentialFeatures.map((feature, index) => (
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

      {/* Credential Types */}
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
              Types of <span className="gradient-text">Credentials</span>
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              From course certificates to professional certifications, all your achievements are blockchain-verified.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {credentialTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism rounded-2xl p-8 card-hover"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl">{type.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-white">{type.name}</h3>
                    <p className="text-neutral-silver">{type.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-neutral-white mb-3">Examples:</h4>
                  {type.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckBadgeIcon className="w-4 h-4 text-hedera" />
                      <span className="text-neutral-silver text-sm">{example}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
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
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              Our blockchain credential system ensures your achievements are secure, verifiable, and yours forever.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {verificationSteps.map((step, index) => (
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
                
                <p className="text-neutral-silver text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 bg-neutral-slate/30">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="responsive-text-4xl font-display font-bold text-neutral-white mb-6">
                Built on <span className="gradient-text">Hedera</span> Network
              </h2>
              <p className="text-neutral-silver mb-8 leading-relaxed">
                We chose Hedera Hashgraph for its unmatched security, speed, and sustainability. 
                Your credentials benefit from enterprise-grade blockchain technology.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-hedera/20 rounded-xl flex items-center justify-center">
                    <LockClosedIcon className="w-6 h-6 text-hedera" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-white">Bank-Grade Security</h3>
                    <p className="text-neutral-silver text-sm">aBFT consensus with cryptographic proof</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <ClockIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-white">Lightning Fast</h3>
                    <p className="text-neutral-silver text-sm">3-5 second finality for instant verification</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center">
                    <GlobeAltIcon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-white">Carbon Negative</h3>
                    <p className="text-neutral-silver text-sm">Most sustainable blockchain network</p>
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
              <h3 className="text-xl font-semibold text-neutral-white mb-6">Sample Credential Metadata</h3>
              <div className="bg-neutral-charcoal/50 rounded-xl p-4 font-mono text-sm">
                <div className="text-hedera">// Blockchain Credential Record</div>
                <div className="text-neutral-silver mt-2">
                  <div>{"{"}</div>
                  <div className="ml-4">"credentialId": "NEXC-WEB3-2024-001",</div>
                  <div className="ml-4">"recipient": "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",</div>
                  <div className="ml-4">"issuer": "Nexcredis Academy",</div>
                  <div className="ml-4">"courseTitle": "Web3 Development Bootcamp",</div>
                  <div className="ml-4">"completionDate": "2024-01-15T10:30:00Z",</div>
                  <div className="ml-4">"blockchainTx": "0.0.123456-1642248600-123456789",</div>
                  <div className="ml-4">"verificationUrl": "https://hashscan.io/...",</div>
                  <div className="ml-4">"skills": ["Solidity", "React", "Web3.js"],</div>
                  <div className="ml-4">"grade": "A+",</div>
                  <div className="ml-4">"tokenReward": 100</div>
                  <div>{"}"}</div>
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
              Ready to Earn Your First Blockchain Credential?
            </h2>
            <p className="responsive-text-xl text-white/90 mb-8">
              Join thousands of learners who have already earned verifiable Web3 credentials.
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

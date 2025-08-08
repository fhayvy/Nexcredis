'use client'

import { motion } from 'framer-motion'
import { 
  CurrencyDollarIcon,
  TrophyIcon,
  ChartBarIcon,
  GiftIcon,
  StarIcon,
  FireIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  SparklesIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Link from 'next/link'

const rewardCategories = [
  {
    icon: AcademicCapIcon,
    title: 'Learning Rewards',
    description: 'Earn HBAR tokens for completing courses, quizzes, and assignments.',
    baseReward: '10-100 HBAR',
    color: 'from-primary to-primary-light'
  },
  {
    icon: TrophyIcon,
    title: 'Achievement Bonuses',
    description: 'Extra rewards for milestones, streaks, and exceptional performance.',
    baseReward: '25-500 HBAR',
    color: 'from-accent-gold to-accent-orange'
  },
  {
    icon: UserGroupIcon,
    title: 'Community Participation',
    description: 'Get rewarded for helping others, contributing to discussions, and peer reviews.',
    baseReward: '5-50 HBAR',
    color: 'from-hedera to-hedera-mint'
  },
  {
    icon: ChartBarIcon,
    title: 'Staking Rewards',
    description: 'Stake your HBAR tokens to earn passive income and governance rights.',
    baseReward: '8-15% APY',
    color: 'from-accent-coral to-primary'
  }
]

const earningOpportunities = [
  {
    activity: 'Complete a Course',
    reward: '50-100 HBAR',
    description: 'Finish all lessons and pass the final assessment',
    icon: '🎓',
    difficulty: 'Medium'
  },
  {
    activity: 'Perfect Quiz Score',
    reward: '25 HBAR',
    description: 'Score 100% on any course quiz',
    icon: '💯',
    difficulty: 'Easy'
  },
  {
    activity: 'Learning Streak',
    reward: '10 HBAR/day',
    description: 'Study for 7+ consecutive days',
    icon: '🔥',
    difficulty: 'Easy'
  },
  {
    activity: 'Peer Review',
    reward: '15 HBAR',
    description: 'Provide helpful feedback on student projects',
    icon: '👥',
    difficulty: 'Easy'
  },
  {
    activity: 'Create Study Guide',
    reward: '100 HBAR',
    description: 'Share comprehensive study materials with the community',
    icon: '📚',
    difficulty: 'Hard'
  },
  {
    activity: 'Refer a Friend',
    reward: '200 HBAR',
    description: 'Invite someone who completes their first course',
    icon: '🤝',
    difficulty: 'Medium'
  },
  {
    activity: 'Bug Report',
    reward: '50 HBAR',
    description: 'Report and help fix platform issues',
    icon: '🐛',
    difficulty: 'Easy'
  },
  {
    activity: 'Course Review',
    reward: '20 HBAR',
    description: 'Write detailed course reviews to help other learners',
    icon: '⭐',
    difficulty: 'Easy'
  }
]

const tokenUtilities = [
  {
    title: 'Course Access',
    description: 'Use HBAR tokens to unlock premium courses and specializations',
    icon: '🔓'
  },
  {
    title: 'Governance Voting',
    description: 'Participate in platform decisions and course curriculum votes',
    icon: '🗳️'
  },
  {
    title: 'Marketplace Trading',
    description: 'Trade tokens with other users or exchange for other cryptocurrencies',
    icon: '💱'
  },
  {
    title: 'Certification Fees',
    description: 'Pay for official certifications and credential verification',
    icon: '📜'
  },
  {
    title: 'Staking Rewards',
    description: 'Stake tokens to earn passive income and support network security',
    icon: '🏦'
  },
  {
    title: 'Exclusive Events',
    description: 'Access to token-holder only webinars, workshops, and networking events',
    icon: '🎪'
  }
]

const stakingPools = [
  {
    name: 'Governance Pool',
    apy: '12.5%',
    lockPeriod: '30 days',
    minStake: '100 HBAR',
    totalStaked: '1.2M HBAR',
    description: 'Participate in platform governance decisions'
  },
  {
    name: 'Education Pool',
    apy: '8.7%',
    lockPeriod: '14 days',
    minStake: '50 HBAR',
    totalStaked: '850K HBAR',
    description: 'Support educational content development'
  },
  {
    name: 'Validator Pool',
    apy: '15.2%',
    lockPeriod: '90 days',
    minStake: '500 HBAR',
    totalStaked: '2.1M HBAR',
    description: 'Help secure the network infrastructure'
  }
]

export default function TokenRewardsPage() {
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
            <div className="inline-flex items-center space-x-2 bg-accent-gold/10 border border-accent-gold/20 rounded-full px-4 py-2 mb-6">
              <CurrencyDollarIcon className="w-5 h-5 text-accent-gold" />
              <span className="text-sm font-medium text-accent-gold">Earn While You Learn</span>
            </div>
            
            <h1 className="responsive-text-5xl font-display font-bold text-neutral-white mb-6">
              <span className="gradient-text">Token Rewards</span> for Learning
            </h1>
            
            <p className="responsive-text-xl text-neutral-silver mb-8">
              Get rewarded with HBAR tokens for every learning milestone. Complete courses, 
              help the community, and earn cryptocurrency while building your Web3 skills.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/register" className="btn-primary text-lg px-8 py-4 group">
                Start Earning Tokens
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <Link href="/marketplace" className="flex items-center space-x-3 text-neutral-white hover:text-primary transition-colors duration-200 group">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                  <ChartBarIcon className="w-6 h-6" />
                </div>
                <span className="font-medium">View Token Wallet</span>
              </Link>
            </div>

            {/* Token Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto mt-12">
              <div className="glass-morphism rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-accent-gold mb-1">4.2M</div>
                <div className="text-sm text-neutral-silver">Total Tokens Earned</div>
              </div>
              <div className="glass-morphism rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-hedera mb-1">12,450</div>
                <div className="text-sm text-neutral-silver">Active Earners</div>
              </div>
              <div className="glass-morphism rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">$0.85</div>
                <div className="text-sm text-neutral-silver">Current Price</div>
              </div>
              <div className="glass-morphism rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-accent-orange mb-1">12.1%</div>
                <div className="text-sm text-neutral-silver">Avg Staking APY</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reward Categories */}
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
              How to <span className="gradient-text">Earn</span> HBAR Tokens
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              Multiple ways to earn tokens while advancing your Web3 education and contributing to our community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {rewardCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism rounded-2xl p-8 card-hover"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-neutral-white mb-4">
                  {category.title}
                </h3>
                
                <p className="text-neutral-silver leading-relaxed mb-4">
                  {category.description}
                </p>

                <div className="bg-accent-gold/10 border border-accent-gold/20 rounded-xl p-3 text-center">
                  <span className="text-accent-gold font-bold">{category.baseReward}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Earning Opportunities */}
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
              Earning <span className="gradient-text">Opportunities</span>
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              Discover all the ways you can earn HBAR tokens on our platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {earningOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.activity}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism rounded-xl p-6 card-hover"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{opportunity.icon}</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    opportunity.difficulty === 'Easy' ? 'bg-hedera/20 text-hedera' :
                    opportunity.difficulty === 'Medium' ? 'bg-accent-orange/20 text-accent-orange' :
                    'bg-accent-coral/20 text-accent-coral'
                  }`}>
                    {opportunity.difficulty}
                  </span>
                </div>
                
                <h3 className="font-semibold text-neutral-white mb-2">
                  {opportunity.activity}
                </h3>
                
                <p className="text-neutral-silver text-sm mb-4 leading-relaxed">
                  {opportunity.description}
                </p>

                <div className="bg-accent-gold/10 border border-accent-gold/20 rounded-lg p-2 text-center">
                  <span className="text-accent-gold font-bold text-sm">{opportunity.reward}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Token Utilities */}
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
              What Can You <span className="gradient-text">Do</span> with HBAR?
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              HBAR tokens aren't just rewards - they're your key to unlocking premium features and participating in our ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tokenUtilities.map((utility, index) => (
              <motion.div
                key={utility.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism rounded-2xl p-8 card-hover"
              >
                <div className="text-4xl mb-4 text-center">{utility.icon}</div>
                
                <h3 className="text-xl font-semibold text-neutral-white mb-4 text-center">
                  {utility.title}
                </h3>
                
                <p className="text-neutral-silver leading-relaxed text-center">
                  {utility.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Staking Pools */}
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
              <span className="gradient-text">Staking</span> Pools
            </h2>
            <p className="responsive-text-xl text-neutral-silver max-w-3xl mx-auto">
              Stake your HBAR tokens to earn passive income and support the platform ecosystem.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {stakingPools.map((pool, index) => (
              <motion.div
                key={pool.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism rounded-2xl p-8 card-hover"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-neutral-white mb-2">{pool.name}</h3>
                  <div className="text-3xl font-bold text-accent-gold mb-2">{pool.apy}</div>
                  <div className="text-sm text-neutral-silver">Annual Percentage Yield</div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-neutral-silver">Lock Period:</span>
                    <span className="text-neutral-white font-medium">{pool.lockPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-silver">Min Stake:</span>
                    <span className="text-neutral-white font-medium">{pool.minStake}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-silver">Total Staked:</span>
                    <span className="text-neutral-white font-medium">{pool.totalStaked}</span>
                  </div>
                </div>

                <p className="text-neutral-silver text-sm mb-6 text-center">
                  {pool.description}
                </p>

                <button className="w-full btn-primary">
                  Stake Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-gold via-accent-orange to-accent-gold">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="responsive-text-4xl font-display font-bold text-neutral-navy mb-6">
              Ready to Start Earning HBAR Tokens?
            </h2>
            <p className="responsive-text-xl text-neutral-navy/80 mb-8">
              Join thousands of learners who are already earning cryptocurrency while building their Web3 skills.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/register" 
                className="bg-neutral-navy text-white hover:bg-neutral-charcoal font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
              >
                Start Learning & Earning HBAR
              </Link>
              <Link 
                href="/courses" 
                className="border-2 border-neutral-navy text-neutral-navy hover:bg-neutral-navy hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200"
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

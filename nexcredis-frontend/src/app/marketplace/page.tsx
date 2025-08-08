'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CurrencyDollarIcon,
  TrophyIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  WalletIcon,
  GiftIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

const tokenStats = {
  balance: 1250.75,
  earned: 2840.50,
  staked: 500.00,
  rewards: 125.25
}

const recentTransactions = [
  {
    id: 1,
    type: 'earned',
    amount: 50,
    description: 'Course completion: Web3 Development',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'completed'
  },
  {
    id: 2,
    type: 'staked',
    amount: 200,
    description: 'Staked tokens for governance',
    timestamp: '2024-01-14T15:45:00Z',
    status: 'completed'
  },
  {
    id: 3,
    type: 'reward',
    amount: 25.5,
    description: 'Staking rewards',
    timestamp: '2024-01-13T09:15:00Z',
    status: 'completed'
  },
  {
    id: 4,
    type: 'earned',
    amount: 75,
    description: 'Quiz completion bonus',
    timestamp: '2024-01-12T14:20:00Z',
    status: 'completed'
  }
]

const stakingPools = [
  {
    id: 1,
    name: 'NEXC Governance Pool',
    apy: 12.5,
    totalStaked: 1250000,
    minStake: 100,
    lockPeriod: '30 days',
    description: 'Participate in platform governance and earn rewards'
  },
  {
    id: 2,
    name: 'Education Rewards Pool',
    apy: 8.7,
    totalStaked: 850000,
    minStake: 50,
    lockPeriod: '14 days',
    description: 'Support educational content creators'
  },
  {
    id: 3,
    name: 'Validator Pool',
    apy: 15.2,
    totalStaked: 2100000,
    minStake: 500,
    lockPeriod: '90 days',
    description: 'Help secure the network infrastructure'
  }
]

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<'wallet' | 'stake' | 'rewards' | 'transactions'>('wallet')

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
            <h1 className="responsive-text-5xl font-display font-bold text-neutral-white mb-6">
              Token <span className="gradient-text">Marketplace</span>
            </h1>
            <p className="responsive-text-xl text-neutral-silver mb-8">
              Manage your NEXC tokens, stake for rewards, and participate in the platform economy
            </p>
          </motion.div>
        </div>
      </section>

      {/* Token Stats */}
      <section className="py-8 bg-neutral-slate/30">
        <div className="container-responsive">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-morphism rounded-2xl p-6 text-center"
            >
              <WalletIcon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-neutral-white mb-1">
                {tokenStats.balance.toLocaleString()}
              </div>
              <div className="text-sm text-neutral-silver">Available Balance</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="glass-morphism rounded-2xl p-6 text-center"
            >
              <TrophyIcon className="w-8 h-8 text-accent-gold mx-auto mb-3" />
              <div className="text-2xl font-bold text-neutral-white mb-1">
                {tokenStats.earned.toLocaleString()}
              </div>
              <div className="text-sm text-neutral-silver">Total Earned</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-morphism rounded-2xl p-6 text-center"
            >
              <ChartBarIcon className="w-8 h-8 text-hedera mx-auto mb-3" />
              <div className="text-2xl font-bold text-neutral-white mb-1">
                {tokenStats.staked.toLocaleString()}
              </div>
              <div className="text-sm text-neutral-silver">Staked Tokens</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-morphism rounded-2xl p-6 text-center"
            >
              <GiftIcon className="w-8 h-8 text-accent-orange mx-auto mb-3" />
              <div className="text-2xl font-bold text-neutral-white mb-1">
                {tokenStats.rewards.toLocaleString()}
              </div>
              <div className="text-sm text-neutral-silver">Pending Rewards</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-responsive">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 bg-neutral-slate/50 p-2 rounded-2xl">
            {[
              { id: 'wallet', label: 'Wallet', icon: WalletIcon },
              { id: 'stake', label: 'Staking', icon: ChartBarIcon },
              { id: 'rewards', label: 'Rewards', icon: GiftIcon },
              { id: 'transactions', label: 'Transactions', icon: ClockIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-neutral-silver hover:text-neutral-white hover:bg-neutral-charcoal/50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {activeTab === 'wallet' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="glass-morphism rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-neutral-white mb-6">Wallet Overview</h3>
                    
                    <div className="bg-gradient-to-r from-primary to-hedera rounded-2xl p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-white font-semibold mb-1">NEXC Balance</h4>
                          <div className="text-3xl font-bold text-white">
                            {tokenStats.balance.toLocaleString()} NEXC
                          </div>
                        </div>
                        <WalletIcon className="w-12 h-12 text-white/80" />
                      </div>
                      <div className="text-white/80 text-sm">
                        ≈ ${(tokenStats.balance * 0.85).toLocaleString()} USD
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <button className="btn-primary">
                        Buy NEXC
                      </button>
                      <button className="btn-secondary">
                        Send Tokens
                      </button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-neutral-white">Quick Actions</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 bg-neutral-charcoal/50 hover:bg-neutral-charcoal rounded-xl text-left transition-colors duration-200">
                          <div className="font-medium text-neutral-white mb-1">Stake Tokens</div>
                          <div className="text-sm text-neutral-silver">Earn up to 15.2% APY</div>
                        </button>
                        <button className="p-4 bg-neutral-charcoal/50 hover:bg-neutral-charcoal rounded-xl text-left transition-colors duration-200">
                          <div className="font-medium text-neutral-white mb-1">Claim Rewards</div>
                          <div className="text-sm text-neutral-silver">{tokenStats.rewards} NEXC available</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'stake' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="glass-morphism rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-neutral-white mb-6">Staking Pools</h3>
                    
                    <div className="space-y-4">
                      {stakingPools.map((pool) => (
                        <div key={pool.id} className="bg-neutral-charcoal/30 rounded-xl p-6 border border-neutral-silver/10">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-neutral-white">{pool.name}</h4>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-accent-gold">{pool.apy}%</div>
                              <div className="text-sm text-neutral-silver">APY</div>
                            </div>
                          </div>
                          
                          <p className="text-neutral-silver mb-4">{pool.description}</p>
                          
                          <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                            <div>
                              <div className="text-neutral-silver">Total Staked</div>
                              <div className="font-semibold text-neutral-white">
                                {(pool.totalStaked / 1000000).toFixed(1)}M NEXC
                              </div>
                            </div>
                            <div>
                              <div className="text-neutral-silver">Min Stake</div>
                              <div className="font-semibold text-neutral-white">{pool.minStake} NEXC</div>
                            </div>
                            <div>
                              <div className="text-neutral-silver">Lock Period</div>
                              <div className="font-semibold text-neutral-white">{pool.lockPeriod}</div>
                            </div>
                          </div>
                          
                          <button className="w-full btn-primary">
                            Stake Now
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'rewards' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="glass-morphism rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-neutral-white mb-6">Rewards Center</h3>
                    
                    <div className="bg-gradient-to-r from-accent-gold/20 to-accent-orange/20 border border-accent-gold/30 rounded-xl p-6 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-neutral-white mb-2">Available Rewards</h4>
                          <div className="text-3xl font-bold text-accent-gold">
                            {tokenStats.rewards} NEXC
                          </div>
                        </div>
                        <button className="bg-accent-gold hover:bg-accent-gold/90 text-neutral-navy font-semibold py-3 px-6 rounded-xl transition-colors duration-200">
                          Claim All
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-neutral-white">Reward Sources</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-neutral-charcoal/30 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <ChartBarIcon className="w-6 h-6 text-hedera" />
                            <div>
                              <div className="font-medium text-neutral-white">Staking Rewards</div>
                              <div className="text-sm text-neutral-silver">From governance pool</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-neutral-white">85.5 NEXC</div>
                            <div className="text-sm text-neutral-silver">Ready to claim</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-neutral-charcoal/30 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <TrophyIcon className="w-6 h-6 text-accent-gold" />
                            <div>
                              <div className="font-medium text-neutral-white">Achievement Bonus</div>
                              <div className="text-sm text-neutral-silver">Course completion streak</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-neutral-white">25.0 NEXC</div>
                            <div className="text-sm text-neutral-silver">Ready to claim</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-neutral-charcoal/30 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <UserGroupIcon className="w-6 h-6 text-primary" />
                            <div>
                              <div className="font-medium text-neutral-white">Referral Bonus</div>
                              <div className="text-sm text-neutral-silver">Friend referrals</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-neutral-white">14.75 NEXC</div>
                            <div className="text-sm text-neutral-silver">Ready to claim</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'transactions' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="glass-morphism rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-neutral-white mb-6">Transaction History</h3>
                    
                    <div className="space-y-4">
                      {recentTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 bg-neutral-charcoal/30 rounded-xl">
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              tx.type === 'earned' ? 'bg-hedera/20 text-hedera' :
                              tx.type === 'staked' ? 'bg-primary/20 text-primary' :
                              'bg-accent-gold/20 text-accent-gold'
                            }`}>
                              {tx.type === 'earned' ? '+' : tx.type === 'staked' ? '↗' : '★'}
                            </div>
                            <div>
                              <div className="font-medium text-neutral-white">{tx.description}</div>
                              <div className="text-sm text-neutral-silver">
                                {new Date(tx.timestamp).toLocaleDateString()} at{' '}
                                {new Date(tx.timestamp).toLocaleTimeString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-semibold ${
                              tx.type === 'earned' || tx.type === 'reward' ? 'text-hedera' : 'text-neutral-white'
                            }`}>
                              {tx.type === 'earned' || tx.type === 'reward' ? '+' : ''}{tx.amount} NEXC
                            </div>
                            <div className="text-sm text-neutral-silver capitalize">{tx.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="w-full mt-6 py-3 px-4 bg-neutral-charcoal/50 hover:bg-neutral-charcoal text-neutral-silver hover:text-neutral-white rounded-xl transition-colors duration-200">
                      Load More Transactions
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Market Info */}
              <div className="glass-morphism rounded-2xl p-6">
                <h4 className="font-semibold text-neutral-white mb-4">NEXC Market Info</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-silver">Current Price</span>
                    <span className="font-semibold text-neutral-white">$0.85</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-silver">24h Change</span>
                    <span className="font-semibold text-hedera flex items-center">
                      <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                      +5.2%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-silver">Market Cap</span>
                    <span className="font-semibold text-neutral-white">$42.5M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-silver">Total Supply</span>
                    <span className="font-semibold text-neutral-white">100M NEXC</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="glass-morphism rounded-2xl p-6">
                <h4 className="font-semibold text-neutral-white mb-4">Platform Stats</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-silver">Total Staked</span>
                    <span className="font-semibold text-neutral-white">4.2M NEXC</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-silver">Active Stakers</span>
                    <span className="font-semibold text-neutral-white">12,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-silver">Avg APY</span>
                    <span className="font-semibold text-accent-gold">12.1%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ShieldCheckIcon,
  QrCodeIcon,
  ShareIcon,
  EyeIcon,
  DownloadIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  TrophyIcon,
  CalendarIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

const credentials = [
  {
    id: 1,
    title: 'Web3 Development Certification',
    issuer: 'Nexcredis Academy',
    issueDate: '2024-01-15',
    credentialId: 'NEXC-WEB3-2024-001',
    status: 'Verified',
    image: '/web3-certificate-blockchain.png',
    skills: ['Solidity', 'React', 'Web3.js', 'Smart Contracts'],
    blockchainTx: '0x1234...5678',
    type: 'Certificate'
  },
  {
    id: 2,
    title: 'Smart Contract Security Expert',
    issuer: 'Blockchain Security Institute',
    issueDate: '2024-02-20',
    credentialId: 'BSI-SEC-2024-042',
    status: 'Verified',
    image: '/security-certificate-smart-contract.png',
    skills: ['Security Auditing', 'Vulnerability Assessment', 'Penetration Testing'],
    blockchainTx: '0x2345...6789',
    type: 'Professional Badge'
  },
  {
    id: 3,
    title: 'DeFi Protocol Specialist',
    issuer: 'DeFi University',
    issueDate: '2024-03-10',
    credentialId: 'DEFI-SPEC-2024-089',
    status: 'Verified',
    image: '/defi-certificate-protocol.png',
    skills: ['DeFi Protocols', 'Yield Farming', 'Liquidity Mining', 'AMM'],
    blockchainTx: '0x3456...7890',
    type: 'Diploma'
  },
  {
    id: 4,
    title: 'NFT Marketplace Developer',
    issuer: 'Digital Arts Academy',
    issueDate: '2024-04-05',
    credentialId: 'DAA-NFT-2024-156',
    status: 'Pending Verification',
    image: '/nft-certificate-marketplace.png',
    skills: ['NFT Standards', 'IPFS', 'Marketplace Development', 'Metadata'],
    blockchainTx: '0x4567...8901',
    type: 'Certificate'
  }
]

const credentialTypes = ['All Types', 'Certificate', 'Diploma', 'Professional Badge', 'Micro-credential']
const statusFilters = ['All Status', 'Verified', 'Pending Verification', 'Expired']

export default function CredentialsPage() {
  const [selectedType, setSelectedType] = useState('All Types')
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredCredentials = credentials.filter(credential => {
    const matchesType = selectedType === 'All Types' || credential.type === selectedType
    const matchesStatus = selectedStatus === 'All Status' || credential.status === selectedStatus
    const matchesSearch = credential.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         credential.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         credential.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesType && matchesStatus && matchesSearch
  })

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
              Your <span className="gradient-text">Digital Credentials</span>
            </h1>
            <p className="responsive-text-xl text-neutral-silver mb-8">
              Showcase your blockchain-verified achievements and skills to the world
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">4</div>
                <div className="text-sm text-neutral-silver">Total Credentials</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-hedera mb-1">3</div>
                <div className="text-sm text-neutral-silver">Verified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-gold mb-1">12</div>
                <div className="text-sm text-neutral-silver">Skills Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-orange mb-1">85%</div>
                <div className="text-sm text-neutral-silver">Profile Complete</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-neutral-slate/30">
        <div className="container-responsive">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-silver" />
              <input
                type="text"
                placeholder="Search credentials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-neutral-slate border border-neutral-silver/20 rounded-xl text-neutral-white placeholder-neutral-silver focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-neutral-slate border border-neutral-silver/20 rounded-xl px-4 py-2 text-neutral-white focus:border-primary"
              >
                {credentialTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-neutral-slate border border-neutral-silver/20 rounded-xl px-4 py-2 text-neutral-white focus:border-primary"
              >
                {statusFilters.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              <div className="flex bg-neutral-slate border border-neutral-silver/20 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'grid' ? 'bg-primary text-white' : 'text-neutral-silver hover:text-neutral-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'list' ? 'bg-primary text-white' : 'text-neutral-silver hover:text-neutral-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Display */}
      <section className="py-16">
        <div className="container-responsive">
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCredentials.map((credential, index) => (
                <motion.div
                  key={credential.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="glass-morphism rounded-2xl overflow-hidden card-hover group"
                >
                  <div className="relative">
                    <img
                      src={credential.image || "/placeholder.svg"}
                      alt={credential.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        credential.status === 'Verified' 
                          ? 'bg-hedera/20 text-hedera border border-hedera/30' 
                          : 'bg-accent-orange/20 text-accent-orange border border-accent-orange/30'
                      }`}>
                        {credential.status}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-lg">
                        {credential.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-neutral-white mb-2">
                      {credential.title}
                    </h3>

                    <div className="flex items-center space-x-2 mb-4">
                      <BuildingOfficeIcon className="w-4 h-4 text-neutral-silver" />
                      <span className="text-sm text-neutral-silver">{credential.issuer}</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <CalendarIcon className="w-4 h-4 text-neutral-silver" />
                      <span className="text-sm text-neutral-silver">
                        Issued: {new Date(credential.issueDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {credential.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg border border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                      {credential.skills.length > 3 && (
                        <span className="px-2 py-1 bg-neutral-charcoal/50 text-neutral-silver text-xs rounded-lg">
                          +{credential.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                      <button className="flex-1 bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded-xl text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                        <EyeIcon className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button className="p-2 bg-neutral-charcoal/50 hover:bg-neutral-charcoal text-neutral-silver hover:text-neutral-white rounded-xl transition-colors duration-200">
                        <ShareIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-neutral-charcoal/50 hover:bg-neutral-charcoal text-neutral-silver hover:text-neutral-white rounded-xl transition-colors duration-200">
                        <DownloadIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-neutral-charcoal/50 hover:bg-neutral-charcoal text-neutral-silver hover:text-neutral-white rounded-xl transition-colors duration-200">
                        <QrCodeIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCredentials.map((credential, index) => (
                <motion.div
                  key={credential.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="glass-morphism rounded-2xl p-6 flex items-center space-x-6 card-hover"
                >
                  <img
                    src={credential.image || "/placeholder.svg"}
                    alt={credential.title}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-neutral-white">
                        {credential.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        credential.status === 'Verified' 
                          ? 'bg-hedera/20 text-hedera border border-hedera/30' 
                          : 'bg-accent-orange/20 text-accent-orange border border-accent-orange/30'
                      }`}>
                        {credential.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 mb-3 text-sm text-neutral-silver">
                      <div className="flex items-center space-x-2">
                        <BuildingOfficeIcon className="w-4 h-4" />
                        <span>{credential.issuer}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{new Date(credential.issueDate).toLocaleDateString()}</span>
                      </div>
                      <span className="px-2 py-1 bg-neutral-charcoal/50 text-xs rounded-lg">
                        {credential.type}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {credential.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg border border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded-xl text-sm font-medium transition-colors duration-200 flex items-center space-x-2">
                      <EyeIcon className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button className="p-2 bg-neutral-charcoal/50 hover:bg-neutral-charcoal text-neutral-silver hover:text-neutral-white rounded-xl transition-colors duration-200">
                      <ShareIcon className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-neutral-charcoal/50 hover:bg-neutral-charcoal text-neutral-silver hover:text-neutral-white rounded-xl transition-colors duration-200">
                      <DownloadIcon className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredCredentials.length === 0 && (
            <div className="text-center py-16">
              <TrophyIcon className="w-16 h-16 text-neutral-silver mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-white mb-2">No credentials found</h3>
              <p className="text-neutral-silver mb-6">Start learning to earn your first blockchain-verified credential</p>
              <button className="btn-primary">
                Browse Courses
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

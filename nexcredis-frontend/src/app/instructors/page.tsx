'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  StarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  MapPinIcon,
  CheckBadgeIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Link from 'next/link'

const instructors = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    title: 'Blockchain Technology Professor',
    institution: 'MIT',
    location: 'Boston, MA',
    avatar: '/instructor-sarah-chen.png',
    rating: 4.9,
    students: 12500,
    courses: 8,
    specialties: ['Smart Contracts', 'Solidity', 'Web3 Development', 'DeFi'],
    bio: 'Leading expert in blockchain technology with 10+ years of experience in distributed systems and cryptocurrency research.',
    verified: true,
    featured: true
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    title: 'Senior Blockchain Engineer',
    institution: 'ConsenSys',
    location: 'New York, NY',
    avatar: '/instructor-marcus-rodriguez.png',
    rating: 4.8,
    students: 8900,
    courses: 6,
    specialties: ['Security Auditing', 'Smart Contract Testing', 'Ethereum', 'Layer 2'],
    bio: 'Former security engineer at major DeFi protocols with expertise in smart contract auditing and vulnerability assessment.',
    verified: true,
    featured: true
  },
  {
    id: 3,
    name: 'Prof. Emily Watson',
    title: 'Dean of Computer Science',
    institution: 'Stanford University',
    location: 'Palo Alto, CA',
    avatar: '/instructor-emily-watson.png',
    rating: 4.7,
    students: 6200,
    courses: 5,
    specialties: ['DeFi Protocols', 'Tokenomics', 'Governance', 'AMM'],
    bio: 'Academic leader in decentralized finance research with publications in top-tier conferences and journals.',
    verified: true,
    featured: false
  },
  {
    id: 4,
    name: 'Alex Thompson',
    title: 'NFT Platform Architect',
    institution: 'OpenSea',
    location: 'San Francisco, CA',
    avatar: '/instructor-alex-thompson.png',
    rating: 4.6,
    students: 9800,
    courses: 7,
    specialties: ['NFTs', 'IPFS', 'Metadata Standards', 'Marketplace Development'],
    bio: 'Lead architect behind major NFT platforms with deep expertise in digital asset infrastructure.',
    verified: true,
    featured: false
  },
  {
    id: 5,
    name: 'Dr. Michael Chang',
    title: 'Data Science Director',
    institution: 'Chainanalysis',
    location: 'Remote',
    avatar: '/instructor-michael-chang.png',
    rating: 4.8,
    students: 5400,
    courses: 4,
    specialties: ['Blockchain Analytics', 'Python', 'Data Visualization', 'On-chain Analysis'],
    bio: 'Expert in blockchain data analysis with experience building analytics tools for major cryptocurrency exchanges.',
    verified: true,
    featured: false
  },
  {
    id: 6,
    name: 'Lisa Park',
    title: 'AI Research Scientist',
    institution: 'DeepMind',
    location: 'London, UK',
    avatar: '/instructor-lisa-park.png',
    rating: 4.9,
    students: 7600,
    courses: 3,
    specialties: ['Machine Learning', 'AI Trading', 'Algorithmic Trading', 'Python'],
    bio: 'AI researcher specializing in financial applications of machine learning and automated trading systems.',
    verified: true,
    featured: true
  }
]

const specialtyFilters = [
  'All Specialties',
  'Smart Contracts',
  'DeFi',
  'NFTs',
  'Security',
  'Data Science',
  'AI & ML',
  'Web3 Development'
]

export default function InstructorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties')
  const [sortBy, setSortBy] = useState('rating')

  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         instructor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         instructor.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchQuery.toLowerCase())
                         )
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || 
                            instructor.specialties.some(specialty => 
                              specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
                            )
    return matchesSearch && matchesSpecialty
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
              Meet Our <span className="gradient-text">Expert Instructors</span>
            </h1>
            <p className="responsive-text-xl text-neutral-silver mb-8">
              Learn from industry leaders and academic experts who are shaping the future of Web3
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-neutral-silver" />
              <input
                type="text"
                placeholder="Search instructors by name, expertise, or institution..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-neutral-slate/50 border border-neutral-silver/20 rounded-2xl text-lg text-neutral-white placeholder-neutral-silver focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-neutral-slate/30">
        <div className="container-responsive">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Specialty Filters */}
            <div className="flex flex-wrap gap-2">
              {specialtyFilters.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedSpecialty === specialty
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-neutral-charcoal/50 text-neutral-silver hover:text-neutral-white hover:bg-neutral-charcoal'
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <FunnelIcon className="w-5 h-5 text-neutral-silver" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-slate border border-neutral-silver/20 rounded-xl px-4 py-2 text-neutral-white focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="rating">Highest Rated</option>
                <option value="students">Most Students</option>
                <option value="courses">Most Courses</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Instructors */}
      <section className="py-16">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-neutral-white mb-4">Featured Instructors</h2>
            <p className="text-neutral-silver">Top-rated experts leading the Web3 education space</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredInstructors.filter(instructor => instructor.featured).map((instructor, index) => (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism rounded-2xl overflow-hidden card-hover group"
              >
                <div className="relative">
                  <img
                    src={instructor.avatar || "/placeholder.svg"}
                    alt={instructor.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    {instructor.verified && (
                      <div className="bg-hedera/20 border border-hedera/30 rounded-full p-2">
                        <CheckBadgeIcon className="w-5 h-5 text-hedera" />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-xl p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <StarIcon className="w-4 h-4 text-accent-gold fill-current" />
                        <span className="text-white font-semibold">{instructor.rating}</span>
                        <span className="text-white/80 text-sm">({instructor.students.toLocaleString()} students)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-white mb-2 group-hover:text-primary transition-colors duration-200">
                    {instructor.name}
                  </h3>
                  
                  <p className="text-primary font-medium mb-1">{instructor.title}</p>
                  <p className="text-neutral-silver text-sm mb-4">{instructor.institution}</p>
                  
                  <div className="flex items-center space-x-1 text-neutral-silver text-sm mb-4">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{instructor.location}</span>
                  </div>

                  <p className="text-neutral-silver text-sm mb-4 line-clamp-3">
                    {instructor.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {instructor.specialties.slice(0, 3).map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg border border-primary/20"
                      >
                        {specialty}
                      </span>
                    ))}
                    {instructor.specialties.length > 3 && (
                      <span className="px-2 py-1 bg-neutral-charcoal/50 text-neutral-silver text-xs rounded-lg">
                        +{instructor.specialties.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm text-neutral-silver">
                    <div className="flex items-center space-x-1">
                      <AcademicCapIcon className="w-4 h-4" />
                      <span>{instructor.courses} courses</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <UserGroupIcon className="w-4 h-4" />
                      <span>{instructor.students.toLocaleString()} students</span>
                    </div>
                  </div>

                  <button className="w-full btn-primary">
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* All Instructors */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-neutral-white mb-4">All Instructors</h2>
            <p className="text-neutral-silver">Browse our complete roster of Web3 education experts</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInstructors.map((instructor, index) => (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-morphism rounded-2xl p-6 card-hover group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={instructor.avatar || "/placeholder.svg"}
                    alt={instructor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-neutral-white group-hover:text-primary transition-colors duration-200">
                        {instructor.name}
                      </h3>
                      {instructor.verified && (
                        <CheckBadgeIcon className="w-4 h-4 text-hedera" />
                      )}
                    </div>
                    <p className="text-primary text-sm font-medium">{instructor.title}</p>
                    <p className="text-neutral-silver text-xs">{instructor.institution}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4 text-sm text-neutral-silver">
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-4 h-4 text-accent-gold fill-current" />
                    <span>{instructor.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <UserGroupIcon className="w-4 h-4" />
                    <span>{instructor.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <AcademicCapIcon className="w-4 h-4" />
                    <span>{instructor.courses} courses</span>
                  </div>
                </div>

                <p className="text-neutral-silver text-sm mb-4 line-clamp-2">
                  {instructor.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {instructor.specialties.slice(0, 2).map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg border border-primary/20"
                    >
                      {specialty}
                    </span>
                  ))}
                  {instructor.specialties.length > 2 && (
                    <span className="px-2 py-1 bg-neutral-charcoal/50 text-neutral-silver text-xs rounded-lg">
                      +{instructor.specialties.length - 2}
                    </span>
                  )}
                </div>

                <button className="w-full btn-primary">
                  View Profile
                </button>
              </motion.div>
            ))}
          </div>

          {filteredInstructors.length === 0 && (
            <div className="text-center py-16">
              <AcademicCapIcon className="w-16 h-16 text-neutral-silver mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-white mb-2">No instructors found</h3>
              <p className="text-neutral-silver">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

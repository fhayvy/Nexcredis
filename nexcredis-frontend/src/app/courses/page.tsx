'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  PlayIcon,
  BookmarkIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

const categories = [
  'All Courses',
  'Blockchain',
  'Web3 Development',
  'Smart Contracts',
  'DeFi',
  'NFTs',
  'Cryptocurrency',
  'Data Science',
  'AI & Machine Learning'
]

const courses = [
  {
    id: 1,
    title: 'Complete Web3 Development Bootcamp',
    instructor: 'Dr. Sarah Chen',
    rating: 4.9,
    students: 12500,
    duration: '40 hours',
    price: 'Free',
    image: '/web3-development-course.png',
    category: 'Web3 Development',
    level: 'Beginner',
    description: 'Master Web3 development from scratch with hands-on projects and real-world applications.',
    tags: ['Solidity', 'React', 'Ethereum', 'DApps']
  },
  {
    id: 2,
    title: 'Smart Contract Security Fundamentals',
    instructor: 'Marcus Rodriguez',
    rating: 4.8,
    students: 8900,
    duration: '25 hours',
    price: '50 NEXC',
    image: '/smart-contract-security.png',
    category: 'Smart Contracts',
    level: 'Intermediate',
    description: 'Learn to identify and prevent common smart contract vulnerabilities.',
    tags: ['Security', 'Auditing', 'Solidity', 'Testing']
  },
  {
    id: 3,
    title: 'DeFi Protocol Development',
    instructor: 'Prof. Emily Watson',
    rating: 4.7,
    students: 6200,
    duration: '35 hours',
    price: '75 NEXC',
    image: '/defi-protocol-development.png',
    category: 'DeFi',
    level: 'Advanced',
    description: 'Build sophisticated DeFi protocols with yield farming and liquidity mining.',
    tags: ['DeFi', 'Yield Farming', 'AMM', 'Governance']
  },
  {
    id: 4,
    title: 'NFT Marketplace Creation',
    instructor: 'Alex Thompson',
    rating: 4.6,
    students: 9800,
    duration: '30 hours',
    price: '60 NEXC',
    image: '/nft-marketplace-creation.png',
    category: 'NFTs',
    level: 'Intermediate',
    description: 'Create your own NFT marketplace with minting, trading, and royalty features.',
    tags: ['NFTs', 'Marketplace', 'IPFS', 'Metadata']
  },
  {
    id: 5,
    title: 'Blockchain Data Analytics',
    instructor: 'Dr. Michael Chang',
    rating: 4.8,
    students: 5400,
    duration: '28 hours',
    price: '45 NEXC',
    image: '/blockchain-data-analytics.png',
    category: 'Data Science',
    level: 'Intermediate',
    description: 'Analyze blockchain data to extract meaningful insights and patterns.',
    tags: ['Analytics', 'Python', 'Web3.py', 'Visualization']
  },
  {
    id: 6,
    title: 'AI-Powered Trading Bots',
    instructor: 'Lisa Park',
    rating: 4.9,
    students: 7600,
    duration: '45 hours',
    price: '90 NEXC',
    image: '/ai-crypto-trading-bots.png',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    description: 'Build intelligent trading bots using machine learning algorithms.',
    tags: ['AI', 'Trading', 'Machine Learning', 'Python']
  }
]

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Courses')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All Courses' || course.category === selectedCategory
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
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
              Explore <span className="gradient-text">Web3 Courses</span>
            </h1>
            <p className="responsive-text-xl text-neutral-silver mb-8">
              Master blockchain technology with expert-led courses and earn verifiable credentials
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-neutral-silver" />
              <input
                type="text"
                placeholder="Search courses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-neutral-slate/50 border border-neutral-silver/20 rounded-2xl text-lg text-neutral-white placeholder-neutral-silver focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Categories */}
      <section className="py-8 bg-neutral-slate/30">
        <div className="container-responsive">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-neutral-charcoal/50 text-neutral-silver hover:text-neutral-white hover:bg-neutral-charcoal'
                  }`}
                >
                  {category}
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
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container-responsive">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="glass-morphism rounded-2xl overflow-hidden card-hover group"
              >
                <div className="relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-primary hover:bg-primary-hover text-white p-3 rounded-full transition-colors duration-200">
                      <PlayIcon className="w-6 h-6" />
                    </button>
                  </div>
                  <button className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors duration-200">
                    <BookmarkIcon className="w-5 h-5" />
                  </button>
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.level === 'Beginner' ? 'bg-hedera/20 text-hedera' :
                      course.level === 'Intermediate' ? 'bg-accent-orange/20 text-accent-orange' :
                      'bg-accent-coral/20 text-accent-coral'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary font-medium">{course.category}</span>
                    <span className="text-sm font-bold text-accent-gold">{course.price}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-neutral-white mb-2 group-hover:text-primary transition-colors duration-200">
                    {course.title}
                  </h3>

                  <p className="text-neutral-silver text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center space-x-4 mb-4 text-sm text-neutral-silver">
                    <div className="flex items-center space-x-1">
                      <StarIcon className="w-4 h-4 text-accent-gold fill-current" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <UserGroupIcon className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-hedera rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          {course.instructor.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-sm text-neutral-silver">{course.instructor}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-neutral-charcoal/50 text-neutral-silver text-xs rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="w-full btn-primary">
                    Enroll Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <AcademicCapIcon className="w-16 h-16 text-neutral-silver mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-white mb-2">No courses found</h3>
              <p className="text-neutral-silver">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

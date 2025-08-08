'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  AcademicCapIcon,
  TrophyIcon,
  ChartBarIcon,
  ClockIcon,
  BookOpenIcon,
  StarIcon,
  PlayIcon,
  ArrowRightIcon,
  FireIcon,
  CalendarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import Link from 'next/link'

const dashboardStats = {
  coursesInProgress: 3,
  coursesCompleted: 12,
  credentialsEarned: 8,
  tokensEarned: 2840,
  currentStreak: 15,
  totalStudyTime: 156
}

const currentCourses = [
  {
    id: 1,
    title: 'Advanced Smart Contract Development',
    instructor: 'Dr. Sarah Chen',
    progress: 65,
    nextLesson: 'Gas Optimization Techniques',
    timeRemaining: '2h 30m',
    image: '/advanced-smart-contracts.png'
  },
  {
    id: 2,
    title: 'DeFi Protocol Architecture',
    instructor: 'Marcus Rodriguez',
    progress: 40,
    nextLesson: 'Automated Market Makers',
    timeRemaining: '4h 15m',
    image: '/defi-architecture.png'
  },
  {
    id: 3,
    title: 'NFT Marketplace Security',
    instructor: 'Prof. Emily Watson',
    progress: 80,
    nextLesson: 'Final Project Review',
    timeRemaining: '1h 45m',
    image: '/nft-security.png'
  }
]

const recentAchievements = [
  {
    id: 1,
    title: 'Web3 Development Master',
    description: 'Completed advanced Web3 course',
    date: '2024-01-15',
    icon: '🏆',
    tokens: 100
  },
  {
    id: 2,
    title: 'Learning Streak Champion',
    description: '15-day learning streak',
    date: '2024-01-14',
    icon: '🔥',
    tokens: 50
  },
  {
    id: 3,
    title: 'Smart Contract Expert',
    description: 'Earned security certification',
    date: '2024-01-12',
    icon: '🛡️',
    tokens: 75
  }
]

const upcomingDeadlines = [
  {
    id: 1,
    title: 'DeFi Protocol Final Project',
    course: 'DeFi Protocol Architecture',
    dueDate: '2024-01-20',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Smart Contract Quiz',
    course: 'Advanced Smart Contract Development',
    dueDate: '2024-01-18',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'NFT Security Assessment',
    course: 'NFT Marketplace Security',
    dueDate: '2024-01-22',
    priority: 'low'
  }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'achievements'>('overview')

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 lg:pt-32 pb-8 bg-gradient-to-br from-neutral-navy via-neutral-slate to-neutral-navy">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="responsive-text-4xl font-display font-bold text-neutral-white mb-4">
              Welcome back, <span className="gradient-text">Alex</span>! 👋
            </h1>
            <p className="responsive-text-lg text-neutral-silver">
              Continue your Web3 learning journey and track your progress
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="glass-morphism rounded-xl p-4 text-center"
            >
              <BookOpenIcon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-neutral-white">{dashboardStats.coursesInProgress}</div>
              <div className="text-xs text-neutral-silver">In Progress</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-morphism rounded-xl p-4 text-center"
            >
              <AcademicCapIcon className="w-6 h-6 text-hedera mx-auto mb-2" />
              <div className="text-xl font-bold text-neutral-white">{dashboardStats.coursesCompleted}</div>
              <div className="text-xs text-neutral-silver">Completed</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass-morphism rounded-xl p-4 text-center"
            >
              <TrophyIcon className="w-6 h-6 text-accent-gold mx-auto mb-2" />
              <div className="text-xl font-bold text-neutral-white">{dashboardStats.credentialsEarned}</div>
              <div className="text-xs text-neutral-silver">Credentials</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-morphism rounded-xl p-4 text-center"
            >
              <ChartBarIcon className="w-6 h-6 text-accent-orange mx-auto mb-2" />
              <div className="text-xl font-bold text-neutral-white">{dashboardStats.tokensEarned}</div>
              <div className="text-xs text-neutral-silver">NEXC Earned</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="glass-morphism rounded-xl p-4 text-center"
            >
              <FireIcon className="w-6 h-6 text-accent-coral mx-auto mb-2" />
              <div className="text-xl font-bold text-neutral-white">{dashboardStats.currentStreak}</div>
              <div className="text-xs text-neutral-silver">Day Streak</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-morphism rounded-xl p-4 text-center"
            >
              <ClockIcon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-neutral-white">{dashboardStats.totalStudyTime}h</div>
              <div className="text-xs text-neutral-silver">Study Time</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Continue Learning */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass-morphism rounded-2xl p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-neutral-white">Continue Learning</h2>
                  <Link href="/courses" className="text-primary hover:text-primary-hover font-medium">
                    View All Courses
                  </Link>
                </div>

                <div className="space-y-6">
                  {currentCourses.map((course) => (
                    <div key={course.id} className="bg-neutral-charcoal/30 rounded-xl p-6 hover:bg-neutral-charcoal/50 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-white mb-1">{course.title}</h3>
                          <p className="text-sm text-neutral-silver mb-2">by {course.instructor}</p>
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-neutral-silver">Progress</span>
                                <span className="text-xs text-neutral-silver">{course.progress}%</span>
                              </div>
                              <div className="w-full bg-neutral-slate rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-primary to-hedera h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-neutral-white">Next: {course.nextLesson}</p>
                              <p className="text-xs text-neutral-silver">{course.timeRemaining} remaining</p>
                            </div>
                            <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 flex items-center space-x-2">
                              <PlayIcon className="w-4 h-4" />
                              <span>Continue</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="glass-morphism rounded-2xl p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-neutral-white">Recent Achievements</h2>
                  <Link href="/profile" className="text-primary hover:text-primary-hover font-medium">
                    View All
                  </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {recentAchievements.map((achievement) => (
                    <div key={achievement.id} className="bg-neutral-charcoal/30 rounded-xl p-4 text-center">
                      <div className="text-3xl mb-3">{achievement.icon}</div>
                      <h3 className="font-semibold text-neutral-white mb-2">{achievement.title}</h3>
                      <p className="text-sm text-neutral-silver mb-3">{achievement.description}</p>
                      <div className="flex items-center justify-center space-x-2 text-accent-gold">
                        <span className="text-sm font-medium">+{achievement.tokens} NEXC</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Deadlines */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass-morphism rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-neutral-white mb-4">Upcoming Deadlines</h3>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="bg-neutral-charcoal/30 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-neutral-white text-sm">{deadline.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          deadline.priority === 'high' ? 'bg-accent-coral/20 text-accent-coral' :
                          deadline.priority === 'medium' ? 'bg-accent-orange/20 text-accent-orange' :
                          'bg-hedera/20 text-hedera'
                        }`}>
                          {deadline.priority}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-silver mb-2">{deadline.course}</p>
                      <div className="flex items-center space-x-1 text-xs text-neutral-silver">
                        <CalendarIcon className="w-3 h-3" />
                        <span>Due {new Date(deadline.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="glass-morphism rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-neutral-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/courses" className="w-full btn-primary flex items-center justify-center space-x-2">
                    <BookOpenIcon className="w-4 h-4" />
                    <span>Browse Courses</span>
                  </Link>
                  <Link href="/credentials" className="w-full btn-secondary flex items-center justify-center space-x-2">
                    <TrophyIcon className="w-4 h-4" />
                    <span>View Credentials</span>
                  </Link>
                  <Link href="/marketplace" className="w-full bg-neutral-charcoal/50 hover:bg-neutral-charcoal text-neutral-white py-2 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2">
                    <ChartBarIcon className="w-4 h-4" />
                    <span>Token Wallet</span>
                  </Link>
                </div>
              </motion.div>

              {/* Learning Streak */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="glass-morphism rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-neutral-white mb-4">Learning Streak</h3>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔥</div>
                  <div className="text-2xl font-bold text-accent-coral mb-1">{dashboardStats.currentStreak} Days</div>
                  <p className="text-sm text-neutral-silver mb-4">Keep it up! You're on fire!</p>
                  <div className="w-full bg-neutral-charcoal/50 rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-accent-coral to-accent-orange h-2 rounded-full w-3/4" />
                  </div>
                  <p className="text-xs text-neutral-silver">5 more days to reach your goal!</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

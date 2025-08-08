'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  UserCircleIcon,
  PencilIcon,
  CameraIcon,
  MapPinIcon,
  CalendarIcon,
  LinkIcon,
  TrophyIcon,
  AcademicCapIcon,
  StarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

const userProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  role: 'learner',
  avatar: '/professional-avatar.png',
  location: 'San Francisco, CA',
  joinDate: '2023-06-15',
  website: 'https://alexjohnson.dev',
  bio: 'Passionate Web3 developer and blockchain enthusiast. Always learning and building the future of decentralized applications.',
  stats: {
    coursesCompleted: 12,
    credentialsEarned: 8,
    tokensEarned: 2840,
    currentStreak: 15
  },
  skills: [
    { name: 'Solidity', level: 85 },
    { name: 'React', level: 92 },
    { name: 'Web3.js', level: 78 },
    { name: 'Smart Contracts', level: 80 },
    { name: 'DeFi', level: 65 },
    { name: 'NFTs', level: 70 }
  ],
  recentAchievements: [
    {
      id: 1,
      title: 'Web3 Development Master',
      description: 'Completed advanced Web3 development course',
      date: '2024-01-15',
      icon: '🏆'
    },
    {
      id: 2,
      title: 'Smart Contract Security Expert',
      description: 'Earned security certification',
      date: '2024-01-10',
      icon: '🛡️'
    },
    {
      id: 3,
      title: 'Learning Streak Champion',
      description: '15-day learning streak',
      date: '2024-01-08',
      icon: '🔥'
    }
  ]
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'activity'>('overview')

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Profile Header */}
      <section className="pt-20 lg:pt-32 pb-16 bg-gradient-to-br from-neutral-navy via-neutral-slate to-neutral-navy">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-morphism rounded-2xl p-8"
          >
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={userProfile.avatar || "/placeholder.svg"}
                  alt={userProfile.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                />
                <button className="absolute bottom-2 right-2 p-2 bg-primary hover:bg-primary-hover text-white rounded-full transition-colors duration-200">
                  <CameraIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-neutral-white mb-2">
                      {userProfile.name}
                    </h1>
                    <div className="flex items-center justify-center lg:justify-start space-x-4 text-neutral-silver mb-4">
                      <span className="capitalize">{userProfile.role}</span>
                      <div className="flex items-center space-x-1">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{userProfile.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>Joined {new Date(userProfile.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>

                <p className="text-neutral-silver mb-4 max-w-2xl">
                  {userProfile.bio}
                </p>

                <div className="flex items-center justify-center lg:justify-start space-x-1 text-primary">
                  <LinkIcon className="w-4 h-4" />
                  <a
                    href={userProfile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-hover transition-colors duration-200"
                  >
                    {userProfile.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-neutral-silver/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {userProfile.stats.coursesCompleted}
                </div>
                <div className="text-sm text-neutral-silver">Courses Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-hedera mb-1">
                  {userProfile.stats.credentialsEarned}
                </div>
                <div className="text-sm text-neutral-silver">Credentials Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-gold mb-1">
                  {userProfile.stats.tokensEarned.toLocaleString()}
                </div>
                <div className="text-sm text-neutral-silver">NEXC Tokens Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-orange mb-1">
                  {userProfile.stats.currentStreak}
                </div>
                <div className="text-sm text-neutral-silver">Day Streak</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-neutral-slate/30">
        <div className="container-responsive">
          <div className="flex space-x-2 bg-neutral-charcoal/50 p-2 rounded-2xl">
            {[
              { id: 'overview', label: 'Overview', icon: UserCircleIcon },
              { id: 'achievements', label: 'Achievements', icon: TrophyIcon },
              { id: 'activity', label: 'Activity', icon: ChartBarIcon }
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
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Skills */}
                  <div className="glass-morphism rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-neutral-white mb-6">Skills & Expertise</h3>
                    <div className="space-y-4">
                      {userProfile.skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-neutral-white">{skill.name}</span>
                            <span className="text-sm text-neutral-silver">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-neutral-charcoal/50 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-primary to-hedera h-2 rounded-full transition-all duration-500"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Achievements */}
                  <div className="glass-morphism rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-neutral-white mb-6">Recent Achievements</h3>
                    <div className="space-y-4">
                      {userProfile.recentAchievements.map((achievement) => (
                        <div key={achievement.id} className="flex items-center space-x-4 p-4 bg-neutral-charcoal/30 rounded-xl">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-neutral-white">{achievement.title}</h4>
                            <p className="text-neutral-silver text-sm">{achievement.description}</p>
                            <p className="text-xs text-neutral-silver mt-1">
                              {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'achievements' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-morphism rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-neutral-white mb-6">All Achievements</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {userProfile.recentAchievements.map((achievement) => (
                      <div key={achievement.id} className="bg-neutral-charcoal/30 rounded-xl p-6 text-center">
                        <div className="text-4xl mb-4">{achievement.icon}</div>
                        <h4 className="font-semibold text-neutral-white mb-2">{achievement.title}</h4>
                        <p className="text-neutral-silver text-sm mb-3">{achievement.description}</p>
                        <p className="text-xs text-neutral-silver">
                          Earned on {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'activity' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-morphism rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-bold text-neutral-white mb-6">Learning Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-neutral-charcoal/30 rounded-xl">
                      <AcademicCapIcon className="w-8 h-8 text-primary" />
                      <div>
                        <div className="font-medium text-neutral-white">Completed "Advanced Smart Contracts"</div>
                        <div className="text-sm text-neutral-silver">2 hours ago</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-neutral-charcoal/30 rounded-xl">
                      <TrophyIcon className="w-8 h-8 text-accent-gold" />
                      <div>
                        <div className="font-medium text-neutral-white">Earned "DeFi Expert" badge</div>
                        <div className="text-sm text-neutral-silver">1 day ago</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-neutral-charcoal/30 rounded-xl">
                      <StarIcon className="w-8 h-8 text-hedera" />
                      <div>
                        <div className="font-medium text-neutral-white">Received 5-star rating on project</div>
                        <div className="text-sm text-neutral-silver">3 days ago</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="glass-morphism rounded-2xl p-6">
                <h4 className="font-semibold text-neutral-white mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <button className="w-full btn-primary">
                    Edit Profile
                  </button>
                  <button className="w-full btn-secondary">
                    Share Profile
                  </button>
                  <button className="w-full bg-neutral-charcoal/50 hover:bg-neutral-charcoal text-neutral-white py-2 px-4 rounded-xl transition-colors duration-200">
                    Download Resume
                  </button>
                </div>
              </div>

              {/* Learning Progress */}
              <div className="glass-morphism rounded-2xl p-6">
                <h4 className="font-semibold text-neutral-white mb-4">Learning Progress</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-neutral-silver">Overall Progress</span>
                      <span className="text-sm text-neutral-silver">78%</span>
                    </div>
                    <div className="w-full bg-neutral-charcoal/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-hedera h-2 rounded-full w-3/4" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-neutral-silver">Current Course</span>
                      <span className="text-sm text-neutral-silver">45%</span>
                    </div>
                    <div className="w-full bg-neutral-charcoal/50 rounded-full h-2">
                      <div className="bg-gradient-to-r from-accent-gold to-accent-orange h-2 rounded-full w-2/5" />
                    </div>
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

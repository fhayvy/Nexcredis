'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  GlobeAltIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import { useNotifications } from '../../../contexts/NotificationContext'

const settingsTabs = [
  { id: 'profile', name: 'Profile', icon: UserCircleIcon },
  { id: 'notifications', name: 'Notifications', icon: BellIcon },
  { id: 'privacy', name: 'Privacy & Security', icon: ShieldCheckIcon },
  { id: 'billing', name: 'Billing', icon: CreditCardIcon },
  { id: 'preferences', name: 'Preferences', icon: GlobeAltIcon },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { showToast } = useNotifications()

  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    bio: 'Passionate Web3 developer and blockchain enthusiast.',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.dev',
    twitter: '@alexjohnson',
    linkedin: 'alexjohnson'
  })

  const [notificationSettings, setNotificationSettings] = useState({
    courseUpdates: true,
    achievementNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
    pushNotifications: true,
    emailNotifications: true
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showProgress: true,
    showAchievements: true,
    twoFactorEnabled: false
  })

  const handleSaveProfile = () => {
    showToast('Profile updated successfully!', 'success')
  }

  const handleSaveNotifications = () => {
    showToast('Notification preferences saved!', 'success')
  }

  const handleSavePrivacy = () => {
    showToast('Privacy settings updated!', 'success')
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Header */}
      <section className="pt-20 lg:pt-32 pb-8 bg-gradient-to-br from-neutral-navy via-neutral-slate to-neutral-navy">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="responsive-text-4xl font-display font-bold text-neutral-white mb-4">
              Account <span className="gradient-text">Settings</span>
            </h1>
            <p className="responsive-text-lg text-neutral-silver">
              Manage your account preferences and privacy settings
            </p>
          </motion.div>
        </div>
      </section>

      {/* Settings Content */}
      <section className="py-16">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="glass-morphism rounded-2xl p-6 sticky top-8">
                <nav className="space-y-2">
                  {settingsTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-primary text-white shadow-lg'
                          : 'text-neutral-silver hover:text-neutral-white hover:bg-neutral-charcoal/50'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="glass-morphism rounded-2xl p-8">
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-white mb-2">Profile Information</h2>
                      <p className="text-neutral-silver">Update your personal information and profile details.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-white mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          className="input-field w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-white mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          className="input-field w-full"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-white mb-2">
                          Bio
                        </label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                          rows={4}
                          className="input-field w-full resize-none"
                          placeholder="Tell us about yourself..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-white mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                          className="input-field w-full"
                          placeholder="City, Country"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-white mb-2">
                          Website
                        </label>
                        <input
                          type="url"
                          value={profileData.website}
                          onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                          className="input-field w-full"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-white mb-2">
                          Twitter
                        </label>
                        <input
                          type="text"
                          value={profileData.twitter}
                          onChange={(e) => setProfileData(prev => ({ ...prev, twitter: e.target.value }))}
                          className="input-field w-full"
                          placeholder="@username"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-white mb-2">
                          LinkedIn
                        </label>
                        <input
                          type="text"
                          value={profileData.linkedin}
                          onChange={(e) => setProfileData(prev => ({ ...prev, linkedin: e.target.value }))}
                          className="input-field w-full"
                          placeholder="username"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button onClick={handleSaveProfile} className="btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-white mb-2">Notification Preferences</h2>
                      <p className="text-neutral-silver">Choose what notifications you'd like to receive.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-white mb-4">Learning Notifications</h3>
                        <div className="space-y-4">
                          <label className="flex items-center justify-between">
                            <div>
                              <span className="text-neutral-white font-medium">Course Updates</span>
                              <p className="text-sm text-neutral-silver">Get notified about new lessons and course announcements</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={notificationSettings.courseUpdates}
                              onChange={(e) => setNotificationSettings(prev => ({ ...prev, courseUpdates: e.target.checked }))}
                              className="w-5 h-5 text-primary bg-neutral-slate border-neutral-silver/20 rounded focus:ring-primary focus:ring-2"
                            />
                          </label>

                          <label className="flex items-center justify-between">
                            <div>
                              <span className="text-neutral-white font-medium">Achievement Notifications</span>
                              <p className="text-sm text-neutral-silver">Celebrate your learning milestones and badges</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={notificationSettings.achievementNotifications}
                              onChange={(e) => setNotificationSettings(prev => ({ ...prev, achievementNotifications: e.target.checked }))}
                              className="w-5 h-5 text-primary bg-neutral-slate border-neutral-silver/20 rounded focus:ring-primary focus:ring-2"
                            />
                          </label>

                          <label className="flex items-center justify-between">
                            <div>
                              <span className="text-neutral-white font-medium">Weekly Digest</span>
                              <p className="text-sm text-neutral-silver">Summary of your learning progress and recommendations</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={notificationSettings.weeklyDigest}
                              onChange={(e) => setNotificationSettings(prev => ({ ...prev, weeklyDigest: e.target.checked }))}
                              className="w-5 h-5 text-primary bg-neutral-slate border-neutral-silver/20 rounded focus:ring-primary focus:ring-2"
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-neutral-white mb-4">Communication Preferences</h3>
                        <div className="space-y-4">
                          <label className="flex items-center justify-between">
                            <div>
                              <span className="text-neutral-white font-medium">Push Notifications</span>
                              <p className="text-sm text-neutral-silver">Receive notifications in your browser</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={notificationSettings.pushNotifications}
                              onChange={(e) => setNotificationSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                              className="w-5 h-5 text-primary bg-neutral-slate border-neutral-silver/20 rounded focus:ring-primary focus:ring-2"
                            />
                          </label>

                          <label className="flex items-center justify-between">
                            <div>
                              <span className="text-neutral-white font-medium">Email Notifications</span>
                              <p className="text-sm text-neutral-silver">Receive notifications via email</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={notificationSettings.emailNotifications}
                              onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                              className="w-5 h-5 text-primary bg-neutral-slate border-neutral-silver/20 rounded focus:ring-primary focus:ring-2"
                            />
                          </label>

                          <label className="flex items-center justify-between">
                            <div>
                              <span className="text-neutral-white font-medium">Marketing Emails</span>
                              <p className="text-sm text-neutral-silver">Receive updates about new features and promotions</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={notificationSettings.marketingEmails}
                              onChange={(e) => setNotificationSettings(prev => ({ ...prev, marketingEmails: e.target.checked }))}
                              className="w-5 h-5 text-primary bg-neutral-slate border-neutral-silver/20 rounded focus:ring-primary focus:ring-2"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button onClick={handleSaveNotifications} className="btn-primary">
                        Save Preferences
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Privacy & Security */}
                {activeTab === 'privacy' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-white mb-2">Privacy & Security</h2>
                      <p className="text-neutral-silver">Manage your privacy settings and account security.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-white mb-4">Profile Visibility</h3>
                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="profileVisibility"
                              value="public"
                              checked={privacySettings.profileVisibility === 'public'}
                              onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                              className="w-4 h-4 text-primary bg-neutral-slate border-neutral-silver/20 focus:ring-primary focus:ring-2"
                            />
                            <div className="ml-3">
                              <span className="text-neutral-white font-medium">Public</span>
                              <p className="text-sm text-neutral-silver">Anyone can view your profile and achievements</p>
                            </div>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="profileVisibility"
                              value="private"
                              checked={privacySettings.profileVisibility === 'private'}
                              onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                              className="w-4 h-4 text-primary bg-neutral-slate border-neutral-silver/20 focus:ring-primary focus:ring-2"
                            />
                            <div className="ml-3">
                              <span className="text-neutral-white font-medium">Private</span>
                              <p className="text-sm text-neutral-silver">Only you can view your profile information</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-neutral-white mb-4">Information Sharing</h3>
                        <div className="space-y-4">
                          <label className="flex items-center justify-between">
                            <div>
                              <span className="text-neutral-white font-medium">Show Email Address</span>
                              <p className="text-sm text-neutral-silver">Display your email on your public profile</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={privacySettings.showEmail}
                              onChange={(e) => setPrivacySettings(prev => ({ ...prev, showEmail: e.target.checked }))}
                              className="w-5 h-5 text-primary bg-neutral-slate border-neutral-silver/20 rounded focus:ring-primary focus:ring-2"
                            />
                          </label>

                          <label className="flex items-center justify-between">
                            <div>
                              <span className="text-neutral-white font-medium">Show Learning Progress</span>
                              <p className="text-sm text-neutral-silver">Display your course progress and statistics</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={privacySettings.showProgress}
                              onChange={(e) => setPrivacySettings(prev => ({ ...prev, showProgress: e.target.checked }))}
                              className="w-5 h-5 text-primary bg-neutral-slate border-neutral-silver/20 rounded focus:ring-primary focus:ring-2"
                            />
                          </label>

                          <label className="flex items-center justify-between">
                            <div>
                              <span className="text-neutral-white font-medium">Show Achievements</span>
                              <p className="text-sm text-neutral-silver">Display your badges and certifications</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={privacySettings.showAchievements}
                              onChange={(e) => setPrivacySettings(prev => ({ ...prev, showAchievements: e.target.checked }))}
                              className="w-5 h-5 text-primary bg-neutral-slate border-neutral-silver/20 rounded focus:ring-primary focus:ring-2"
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-neutral-white mb-4">Security</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-neutral-charcoal/30 rounded-xl">
                            <div>
                              <span className="text-neutral-white font-medium">Two-Factor Authentication</span>
                              <p className="text-sm text-neutral-silver">Add an extra layer of security to your account</p>
                            </div>
                            <button
                              onClick={() => setPrivacySettings(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))}
                              className={`px-4 py-2 rounded-xl font-medium transition-colors duration-200 ${
                                privacySettings.twoFactorEnabled
                                  ? 'bg-hedera text-white'
                                  : 'bg-neutral-slate text-neutral-silver hover:text-neutral-white'
                              }`}
                            >
                              {privacySettings.twoFactorEnabled ? 'Enabled' : 'Enable'}
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-neutral-charcoal/30 rounded-xl">
                            <div>
                              <span className="text-neutral-white font-medium">Change Password</span>
                              <p className="text-sm text-neutral-silver">Update your account password</p>
                            </div>
                            <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-colors duration-200">
                              Change
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button onClick={handleSavePrivacy} className="btn-primary">
                        Save Settings
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Billing */}
                {activeTab === 'billing' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-white mb-2">Billing & Subscription</h2>
                      <p className="text-neutral-silver">Manage your subscription and payment methods.</p>
                    </div>

                    <div className="bg-gradient-to-r from-primary/10 to-hedera/10 border border-primary/20 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-neutral-white">Free Plan</h3>
                          <p className="text-neutral-silver">Access to basic courses and features</p>
                        </div>
                        <span className="px-3 py-1 bg-hedera/20 text-hedera rounded-full text-sm font-medium">
                          Current Plan
                        </span>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-neutral-white">5</div>
                          <div className="text-sm text-neutral-silver">Courses Available</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-neutral-white">Basic</div>
                          <div className="text-sm text-neutral-silver">Support Level</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-neutral-white">∞</div>
                          <div className="text-sm text-neutral-silver">Learning Time</div>
                        </div>
                      </div>
                      <button className="w-full btn-primary">
                        Upgrade to Pro
                      </button>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-neutral-white mb-4">Payment Methods</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-neutral-charcoal/30 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                              <CreditCardIcon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <span className="text-neutral-white font-medium">•••• •••• •••• 4242</span>
                              <p className="text-sm text-neutral-silver">Expires 12/25</p>
                            </div>
                          </div>
                          <button className="text-accent-coral hover:text-accent-coral/80 transition-colors duration-200">
                            Remove
                          </button>
                        </div>
                        <button className="w-full p-4 border-2 border-dashed border-neutral-silver/20 rounded-xl text-neutral-silver hover:text-neutral-white hover:border-neutral-silver/40 transition-all duration-200">
                          + Add Payment Method
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-neutral-white mb-4">Billing History</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-neutral-charcoal/30 rounded-xl">
                          <div>
                            <span className="text-neutral-white font-medium">Free Plan</span>
                            <p className="text-sm text-neutral-silver">Jan 1, 2024 - Current</p>
                          </div>
                          <span className="text-hedera font-semibold">$0.00</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Preferences */}
                {activeTab === 'preferences' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-neutral-white mb-2">Preferences</h2>
                      <p className="text-neutral-silver">Customize your learning experience and platform settings.</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-white mb-4">Language & Region</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-white mb-2">
                              Language
                            </label>
                            <select className="input-field w-full">
                              <option value="en">English</option>
                              <option value="es">Spanish</option>
                              <option value="fr">French</option>
                              <option value="de">German</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-white mb-2">
                              Timezone
                            </label>
                            <select className="input-field w-full">
                              <option value="UTC-8">Pacific Time (UTC-8)</option>
                              <option value="UTC-5">Eastern Time (UTC-5)</option>
                              <option value="UTC+0">UTC</option>
                              <option value="UTC+1">Central European Time (UTC+1)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-neutral-white mb-4">Learning Preferences</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-white mb-2">
                              Preferred Learning Pace
                            </label>
                            <select className="input-field w-full">
                              <option value="self-paced">Self-paced</option>
                              <option value="structured">Structured schedule</option>
                              <option value="intensive">Intensive</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-white mb-2">
                              Video Quality
                            </label>
                            <select className="input-field w-full">
                              <option value="auto">Auto</option>
                              <option value="1080p">1080p</option>
                              <option value="720p">720p</option>
                              <option value="480p">480p</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-neutral-white mb-4">Accessibility</h3>
                        <div className="space-y-4">
                          <label className="flex items-center justify-between">
                            <div>
                              <span className="text-neutral-white font-medium">Closed Captions</span>
                              <p className="text-sm text-neutral-silver">Show subtitles for video content</p>
                            </div>
                            <input
                              type="checkbox"
                              className="w-5 h-5 text-primary bg-neutral-slate border-neutral-silver/20 rounded focus:ring-primary focus:ring-2"
                            />
                          </label>
                          <label className="flex items-center justify-between">
                            <div>
                              <span className="text-neutral-white font-medium">High Contrast Mode</span>
                              <p className="text-sm text-neutral-silver">Increase contrast for better visibility</p>
                            </div>
                            <input
                              type="checkbox"
                              className="w-5 h-5 text-primary bg-neutral-slate border-neutral-silver/20 rounded focus:ring-primary focus:ring-2"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="btn-primary">
                        Save Preferences
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Danger Zone */}
              {activeTab === 'privacy' && (
                <div className="glass-morphism rounded-2xl p-8 mt-8 border-2 border-accent-coral/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <ExclamationTriangleIcon className="w-6 h-6 text-accent-coral" />
                    <h3 className="text-lg font-semibold text-accent-coral">Danger Zone</h3>
                  </div>
                  <p className="text-neutral-silver mb-6">
                    These actions are irreversible. Please proceed with caution.
                  </p>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-accent-coral/10 hover:bg-accent-coral/20 text-accent-coral border border-accent-coral/30 rounded-xl transition-colors duration-200"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>Delete Account</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

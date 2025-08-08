'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon,
  AcademicCapIcon,
  UserIcon,
  CogIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { useNotifications } from '../../contexts/NotificationContext'

const steps = [
  {
    id: 1,
    title: 'Welcome to Nexcredis!',
    description: 'Let\'s get you set up for your Web3 learning journey',
    icon: SparklesIcon
  },
  {
    id: 2,
    title: 'Tell us about yourself',
    description: 'Help us personalize your learning experience',
    icon: UserIcon
  },
  {
    id: 3,
    title: 'Choose your interests',
    description: 'Select topics you\'d like to learn about',
    icon: AcademicCapIcon
  },
  {
    id: 4,
    title: 'Set your preferences',
    description: 'Customize your learning environment',
    icon: CogIcon
  }
]

const interests = [
  { id: 'blockchain-basics', name: 'Blockchain Fundamentals', description: 'Learn the core concepts of blockchain technology' },
  { id: 'smart-contracts', name: 'Smart Contracts', description: 'Build and deploy smart contracts on various networks' },
  { id: 'web3-development', name: 'Web3 Development', description: 'Create decentralized applications (DApps)' },
  { id: 'defi', name: 'Decentralized Finance (DeFi)', description: 'Explore the world of decentralized financial protocols' },
  { id: 'nfts', name: 'NFTs & Digital Assets', description: 'Create, trade, and understand non-fungible tokens' },
  { id: 'cryptocurrency', name: 'Cryptocurrency Trading', description: 'Learn trading strategies and market analysis' },
  { id: 'security', name: 'Blockchain Security', description: 'Secure smart contracts and identify vulnerabilities' },
  { id: 'data-science', name: 'Blockchain Data Science', description: 'Analyze on-chain data and extract insights' }
]

const experienceLevels = [
  { id: 'beginner', name: 'Beginner', description: 'New to blockchain and Web3' },
  { id: 'intermediate', name: 'Intermediate', description: 'Some experience with crypto or programming' },
  { id: 'advanced', name: 'Advanced', description: 'Experienced developer or crypto professional' }
]

const learningGoals = [
  { id: 'career-change', name: 'Career Change', description: 'Transition into Web3 industry' },
  { id: 'skill-upgrade', name: 'Skill Upgrade', description: 'Add Web3 skills to current role' },
  { id: 'personal-interest', name: 'Personal Interest', description: 'Learn for personal knowledge' },
  { id: 'business', name: 'Business Application', description: 'Apply Web3 to my business' }
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    experienceLevel: '',
    learningGoal: '',
    selectedInterests: [] as string[],
    studyTime: '1-2',
    notifications: true,
    newsletter: true
  })
  const [isLoading, setIsLoading] = useState(false)
  
  const router = useRouter()
  const { showToast } = useNotifications()

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    
    try {
      // Simulate API call to save onboarding data
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      showToast('Welcome to Nexcredis! Your profile has been set up successfully.', 'success')
      router.push('/dashboard')
    } catch (error) {
      showToast('Something went wrong. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleInterest = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interestId)
        ? prev.selectedInterests.filter(id => id !== interestId)
        : [...prev.selectedInterests, interestId]
    }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true
      case 2:
        return formData.experienceLevel && formData.learningGoal
      case 3:
        return formData.selectedInterests.length > 0
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-navy via-neutral-slate to-neutral-navy flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  currentStep > step.id 
                    ? 'bg-primary border-primary text-white' 
                    : currentStep === step.id
                    ? 'border-primary text-primary bg-primary/10'
                    : 'border-neutral-silver/30 text-neutral-silver'
                }`}>
                  {currentStep > step.id ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-neutral-silver/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-neutral-silver">Step {currentStep} of {steps.length}</p>
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-morphism rounded-2xl p-8 mb-8"
          >
            {/* Step 1: Welcome */}
            {currentStep === 1 && (
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-hedera rounded-full flex items-center justify-center mx-auto mb-6">
                  <SparklesIcon className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-white mb-4">
                  Welcome to Nexcredis!
                </h2>
                <p className="text-xl text-neutral-silver mb-8 max-w-2xl mx-auto">
                  You're about to embark on an exciting journey into the world of Web3 and blockchain technology. 
                  Let's personalize your learning experience to help you achieve your goals.
                </p>
                <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <AcademicCapIcon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-neutral-white mb-2">Expert-Led Courses</h3>
                    <p className="text-sm text-neutral-silver">Learn from industry leaders and academic experts</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-hedera/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <CheckIcon className="w-6 h-6 text-hedera" />
                    </div>
                    <h3 className="font-semibold text-neutral-white mb-2">Verified Credentials</h3>
                    <p className="text-sm text-neutral-silver">Earn blockchain-verified certificates and badges</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <SparklesIcon className="w-6 h-6 text-accent-gold" />
                    </div>
                    <h3 className="font-semibold text-neutral-white mb-2">Token Rewards</h3>
                    <p className="text-sm text-neutral-silver">Earn NEXC tokens for your learning achievements</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: About You */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-3xl font-bold text-neutral-white mb-4 text-center">
                  Tell us about yourself
                </h2>
                <p className="text-neutral-silver mb-8 text-center max-w-2xl mx-auto">
                  Help us understand your background so we can recommend the best learning path for you.
                </p>

                <div className="space-y-8">
                  {/* Experience Level */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-white mb-4">What's your experience level?</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {experienceLevels.map((level) => (
                        <button
                          key={level.id}
                          onClick={() => setFormData(prev => ({ ...prev, experienceLevel: level.id }))}
                          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                            formData.experienceLevel === level.id
                              ? 'border-primary bg-primary/10'
                              : 'border-neutral-silver/20 hover:border-neutral-silver/40'
                          }`}
                        >
                          <h4 className={`font-semibold mb-2 ${
                            formData.experienceLevel === level.id ? 'text-primary' : 'text-neutral-white'
                          }`}>
                            {level.name}
                          </h4>
                          <p className="text-sm text-neutral-silver">{level.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Learning Goal */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-white mb-4">What's your main learning goal?</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {learningGoals.map((goal) => (
                        <button
                          key={goal.id}
                          onClick={() => setFormData(prev => ({ ...prev, learningGoal: goal.id }))}
                          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                            formData.learningGoal === goal.id
                              ? 'border-primary bg-primary/10'
                              : 'border-neutral-silver/20 hover:border-neutral-silver/40'
                          }`}
                        >
                          <h4 className={`font-semibold mb-2 ${
                            formData.learningGoal === goal.id ? 'text-primary' : 'text-neutral-white'
                          }`}>
                            {goal.name}
                          </h4>
                          <p className="text-sm text-neutral-silver">{goal.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Interests */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-3xl font-bold text-neutral-white mb-4 text-center">
                  Choose your interests
                </h2>
                <p className="text-neutral-silver mb-8 text-center max-w-2xl mx-auto">
                  Select the topics you're most interested in learning about. You can always change these later.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {interests.map((interest) => (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        formData.selectedInterests.includes(interest.id)
                          ? 'border-primary bg-primary/10'
                          : 'border-neutral-silver/20 hover:border-neutral-silver/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold ${
                          formData.selectedInterests.includes(interest.id) ? 'text-primary' : 'text-neutral-white'
                        }`}>
                          {interest.name}
                        </h4>
                        {formData.selectedInterests.includes(interest.id) && (
                          <CheckIcon className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-neutral-silver">{interest.description}</p>
                    </button>
                  ))}
                </div>

                <p className="text-center text-neutral-silver mt-4">
                  Selected: {formData.selectedInterests.length} topic{formData.selectedInterests.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}

            {/* Step 4: Preferences */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-3xl font-bold text-neutral-white mb-4 text-center">
                  Set your preferences
                </h2>
                <p className="text-neutral-silver mb-8 text-center max-w-2xl mx-auto">
                  Customize your learning environment and notification settings.
                </p>

                <div className="space-y-6 max-w-2xl mx-auto">
                  {/* Study Time */}
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-white mb-4">How much time can you dedicate to learning per week?</h3>
                    <select
                      value={formData.studyTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, studyTime: e.target.value }))}
                      className="w-full bg-neutral-slate border border-neutral-silver/20 rounded-xl px-4 py-3 text-neutral-white focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="1-2">1-2 hours per week</option>
                      <option value="3-5">3-5 hours per week</option>
                      <option value="6-10">6-10 hours per week</option>
                      <option value="10+">More than 10 hours per week</option>
                    </select>
                  </div>

                  {/* Notifications */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-neutral-white">Notification preferences</h3>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.notifications}
                        onChange={(e) => setFormData(prev => ({ ...prev, notifications: e.target.checked }))}
                        className="w-5 h-5 text-primary bg-neutral-slate border-neutral-silver/20 rounded focus:ring-primary focus:ring-2"
                      />
                      <div>
                        <span className="text-neutral-white font-medium">Learning reminders</span>
                        <p className="text-sm text-neutral-silver">Get notified about new courses and deadlines</p>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))}
                        className="w-5 h-5 text-primary bg-neutral-slate border-neutral-silver/20 rounded focus:ring-primary focus:ring-2"
                      />
                      <div>
                        <span className="text-neutral-white font-medium">Newsletter updates</span>
                        <p className="text-sm text-neutral-silver">Stay updated with Web3 industry news and platform updates</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'text-neutral-silver cursor-not-allowed'
                : 'text-neutral-white hover:bg-neutral-slate/50'
            }`}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index + 1 === currentStep ? 'bg-primary w-8' : 'bg-neutral-silver/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!canProceed() || isLoading}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              canProceed() && !isLoading
                ? 'bg-primary hover:bg-primary-hover text-white shadow-lg'
                : 'bg-neutral-silver/20 text-neutral-silver cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{currentStep === steps.length ? 'Complete Setup' : 'Next'}</span>
                <ArrowRightIcon className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

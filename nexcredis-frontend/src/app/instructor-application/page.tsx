'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  DocumentTextIcon,
  AcademicCapIcon,
  UserIcon,
  BriefcaseIcon,
  PresentationChartLineIcon,
  CloudArrowUpIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  timezone: string
  linkedIn: string
  github: string
  website: string
  
  // Education & Qualifications
  highestDegree: string
  fieldOfStudy: string
  university: string
  graduationYear: string
  certifications: string
  
  // Professional Experience
  currentRole: string
  company: string
  yearsExperience: string
  web3Experience: string
  teachingExperience: string
  
  // Teaching Information
  certificationLevel: string
  subjectAreas: string[]
  teachingStyle: string
  availability: string
  preferredFormat: string
  
  // Additional Information
  motivation: string
  sampleCourse: string
  references: string
  
  // Files
  resume: File | null
  portfolio: File | null
  teachingDemo: File | null
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  timezone: '',
  linkedIn: '',
  github: '',
  website: '',
  highestDegree: '',
  fieldOfStudy: '',
  university: '',
  graduationYear: '',
  certifications: '',
  currentRole: '',
  company: '',
  yearsExperience: '',
  web3Experience: '',
  teachingExperience: '',
  certificationLevel: '',
  subjectAreas: [],
  teachingStyle: '',
  availability: '',
  preferredFormat: '',
  motivation: '',
  sampleCourse: '',
  references: '',
  resume: null,
  portfolio: null,
  teachingDemo: null
}

const subjectOptions = [
  'Blockchain Fundamentals',
  'Smart Contract Development',
  'DeFi Protocols',
  'NFT Development',
  'Web3 Security',
  'Cryptocurrency Trading',
  'Tokenomics',
  'DAO Governance',
  'Layer 2 Solutions',
  'Cross-chain Development',
  'Blockchain Analytics',
  'Regulatory Compliance'
]

export default function InstructorApplicationPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalSteps = 5

  const handleInputChange = (field: keyof FormData, value: string | string[] | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubjectToggle = (subject: string) => {
    const currentSubjects = formData.subjectAreas
    const updatedSubjects = currentSubjects.includes(subject)
      ? currentSubjects.filter(s => s !== subject)
      : [...currentSubjects, subject]
    
    handleInputChange('subjectAreas', updatedSubjects)
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required'
        if (!formData.lastName) newErrors.lastName = 'Last name is required'
        if (!formData.email) newErrors.email = 'Email is required'
        if (!formData.phone) newErrors.phone = 'Phone number is required'
        if (!formData.country) newErrors.country = 'Country is required'
        break
      case 2:
        if (!formData.highestDegree) newErrors.highestDegree = 'Highest degree is required'
        if (!formData.fieldOfStudy) newErrors.fieldOfStudy = 'Field of study is required'
        if (!formData.university) newErrors.university = 'University is required'
        break
      case 3:
        if (!formData.yearsExperience) newErrors.yearsExperience = 'Years of experience is required'
        if (!formData.web3Experience) newErrors.web3Experience = 'Web3 experience is required'
        break
      case 4:
        if (!formData.certificationLevel) newErrors.certificationLevel = 'Certification level is required'
        if (formData.subjectAreas.length === 0) newErrors.subjectAreas = 'At least one subject area is required'
        if (!formData.motivation) newErrors.motivation = 'Motivation is required'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <UserIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-neutral-white mb-2">Personal Information</h3>
              <p className="text-neutral-silver">Tell us about yourself</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full px-4 py-3 bg-neutral-slate/50 border rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                    errors.firstName ? 'border-red-500' : 'border-neutral-silver/20'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full px-4 py-3 bg-neutral-slate/50 border rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                    errors.lastName ? 'border-red-500' : 'border-neutral-silver/20'
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 bg-neutral-slate/50 border rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                    errors.email ? 'border-red-500' : 'border-neutral-silver/20'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 bg-neutral-slate/50 border rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                    errors.phone ? 'border-red-500' : 'border-neutral-silver/20'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Country *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className={`w-full px-4 py-3 bg-neutral-slate/50 border rounded-xl text-neutral-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                    errors.country ? 'border-red-500' : 'border-neutral-silver/20'
                  }`}
                >
                  <option value="">Select your country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="AU">Australia</option>
                  <option value="SG">Singapore</option>
                  <option value="JP">Japan</option>
                  <option value="other">Other</option>
                </select>
                {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Timezone
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-slate/50 border border-neutral-silver/20 rounded-xl text-neutral-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                >
                  <option value="">Select your timezone</option>
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC+0">GMT (UTC+0)</option>
                  <option value="UTC+1">Central European Time (UTC+1)</option>
                  <option value="UTC+8">Singapore Time (UTC+8)</option>
                  <option value="UTC+9">Japan Time (UTC+9)</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-neutral-white">Professional Links</h4>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-white mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={formData.linkedIn}
                    onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-slate/50 border border-neutral-silver/20 rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-white mb-2">
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-slate/50 border border-neutral-silver/20 rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                    placeholder="https://github.com/yourusername"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-white mb-2">
                    Personal Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-slate/50 border border-neutral-silver/20 rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <AcademicCapIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-neutral-white mb-2">Education & Qualifications</h3>
              <p className="text-neutral-silver">Share your educational background</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Highest Degree *
                </label>
                <select
                  value={formData.highestDegree}
                  onChange={(e) => handleInputChange('highestDegree', e.target.value)}
                  className={`w-full px-4 py-3 bg-neutral-slate/50 border rounded-xl text-neutral-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                    errors.highestDegree ? 'border-red-500' : 'border-neutral-silver/20'
                  }`}
                >
                  <option value="">Select your highest degree</option>
                  <option value="high-school">High School</option>
                  <option value="associate">Associate Degree</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="professional">Professional Degree</option>
                </select>
                {errors.highestDegree && <p className="text-red-400 text-sm mt-1">{errors.highestDegree}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Field of Study *
                </label>
                <input
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                  className={`w-full px-4 py-3 bg-neutral-slate/50 border rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                    errors.fieldOfStudy ? 'border-red-500' : 'border-neutral-silver/20'
                  }`}
                  placeholder="Computer Science, Engineering, etc."
                />
                {errors.fieldOfStudy && <p className="text-red-400 text-sm mt-1">{errors.fieldOfStudy}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  University/Institution *
                </label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => handleInputChange('university', e.target.value)}
                  className={`w-full px-4 py-3 bg-neutral-slate/50 border rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                    errors.university ? 'border-red-500' : 'border-neutral-silver/20'
                  }`}
                  placeholder="Name of your university or institution"
                />
                {errors.university && <p className="text-red-400 text-sm mt-1">{errors.university}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Graduation Year
                </label>
                <input
                  type="number"
                  value={formData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-slate/50 border border-neutral-silver/20 rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder="2020"
                  min="1950"
                  max="2030"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-white mb-2">
                Professional Certifications
              </label>
              <textarea
                value={formData.certifications}
                onChange={(e) => handleInputChange('certifications', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-neutral-slate/50 border border-neutral-silver/20 rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 resize-none"
                placeholder="List any relevant certifications (AWS, Google Cloud, Ethereum Developer, etc.)"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <BriefcaseIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-neutral-white mb-2">Professional Experience</h3>
              <p className="text-neutral-silver">Tell us about your work experience</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Current Role
                </label>
                <input
                  type="text"
                  value={formData.currentRole}
                  onChange={(e) => handleInputChange('currentRole', e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-slate/50 border border-neutral-silver/20 rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder="Senior Developer, CTO, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-slate/50 border border-neutral-silver/20 rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  placeholder="Current or most recent company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Years of Professional Experience *
                </label>
                <select
                  value={formData.yearsExperience}
                  onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                  className={`w-full px-4 py-3 bg-neutral-slate/50 border rounded-xl text-neutral-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                    errors.yearsExperience ? 'border-red-500' : 'border-neutral-silver/20'
                  }`}
                >
                  <option value="">Select experience level</option>
                  <option value="1-2">1-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="11-15">11-15 years</option>
                  <option value="15+">15+ years</option>
                </select>
                {errors.yearsExperience && <p className="text-red-400 text-sm mt-1">{errors.yearsExperience}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Web3/Blockchain Experience *
                </label>
                <select
                  value={formData.web3Experience}
                  onChange={(e) => handleInputChange('web3Experience', e.target.value)}
                  className={`w-full px-4 py-3 bg-neutral-slate/50 border rounded-xl text-neutral-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                    errors.web3Experience ? 'border-red-500' : 'border-neutral-silver/20'
                  }`}
                >
                  <option value="">Select Web3 experience</option>
                  <option value="beginner">Less than 1 year</option>
                  <option value="intermediate">1-3 years</option>
                  <option value="advanced">3-5 years</option>
                  <option value="expert">5+ years</option>
                </select>
                {errors.web3Experience && <p className="text-red-400 text-sm mt-1">{errors.web3Experience}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-white mb-2">
                Teaching/Training Experience
              </label>
              <textarea
                value={formData.teachingExperience}
                onChange={(e) => handleInputChange('teachingExperience', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-neutral-slate/50 border border-neutral-silver/20 rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 resize-none"
                placeholder="Describe any teaching, training, mentoring, or educational experience you have..."
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <PresentationChartLineIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-neutral-white mb-2">Teaching Preferences</h3>
              <p className="text-neutral-silver">Tell us about your teaching goals</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Desired Certification Level *
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {['Associate Instructor', 'Certified Instructor', 'Expert Instructor'].map((level) => (
                    <div
                      key={level}
                      onClick={() => handleInputChange('certificationLevel', level)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        formData.certificationLevel === level
                          ? 'border-primary bg-primary/10'
                          : 'border-neutral-silver/20 hover:border-primary/50'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">
                          {level === 'Associate Instructor' && '🥉'}
                          {level === 'Certified Instructor' && '🥈'}
                          {level === 'Expert Instructor' && '🥇'}
                        </div>
                        <h4 className="font-semibold text-neutral-white text-sm">{level}</h4>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.certificationLevel && <p className="text-red-400 text-sm mt-1">{errors.certificationLevel}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Subject Areas of Expertise *
                </label>
                <div className="grid md:grid-cols-3 gap-3">
                  {subjectOptions.map((subject) => (
                    <div
                      key={subject}
                      onClick={() => handleSubjectToggle(subject)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 text-sm ${
                        formData.subjectAreas.includes(subject)
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-neutral-silver/20 text-neutral-silver hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          formData.subjectAreas.includes(subject)
                            ? 'border-primary bg-primary'
                            : 'border-neutral-silver/40'
                        }`}>
                          {formData.subjectAreas.includes(subject) && (
                            <CheckCircleIcon className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span>{subject}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.subjectAreas && <p className="text-red-400 text-sm mt-1">{errors.subjectAreas}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-white mb-2">
                    Teaching Style
                  </label>
                  <select
                    value={formData.teachingStyle}
                    onChange={(e) => handleInputChange('teachingStyle', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-slate/50 border border-neutral-silver/20 rounded-xl text-neutral-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  >
                    <option value="">Select teaching style</option>
                    <option value="hands-on">Hands-on/Practical</option>
                    <option value="theoretical">Theoretical/Conceptual</option>
                    <option value="mixed">Mixed Approach</option>
                    <option value="project-based">Project-based Learning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-white mb-2">
                    Availability
                  </label>
                  <select
                    value={formData.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-slate/50 border border-neutral-silver/20 rounded-xl text-neutral-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  >
                    <option value="">Select availability</option>
                    <option value="full-time">Full-time (40+ hours/week)</option>
                    <option value="part-time">Part-time (20-40 hours/week)</option>
                    <option value="occasional">Occasional (10-20 hours/week)</option>
                    <option value="flexible">Flexible schedule</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Why do you want to become an instructor? *
                </label>
                <textarea
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 bg-neutral-slate/50 border rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 resize-none ${
                    errors.motivation ? 'border-red-500' : 'border-neutral-silver/20'
                  }`}
                  placeholder="Share your motivation for teaching and how you plan to contribute to the Web3 education community..."
                />
                {errors.motivation && <p className="text-red-400 text-sm mt-1">{errors.motivation}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Sample Course Idea
                </label>
                <textarea
                  value={formData.sampleCourse}
                  onChange={(e) => handleInputChange('sampleCourse', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-neutral-slate/50 border border-neutral-silver/20 rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 resize-none"
                  placeholder="Describe a course you'd like to create (optional but recommended)..."
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CloudArrowUpIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-neutral-white mb-2">Documents & References</h3>
              <p className="text-neutral-silver">Upload your supporting documents</p>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-white mb-2">
                    Resume/CV
                  </label>
                  <div className="border-2 border-dashed border-neutral-silver/30 rounded-xl p-6 text-center hover:border-primary/50 transition-colors duration-200">
                    <CloudArrowUpIcon className="w-8 h-8 text-neutral-silver mx-auto mb-2" />
                    <p className="text-sm text-neutral-silver mb-2">
                      {formData.resume ? formData.resume.name : 'Upload your resume'}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleInputChange('resume', e.target.files?.[0] || null)}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-primary/30 transition-colors duration-200"
                    >
                      Choose File
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-white mb-2">
                    Portfolio (Optional)
                  </label>
                  <div className="border-2 border-dashed border-neutral-silver/30 rounded-xl p-6 text-center hover:border-primary/50 transition-colors duration-200">
                    <CloudArrowUpIcon className="w-8 h-8 text-neutral-silver mx-auto mb-2" />
                    <p className="text-sm text-neutral-silver mb-2">
                      {formData.portfolio ? formData.portfolio.name : 'Upload portfolio'}
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.zip"
                      onChange={(e) => handleInputChange('portfolio', e.target.files?.[0] || null)}
                      className="hidden"
                      id="portfolio-upload"
                    />
                    <label
                      htmlFor="portfolio-upload"
                      className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-primary/30 transition-colors duration-200"
                    >
                      Choose File
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-white mb-2">
                    Teaching Demo (Optional)
                  </label>
                  <div className="border-2 border-dashed border-neutral-silver/30 rounded-xl p-6 text-center hover:border-primary/50 transition-colors duration-200">
                    <CloudArrowUpIcon className="w-8 h-8 text-neutral-silver mx-auto mb-2" />
                    <p className="text-sm text-neutral-silver mb-2">
                      {formData.teachingDemo ? formData.teachingDemo.name : 'Upload demo video'}
                    </p>
                    <input
                      type="file"
                      accept=".mp4,.mov,.avi"
                      onChange={(e) => handleInputChange('teachingDemo', e.target.files?.[0] || null)}
                      className="hidden"
                      id="demo-upload"
                    />
                    <label
                      htmlFor="demo-upload"
                      className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-primary/30 transition-colors duration-200"
                    >
                      Choose File
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-white mb-2">
                  Professional References
                </label>
                <textarea
                  value={formData.references}
                  onChange={(e) => handleInputChange('references', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-neutral-slate/50 border border-neutral-silver/20 rounded-xl text-neutral-white placeholder-neutral-silver/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 resize-none"
                  placeholder="Please provide 2-3 professional references with their name, title, company, and contact information..."
                />
              </div>

              <div className="bg-neutral-slate/30 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <InformationCircleIcon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-neutral-white mb-2">Application Review Process</h4>
                    <ul className="text-sm text-neutral-silver space-y-1">
                      <li>• Applications are reviewed within 3-5 business days</li>
                      <li>• You'll receive an email confirmation upon submission</li>
                      <li>• Selected candidates will be contacted for a teaching demonstration</li>
                      <li>• Final certification decisions are made within 1-2 weeks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen">
        <Header />
        
        <section className="pt-20 lg:pt-32 pb-16 bg-gradient-to-br from-neutral-navy via-neutral-slate to-neutral-navy">
          <div className="container-responsive">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="w-12 h-12 text-white" />
              </div>
              
              <h1 className="responsive-text-4xl font-display font-bold text-neutral-white mb-6">
                Application Submitted Successfully!
              </h1>
              
              <p className="responsive-text-lg text-neutral-silver mb-8">
                Thank you for your interest in becoming a Nexcredis instructor. We've received your application 
                and will review it within 3-5 business days. You'll receive an email confirmation shortly.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={() => window.location.href = '/'}
                  className="btn-primary"
                >
                  Return to Homepage
                </button>
                <button 
                  onClick={() => window.location.href = '/instructors'}
                  className="btn-secondary"
                >
                  Meet Our Instructors
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

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
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="responsive-text-4xl font-display font-bold text-neutral-white mb-6">
              Instructor <span className="gradient-text">Application</span>
            </h1>
            <p className="responsive-text-lg text-neutral-silver mb-8">
              Join our community of blockchain-verified educators and share your Web3 expertise with learners worldwide.
            </p>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-silver">Step {currentStep} of {totalSteps}</span>
                <span className="text-sm text-neutral-silver">{Math.round((currentStep / totalSteps) * 100)}%</span>
              </div>
              <div className="w-full bg-neutral-slate/50 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary to-hedera h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-morphism rounded-2xl p-8 lg:p-12"
            >
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-neutral-silver/20">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    currentStep === 1
                      ? 'bg-neutral-slate/30 text-neutral-silver/50 cursor-not-allowed'
                      : 'bg-neutral-slate/50 text-neutral-white hover:bg-neutral-slate/70'
                  }`}
                >
                  Previous
                </button>

                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        i + 1 <= currentStep ? 'bg-primary' : 'bg-neutral-silver/30'
                      }`}
                    />
                  ))}
                </div>

                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    className="btn-primary px-6 py-3"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                )}
              </div>
            </motion.div>

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-3"
              >
                <ExclamationTriangleIcon className="w-6 h-6 text-red-400 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-400">Submission Failed</h4>
                  <p className="text-red-300 text-sm">There was an error submitting your application. Please try again.</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

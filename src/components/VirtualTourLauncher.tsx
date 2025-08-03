'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Play, VolumeX, ArrowRight, Zap, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { VirtualTour } from './VirtualTour'

interface VirtualTourLauncherProps {
  variant?: 'card' | 'button' | 'hero' | 'inline'
  unitType?: string
  className?: string
}

// Real VR tour links for each unit type
const VR_LINKS = {
  'type-a1': 'https://avisualiser.my/VR/Chin_Hin/Aricia/Type_A1_Bare/index.html',
  'type-b1': 'https://avisualiser.my/VR/Chin_Hin/Aricia/Type_B1_Bare/index.html',
  'type-c1': 'https://avisualiser.my/VR/Chin_Hin/Aricia/Type_C1_Bare/index.html',
  'type-d1': 'https://avisualiser.my/VR/Chin_Hin/Aricia/Type_D1_Bare/index.html',
  'default': 'https://avisualiser.my/VR/Chin_Hin/Aricia/Type_D1_Bare/index.html' // Default to Type D1
}

const UNIT_NAMES = {
  'type-a1': 'Type A1 (500 sq ft)',
  'type-b1': 'Type B1 (757 sq ft)',
  'type-c1': 'Type C1 (872 sq ft)',
  'type-d1': 'Type D1 (1410 sq ft)',
  'default': 'Aricia Residences VR Tour'
}

export function VirtualTourLauncher({
  variant = 'card',
  unitType,
  className = ''
}: VirtualTourLauncherProps) {
  const [isTourOpen, setIsTourOpen] = useState(false)

  const handleLaunchTour = () => {
    // Get the VR link for the specific unit type, or use default
    const vrLink = VR_LINKS[unitType as keyof typeof VR_LINKS] || VR_LINKS.default

    // Open VR tour in new window
    window.open(vrLink, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes')
  }

  const getUnitName = () => {
    return UNIT_NAMES[unitType as keyof typeof UNIT_NAMES] || UNIT_NAMES.default
  }

  if (variant === 'button') {
    return (
      <Button
        onClick={handleLaunchTour}
        className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      >
        <Eye className="w-4 h-4 mr-2" />
        Virtual Tour
        <ExternalLink className="w-3 h-3 ml-1" />
      </Button>
    )
  }

  if (variant === 'inline') {
    return (
      <motion.button
        onClick={handleLaunchTour}
        className={`inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 ${className}`}
        whileHover={{ x: 5 }}
      >
        <Eye className="w-4 h-4" />
        <span>Take Virtual Tour</span>
        <ArrowRight className="w-4 h-4" />
        <ExternalLink className="w-3 h-3" />
      </motion.button>
    )
  }

  if (variant === 'hero') {
    return (
      <motion.div
        className={`relative ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-sm border-purple-200/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(147, 51, 234, 0.4)',
                        '0 0 0 20px rgba(147, 51, 234, 0)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Eye className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Experience Virtual Reality Tours</h3>
                  <p className="text-white/70">Explore every corner of Aricia Residences in immersive 360°</p>
                </div>
              </div>
              <Button
                onClick={handleLaunchTour}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Tour
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Default 'card' variant
  return (
    <motion.div
      className={className}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
            onClick={handleLaunchTour}>
        <div className="relative">
          {/* Background Image */}
          <div
            className="h-48 bg-cover bg-center relative"
            style={{
              backgroundImage: 'url(https://ext.same-assets.com/1309498411/3217043441.jpeg)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" />
              </motion.div>
            </div>

            {/* VR Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              360° VR
            </div>

            {/* Unit Type Badge */}
            {unitType && (
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {getUnitName()}
              </div>
            )}
          </div>

          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {unitType ? `${getUnitName()} VR Tour` : 'Virtual Property Tour'}
                </h3>
                <p className="text-gray-600 mb-4">
                  Experience a fully immersive 360° virtual reality tour. Walk through the actual space,
                  explore every room, and get a true sense of the property layout and finishes.
                </p>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    Full 360° VR
                  </div>
                  <div className="flex items-center">
                    <VolumeX className="w-4 h-4 mr-1" />
                    Interactive Navigation
                  </div>
                  <div className="flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Professional VR
                  </div>
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              onClick={(e) => {
                e.stopPropagation()
                handleLaunchTour()
              }}
            >
              <Play className="w-4 h-4 mr-2" />
              Launch VR Experience
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}

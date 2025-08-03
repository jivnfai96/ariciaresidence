'use client'

import { motion } from 'framer-motion'
import { Home, Bed, Bath, Car, Eye, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// VR tour links and unit data
const VR_UNITS = [
  {
    id: 'type-a',
    name: 'Type A',
    size: '550 sq ft',
      bedrooms: '1 + 1', // ← 改成字符串
    bathrooms: 1,
    carparks: 1,
    description: 'Compact and efficient studio unit',
    vrLink: 'https://avisualiser.my/VR/Chin_Hin/Aricia/Type_A1_Bare/index.html',
    price: 'Starting from RM 3xxk',
    features: ['Studio Layout', 'Built-in Wardrobe', 'Modern Kitchen']
  },
  {
    id: 'type-b',
    name: 'Type B',
    size: '757 sq ft',
  bedrooms: '2 + 1', // ← 改成字符串
    bathrooms: 2,
    carparks: 2,
    description: 'Well-designed 2-bedroom unit',
    vrLink: 'https://avisualiser.my/VR/Chin_Hin/Aricia/Type_B1_Bare/index.html',
    price: 'Starting from RM 4xxk',
    features: ['Spacious Layout', 'Master Ensuite', 'Balcony View']
  },
  {
    id: 'type-c1',
    name: 'Type C1',
    size: '872 sq ft',
      bedrooms: '3 + 1', // ← 改成字符串
    bathrooms: 2,
    carparks: 2,
    description: 'Family-friendly 3-bedroom unit',
    vrLink: 'https://avisualiser.my/VR/Chin_Hin/Aricia/Type_C1_Bare/index.html',
    price: 'Starting from RM 5xxk',
    features: ['Family Layout', 'Dining Area', 'Storage Space']
  },
  {
    id: 'type-d1',
    name: 'Type D1 - Sky Duplex',
    size: '1410 sq ft',
    bedrooms: '3 + 1', // ← 改成字符串
    bathrooms: 3,
    carparks: 2,
    description: 'Luxurious duplex with 19ft ceiling',
    vrLink: 'https://avisualiser.my/VR/Chin_Hin/Aricia/Type_D1_Bare/index.html',
    price: 'Starting from RM 9xxk',
    features: ['Duplex Design', '19ft High Ceiling', 'Premium Finishes']
  }
]

interface VRUnitSelectorProps {
  className?: string
}

export function VRUnitSelector({ className = '' }: VRUnitSelectorProps) {
  const handleLaunchVR = (vrLink: string, unitName: string) => {
    window.open(vrLink, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes')
  }

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🏠 Choose Your VR Experience
        </motion.h2>
        <motion.p
          className="text-gray-600 text-lg max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore different unit types in immersive 360° virtual reality. Click on any unit below to launch the VR experience.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {VR_UNITS.map((unit, index) => (
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2">
              <div className="relative">
                {/* Unit Type Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{unit.name}</h3>
                      <p className="text-blue-100 text-sm">{unit.size}</p>
                    </div>
                    <div className="bg-white/20 rounded-full p-2">
                      <Home className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* VR Badge */}
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  360° VR
                </div>
              </div>

              <CardContent className="p-4">
                {/* Unit Details */}
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">{unit.description}</p>

                  <div className="text-orange-600 font-bold text-lg">{unit.price}</div>

                  {/* Specs */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {unit.bedrooms}
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {unit.bathrooms}
                    </div>
                    <div className="flex items-center">
                      <Car className="w-4 h-4 mr-1" />
                      {unit.carparks}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-1">
                    {unit.features.map((feature, idx) => (
                      <div key={idx} className="text-xs text-gray-500 flex items-center">
                        <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* VR Launch Button */}
                <Button
                  onClick={() => handleLaunchVR(unit.vrLink, unit.name)}
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white group-hover:scale-105 transition-transform"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Launch VR Tour
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mt-8">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">🎯 VR Experience Tips</h3>
          <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Navigate with mouse or touch</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Full 360° room exploration</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Works on all devices</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

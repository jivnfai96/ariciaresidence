'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MapPin, Home, Bed, Bath, Car } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { VirtualTourViewer } from './VirtualTourViewer'

interface Room {
  id: string
  name: string
  image360: string
  hotspots: Hotspot[]
  description?: string
}

interface Hotspot {
  id: string
  x: number
  y: number
  title: string
  description?: string
  targetRoom?: string
  type: 'navigation' | 'info' | 'feature'
}

interface UnitType {
  id: string
  name: string
  size: string
  bedrooms: number
  bathrooms: number
  carparks: number
  description: string
  rooms: Room[]
  floorPlan: string
}

// Sample 360° tour data (using placeholder images)
const sampleUnitTypes: UnitType[] = [
  {
    id: 'type-d1',
    name: 'Type D1 - Sky Duplex',
    size: '1410 sq ft',
    bedrooms: 4,
    bathrooms: 3,
    carparks: 3,
    description: 'Luxurious duplex unit with 19ft ceiling height and premium finishes',
    floorPlan: 'https://ext.same-assets.com/1309498411/513584967.png',
    rooms: [
      {
        id: 'living-room',
        name: 'Living Room',
        image360: 'https://ext.same-assets.com/1309498411/3217043441.jpeg',
        description: 'Spacious living area with double-height ceiling',
        hotspots: [
          {
            id: 'to-kitchen',
            x: 75,
            y: 60,
            title: 'Kitchen',
            description: 'Navigate to the modern kitchen area',
            targetRoom: 'kitchen',
            type: 'navigation'
          },
          {
            id: 'ceiling-feature',
            x: 50,
            y: 20,
            title: '19ft High Ceiling',
            description: 'Experience the dramatic double-height ceiling design',
            type: 'feature'
          }
        ]
      },
      {
        id: 'kitchen',
        name: 'Kitchen',
        image360: 'https://ext.same-assets.com/1309498411/1081756502.jpeg',
        description: 'Modern kitchen with premium appliances and island',
        hotspots: [
          {
            id: 'to-living',
            x: 25,
            y: 60,
            title: 'Living Room',
            description: 'Return to the living area',
            targetRoom: 'living-room',
            type: 'navigation'
          },
          {
            id: 'kitchen-island',
            x: 60,
            y: 70,
            title: 'Kitchen Island',
            description: 'Premium marble countertop with built-in appliances',
            type: 'feature'
          }
        ]
      },
      {
        id: 'master-bedroom',
        name: 'Master Bedroom',
        image360: 'https://ext.same-assets.com/1309498411/1135231228.jpeg',
        description: 'Luxurious master bedroom with ensuite bathroom',
        hotspots: [
          {
            id: 'to-living',
            x: 10,
            y: 60,
            title: 'Living Room',
            description: 'Go to living area',
            targetRoom: 'living-room',
            type: 'navigation'
          },
          {
            id: 'walk-in-closet',
            x: 80,
            y: 50,
            title: 'Walk-in Closet',
            description: 'Spacious walk-in wardrobe with custom storage',
            type: 'feature'
          }
        ]
      }
    ]
  },
  {
    id: 'type-b1',
    name: 'Type B1 Standard',
    size: '757 sq ft',
    bedrooms: 2,
    bathrooms: 2,
    carparks: 1,
    description: 'Well-designed standard unit with efficient layout',
    floorPlan: 'https://ext.same-assets.com/1309498411/1143982279.png',
    rooms: [
      {
        id: 'living-area',
        name: 'Living Area',
        image360: 'https://ext.same-assets.com/1309498411/1723004660.jpeg',
        description: 'Open concept living and dining area',
        hotspots: [
          {
            id: 'balcony-view',
            x: 85,
            y: 40,
            title: 'City View',
            description: 'Enjoy the stunning Kuala Lumpur city skyline',
            type: 'feature'
          }
        ]
      }
    ]
  }
]

interface VirtualTourProps {
  isOpen: boolean
  onClose: () => void
  initialUnitType?: string
}

export function VirtualTour({ isOpen, onClose, initialUnitType }: VirtualTourProps) {
  const [selectedUnit, setSelectedUnit] = useState<UnitType>(
    sampleUnitTypes.find(unit => unit.id === initialUnitType) || sampleUnitTypes[0]
  )
  const [currentRoom, setCurrentRoom] = useState<Room>(selectedUnit.rooms[0])
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleHotspotClick = (hotspot: Hotspot) => {
    if (hotspot.targetRoom) {
      const targetRoom = selectedUnit.rooms.find(room => room.id === hotspot.targetRoom)
      if (targetRoom) {
        setCurrentRoom(targetRoom)
      }
    }
  }

  const handleUnitChange = (unit: UnitType) => {
    setSelectedUnit(unit)
    setCurrentRoom(unit.rooms[0])
  }

  const nextRoom = () => {
    const currentIndex = selectedUnit.rooms.findIndex(room => room.id === currentRoom.id)
    const nextIndex = (currentIndex + 1) % selectedUnit.rooms.length
    setCurrentRoom(selectedUnit.rooms[nextIndex])
  }

  const prevRoom = () => {
    const currentIndex = selectedUnit.rooms.findIndex(room => room.id === currentRoom.id)
    const prevIndex = currentIndex === 0 ? selectedUnit.rooms.length - 1 : currentIndex - 1
    setCurrentRoom(selectedUnit.rooms[prevIndex])
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto"
        >
          <div className="min-h-screen p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 text-white">
              <div>
                <h2 className="text-3xl font-bold">Virtual Property Tour</h2>
                <p className="text-white/70">Explore Aricia Residences from anywhere</p>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/20"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Unit Selection */}
            <div className="mb-6">
              <h3 className="text-white text-lg font-semibold mb-3">Choose Unit Type</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {sampleUnitTypes.map((unit) => (
                  <Card
                    key={unit.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedUnit.id === unit.id
                        ? 'ring-2 ring-orange-400 bg-orange-50'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleUnitChange(unit)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-lg">{unit.name}</h4>
                          <p className="text-gray-600 text-sm mb-2">{unit.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {unit.size}
                            </div>
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
                        </div>
                        <img
                          src={unit.floorPlan}
                          alt={`${unit.name} floor plan`}
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Current Room Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{currentRoom.name}</h3>
                  <p className="text-white/70">{currentRoom.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={prevRoom}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    disabled={selectedUnit.rooms.length <= 1}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={nextRoom}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                    disabled={selectedUnit.rooms.length <= 1}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Room Navigation */}
              <div className="flex space-x-2 mt-3">
                {selectedUnit.rooms.map((room) => (
                  <Button
                    key={room.id}
                    onClick={() => setCurrentRoom(room)}
                    variant={currentRoom.id === room.id ? "default" : "ghost"}
                    size="sm"
                    className={
                      currentRoom.id === room.id
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "text-white hover:bg-white/20"
                    }
                  >
                    <Home className="w-4 h-4 mr-1" />
                    {room.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* 360° Viewer */}
            <div className="bg-white rounded-lg p-2">
              <VirtualTourViewer
                imageUrl={currentRoom.image360}
                hotspots={currentRoom.hotspots}
                onHotspotClick={handleHotspotClick}
                isFullscreen={isFullscreen}
                onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
              />
            </div>

            {/* Tour Tips */}
            <div className="mt-6 bg-blue-600/20 border border-blue-400/30 rounded-lg p-4 text-white">
              <h4 className="font-semibold mb-2">🎯 Tour Tips:</h4>
              <ul className="text-sm space-y-1 text-white/80">
                <li>• Drag to look around in 360°</li>
                <li>• Click on hotspots to navigate between rooms or get information</li>
                <li>• Use room buttons above to jump to specific areas</li>
                <li>• Toggle fullscreen for immersive experience</li>
                <li>• Try different unit types to compare layouts</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCw, Move, Maximize, Minimize, Home, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VirtualTourViewerProps {
  imageUrl: string
  hotspots?: Hotspot[]
  onHotspotClick?: (hotspot: Hotspot) => void
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
}

interface Hotspot {
  id: string
  x: number // 0-100 (percentage)
  y: number // 0-100 (percentage)
  title: string
  description?: string
  targetRoom?: string
  type: 'navigation' | 'info' | 'feature'
}

export function VirtualTourViewer({
  imageUrl,
  hotspots = [],
  onHotspotClick,
  isFullscreen = false,
  onToggleFullscreen
}: VirtualTourViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 })
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null)

  // Auto rotation effect
  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        y: (prev.y + 0.2) % 360
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [isAutoRotating])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setIsAutoRotating(false)
    setLastMouse({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - lastMouse.x
    const deltaY = e.clientY - lastMouse.y

    setRotation(prev => ({
      x: Math.max(-80, Math.min(80, prev.x - deltaY * 0.5)),
      y: (prev.y + deltaX * 0.5) % 360
    }))

    setLastMouse({ x: e.clientX, y: e.clientY })
  }, [isDragging, lastMouse])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Touch events for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    setIsDragging(true)
    setIsAutoRotating(false)
    setLastMouse({ x: touch.clientX, y: touch.clientY })
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()

    const touch = e.touches[0]
    const deltaX = touch.clientX - lastMouse.x
    const deltaY = touch.clientY - lastMouse.y

    setRotation(prev => ({
      x: Math.max(-80, Math.min(80, prev.x - deltaY * 0.5)),
      y: (prev.y + deltaX * 0.5) % 360
    }))

    setLastMouse({ x: touch.clientX, y: touch.clientY })
  }, [isDragging, lastMouse])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  const resetView = () => {
    setRotation({ x: 0, y: 0 })
    setIsAutoRotating(true)
  }

  const toggleAutoRotation = () => {
    setIsAutoRotating(!isAutoRotating)
  }

  const handleHotspotClick = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot)
    onHotspotClick?.(hotspot)
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-black rounded-lg ${
        isFullscreen ? 'fixed inset-0 z-50' : 'aspect-video'
      }`}
    >
      {/* 360° Image Container */}
      <div
        ref={imageRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Hotspots */}
        {hotspots.map((hotspot) => (
          <motion.div
            key={hotspot.id}
            className="absolute"
            style={{
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <motion.button
              className={`
                w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center
                ${hotspot.type === 'navigation' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                ${hotspot.type === 'info' ? 'bg-green-500 hover:bg-green-600' : ''}
                ${hotspot.type === 'feature' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                transition-all duration-300 hover:scale-110
              `}
              onClick={() => handleHotspotClick(hotspot)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {hotspot.type === 'navigation' && <Move className="w-4 h-4 text-white" />}
              {hotspot.type === 'info' && <Eye className="w-4 h-4 text-white" />}
              {hotspot.type === 'feature' && <Home className="w-4 h-4 text-white" />}
            </motion.button>

            {/* Hotspot pulse animation */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 flex space-x-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={resetView}
          className="bg-black/70 hover:bg-black/90 text-white border-white/20"
        >
          <Home className="w-4 h-4 mr-1" />
          Reset
        </Button>

        <Button
          size="sm"
          variant="secondary"
          onClick={toggleAutoRotation}
          className="bg-black/70 hover:bg-black/90 text-white border-white/20"
        >
          <RotateCw className={`w-4 h-4 mr-1 ${isAutoRotating ? 'animate-spin' : ''}`} />
          Auto
        </Button>
      </div>

      {/* Fullscreen Toggle */}
      {onToggleFullscreen && (
        <div className="absolute bottom-4 right-4">
          <Button
            size="sm"
            variant="secondary"
            onClick={onToggleFullscreen}
            className="bg-black/70 hover:bg-black/90 text-white border-white/20"
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4" />
            ) : (
              <Maximize className="w-4 h-4" />
            )}
          </Button>
        </div>
      )}

      {/* Hotspot Info Panel */}
      <AnimatePresence>
        {selectedHotspot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-4 left-4 right-4 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{selectedHotspot.title}</h3>
                {selectedHotspot.description && (
                  <p className="text-sm opacity-90 mt-1">{selectedHotspot.description}</p>
                )}
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedHotspot(null)}
                className="text-white hover:bg-white/20 p-1"
              >
                ✕
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="absolute top-4 right-4 bg-black/70 text-white text-xs p-2 rounded">
        Drag to explore • Click hotspots for details
      </div>
    </div>
  )
}

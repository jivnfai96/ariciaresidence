'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ZoomIn, Image as ImageIcon, Lock } from 'lucide-react'
import { Lightbox } from './Lightbox'

interface ImageGalleryProps {
  images: string[]
  labels?: string[]
  title?: string
  className?: string
  gridCols?: number
}

export function ImageGallery({ images, labels = [], title, className = '', gridCols = 3 }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const gridClassName = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={className}>
      {title && (
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
          {title.toLowerCase().includes('smart lock') ? (
            <Lock className="w-6 h-6 mr-2 text-orange-400" />
          ) : (
            <ImageIcon className="w-6 h-6 mr-2 text-orange-400" />
          )}
          {title}
        </h3>
      )}

      <div className={`grid ${gridClassName[gridCols as keyof typeof gridClassName]} gap-6 px-4 md:px-16 lg:px-24`}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl bg-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openLightbox(index)}
          >
            <div className="relative w-full flex items-center justify-center bg-gray-50">
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full max-h-[700px] object-contain transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-3">
                    <ZoomIn className="w-6 h-6 text-gray-800" />
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Label */}
            {labels[index] && (
              <div className="mt-2 text-center text-base font-semibold text-gray-800">
                {labels[index]}
              </div>
            )}

            {/* Image Counter */}
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {index + 1}/{images.length}
            </div>
          </motion.div>
        ))}
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={images[currentIndex]}
              alt="Full Image"
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ✕
            </button>
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImageGallery } from "@/components/ImageGallery"
import { AnimatedSection, StaggeredContainer, StaggeredItem } from "@/components/AnimatedSection"
import { ParallaxSection, ParallaxImage } from "@/components/ParallaxSection"
import { WhatsAppForm } from "@/components/WhatsAppForm"
import { VirtualTourLauncher } from "@/components/VirtualTourLauncher"
import { VRUnitSelector } from "@/components/VRUnitSelector"
import { motion } from "framer-motion"
import { Toaster } from 'react-hot-toast'

export default function Home() {
  // Property interior images
  const interiorImages = [
    "/images/facilities/facility1.png",
    "/images/facilities/facility2.png",
    "/images/facilities/facility3.png",
    "/images/facilities/facility4.png",
    "/images/facilities/facility5.png",
    "/images/facilities/facility6.png"
  ]

   // Floor plan images (✅ updated to 5 images)
  const floorPlanImages = [
    "/images/floorplans/Type_A.png",
    "/images/floorplans/Type_B.png",
    "/images/floorplans/Type_C.png",
    "/images/floorplans/Type_D1.png",
    "/images/floorplans/Type_D2.png"
  ]

  // Facility images
  const facilityImages = [
    "/images/facilities/Facility_plan.png",
   
  ]

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />

      {/* Navigation Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://ext.same-assets.com/1309498411/3055916577.png"
              alt="Aricia Residences"
              className="h-12"
            />
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-white">
            <a href="#home" className="hover:text-orange-400 transition-colors">Home</a>
            <a href="#virtual-tour" className="hover:text-orange-400 transition-colors">Virtual Tour</a>
            <a href="#project-info" className="hover:text-orange-400 transition-colors">Project Info</a>
            <a href="#floor-plan" className="hover:text-orange-400 transition-colors">Floor Plan</a>
            <a href="#facilities" className="hover:text-orange-400 transition-colors">Facilities</a>
            <a href="#location" className="hover:text-orange-400 transition-colors">Location</a>
          </nav>
          <Button
            className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-md font-medium transition-all duration-300 hover:shadow-lg"
          >
            REGISTER NOW
          </Button>
        </div>
      </motion.header>

      {/* Hero Section with Parallax */}
      <section id="home" className="relative h-screen bg-black overflow-hidden">
        <ParallaxImage
          src="/images/exterior/hero-background.jpg"
          alt="Aricia Residences Building"
          className="absolute inset-0"
          speed={0.5}
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Floating WhatsApp Button */}
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl">
            <img
              src="https://ext.same-assets.com/1309498411/1012979764.svg"
              alt="WhatsApp"
              className="w-8 h-8"
            />
          </Button>
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            className="max-w-2xl text-white"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.p
              className="text-sm font-medium mb-4 tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              ARICIA RESIDENCES
            </motion.p>
            <motion.h1
              className="hero-title font-bold mb-6 leading-tight text-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              TRANSFORM<br />
              YOUR LIFE AT ARICIA
            </motion.h1>
            <motion.p
              className="text-xl mb-8 opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              Where Nature Inspires Exquisite Living
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-3 text-lg hover:shadow-xl"
              >
                ▶ Request For Viewing
              </Button>
              <VirtualTourLauncher variant="button" className="px-8 py-3 text-lg" />
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Virtual Tour CTA */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <VirtualTourLauncher variant="hero" />
        </motion.div>
      </section>

      {/* Project Background Section */}
      <AnimatedSection className="py-20 bg-gradient-to-b from-stone-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-4xl font-bold text-gray-800 mb-8">
                PROJECT<br />
                <span className="text-orange-400">BACKGROUND</span>
              </h2>
              <div className="prose prose-lg text-gray-600 mb-8">
                <p className="mb-6">
                  <span className="font-semibold text-orange-400">A</span>ricia Freehold Residences Sungai Besi
                  Nestled within 4km of Kuala Lumpur's vibrant heart, Aricia is
                  an exquisite high-rise property inspired by the
                  delicate beauty of butterflies.
                </p>
                <p>
                  Designed for new future and ideal home for next
                  generation. Aricia embodies the perfect blend of
                  convenience and sophistication. Its strategic location makes
                  it a desirable residence offers combines elegance with
                  convenience and connectivity.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-md transition-all duration-300 hover:shadow-lg">
                  🏠 Get Latest Promo
                </Button>
                <VirtualTourLauncher variant="inline" className="py-3" />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.3}>
              <div className="relative">
                <img
                  src="/images/exterior/building-exterior.jpg"
                  alt="Aricia Building"
                  className="w-full rounded-lg shadow-2xl hover-scale"
                />
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                  Artist's Impression
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>
{/* Location Map Section */}
<AnimatedSection id="location" className="py-20 bg-gradient-to-b from-white to-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <h3 className="text-4xl font-bold text-gray-800 mb-4">Prime Location</h3>
      <p className="text-gray-600 text-lg">
        Aricia Residences sits at the heart of connectivity — enjoy the convenience of MRT, LRT, TRX & KLCC just minutes away.
      </p>
    </div>
    <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
      <img
        src="/images/location map/site_view.png"
        alt="Location Map"
        className="w-full object-cover"
      />
    </div>
  </div>
</AnimatedSection>
      {/* VR Unit Selector Section */}
      <AnimatedSection id="virtual-tour" className="py-20 bg-gradient-to-r from-gray-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <VRUnitSelector />
        </div>
      </AnimatedSection>
{/* Facilities Gallery */}
      <AnimatedSection id="facilities" className="py-20 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <ImageGallery
            images={facilityImages}
             labels={["Level 8 & 9 Facilities Plan"]}
            title="Facilities Plan"
            gridCols={3}
            className="mb-12"
          />
        </div>
      </AnimatedSection>
      {/* Property Interior Gallery */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ImageGallery
            images={interiorImages}
            title="Facilities Photo"
            gridCols={3}
            className="mb-12"
          />
        </div>
      </AnimatedSection>

      {/* Project Info Section */}
      <AnimatedSection id="project-info" className="py-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-8">Project Info</h3>
              <StaggeredContainer className="space-y-4">
                {[
                  { label: "Project Name", value: "Aricia Residences" },
                  { label: "Developer", value: "Aricia Sdn Bhd" },
                  { label: "Development", value: "Serviced Apartment" },
                  { label: "Location", value: "Jalan Sungai Besi, Chan Sow Lin, 57100, KL" },
                  { label: "Land Tenure", value: "Estimated 2028-2029" },
                  { label: "Authority", value: "Dewan Bandaraya Kuala Lumpur (DBKL)" }
                ].map((item, index) => (
                  <StaggeredItem key={index}>
                    <div className="grid grid-cols-2 py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-600">{item.label}</span>
                      <span className="text-gray-800">{item.value}</span>
                    </div>
                  </StaggeredItem>
                ))}
                <StaggeredItem>
                  <div className="grid grid-cols-2 py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-600">Total Unit</span>
                    <div className="text-gray-800">
                      <div>787 Units</div>
                    </div>
                  </div>
                </StaggeredItem>
                <StaggeredItem>
                  <div className="grid grid-cols-2 py-3">
                    <span className="font-medium text-gray-600">Component</span>
                    <div className="text-gray-800 space-y-1">
                      <div>Type A - 550 sqft.</div>
                      <div>Type B - 757 sqft.</div>
                      <div>Type C - 872 sqft.</div>
                      <div>Type D1 - 1410 sqft.</div>
                      <div>Type D2 - 1420 sqft.</div>
                    </div>
                  </div>
                </StaggeredItem>
              </StaggeredContainer>
            </div>

            {/* Animated Stats Cards */}
            <div className="flex flex-col justify-center space-y-8">
              <AnimatedSection delay={0.3}>
                <Card className="text-center py-12 bg-gradient-to-r from-orange-50 to-orange-100 hover-scale">
                  <CardContent>
                    <motion.div
                      className="text-6xl font-bold text-orange-400 mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                    >
                      787
                    </motion.div>
                    <div className="text-gray-600 font-medium">TOTAL UNITS</div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.5}>
                <Card className="text-center py-12 bg-gradient-to-r from-blue-50 to-blue-100 hover-scale">
                  <CardContent>
                    <motion.div
                      className="text-6xl font-bold text-blue-400 mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 100, delay: 0.7 }}
                    >
                      1,420
                    </motion.div>
                    <div className="text-gray-600 font-medium">UP TO SQ.FT.</div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Site Plan Section with Parallax */}
      <ParallaxSection className="py-20 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">Site Plan</h3>
            <div className="relative max-w-4xl mx-auto">
              <img
                src="/images/logo/siteplan2.png"
                alt="Site Plan"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          </AnimatedSection>
        </div>
      </ParallaxSection>

      {/* Features Grid with Staggered Animation */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <StaggeredContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "🏢", title: "Freehold Residence", image: "/images/logo/freehold.png" },
              { icon: "📍", title: "Strategic Location", image: "/images/logo/location.png" },
              { icon: "🏠", title: "Smart Home System", image: "/images/logo/smarthome.png" },
              { icon: "🏢", title: "Duplex Living (1,410 sqft)", image: "/images/logo/duplex.png" },
              { icon: "🍳", title: "Kitchen Fitted By", subtitle: "SIGNATURE", image: "/images/logo/kitchen.png" },
              { icon: "👨‍👩‍👧‍👦", title: "Family-Friendly Residences", image: "/images/logo/family_friend.png" },
              { icon: "🐕", title: "Pet Friendly Facilities", image: "/images/logo/pets.png" },
              { icon: "🌱", title: "GreenRE Certified Building", image: "/images/logo/green_re.png" }
            ].map((feature, index) => (
              <StaggeredItem key={index}>
                <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 hover-scale group">
                  <CardContent>
                    <motion.img
                      src={feature.image}
                      alt={feature.title}
                      className="w-16 h-16 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    />
                    <h4 className="font-bold text-gray-800 mb-2">{feature.title}</h4>
                    {feature.subtitle && (
                      <p className="text-orange-400 font-semibold">{feature.subtitle}</p>
                    )}
                  </CardContent>
                </Card>
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </AnimatedSection>

      {/* Floor Plans Gallery with Virtual Tour Integration */}
      <AnimatedSection id="floor-plan" className="py-20 bg-gradient-to-b from-stone-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              FUNCTIONAL LAYOUT
            </h3>
            <p className="text-gray-600 text-lg">
              Explore our thoughtfully designed floor plans, or take a virtual tour to experience the spaces in 360°
            </p>
            <div className="mt-6">
              <VirtualTourLauncher variant="button" />
            </div>
          </div>

          <ImageGallery
            images={floorPlanImages}
              labels={["Type A - 550 sqft", "Type B - 757 sqft", "Type C - 872 sqft", "Type D1 - 1410 sqft", "Type D2 - 1420 sqft"]}
            title="Floor Plans"
            gridCols={3}
            className="mb-12"
          />
        </div>
      </AnimatedSection>

      {/* First Sky Duplex Section */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h3 className="text-4xl font-bold text-gray-800 mb-4">
                FIRST SKY <span className="text-blue-400">DUPLEX</span>
              </h3>
              <h4 className="text-xl font-semibold text-gray-600 mb-4">With 19ft Ceiling Height</h4>
              <p className="text-lg text-gray-700 mb-4">3 + 1 Bedrooms at Jalan Sungai Besi</p>
              <p className="text-lg text-gray-700 mb-6">2 Carparks</p>

              <div className="mb-8">
                <VirtualTourLauncher variant="inline" unitType="type-d1" className="text-lg" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <StaggeredContainer staggerDelay={0.2}>
                  <StaggeredItem>
                    <Card className="p-4 hover:shadow-lg transition-all duration-300">
                      <CardContent>
                        <img
                          src="https://ext.same-assets.com/1309498411/513584967.png"
                          alt="Type D1 Floor Plan"
                          className="w-full mb-4"
                        />
                        <h5 className="font-bold text-center">Type D1 1410 sqft</h5>
                        <p className="text-center text-sm text-gray-600">3+1 Bedrooms 3 Bathrooms</p>
                        <p className="text-center text-sm text-gray-600">Carparks: 2</p>
                      </CardContent>
                    </Card>
                  </StaggeredItem>

                  <StaggeredItem>
                    <Card className="p-4 hover:shadow-lg transition-all duration-300">
                      <CardContent>
                        <img
                          src="https://ext.same-assets.com/1309498411/3188681857.png"
                          alt="Type D2 Floor Plan"
                          className="w-full mb-4"
                        />
                        <h5 className="font-bold text-center">Type D2 1420 sqft</h5>
                        <p className="text-center text-sm text-gray-600">3+1 Bedrooms 3 Bathrooms</p>
                        <p className="text-center text-sm text-gray-600">Carparks : 2</p>
                      </CardContent>
                    </Card>
                  </StaggeredItem>
                </StaggeredContainer>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.3}>
              <img
                src="https://ext.same-assets.com/1309498411/3217043441.jpeg"
                alt="Duplex Interior"
                className="w-full rounded-lg shadow-xl hover-scale"
              />
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>
<AnimatedSection className="py-20 bg-gradient-to-b from-gray-50 to-white">
  <div className="container mx-auto px-4">
    <ImageGallery
      images={["/images/exterior/smartlock.png"]}
      title="Exclusive Smart Lock Features for Every Unit"
      gridCols={1}
      className="mb-12"
    />
  </div>
</AnimatedSection>


      {/* Enhanced Registration Form with WhatsApp */}
      <AnimatedSection id="register" className="py-20 bg-gradient-to-r from-orange-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <WhatsAppForm />
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <AnimatedSection>
        <footer className="bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <img
                src="https://ext.same-assets.com/1309498411/3055916577.png"
                alt="Aricia Residences"
                className="h-16 mx-auto mb-6"
              />
              <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 mb-8">
                <a href="mailto:tyestate.alexl@gmail.com" className="flex items-center space-x-2 hover:text-orange-400 transition-colors">
                  <span>📧</span>
                  <span>tyestate.alexl@gmail.com</span>
                </a>
                <a href="tel:+601113309314" className="flex items-center space-x-2 hover:text-orange-400 transition-colors">
                  <span>📞</span>
                  <span>Phone: +6011 1330 9314</span>
                </a>
              </div>
              <div className="border-t border-gray-800 pt-8">
                <p className="text-gray-400 mb-4">© 2025 www.aricia.my</p>
                <p className="text-gray-400 mb-4">All Rights Reserved.</p>
                <p className="text-xs text-gray-500 max-w-4xl mx-auto leading-relaxed">
                  The information contained in this material is subject to change and cannot form part of an offer or contract.
                  All renderings are artists impressions only. All measurements are approximate. While every reasonable care has been taken in preparing this material,
                  the site owner(s) cannot be held responsible for any inaccuracy. All the above items are subject to variations,
                  modifications and substitutions as may be required by the Authorities or recommended by the content provider.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </AnimatedSection>
    </div>
  )
}

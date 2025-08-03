'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Send, User, Mail, Phone, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'

// EmailJS configuration - Real credentials
const EMAILJS_CONFIG = {
  SERVICE_ID: 'Aricia Gmail', // Your EmailJS service ID
  TEMPLATE_ID: 'template_5a6pz3i', // Your EmailJS template ID
  PUBLIC_KEY: 'ODHk5MuwROVyYSo6p', // Your EmailJS public key
}

interface FormData {
  name: string
  email: string
  phone: string
  propertyType: string
  message: string
}

export function WhatsAppForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEmailSending, setIsEmailSending] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateWhatsAppMessage = () => {
    const message = `🏠 *Aricia Residences Inquiry*

*Personal Details:*
👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}

*Property Interest:*
🏢 Type: ${formData.propertyType}

*Message:*
${formData.message || 'I am interested about Aricia Residences.'}

---
Sent from Aricia Residences Website`

    return encodeURIComponent(message)
  }

  const handleWhatsAppSubmit = async () => {
    // Validate required fields
    if (!formData.name || !formData.phone) {
      toast.error('Please fill in your name and phone number')
      return
    }

    setIsSubmitting(true)

    try {
      // Generate WhatsApp message
      const message = generateWhatsAppMessage()
      const whatsappNumber = '+601113309314' // Aricia Residences contact number
      const whatsappURL = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`

      // Open WhatsApp
      window.open(whatsappURL, '_blank')

      // Show success message
      toast.success('Redirecting to WhatsApp...')

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        message: ''
      })
    } catch (error) {
      toast.error('Failed to open WhatsApp. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTraditionalSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsEmailSending(true)

    try {
      // Check if EmailJS is configured
      if (EMAILJS_CONFIG.SERVICE_ID === 'your_service_id' ||
          EMAILJS_CONFIG.TEMPLATE_ID === 'your_template_id' ||
          EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key') {

        // EmailJS not configured - show fallback message
        toast.success('Thank you for your inquiry! We will contact you within 24 hours via email or phone.')

        // For now, you can manually check the browser console for the form data
        console.log('📧 New Property Inquiry from Aricia Residences Website:', {
          timestamp: new Date().toISOString(),
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
          inquiry: {
            propertyType: formData.propertyType,
            message: formData.message || 'General inquiry about Aricia Residences',
          },
          source: 'Aricia Residences Website Form'
        })

      } else {
        // EmailJS is configured - send real email
        const templateParams = {
          to_email: 'tyestate.alexl@gmail.com', // Your email
          from_name: formData.name,
          from_email: formData.email,
          from_phone: formData.phone,
          property_type: formData.propertyType || 'Not specified',
          message: formData.message || 'General inquiry about Aricia Residences',
          inquiry_date: new Date().toLocaleDateString('en-MY', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }

        const result = await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        )

        if (result.status === 200) {
          toast.success('🎉 Thank you! Your inquiry has been sent successfully. We will contact you within 24 hours.')
        } else {
          throw new Error('Email sending failed')
        }
      }

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        message: ''
      })

    } catch (error) {
      console.error('Email sending error:', error)
      toast.error('Sorry, there was an issue sending your inquiry. Please try the WhatsApp option or call us directly.')
    } finally {
      setIsEmailSending(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 glass shadow-xl">
        <CardContent className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              REGISTER NOW:
            </h3>
            <p className="text-gray-600">Get instant response via WhatsApp or traditional contact</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Full Name *"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="pl-10 border-gray-300"
              />
            </div>

            {/* Phone Field */}
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Phone Number *"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="pl-10 border-gray-300"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Email Address *"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="pl-10 border-gray-300"
            />
          </div>

          {/* Property Type */}
          <div className="relative">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
            <Select onValueChange={(value) => handleInputChange('propertyType', value)}>
              <SelectTrigger className="pl-10 border-gray-300">
                <SelectValue placeholder="- Property Type -" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="type-a1">Type A - 550 sq ft</SelectItem>
                <SelectItem value="type-b1">Type B - 757 sq ft</SelectItem>
                <SelectItem value="type-c1">Type C - 872 sq ft</SelectItem>
                <SelectItem value="type-d1">Type D1/D2 - 1410/1420 sq ft (Duplex)</SelectItem>
                <SelectItem value="general">General Inquiry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message Field */}
          <Textarea
            placeholder="Additional message or questions (optional)"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className="border-gray-300 min-h-[100px]"
          />

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* WhatsApp Button */}
            <Button
              onClick={handleWhatsAppSubmit}
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600 text-white py-3 text-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{isSubmitting ? 'Opening WhatsApp...' : 'Chat on WhatsApp'}</span>
            </Button>

            {/* Email Submit */}
            <Button
              onClick={handleTraditionalSubmit}
              disabled={isEmailSending}
              className="bg-orange-400 hover:bg-orange-500 text-white py-3 text-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-lg"
            >
              <Send className="w-5 h-5" />
              <span>{isEmailSending ? 'Sending...' : 'Send Inquiry'}</span>
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>* Required fields</p>
            <p className="mt-1">WhatsApp: Instant response • Email: Response within 24 hours</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

import React, { useState } from 'react'
import { FaClipboardCheck, FaRegClipboard } from 'react-icons/fa'
import { showEmojis } from '../data/projects'
import KirbySection from './KirbySection'
import { email, phoneNumber } from './Main'

const duration = 1500

interface ContactSectionProps {
  onPhoneClick: () => void
  handleKirbyClick: () => void
  animateKirby: boolean
}

const ContactSection: React.FC<ContactSectionProps> = ({
  onPhoneClick,
  handleKirbyClick,
  animateKirby,
}) => {
  // States for visual feedback on buttons
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const copyToClipboard = async (
    text: string,
    setCopied: React.Dispatch<React.SetStateAction<boolean>>,
    toastText?: string,
  ) => {
    // Use the modern Clipboard API if available and in a secure context.
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)

        setTimeout(() => setCopied(false), duration)
      } catch (err) {
        console.error('Failed to copy using Clipboard API: ', err)
      }
    } else {
      // Fallback for insecure contexts or browsers without clipboard API support
      const textArea = document.createElement('textarea')
      textArea.value = text
      // Place the textarea off-screen
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '0'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        const successful = document.execCommand('copy')
        if (successful) {
          setCopied(true)

          setTimeout(() => setCopied(false), duration)
        } else {
          console.error('Fallback: Copy command was unsuccessful')
        }
      } catch (err) {
        console.error('Fallback: Unable to copy', err)
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center pt-12">
      <div className="mb-8 text-center">
        {showEmojis && <h1 className="mb-4 text-6xl font-bold">🤗</h1>}
        <h1 className="pixel-font text-6xl font-bold">EMAIL ME</h1>
      </div>

      {/* Phone Number with Copy Button */}
      <div className="mb-2 flex items-center space-x-2">
        <h2 onClick={onPhoneClick} className="cursor-pointer text-2xl">
          {phoneNumber}
        </h2>
        <button
          onClick={() =>
            copyToClipboard(phoneNumber, setCopiedPhone, 'Phone number copied!')
          }
          className="text-2xl focus:outline-none"
          aria-label="Copy phone number to clipboard"
        >
          {copiedPhone ? <FaClipboardCheck /> : <FaRegClipboard />}
        </button>
      </div>

      {/* Email Address with Copy Button */}
      <div className="mb-6 flex items-center space-x-2 text-2xl">
        <a href={`mailto:${email}`} className="cursor-pointer">
          {email}
        </a>
        <button
          onClick={() =>
            copyToClipboard(email, setCopiedEmail, 'Email address copied!')
          }
          className="text-2xl focus:outline-none"
          aria-label="Copy email address to clipboard"
        >
          {copiedEmail ? <FaClipboardCheck /> : <FaRegClipboard />}
        </button>
      </div>

      <KirbySection
        animateKirby={animateKirby}
        onKirbyClick={handleKirbyClick}
      />
    </div>
  )
}

export default ContactSection

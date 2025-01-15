// ContactSection.tsx

import React, { useState } from 'react'
import KirbySection from './KirbySection'
import { isMobile } from './Main'

interface ContactSectionProps {
  onPhoneClick: () => void
  email: string
  handleKirbyClick: () => void
  animateKirby: boolean
}

const ContactSection: React.FC<ContactSectionProps> = ({
  onPhoneClick,
  email,
  handleKirbyClick,
  animateKirby,
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h1 className="text-6xl font-bold">SAY HI</h1>
      </div>
      <h2
        onClick={onPhoneClick}
        className="mb-2 cursor-pointer text-3xl underline"
      >
        618-616-338O
      </h2>
      <h2 className="mb-6 text-3xl underline">
        <a href={`mailto:${email}`}>{email}</a>
      </h2>

      <KirbySection
        animateKirby={animateKirby}
        isMobile={isMobile}
        onKirbyClick={handleKirbyClick}
      />

      <p className="mt-4 text-3xl">Shoot me a quick email!</p>
    </div>
  )
}

export default ContactSection

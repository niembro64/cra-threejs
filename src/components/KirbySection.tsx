// KirbySection.tsx

import React from 'react'

interface KirbySectionProps {
  animateKirby: boolean
  isMobile: boolean
  onKirbyClick: () => void
}

const KirbySection: React.FC<KirbySectionProps> = ({
  animateKirby,
  isMobile,
  onKirbyClick,
}) => {
  return (
    <div className="flex items-center justify-center">
      <img
        src={process.env.PUBLIC_URL + '/kirby.png'}
        className={`pixel-art w-[40px] cursor-pointer ${
          animateKirby
            ? isMobile
              ? 'kirby-bounce-mobile'
              : 'kirby-bounce-desktop'
            : ''
        }`}
        alt="project-icon"
        onClick={onKirbyClick}
      />
    </div>
  )
}

export default KirbySection

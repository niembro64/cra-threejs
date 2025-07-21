// KirbySection.tsx

import React from 'react';
import { isThin } from './Main';
import ReactGA from 'react-ga4';

interface KirbySectionProps {
  animateKirby: boolean;
  onKirbyClick: () => void;
}

const KirbySection: React.FC<KirbySectionProps> = ({ animateKirby, onKirbyClick }) => {
  return (
    <div className="flex items-center justify-center">
      <img
        data-tooltip-content={`I want to play!`}
        src={process.env.PUBLIC_URL + '/kirby.png'}
        className={`tooltip pixel-art w-[40px] cursor-pointer ${
          animateKirby ? (isThin ? 'kirby-bounce-mobile' : 'kirby-bounce-desktop') : ''
        }`}
        alt="project-icon"
        onClick={() => {
          onKirbyClick();
          ReactGA.event({
            category: 'Kirby',
            action: 'Click',
            label: 'Kirby',
          });
        }}
      />
    </div>
  );
};

export default KirbySection;

import React from 'react';

interface FancyButtonProps {
  /**
   * The text to display on the button
   * @default "Button"
   */
  text: string;

  /**
   * Optional click handler for the button
   */
  onClick?: () => void;

  /**
   * Additional CSS class names to apply to the button
   */
  className?: string;

  /**
   * Optional disabled state for the button
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional type attribute for the button element
   * @default "button"
   */
  type?: 'button' | 'submit' | 'reset';
}

const FancyButton: React.FC<FancyButtonProps> = ({
  text,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
}) => {
  // Create an array of individual letters from the text
  const letters = text.split('').map((char) => (char === ' ' ? '\u00A0' : char));

  return (
    <button className={`btn-fancy ${className}`} onClick={onClick} disabled={disabled} type={type}>
      <div className="original">{text}</div>
      <div className="letters">
        {letters.map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>
    </button>
  );
};

export default FancyButton;

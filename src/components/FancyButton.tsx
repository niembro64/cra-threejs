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
}) => (
  <button className={`btn-fancy ${className}`} onClick={onClick} disabled={disabled} type={type}>
    <span className="btn-fancy-label">{text}</span>
  </button>
);

export default FancyButton;

import React from 'react';
import styles from './NavButton.module.scss';

interface NavButtonProps {
  direction: 'left' | 'right';
  disabled?: boolean;
  visuallyDisabled?: boolean;
  onClick: () => void;
}

export const NavButton: React.FC<NavButtonProps> = ({ direction, disabled, visuallyDisabled, onClick }) => {
  return (
    <button 
      className={`${styles.navButton} ${visuallyDisabled ? styles.disabled : ""}`}
      aria-label={`Navigate ${direction}`}
      disabled={disabled}
      onClick={onClick}
    >
      {direction === 'left' ? '‹' : '›'}
    </button>
  );
};
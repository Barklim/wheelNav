import React from 'react';
import styles from './NavButton.module.scss';

interface NavButtonProps {
  direction: 'left' | 'right';
  disabled?: boolean;
  onClick: () => void;
}

export const NavButton: React.FC<NavButtonProps> = ({ direction, disabled, onClick }) => {
  return (
    <button 
      className={`${styles.navButton} ${disabled ? styles.disabled : ""}`}
      aria-label={`Navigate ${direction}`}
      disabled={disabled}
      onClick={onClick}
    >
      {direction === 'left' ? '‹' : '›'}
    </button>
  );
};
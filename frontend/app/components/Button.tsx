import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export default function Button({ 
  children, 
  onClick, 
  type = 'button', 
  disabled = false,
  className = ''
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-lg font-medium transition-all duration-200
        bg-primary-500 text-white border-2 border-primary-500
        hover:bg-white hover:text-primary-500 hover:border-primary-500
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `.trim()}
    >
      {children}
    </button>
  );
} 
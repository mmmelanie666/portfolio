import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  href?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  href, 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'btn-primary'; // Using the class from design-tokens.css
  const combinedClassName = `${baseStyles} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

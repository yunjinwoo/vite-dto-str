import React from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button' }) => {
  return (
    <button className="button" onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default Button;

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import './MuiButton.css';

interface ButtonProps extends MuiButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <MuiButton {...props}>
      {label}
    </MuiButton>
  );
};

export default Button;


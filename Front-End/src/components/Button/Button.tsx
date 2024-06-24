import React from 'react';

interface ButtonProps {
  variant: "contained" | "outlined";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, type = "button", onClick, children }) => {
  return (
    <button type={type} className={`button ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  variant: "text" | "contained" | "outlined";
  onClick: () => void; // Optional onClick handler
}

const Button: React.FC<ButtonProps> = ({ children, variant = "contained", onClick }) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

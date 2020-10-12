import React from 'react';
import styles from '../../../styles/components/shared/buttons/Button.module.scss';

interface ButtonProps {
    children: JSX.Element | JSX.Element[];
    onClick: () => void | ((event: MouseEvent) => void);
    className: string;
}

const Button = ({ children, onClick, className }: ButtonProps) => (
    <button onClick={onClick} className={`${styles.button} ${className}`}>
        {children}
    </button>
);

export default Button;
import React from 'react';
import styles from '../../../styles/components/shared/buttons/Button.module.scss';

interface ButtonProps {
    children: JSX.Element | JSX.Element[];
    onClick: () => void | ((event: MouseEvent) => void);
    className?: string;
    disabled?: boolean;
}

const Button = ({ children, onClick, className, disabled = false }: ButtonProps) => (
    <button onClick={onClick} className={`${styles.button} ${className}`} disabled={disabled}>
        {children}
    </button>
);

export default Button;
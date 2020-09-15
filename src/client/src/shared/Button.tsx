import React from 'react';
import styles from '../styles/components/Button.module.scss';

interface ButtonProps {
    children: JSX.Element | JSX.Element[];
    onClick: () => void | ((event: MouseEvent) => void);
}

const Button = ({ children, onClick }: ButtonProps) => (
    <button onClick={onClick} className={styles.button}>{children}</button>
);

export default Button;
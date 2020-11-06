import React from 'react';
import Button from './Button';
import styles from '../../../styles/components/GradientButton.module.scss';

interface GradientButtonProps {
    children: JSX.Element | JSX.Element[];
    onClick: () => void | ((event: MouseEvent) => void);
    disabled?: boolean;
}

const GradientButton = ({ children, onClick, disabled = false }: GradientButtonProps) => (
    <Button onClick={onClick} className={styles['gradient-button']} disabled={disabled}>
        {children}
    </Button>
);

export default GradientButton;
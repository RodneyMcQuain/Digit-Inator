import React from 'react';
import Button from './Button';
import styles from '../../../styles/components/GradientButton.module.scss';

interface GradientButtonProps {
    children: JSX.Element | JSX.Element[];
    onClick: () => void | ((event: MouseEvent) => void);
}

const GradientButton = ({ children, onClick }: GradientButtonProps) => (
    <Button onClick={onClick} className={styles['gradient-button']}>
        {children}
    </Button>
);

export default GradientButton;
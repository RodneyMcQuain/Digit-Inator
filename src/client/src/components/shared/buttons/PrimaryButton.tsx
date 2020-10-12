import React from 'react';
import styles from '../../../styles/components/shared/buttons/PrimaryButton.module.scss';
import Button from './Button';

interface PrimaryButtonProps {
    children: JSX.Element | JSX.Element[];
    onClick: () => void | ((event: MouseEvent) => void);
}

const PrimaryButton = ({ children, onClick }: PrimaryButtonProps) => (
    <Button onClick={onClick} className={styles['primary-button']}>
        {children}
    </Button>
);

export default PrimaryButton;
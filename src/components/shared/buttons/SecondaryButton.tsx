import React from 'react';
import styles from '../../../styles/components/shared/buttons/SecondaryButton.module.scss';
import Button from './Button';

interface SecondaryButtonProps {
    children: JSX.Element | JSX.Element[];
    onClick: () => void | ((event: MouseEvent) => void);
}

const SecondaryButton = ({ children, onClick }: SecondaryButtonProps) => (
    <Button onClick={onClick} className={styles['secondary-button']}>
        {children}
    </Button>
);

export default SecondaryButton;
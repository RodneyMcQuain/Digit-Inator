import React from 'react';
import styles from '../../styles/components/shared/ErrorMessage.module.scss';

interface ErrorMessageProps {
    children: string;
    isShown?: boolean;
};

const ErrorMessage = ({ children, isShown = true }: ErrorMessageProps) => (
    <span 
        role="alert" 
        className={`${styles.error} ${isShown ? '' : styles.hide}`}
    >
        {children}
    </span>
);

export default ErrorMessage;
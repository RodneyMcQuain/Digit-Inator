import React from 'react';
import styles from '../../styles/components/shared/LoadingSpinner.module.scss';
import { ImSpinner2 } from 'react-icons/im';
import Icon from './Icon';

interface LoadingSpinnerProps {
    isLoading: boolean;
}

const LoadingSpinner = ({ isLoading }: LoadingSpinnerProps) => <Icon icon={<ImSpinner2 />} className={`${styles['loading-spinner']} ${isLoading ? styles.loading : ''}`} />;

export default LoadingSpinner;
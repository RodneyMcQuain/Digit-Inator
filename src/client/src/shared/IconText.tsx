import React from 'react';
import styles from '../styles/components/IconText.module.scss';

interface IconTextProps {
    icon: JSX.Element;
    text: string;
}

const IconText = ({ icon, text }: IconTextProps) => (
    <span className={styles['icon-text']}>
        <span className={styles.icon}>{icon}</span> {text}
    </span>
);

export default IconText;
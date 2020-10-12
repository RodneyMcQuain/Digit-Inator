import React from 'react';
import styles from '../../styles/components/shared/IconText.module.scss';
import Icon from './Icon';

interface IconTextProps {
    icon: JSX.Element;
    text: string;
}

const IconText = ({ icon, text }: IconTextProps) => (
    <span className={styles['icon-text']}>
        <Icon icon={icon} /> {text}
    </span>
);

export default IconText;
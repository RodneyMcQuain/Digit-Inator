import React from 'react';
import styles from '../../styles/components/shared/Accent.module.scss';

interface AccentProps {
    children: string;
}

const Accent = ({ children }: AccentProps) => <span className={styles.accent}>{children}</span>

export default Accent;
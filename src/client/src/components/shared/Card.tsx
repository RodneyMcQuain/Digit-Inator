import React from 'react';
import styles from '../../styles/components/Card.module.scss';

interface CardProps {
    children: JSX.Element | JSX.Element[];
    id?: string;
    className?: string;
}

const Card = ({ children, id, className }: CardProps) => <div id={id} className={`${styles.card} ${className}`}>{children}</div>;

export default Card;
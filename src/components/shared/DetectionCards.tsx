import React from 'react';
import { Detection } from '../../types/Detection';
import DetectionCard from './DetectionCard';
import styles from '../../styles/components/shared/DetectionCards.module.scss';

interface DetectionCardsProps {
    detections: Detection[];
}

const DetectionCards = ({ detections }: DetectionCardsProps) => (
    <div className={`container ${styles['detections-container']}`}>
        {[...detections].reverse().map(detection => <DetectionCard key={detection.id} detection={detection} />)}
    </div>
);

export default DetectionCards;
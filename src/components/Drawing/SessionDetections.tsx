import React from 'react';
import { useTransitionIn } from '../../services/useTransitionIn';
import { Detection } from '../../types/Detection';
import DetectionCards from '../shared/DetectionCards';
import styles from '../../styles/components/Drawing/SessionDetections.module.scss';
interface SessionDetectionsProps {
    detections: Detection[];
}

const SessionDetections = ({ detections }: SessionDetectionsProps) => (
    detections.length > 0
        ? (
            <>
                <SessionDetectionsHeader />
                <DetectionCards detections={detections} />
            </>
        )
        : null
);

const SessionDetectionsHeader = () => {
    const sessionDetectionHeaderWithTransition = useTransitionIn(styles.appear, styles['session-detections-header']);
    return <h3 className={sessionDetectionHeaderWithTransition}>Detections</h3>;
};

export default SessionDetections;
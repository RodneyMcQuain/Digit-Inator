import React from 'react';
import { Detection } from '../../types/Detection';
import DetectionCards from '../shared/DetectionCards';

interface SessionDetectionsProps {
    detections: Detection[];
}

const SessionDetections = ({ detections }: SessionDetectionsProps) => (
    detections.length > 0
        ? (
            <>
                <h3>Detections</h3>
                <DetectionCards detections={detections} />
            </>
        )
        : null
);

export default SessionDetections;
import React, { useEffect, useState } from 'react';
import { Detection } from '../types/Detection';
import DetectionCards from './shared/DetectionCards';

const PredictionsContainer = () => {
    const [detections, setDetections] = useState<Detection[]>([])
    useEffect(() => {
        fetch('api/get-entry')
            .then(response => response.json() as Promise<Detection[]>)
            .then(data => setDetections(data))
    }, []);

    return (
        <>
            <h2 className="major-top-margin">Everybody's Detections</h2>
            <DetectionCards detections={detections} />
        </>
    );
}


export default PredictionsContainer
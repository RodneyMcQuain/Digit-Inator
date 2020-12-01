import React, { useState, useEffect } from 'react';
import { detectionResult } from '../../services/anchors';
import { useAddCssClass } from '../../services/useAddCssClass';
import Card from '../shared/Card';
import styles from '../../styles/components/Predictions.module.scss';
import { getHighestPrediction } from '../../services/highestPrediction';

interface PredictionsProps {
    predictions: number[];
}

const Predictions = ({ predictions }: PredictionsProps) => {
    const [mightPopInPrediction, shouldPopInPrediction] = useAddCssClass(styles['pop-in'])
    const [delayedPrediction, setDelayedPrediction] = useState<number>();
    useEffect(() => {
        setDelayedPrediction(getHighestPrediction(predictions));
        shouldPopInPrediction(true);
    }, [predictions]);

    return (
        <Card
            id={detectionResult}
            className={`${styles['prediction-container']} ${predictions.length > 0 ? styles.appear : ''}`}
        >
            <span>I think your number is</span>
            <div
                className={`${styles.prediction} ${mightPopInPrediction}`}
                onAnimationEnd={() => shouldPopInPrediction(false)}
            >
                {delayedPrediction}
            </div>
        </Card>
    );
}

export default Predictions;

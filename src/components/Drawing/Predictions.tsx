import React, { useState, useEffect } from 'react';
import { useAddCssClass } from '../../services/useAddCssClass';
import Card from '../shared/Card';
import styles from '../../styles/components/Drawing/Predictions.module.scss';
import { getHighestPrediction } from '../../services/highestPrediction';
import PredictionsGraph from './PredictionsGraph';

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
        <Card className={`${styles['prediction-container']} ${predictions.length > 0 ? styles.appear : ''}`}>
            <span>I think your number is</span>
            <div
                className={`${styles.prediction} ${mightPopInPrediction}`}
                onAnimationEnd={() => shouldPopInPrediction(false)}
            >
                {delayedPrediction}
            </div>
            <PredictionsGraph predictions={predictions} />
        </Card>
    );
}

export default Predictions;

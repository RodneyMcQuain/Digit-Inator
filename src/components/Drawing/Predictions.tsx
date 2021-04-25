import React, { useState, useEffect } from 'react';
import { useAddCssClass } from '../../services/useAddCssClass';
import Card from '../shared/Card';
import styles from '../../styles/components/Drawing/Predictions.module.scss';
import { getHighestPrediction } from '../../services/highestPrediction';
import PredictionsGraph from './PredictionsGraph';
import { useTransitionIn } from '../../services/useTransitionIn';

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
    const predictionContainerWithTransition = useTransitionIn(styles.appear, styles['prediction-container']);
    const PREDICTION_GUESS_ID = 'prediction';

    return (
        predictions.length > 0
            ? (
                <Card className={predictionContainerWithTransition}>
                    <span id={PREDICTION_GUESS_ID}>I think your number is</span>
                    <div
                        className={`${styles.prediction} ${mightPopInPrediction}`}
                        onAnimationEnd={() => shouldPopInPrediction(false)}
                        aria-labelledby={PREDICTION_GUESS_ID}
                        data-testid="guessed-number"
                    >
                        {delayedPrediction}
                    </div>
                    <PredictionsGraph predictions={predictions} />
                </Card>
            )
            : null
    );
}

export default Predictions;

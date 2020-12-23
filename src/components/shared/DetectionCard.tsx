import React from 'react';
import { GiCrystalBall } from 'react-icons/gi';
import { getHighestPrediction } from '../../services/highestPrediction';
import { Detection } from '../../types/Detection';
import Card from './Card';
import IconText from './IconText';
import styles from '../../styles/components/shared/DetectionCard.module.scss';
import { v4 as getUUID } from 'uuid';
import { useTransitionIn } from '../../services/useTransitionIn';

interface PredictionCardProps {
    detection: Detection;
};

const DetectionCard = ({ detection: { predictions, image, id } }: PredictionCardProps) => {
    const predictionId = `detection-${id ?? getUUID()}`;
    const prediction = getHighestPrediction(predictions);
    const predictionARIAText = `Prediction: ${prediction}`;
    const detectionCardWithTransition = useTransitionIn(styles.appear, styles['detection-card']);

    return (
        <Card className={detectionCardWithTransition}>
            <img
                src={image}
                alt={`A drawing that I think is a ${prediction}`}
                aria-labelledby={predictionId}
                className={styles['detected-image']}
            />
            <p
                title={predictionARIAText}
                aria-label={predictionARIAText}
                id={predictionId}
                className={styles['detection-guess']}
            >
                <IconText icon={<GiCrystalBall />} text={prediction.toString()} />
            </p>
        </Card>
    )
};

export default DetectionCard;
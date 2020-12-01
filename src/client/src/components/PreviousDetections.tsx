import React, { useEffect, useState } from 'react';
import Card from './shared/Card';
import styles from '../styles/components/PreviousDetections.module.scss';
import { GiCrystalBall } from 'react-icons/gi';
import IconText from './shared/IconText';
import { getHighestPrediction } from '../services/highestPrediction';

interface Detection {
    predictions: number[];
    dateCreated: Date;
    image: string;
}

const PredictionsContainer = () => {
    const [detectedImages, setDetectedImages] = useState<Detection[]>([])
    useEffect(() => {
        async function fetchData() {
            await fetch('api/get-entry')
                .then(response => response.json() as Promise<Detection[]>)
                .then(data => setDetectedImages(data))
        }
        fetchData();
    }, []);

    return (
        <>
            <h2>Previous Detections</h2>
            <div className={styles['images-container']}>
                {detectedImages.map(({predictions, image}, index) => {
                    const predictionId = `detection-${index}`;
                    const prediction = getHighestPrediction(predictions);   
                    return (
                        <Card key={index}>
                            <img aria-labelledby={predictionId} className={styles['detected-image']} src={image} />

                            <p 
                                title={`Prediction: ${prediction}`}
                                id={predictionId} 
                                className={styles['detection-guess']} 
                            >
                                <IconText icon={<GiCrystalBall />} text={`${prediction}`} />
                            </p>
                        </Card>
                    )}
                )}
            </div>
        </>
    );
}


export default PredictionsContainer
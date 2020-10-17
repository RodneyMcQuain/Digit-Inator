import React, { MutableRefObject } from 'react';
import styles from '../../styles/components/GradientButton.module.scss';
import { FiBarChart2 } from 'react-icons/fi';
import IconText from '../../shared/IconText';
import Button from '../../shared/Button';
import detect from '../../services/mnist/numberDetection';


interface DetectButtonProps {
    canvasRef: MutableRefObject<HTMLCanvasElement>;
    setPredictions: (predictions: number[]) => void;
}

const DetectButton = ({ canvasRef, setPredictions }: DetectButtonProps) => (
    <Button onClick={() => {detectButtonHandler(canvasRef.current, setPredictions)}} className={styles['gradient-button']}>
        <IconText icon={<FiBarChart2 />} text="Detect" />
    </Button>
);

const detectButtonHandler = async (canvas: HTMLCanvasElement, setPredictions: (predictions: number[]) => void) => { 
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as any;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const predictions = await detect(imageData);
    setPredictions(predictions);
};

export default DetectButton;
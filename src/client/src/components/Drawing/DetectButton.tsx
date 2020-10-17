import React, { MutableRefObject } from 'react';
import detect from '../../services/mnist/numberDetection';
import GradientButton from '../shared/buttons/GradientButton';
import IconText from '../shared/IconText';
import { FiBarChart2 } from 'react-icons/fi';
import { detectionResult } from '../../services/anchors';
import styles from '../../styles/components/DetectButton.module.scss';

interface DetectButtonProps {
    canvasRef: MutableRefObject<HTMLCanvasElement>;
    setPredictions: (predictions: number[]) => void;
}

const DetectButton = ({ canvasRef, setPredictions }: DetectButtonProps) => (
    <a className={styles['detect-button-anchor']} href={`#${detectionResult}`}>
        <GradientButton onClick={() => {detectButtonHandler(canvasRef.current, setPredictions)}}>
            <IconText icon={<FiBarChart2 />} text="Detect" />
        </GradientButton>
    </a>
);

const detectButtonHandler = async (canvas: HTMLCanvasElement, setPredictions: (predictions: number[]) => void) => { 
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as any;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const predictions = await detect(imageData);
    setPredictions(predictions);
};

export default DetectButton;
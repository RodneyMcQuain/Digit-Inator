import React, { MutableRefObject, useContext } from 'react';
import detect from '../../services/mnist/numberDetection';
import GradientButton from '../shared/buttons/GradientButton';
import IconText from '../shared/IconText';
import { FiBarChart2 } from 'react-icons/fi';
import { detectionResult } from '../../services/anchors';
import styles from '../../styles/components/DetectButton.module.scss';
import { HasLoadedModelContext } from '../../services/HasLoadedModelContext';
import ErrorMessage from '../shared/ErrorMessage';
import LoadingSpinner from '../shared/LoadingSpinner';
import { detectButtonText } from './detectButtonText';

interface DetectButtonProps {
    canvasRef: MutableRefObject<HTMLCanvasElement>;
    setPredictions: (predictions: number[]) => void;
}

const DetectButton = ({ canvasRef, setPredictions }: DetectButtonProps) => {
    const hasntLoadedModel = !useContext(HasLoadedModelContext);

    return (
        <>
            <a className={styles['detect-button-anchor']} href={`#${detectionResult}`} onClick={e => hasntLoadedModel && e.preventDefault()}>
                <GradientButton onClick={() => { detectButtonHandler(canvasRef.current, setPredictions) }} disabled={hasntLoadedModel}>
                    <>
                        <IconText icon={<FiBarChart2 />} text={detectButtonText} />{" "}
                        &nbsp;<LoadingSpinner isLoading={hasntLoadedModel} />
                    </>
                </GradientButton>
            </a>
            <br />
            <ErrorMessage isShown={hasntLoadedModel}>The model is currently loading, please wait.</ErrorMessage>
        </>
    );
}

const detectButtonHandler = async (canvas: HTMLCanvasElement, setPredictions: (predictions: number[]) => void) => {
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as any;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const predictions = await detect(imageData);
    setPredictions(predictions);
};

export default DetectButton;
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
                        <IconText icon={<FiBarChart2 />} text="Detect" />{" "}
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

    const predictions = await detect(autoTrimCanvas(imageData, canvas, ctx));
    setPredictions(predictions);
};

const autoTrimCanvas = (imageData: ImageData, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    let h = canvas.height;
    let w = canvas.width;
    const pix = { x: [] as number[], y: [] as number[] };
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const index = (y * w + x) * 4;
            if (imageData.data[index + 3] > 0) {
                pix.x.push(x);
                pix.y.push(y);
            }
        }
    }
    const sortFunction = (a: any, b: any): any => a - b;
    pix.x.sort(sortFunction);
    pix.y.sort(sortFunction);
    var n = pix.x.length - 1;

    const PADDING = 20;
    // const max = Math.max(pix.x[n] - pix.x[0], pix.x[n] - pix.[0])
    // const max = Math.max(pix.x[n] - pix.x[0], pix.y[n] - pix.y[0]);
    // w = (PADDING * 2) + pix.x[n] - pix.x[0] + (pix.x[n] - pix.x[0] + max);
    // h = (PADDING * 2) + pix.y[n] - pix.y[0] + (pix.y[n] - pix.y[0] + max);
    w = (PADDING * 2) + pix.x[n] - pix.x[0];
    h = (PADDING * 2) + pix.y[n] - pix.y[0];
    return ctx.getImageData(pix.x[0] - PADDING, pix.y[0] - PADDING, w, h);

    // canvas.width = w;
    // canvas.height = h;
    // ctx.putImageData(cut, 0, 0);
}

export default DetectButton;
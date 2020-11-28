import React, { MutableRefObject, useRef, useState } from 'react';
import styles from '../../styles/components/DrawingCanvasContainer.module.scss';
import ClearButton from './ClearButton';
import DrawingCanvas from './DrawingCanvas';
import { LIGHT_WHITE } from '../../styles/utilities/colors.scss';
import ColorSelectionButton from './ColorSelectionButton';
import DetectButton from './DetectButton';
import { detection } from '../../services/anchors';
import Predictions from './Predictions';
import UsabilityInstructions from './UsabilityInstructions';

const DrawingCanvasContainer = () => {
    const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
    const [strokeColor, setStrokeColor] = useState<string>(LIGHT_WHITE);
    const [predictions, setPredictions] = useState<number[]>([]);

    return (
        <div id={detection} className={styles["drawing-canvas-container"]}>
            <h2>Draw a Number!</h2>
            <UsabilityInstructions />
            <br />
            <DrawingCanvas canvasRef={canvasRef} strokeColor={strokeColor} />
            <br />
            <ColorSelectionButton strokeColor={strokeColor} setStrokeColor={setStrokeColor} />
            <ClearButton canvasRef={canvasRef} />
            <br />
            <DetectButton canvasRef={canvasRef} setPredictions={setPredictions} />
            <br />
            <br />
            <Predictions predictions={predictions} />
        </div>
    );
};

export default DrawingCanvasContainer;
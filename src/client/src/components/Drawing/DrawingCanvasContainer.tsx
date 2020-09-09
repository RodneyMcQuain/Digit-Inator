import React, { MutableRefObject, useRef } from 'react';
import styles from '../../styles/components/DrawingCanvasContainer.module.scss';
import ClearButton from './ClearButton';
import DrawingCanvas from './DrawingCanvas';

const DrawingCanvasContainer = () => {
    const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;

    return (
        <div className={styles["drawing-canvas-container"]}>
            <DrawingCanvas canvasRef={canvasRef} />
            <br />
            <ClearButton canvasRef={canvasRef} />
        </div>
    );
};


export default DrawingCanvasContainer;
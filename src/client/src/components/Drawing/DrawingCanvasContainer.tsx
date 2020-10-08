import React, { MutableRefObject, useRef, useState } from 'react';
import styles from '../../styles/components/DrawingCanvasContainer.module.scss';
import ClearButton from './ClearButton';
import DrawingCanvas from './DrawingCanvas';
import { LIGHT_WHITE } from '../../styles/utilities/colors.scss';
import ColorSelectionButton from './ColorSelectionButton';
import { detection } from '../../services/anchors';

const DrawingCanvasContainer = () => {
    const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
    const [strokeColor, setStrokeColor] = useState<string>(LIGHT_WHITE);

    return (
        <div id={detection} className={styles["drawing-canvas-container"]}>
            <DrawingCanvas canvasRef={canvasRef} strokeColor={strokeColor} />
            <br />
            <ColorSelectionButton strokeColor={strokeColor} setStrokeColor={setStrokeColor} />
            <ClearButton canvasRef={canvasRef} />
        </div>
    );
};


export default DrawingCanvasContainer;
import React, { MutableRefObject } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import IconText from '../../shared/IconText';

interface ClearButtonProps {
    canvasRef: MutableRefObject<HTMLCanvasElement>;
}

const ClearButton = ({ canvasRef }: ClearButtonProps) => (
    <button onClick={() => clearCanvas(canvasRef.current)}>
        <IconText icon={<RiDeleteBin2Line />} text="Clear" />
    </button>
);

const clearCanvas = (canvas: HTMLCanvasElement): void => { canvas.width = canvas.width; };

export default ClearButton;
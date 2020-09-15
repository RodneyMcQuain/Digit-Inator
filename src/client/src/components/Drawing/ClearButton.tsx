import React, { MutableRefObject } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import IconText from '../../shared/IconText';
import Button from '../../shared/Button';

interface ClearButtonProps {
    canvasRef: MutableRefObject<HTMLCanvasElement>;
}

const ClearButton = ({ canvasRef }: ClearButtonProps) => (
    <Button onClick={() => clearCanvas(canvasRef.current)}>
        <IconText icon={<RiDeleteBin2Line />} text="Clear" />
    </Button>
);

const clearCanvas = (canvas: HTMLCanvasElement): void => { canvas.width = canvas.width; };

export default ClearButton;
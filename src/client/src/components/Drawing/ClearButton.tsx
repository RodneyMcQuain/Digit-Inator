import React, { MutableRefObject } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import IconText from '../shared/IconText';
import PrimaryButton from '../shared/buttons/PrimaryButton';

interface ClearButtonProps {
    canvasRef: MutableRefObject<HTMLCanvasElement>;
    setHasDrawn: (hasDrawn: boolean) => void;
}

const ClearButton = ({ canvasRef, setHasDrawn }: ClearButtonProps) => (
    <PrimaryButton onClick={() => clearCanvas(canvasRef.current, setHasDrawn)}>
        <IconText icon={<RiDeleteBin2Line />} text="Clear" />
    </PrimaryButton>
);

const clearCanvas = (canvas: HTMLCanvasElement, setHasDrawn: (hasDrawn: boolean) => void): void => { 
    canvas.width = canvas.width; 
    setHasDrawn(false);
};

export default ClearButton;
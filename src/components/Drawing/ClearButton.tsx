import React, { MutableRefObject } from 'react';
import { RiDeleteBin2Line } from '@meronex/icons/ri';
import IconText from '../shared/IconText';
import PrimaryButton from '../shared/buttons/PrimaryButton';

interface ClearButtonProps {
    canvasRef: MutableRefObject<HTMLCanvasElement>;
}

const ClearButton = ({ canvasRef }: ClearButtonProps) => (
    <PrimaryButton onClick={() => clearCanvas(canvasRef.current)}>
        <IconText icon={<RiDeleteBin2Line />} text="Clear" />
    </PrimaryButton>
);

const clearCanvas = (canvas: HTMLCanvasElement): void => { canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height) };

export default ClearButton;
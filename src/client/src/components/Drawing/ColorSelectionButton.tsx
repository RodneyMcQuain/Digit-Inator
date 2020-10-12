import React, { MutableRefObject, useRef } from 'react';
import SecondaryButton from '../shared/buttons/SecondaryButton';
import styles from '../../styles/components/ColorSelectionButton.module.scss';

interface ColorSelectionButtonProps {
    strokeColor: string;
    setStrokeColor: (strokeColor: string) => void;
}

const ColorSelectionButton = ({ strokeColor, setStrokeColor }: ColorSelectionButtonProps) => {
    const colorPickerRef = useRef() as MutableRefObject<HTMLInputElement>;

    return (
        <SecondaryButton onClick={() => colorPickerRef.current.click()}>
            <span className={styles['color-picker-container']}>
                <input
                    ref={colorPickerRef} 
                    type="color" 
                    onChange={e => setStrokeColor(e.target.value)} value={strokeColor} 
                    className={styles['color-picker']} 
                    name="stroke-color"
                    id="stroke-color"
                />
            </span>
            <label htmlFor="stroke-color" className="cursor-pointer">Color</label>
        </SecondaryButton>
    )
};

export default ColorSelectionButton;
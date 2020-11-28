import React from 'react';
import { detectButtonText } from './detectButtonText';

const UsabilityInstructions = () => (
    <div>
        Press and hold your left mouse button or touch screen to draw.
        <br />
        Click the "{detectButtonText}" button when you're ready to see my best guess of what you drew!
    </div>
);

export default UsabilityInstructions;
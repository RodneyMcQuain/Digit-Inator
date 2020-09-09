import React from 'react';
import './styles/base/global.scss';
import styles from './styles/components/App.module.css';
import DrawingCanvasContainer from './components/Drawing/DrawingCanvasContainer';

function App() {
    return (
        <div className={styles.App}>
            <header>
                <h1>Number Detection</h1>
            </header>
            <div className="drawing-container">
                <DrawingCanvasContainer />
            </div>
        </div>
    );
}

export default App;

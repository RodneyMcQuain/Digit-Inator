import React from 'react';
import './styles/base/global.scss';
import styles from './styles/components/App.module.scss';
import DrawingCanvasContainer from './components/Drawing/DrawingCanvasContainer';
import Banner from './components/Banner/Banner';
import { detection } from './services/anchors';

function App() {
    return (
        <>
            <Banner />
            <div className={styles.App}>
                <div>
                    <header>
                        <h1 id={detection}>Number Detection</h1>
                    </header>
                    <div className="drawing-container">
                        <DrawingCanvasContainer />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;

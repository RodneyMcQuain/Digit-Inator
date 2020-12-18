import React, { useState, useEffect } from 'react';
import styles from '../styles/components/App.module.scss';
import DrawingCanvasContainer from '../components/Drawing/DrawingCanvasContainer';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer';
import { loadModel } from '../services/mnist/loadModel';
import { HasLoadedModelContext } from '../services/HasLoadedModelContext';
import SEO from '../components/shared/SEO';

function App() {
    const [hasLoadedModel, setHasLoadedModel] = useState(false);
    useEffect(() => {
        (async () => {
            await loadModel();
            setHasLoadedModel(true);
        })();
    }, []);

    return (
        <>
            <Banner />
            <div className={styles.App}>
                <SEO />
                <div>
                    <HasLoadedModelContext.Provider value={hasLoadedModel}>
                        <DrawingCanvasContainer />
                    </HasLoadedModelContext.Provider>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default App;

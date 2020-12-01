import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './styles/base/global.scss';
import styles from './styles/components/App.module.scss';
import DrawingCanvasContainer from './components/Drawing/DrawingCanvasContainer';
import Banner from './components/Banner/Banner';
import { appName, description } from './services/siteMetaData';
import Footer from './components/Footer';
import { loadModel } from './services/mnist/loadModel';
import { HasLoadedModelContext } from './services/HasLoadedModelContext';
import PredictionsContainer from './components/PreviousDetections'

function App() {
    const [hasLoadedModel, setHasLoadedModel] = useState(false);
    useEffect(async () => {
        await loadModel();
        setHasLoadedModel(true);
    }, []);

    return (
        <>
            <Banner />
            <div className={styles.App}>
                <Helmet>
                    <html lang="en" />
                    <meta charSet="utf-8" />
                    <title>{appName}</title>
                    <meta name="description" content={description} />
                </Helmet>
                <div>
                    <HasLoadedModelContext.Provider value={hasLoadedModel}>
                        <DrawingCanvasContainer />
                    </HasLoadedModelContext.Provider>
                    <PredictionsContainer />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default App;

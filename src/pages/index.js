import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styles from '../styles/components/App.module.scss';
import DrawingCanvasContainer from '../components/Drawing/DrawingCanvasContainer';
import Banner from '../components/Banner/Banner';
import { appName, description } from '../services/siteMetaData';
import Footer from '../components/Footer';
import { loadModel } from '../services/mnist/loadModel';
import { HasLoadedModelContext } from '../services/HasLoadedModelContext';

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
                <Helmet>
                    <html lang="en" />
                    <meta charSet="utf-8" />
                    <title>{appName}</title>
                    <meta name="description" content={description} />
                    <meta name="google-site-verification" content="dj-D43w2pDDNhcyR76vVp9NNR6T-yOUKuRZ5FJ-3Pog" />
                </Helmet>
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

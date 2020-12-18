import React, { useState, useEffect } from 'react';
// import Head from 'next/head';
import { Helmet } from 'react-helmet';
import styles from '../styles/components/App.module.scss';
import DrawingCanvasContainer from '../components/Drawing/DrawingCanvasContainer';
import Banner from '../components/Banner/Banner';
import { appName, description } from '../services/siteMetaData';
import Footer from '../components/Footer';
import { loadModel } from '../services/mnist/loadModel';
import { HasLoadedModelContext } from '../services/HasLoadedModelContext';
import { SECONDARY_ACCENT } from '../styles/utilities/colors.module.scss';

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
            <Helmet>
                <html lang="en" />
                <meta charSet="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
                <title>{appName}</title>
                <meta name="description" content={description} />
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/logo.svg" />
                <meta name="theme-color" content={SECONDARY_ACCENT} />
            </Helmet>
            <Banner />
            <div className={styles.App}>
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

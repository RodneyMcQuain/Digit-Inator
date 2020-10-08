import React from 'react';
import { Helmet } from 'react-helmet';
import './styles/base/global.scss';
import styles from './styles/components/App.module.scss';
import DrawingCanvasContainer from './components/Drawing/DrawingCanvasContainer';
import Banner from './components/Banner/Banner';
import { appName, description } from './services/siteMetaData';
import Footer from './components/Footer';

function App() {
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
                <div className="drawing-container">
                    <DrawingCanvasContainer />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default App;

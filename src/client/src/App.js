import React from 'react';
import { Helmet } from 'react-helmet';
import './styles/base/global.scss';
import styles from './styles/components/App.module.css';
import DrawingCanvasContainer from './components/Drawing/DrawingCanvasContainer';
import Banner from './components/Banner/Banner';
import { detection } from './services/anchors';
import { appName, description } from './services/siteMetaData';

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
                <header>
                    <h1 id={detection}>Number Detection</h1>
                </header>
                <div className="drawing-container">
                    <DrawingCanvasContainer />
                </div>
            </div>
        </>
    );
}

export default App;

import React from 'react';
import Helmet from 'next/head';
import { isBrowser } from '../../services/browser';
import {
    appName as siteAppName,
    description as siteDescription,
    imageUrl as siteImageUrl
} from '../../services/siteMetaData';

const SEO = () => {
    const metaDescription = siteDescription;
    const imageUrl = isBrowser() && (document.location.origin + siteImageUrl);
    const title = siteAppName;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={metaDescription} />
         
            <meta name="og:title" property="og:title" content={title} />
            <meta name="og:description" property="og:description" content={metaDescription} />
            <meta property="og:image" content={imageUrl} />  
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Digit-Inator" />
            <meta property="og:url" content={isBrowser() && document.location.origin} />
         
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={imageUrl} />
            <meta name="twitter:card" content="summary" />

            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="robots" content="index, nofollow" />
            <meta charset="UTF-8" />
        </Helmet>
    );
}

export default SEO;
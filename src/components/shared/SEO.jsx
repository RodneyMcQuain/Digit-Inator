import React from 'react';
import Helmet from 'react-helmet';
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
        <Helmet
            htmlAttributes={{ lang: 'en' }}
            title={title}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:image`,
                    content: imageUrl,
                },
                {
                    property: `og:type`,
                    content: 'website',
                },
                {
                    property: `og:url`,
                    content: isBrowser() && document.location.origin
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                {
                    name: `twitter:image`,
                    content: imageUrl,
                },
            ]}
        />
    );
}

export default SEO;
import Document, { Html, Head, Main, NextScript } from 'next/document'
import {
    appName as siteAppName,
    description as siteDescription,
    imageUrl as siteImageUrl,
    productionUrl,
} from '../services/siteMetaData';
export default class extends Document {
    static getInitialProps = async ctx => await Document.getInitialProps(ctx);

    render = () => (
        <Html lang="en" dir="ltr">
            <SiteHead />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

const SiteHead = () => {
    const metaDescription = siteDescription;
    const imageUrl = productionUrl + siteImageUrl;
    const title = siteAppName;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={metaDescription} />

            <meta name="og:title" property="og:title" content={title} />
            <meta name="og:description" property="og:description" content={metaDescription} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Digit-Inator" />
            <meta property="og:url" content={productionUrl} />

            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={imageUrl} />
            <meta name="twitter:card" content="summary" />

            <meta name="robots" content="index, nofollow" />

            <link rel="manifest" href="/manifest.json" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#CA9EFF" />
            <link rel="apple-touch-icon" href="/logo.svg" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="icon" href="/logo.svg" type="image/svg+xml" sizes="any" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="mobile-web-app-capable" content="yes" />
        </Head>
    );
}
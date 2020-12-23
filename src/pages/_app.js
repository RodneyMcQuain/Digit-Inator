import '../styles/base/global.scss';
import SEO from '../components/shared/SEO';

const App = ({ Component, pageProps }) => (
    <>
        <SEO />
        <Component {...pageProps} />
    </>
);

export default App;
import React, { useEffect } from 'react';
import { useAddCssClass } from '../../services/useAddCssClass';
import Accent from '../shared/Accent';
import styles from '../../styles/components/Banner.module.scss';
import { AiOutlineDown } from 'react-icons/ai';
import Icon from '../shared/Icon';
import { detection } from '../../services/anchors';
import { appName } from '../../services/siteMetaData';

const backgroundImage = `linear-gradient(
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0.75)
), url(./banner-image.jpg)`;

const Banner = () => {
    const [fadeHeader, fadeText, fadeGoDownIcon] = useBannerFade();
    const bannerTextClasses = `${styles['banner-text']} ${styles.hide} ${fadeText}`;

    return (
        <header
            style={{ backgroundImage: backgroundImage }}
            className={styles['banner-img']}
        >
            <div className={styles['banner-container']}>
                <h1 className={`${styles['banner-header']} ${styles.hide} ${fadeHeader}`}>{appName}</h1>
                <div className={styles['banner-text-container']}>
                    <span className={bannerTextClasses}>
                        Convert your favorite <Accent>hand drawn</Accent> digit to text with the latest and greatest in <Accent>computer vision</Accent>
                    </span>
                </div>
            </div>
            <a
                aria-label="Go to the application, number detection"
                className={`${styles['go-down-icon']} ${styles.hide} ${fadeGoDownIcon}`} href={`#${detection}`}
            >
                <Icon icon={<AiOutlineDown />} />
            </a>
        </header>
    );
}

const useBannerFade = () => {
    const [mightBeHeaderTransition, shouldAddHeaderTransition] = useAddCssClass(styles.appear);
    const [mightBeTextTransition, shouldAddTextTransition] = useAddCssClass(styles.appear);
    const [mightBeGoDownIconTransition, shouldAddGoDownIconTransition] = useAddCssClass(styles.appear);

    useEffect(() => {
        const headerTimer = setTimeout(() => shouldAddHeaderTransition(true), 250);
        const textTimer = setTimeout(() => shouldAddTextTransition(true), 1500);
        const goDownIconTimer = setTimeout(() => shouldAddGoDownIconTransition(true), 2750);

        return () => {
            clearTimeout(headerTimer);
            clearTimeout(textTimer);
            clearTimeout(goDownIconTimer);
        };
    }, []);

    return [mightBeHeaderTransition, mightBeTextTransition, mightBeGoDownIconTransition];
};

export default Banner;
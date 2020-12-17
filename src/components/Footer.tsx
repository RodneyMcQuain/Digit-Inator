import React from 'react';
import { appName } from '../services/siteMetaData';
import styles from '../styles/components/Footer.module.scss';

const currentYear = new Date().getFullYear().toString();
const startYear = '2020';

const Footer = () => <footer className={styles.footer}>© {startYear}{currentYear === startYear ? '' : `-${currentYear}`} {appName}</footer>

export default Footer;
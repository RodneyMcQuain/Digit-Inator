import React from 'react';
import { appName } from '../services/siteMetaData';
import styles from '../styles/components/Footer.module.scss';

const STARTING_YEAR = '2020';
const currentYear = new Date().getFullYear().toString();

const Footer = () => <footer className={styles.footer}>© {STARTING_YEAR}{currentYear === STARTING_YEAR ? '' : `-${currentYear}`} {appName}</footer>

export default Footer;
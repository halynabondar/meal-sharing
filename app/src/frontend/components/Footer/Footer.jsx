import {Typography} from "@mui/material";
import React from "react";
import styles from "./Footer.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGithub, faGoogle, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                <Typography variant="h6" sx={{
                    flexGrow: 1,
                    fontFamily: "Great Vibes",
                    fontSize: 28,
                    color: "#313131"
                }}>
                    Meal Sharing
                </Typography>
            </div>
            <ul className={styles.list}>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Security</li>
                <li>Sitemap</li>
            </ul>
            <div className={styles.logos}>
                <FontAwesomeIcon className={styles.logoItem} icon={faGithub} color="#525252"
                                 cursor={"pointer"}></FontAwesomeIcon>
                <FontAwesomeIcon className={styles.logoItem} icon={faFacebook} color="#525252"
                                 cursor={"pointer"}></FontAwesomeIcon>
                <FontAwesomeIcon className={styles.logoItem} icon={faGoogle} color="#525252"
                                 cursor={"pointer"}></FontAwesomeIcon>
                <FontAwesomeIcon className={styles.logoItem} icon={faInstagram} color="#525252"
                                 cursor={"pointer"}></FontAwesomeIcon>
                <FontAwesomeIcon className={styles.logoItem} icon={faTwitter} color="#525252"
                                 cursor={"pointer"}></FontAwesomeIcon>
            </div>
            {/*<p className={styles.text}>&copy; 2024 All rights reserved</p>*/}
        </footer>
    );
}
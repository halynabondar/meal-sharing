import {Typography} from "@mui/material";
import React from "react";
import styles from "./Footer.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGithub, faGoogle, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Typography variant="h6" sx={{flexGrow: 1, fontFamily: "Great Vibes", fontSize: 32, textAlign: "center", color: "#0B6746"}}>
                Meal Sharing
            </Typography>
            <ul className={styles.list}>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Security</li>
                <li>Sitemap</li>
            </ul>
            <div className={styles.footerColumn}>
                <div className={styles.logos}>
                    <FontAwesomeIcon icon={faGithub} color="#0B6746" cursor={"pointer"}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faFacebook} color="#0B6746" cursor={"pointer"}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faGoogle} color="#0B6746" cursor={"pointer"}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faInstagram} color="#0B6746" cursor={"pointer"}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faTwitter} color="#0B6746" cursor={"pointer"}></FontAwesomeIcon>
                </div>
                <p className={styles.text}>&copy; 2024 All rights reserved</p>
            </div>
        </footer>
    );
}
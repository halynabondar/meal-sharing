"use client"

import React from 'react';
import Navbar from "../Navbar.jsx";
import styles from "./AboutUs.module.css";
import {useNavigate} from "react-router-dom";
import Footer from "../Footer/Footer.jsx";

export default function AboutUs() {
    const navigate = useNavigate();
    const handleFindMeal = () => {
        navigate('/meals');
    };

    const backgroundAboutUs = {
        backgroundImage: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.8) 20%, rgba(255, 255, 255, 0) 50%), url(/public/background4.webp)',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        marginTop: '50px',
        backgroundPosition: 'top',
        height: '800px',
        width: '100%'
    };
    return (
        <>
            <Navbar/>
            <div style={backgroundAboutUs}>
                <section className={styles.container}>
                    <p className={styles.text}>We believe that the best connections are made over a
                        shared meal. Our mission is to bring people together by creating a space where anyone can enjoy
                        good food and good company.</p>
                    <p className={styles.text}>Join us as we celebrate the joy of sharing, one plate at a time.</p>
                    <button className={styles.btn} onClick={handleFindMeal}>Find meal</button>
                </section>
            </div>
            <Footer />
        </>
    )
}
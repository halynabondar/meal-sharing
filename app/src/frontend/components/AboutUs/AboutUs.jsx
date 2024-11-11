"use client"

import React from 'react';
import Navbar from "../Navbar.jsx";
import styles from "./AboutUs.module.css";
import {useNavigate} from "react-router-dom";

export default function AboutUs() {
    const navigate = useNavigate();
    const handleFindMeal = () => {
        navigate('/meals');
    };

    const backgroundAboutUs = {
        backgroundImage: 'url(/public/background_about.jpg)',
        backgroundSize: '40%',
        backgroundRepeat: 'no-repeat',
        marginTop: '20px',
        backgroundPosition: 'right',
        height: '100%',
        width: '100%'
    };
    return (
        <>
            <Navbar/>
            <div style={backgroundAboutUs}>
                <section className={styles.container}>
                    <h1 className={styles.title}>About Us</h1>
                    <p className={styles.text}>We believe that the best connections are made over a
                        shared meal. Our mission is to bring people together by creating a space where anyone can enjoy
                        good food and good company. Whether you're a passionate cook or someone eager to explore new
                        flavors, we invite you to be part of our community.</p>
                    <p className={styles.text}>We aim to celebrate diversity through food, honor different cultures, and make every meal a
                        unique experience. By opening our tables to new faces, we build lasting friendships, share
                        stories, and create memories that warm our hearts long after the meal is over.</p>
                    <p className={styles.text}>Join us as we celebrate the joy of sharing, one plate at a time.</p>
                    <button className={styles.btn} onClick={handleFindMeal}>Find a meal</button>
                </section>
            </div>
        </>
    )
}
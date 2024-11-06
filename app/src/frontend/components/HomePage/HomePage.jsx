"use client"

import React from 'react';
import styles from './HomePage.module.css';
import Navbar from "../Navbar.jsx";
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/meals');
    };

    const backgroundStyle = {
        backgroundImage: 'url(/background_homepage.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '1000px',
        width: '100%'
    };
    return (
        <>
            <div style={backgroundStyle}>
                <Navbar/>
                <section className={styles.container}>
                    <h1 className={styles.title}>We are sharing food</h1>
                    <button onClick={handleButtonClick} className={styles.btn}>Find a meal</button>
                </section>
            </div>
        </>
    );
}

export default HomePage;
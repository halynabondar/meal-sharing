"use client"

import React, {useEffect, useState} from 'react';
import styles from './HomePage.module.css';
import Navbar from "../Navbar.jsx";
import {useNavigate} from 'react-router-dom';
import Meal from "../Meals/Meal.jsx";
import Footer from "../Footer/Footer.jsx";

function HomePage() {
    const [meals, setMeals] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3007/api/meals${document.location.search}`);
            const data = await response.json();
            setMeals(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const visibleMeals = meals.slice(0, 6);

    const handleButtonClick = () => {
        navigate('/meals');
    };

    const backgroundStyle = {
        backgroundImage: 'url(/set-seafood.avif)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '700px',
        paddingTop: '30px',
    };
    return (
        <>
            <Navbar/>
            <div style={backgroundStyle}>
                <section className={styles.container}>
                    <h1 className={styles.title}>We are sharing food</h1>
                    <p className={styles.text}>Bringing people together, one meal at a time – share flavors, create
                        memories, and feel the
                        warmth of community.</p>
                </section>
            </div>
            <div className={styles.mealsContainer}>
                {visibleMeals.map((meal, index) => (
                    <Meal key={index} meal={meal}/>
                ))}
            </div>
            <div className={styles.btnContainer}>
                <button onClick={handleButtonClick} className={styles.btn}>Find more meals</button>
            </div>
            <Footer />
        </>
    );
}

export default HomePage;
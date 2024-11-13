"use client"

import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Navbar from "../../Navbar.jsx";
import MealDetails from "../MealDetails.jsx";
import styles from "./MealPage.module.css";
import Footer from "../../Footer/Footer.jsx";
import Reviews from "../../Reviews.jsx";

function MealPage() {
    const {id} = useParams();
    const [meal, setMeal] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3007/api/meals/${id}`);
            const data = await response.json();
            setMeal(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Navbar/>
            <div className={styles.container}>
                <h1 className={styles.title}>Meal Details for Id: {id}</h1>
                <div>
                    {meal ? (
                        <MealDetails key={meal.id} meal={meal}/>
                    ) : (
                        <p>Loading meals...</p>
                    )}
                </div>
                <Reviews />
            </div>

            <Footer />
        </>
    );
}

export default MealPage;

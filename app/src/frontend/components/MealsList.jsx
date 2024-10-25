"use client";
import Meal from "./Meal.jsx";
import React, {useEffect, useState} from 'react';
import styles from "./MealList.module.css";

function MealsList() {
    const [meals, setMeals] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3006/all-meals');
            const data = await response.json();
            setMeals(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h2 className={styles.mealsListTitle}>Meals</h2>
            <div className={styles.mealsContainer}>
                {meals.length > 0 ? (
                    meals.map((meal, index) => (
                        <Meal meal={meal} />
                    ))
                ) : (
                    <p>Loading meals...</p>
                )}
            </div>
        </>
    )
}

export default MealsList;
import React from 'react';
import styles from './Meal.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from "@fortawesome/free-solid-svg-icons";

function Meal({meal}) {
    return (
        <div className={styles.mealItem}>
            <h3 className={styles.mealTitle}>{meal.title}</h3>
            <div className={styles.mealImage}>
                <img
                    src={"https://www.allrecipes.com/thmb/zJzTLhtUWknHXVoFIzysljJ9wR8=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg"}
                    alt={"photo"}></img>
            </div>
            <p className={styles.mealRating}><FontAwesomeIcon icon={faStar}/> <FontAwesomeIcon
                icon={faStar}/> <FontAwesomeIcon icon={faStar}/> <FontAwesomeIcon icon={faStar}/> <FontAwesomeIcon
                icon={faStar}/></p>
            <p className={styles.mealDescription}>{meal.description}</p>
            <p className={styles.mealPrice}><b>Price:</b> {meal.price} kr</p>
            <button className={styles.mealBtn}>Add a reservation</button>
        </div>
    );
}

export default Meal;
import React from 'react';
import styles from './Meal.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from "@fortawesome/free-solid-svg-icons";

function Meal({meal}) {
    return (
        <div className={styles.mealItem}>
            <div className={styles.mealImage}>
                <img
                    src={"https://www.allrecipes.com/thmb/EVkTRink6ZvQFts1yXOYTsqQDQw=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-269500-creamy-garlic-pasta-Beauties-4x3-f404628aad2a435a9985b2cf764209b5.jpg"}
                    alt={"meal.title"}></img>
            </div>
            <h3 className={styles.mealTitle}>{meal.title}</h3>
            {/*<p className={styles.mealRating}><FontAwesomeIcon icon={faStar}/> <FontAwesomeIcon*/}
            {/*    icon={faStar}/> <FontAwesomeIcon icon={faStar}/> <FontAwesomeIcon icon={faStar}/> <FontAwesomeIcon*/}
            {/*    icon={faStar}/></p>*/}
            <p className={styles.mealDescription}>{meal.description}</p>
            <p className={styles.mealPrice}><b>Price:</b> {meal.price} kr</p>
            {/*<button className={styles.mealBtn}>Add review</button>*/}
            {/*<button className={styles.mealBtn}>Add reservation</button>*/}
        </div>
    );
}

export default Meal;
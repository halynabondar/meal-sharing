import React from 'react';
import styles from './Meal.module.css';
import {useNavigate} from 'react-router-dom';

function Meal({meal}) {
    const navigate = useNavigate();

    const handleMoreInfoClick = () => {
        navigate(`/meals/${meal.id}`);
    };

    return (
        <div className={styles.mealItem}>
            <h3 className={styles.mealTitle}>{meal.title}</h3>
            <div className={styles.mealImage}>
                <img
                    src={"https://www.allrecipes.com/thmb/EVkTRink6ZvQFts1yXOYTsqQDQw=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-269500-creamy-garlic-pasta-Beauties-4x3-f404628aad2a435a9985b2cf764209b5.jpg"}
                    alt={"meal.title"}></img>
            </div>
            <div className={styles.mealItemBottom}>
                <button onClick={handleMoreInfoClick} className={styles.mealBtn}>More info</button>
            </div>
        </div>
    );
}

export default Meal;
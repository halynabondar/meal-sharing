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
                    src={meal.image_url}
                    alt={meal.title}></img>
            </div>
            <div className={styles.mealItemBottom}>
                <button onClick={handleMoreInfoClick} className={styles.mealBtn}>More info</button>
            </div>
        </div>
    );
}

export default Meal;
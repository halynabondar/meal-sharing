import React, {useEffect, useState} from 'react';
import styles from './HomeMeal.module.css';
import Star from "../Star.jsx";

function HomeMeal({meal}) {
    const [averageRating, setAverageRating] = useState(meal.stars || 0);

    // Fetch average rating
    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
                const response = await fetch(`http://localhost:3007/api/meals/${meal.id}/reviews`);
                const data = await response.json();

                let sum = 0;
                data.forEach(review => {sum = sum + review.stars});

                const average = sum / data.length;
                setAverageRating(average);
            } catch (error) {
                console.error("Failed to fetch rating:", error);
            }
        };

        fetchAverageRating();
    }, [meal.id]);

    const renderStars = () => {
        const filledStars = Math.floor(averageRating);
        const totalStars = 5;

        return Array.from({ length: totalStars }, (_, index) => (
            <Star
                key={index}
                filled={index < filledStars}
                color="#ffa600"
                emptyColor="#fff"
                size={14}
            />
        ));
    };

    return (
        <>
            <div className={styles.mealContainer} style={{
                backgroundImage: `url(${meal.image_url})`
            }}>
                <div className={styles.mealPrice}>{meal.price} kr.</div>
                <div className={styles.mealTitle}>{meal.title}</div>
                <div className={styles.mealStars}>
                    <span className={styles.span}>{averageRating.toFixed(1)}</span> {renderStars()}
                </div>
            </div>
        </>
    );
}

export default HomeMeal;
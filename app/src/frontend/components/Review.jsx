import styles from "./Reviews.module.css";
import React from "react";
import Star from "./Star.jsx";

function Review({review}) {

    const formatDayWithSuffix = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const suffix =
            day === 1 || day === 21 || day === 31 ? 'st' :
                day === 2 || day === 22 ? 'nd' :
                    day === 3 || day === 23 ? 'rd' : 'th';

        return `${day}${suffix} ${new Intl.DateTimeFormat('en-GB', {month: 'short', year: 'numeric'}).format(date)}`;
    }

    const date = review.created_date;
    const formattedDateWithSuffix = formatDayWithSuffix(date);

    const renderStars = () => {
        const filledStars = review.stars;
        const totalStars = 5;

        return Array.from({ length: totalStars }, (_, index) => (
            <Star
                key={index}
                filled={index < filledStars}
                color="#ffa600"
                emptyColor="#ccc"
                size={16}
            />
        ));
    };

    return (
        <>
            <div className={styles.reviewItem}>
                <div className={styles.reviewTop}>
                    <div className={styles.starRating}>
                        {renderStars()}
                    </div>
                    <p className={styles.date}>{formattedDateWithSuffix}</p>
                </div>
                <h3 className={styles.title}>{review.title}</h3>
                <p className={styles.description}>{review.description}</p>
            </div>
        </>
    )
}

export default Review;


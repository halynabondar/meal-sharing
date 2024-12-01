import React, {useEffect, useState} from 'react';
import styles from "./MealDetails.module.css";
import FormReview from "../Form/FormReview.jsx";
import FormReservation from "../Form/FormReservation.jsx";
import Modal from "../Form/Modal.jsx";
import Star from "../Star.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function MealDetails({meal}) {
    const [modalReviewActive, setModalReviewActive] = useState(false);
    const [modalReserveActive, setModalReserveActive] = useState(false);
    const [averageRating, setAverageRating] = useState(meal.stars || 0);

    const date = new Date(meal.when);
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour12: false
    };
    const formattedDate = date.toLocaleString('en-GB', options).replace(",", "").split(" ");
    const swappedDateTime = `${formattedDate[1]} ${formattedDate[0]}`;

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

    // Refresh rating after a new review is submitted
    const handleReviewSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3007/api/reviews/${meal.id}/stars`);
            const data = await response.json();
            setAverageRating(data.averageRating);
        } catch (error) {
            console.error("Failed to refresh rating:", error);
        }
    }

    const renderStars = () => {
        const filledStars = Math.floor(averageRating);
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
        <div>
            <div className={styles.mealContainer}>
                <div className={styles.mealItem}>
                    <div className={styles.mealColumn}>
                        <div className={styles.mealImage}>
                            <img src={meal.image_url} alt={meal.title}></img>
                        </div>
                    </div>
                    <div className={styles.mealColumn}>
                        <h3 className={styles.mealTitle}>{meal.title}</h3>
                        <div className={styles.starRating}>
                            {renderStars()} <span>{averageRating.toFixed(1)} / 5</span>
                        </div>
                        <div className={styles.mealInformation}>
                            <p className={styles.mealDescription}>{meal.description}</p>
                            <p className={styles.mealLocation}><FontAwesomeIcon icon={faLocationDot} style={{ color: 'blue' }} /> {meal.location}</p>
                            <p className={styles.mealDate}><b>Date:</b> {swappedDateTime}</p>
                            <p className={styles.mealReservations}><b>Available
                                reservations:</b> {meal.available_reservations}</p>
                            <p className={styles.mealPrice}><b>Price:</b> {meal.price} kr</p>
                        </div>
                        <div className={styles.mealButtons}>
                            <button className={styles.mealBtn} onClick={() => setModalReviewActive(true)}>Review
                            </button>
                            {meal.available_reservations > 0 ? <button className={styles.mealBtn}
                                                                       onClick={() => setModalReserveActive(true)}>Reserve</button> : null}
                        </div>
                    </div>
                </div>
            </div>
            <Modal active={modalReviewActive} setActive={setModalReviewActive}>
                <FormReview modalActive={setModalReviewActive} onReviewSubmit={handleReviewSubmit} />
            </Modal>
            <Modal active={modalReserveActive} setActive={setModalReserveActive}>
                <FormReservation modalActive={setModalReserveActive}/>
            </Modal>
        </div>
    );
}

export default MealDetails;
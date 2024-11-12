import React, {useState} from 'react';
import styles from "./MealDetails.module.css";
import FormReview from "../../Form/FormReview.jsx";
import FormReservation from "../../Form/FormReservation.jsx";
import Modal from "../../Form/Modal.jsx";

function MealDetails({meal}) {
    const [modalReviewActive, setModalReviewActive] = useState(false);
    const [modalReserveActive, setModalReserveActive] = useState(false);

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
                        <div className={styles.mealInformation}>
                            <p className={styles.mealDescription}>{meal.description}</p>
                            <p className={styles.mealStars}><b>Rating:</b> {meal.stars}</p>
                            <p className={styles.mealLocation}><b>Location:</b> {meal.location}</p>
                            <p className={styles.mealDate}><b>Date:</b> {swappedDateTime}</p>
                            <p className={styles.mealReservations}><b>Available
                                reservations:</b> {meal.available_reservations}</p>
                            <p className={styles.mealPrice}><b>Price:</b> {meal.price} kr</p>
                        </div>
                        <div className={styles.mealButtons}>
                        <button className={styles.mealBtn} onClick={() => setModalReviewActive(true)}>Review
                            </button>
                            {meal.available_reservations > 0 ? <button className={styles.mealBtn} onClick={() => setModalReserveActive(true)}>Reserve</button> : null }
                        </div>
                    </div>
                </div>
            </div>
            <Modal active={modalReviewActive} setActive={setModalReviewActive}>
                <FormReview modalActive={setModalReviewActive}/>
            </Modal>
            <Modal active={modalReserveActive} setActive={setModalReserveActive}>
                <FormReservation modalActive={setModalReserveActive}/>
            </Modal>
        </div>
    );
}

export default MealDetails;
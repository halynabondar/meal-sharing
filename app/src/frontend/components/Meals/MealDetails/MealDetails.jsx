import React, {useState} from 'react';
import styles from "./MealDetails.module.css";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FormReview from "../../Form/FormReview.jsx";
import FormReservation from "../../Form/FormReservation.jsx";
import Modal from "../../Form/Modal.jsx";

function MealDetails({meal}) {
    const [modalReviewActive, setModalReviewActive] = useState(false);
    const [modalReserveActive, setModalReserveActive] = useState(false);

//     const [showReviewForm, setShowReviewForm] = useState(false);
//     const [showReservationForm, setShowReservationForm] = useState(false);
//     const toggleReviewForm = () => setShowReviewForm(!showReviewForm);
//     const toggleReservationForm = () => setShowReservationForm(!showReservationForm);
//
//     // Render rating
//     function renderStarRating(film) {
//         const filmRating = document.createElement('div');
//         filmRating.classList.add('film-rating');
//
//         for (let i = 0; i < 5; i++) {
//             const starIcon = document.createElement('i');
//             starIcon.classList.add('fa-regular', 'fa-star');
//             filmRating.appendChild(starIcon);
//
//             starIcon.addEventListener('click', () => {
//                 film.rating = i + 1;
//                 updateStars(filmRating, film.rating);
//             });
//         }
//
//         updateStars(filmRating, film.rating || 0);
//
//         return filmRating;
//     }
//
// // Update star rating
//     function updateStars(ratingContainer, rating) {
//         const stars = ratingContainer.querySelectorAll('.film-rating i');
//         stars.forEach((star, index) => {
//             star.classList.toggle('fa-solid', index < rating);
//             star.classList.toggle('fa-regular', index >= rating);
//         });
//     }

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
                            <img
                                src={"https://www.allrecipes.com/thmb/EVkTRink6ZvQFts1yXOYTsqQDQw=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-269500-creamy-garlic-pasta-Beauties-4x3-f404628aad2a435a9985b2cf764209b5.jpg"}
                                alt={"meal.title"}></img>
                        </div>
                    </div>
                    <div className={styles.mealColumn}>
                        <h3 className={styles.mealTitle}>{meal.title}</h3>
                        <div className={styles.mealRating}><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon
                            icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                        </div>
                        <div className={styles.mealInformation}>
                            <p className={styles.mealDescription}>{meal.description}</p>
                            <p className={styles.mealLocation}><b>Location:</b> {meal.location}</p>
                            <p className={styles.mealDate}><b>When:</b> {swappedDateTime}</p>
                            <p className={styles.mealReservations}><b>Available
                                reservations:</b> {meal.max_reservations}</p>
                            <p className={styles.mealPrice}><b>Price:</b> {meal.price} kr</p>
                        </div>
                        <div className={styles.mealButtons}>
                            <button className={styles.mealBtn} onClick={() => setModalReviewActive(true)}>Review
                            </button>
                            <button className={styles.mealBtn} onClick={() => setModalReserveActive(true)}>Reserve
                            </button>
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
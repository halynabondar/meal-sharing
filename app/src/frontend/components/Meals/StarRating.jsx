"use client"

import {useState} from "react";

export default function StarRating({ stars }) {
        const [showReviewForm, setShowReviewForm] = useState(false);
    const [showReservationForm, setShowReservationForm] = useState(false);
    const toggleReviewForm = () => setShowReviewForm(!showReviewForm);
    const toggleReservationForm = () => setShowReservationForm(!showReservationForm);

    // Render rating
    function renderStarRating(film) {
        const filmRating = document.createElement('div');
        filmRating.classList.add('film-rating');

        for (let i = 0; i < 5; i++) {
            const starIcon = document.createElement('i');
            starIcon.classList.add('fa-regular', 'fa-star');
            filmRating.appendChild(starIcon);

            starIcon.addEventListener('click', () => {
                film.rating = i + 1;
                updateStars(filmRating, film.rating);
            });
        }

        updateStars(filmRating, film.rating || 0);

        return filmRating;
    }

// Update star rating
    function updateStars(ratingContainer, rating) {
        const stars = ratingContainer.querySelectorAll('.film-rating i');
        stars.forEach((star, index) => {
            star.classList.toggle('fa-solid', index < rating);
            star.classList.toggle('fa-regular', index >= rating);
        });
    }

    return (
            <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                    <span key={index} className={index < stars ? 'filled' : 'empty'}></span>
                ))}
            </div>
        );
}
import styles from "./Reviews.module.css";
import React, {useEffect, useState} from "react";
import Review from "./Review.jsx";

export default function Reviews() {

    const [reviews, setReviews] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3007/api/reviews`);
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div className={styles.reviewContainer}>
                {reviews.length > 0 ? (
                    reviews.map((review, id) => (
                        <Review key={id} review={review}/>
                    ))
                ) : (
                    <p>Loading reviews...</p>
                )}
            </div>
        </>
    )
}
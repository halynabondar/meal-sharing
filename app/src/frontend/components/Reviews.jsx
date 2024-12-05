import styles from "./Reviews.module.css";
import React, {useEffect, useState} from "react";
import Review from "./Review.jsx";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';

export default function Reviews({meal_id}) {
    const [reviews, setReviews] = useState([]);

    const fetchData = async () => {
        try {
            // const response = await fetch(`http://localhost:3007/api/meals/${meal_id}/reviews`);
            const response = await fetch(`http://localhost:3007/api/reviews`);
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className={styles.swiperContainer}>
                <div className={styles.swiperItem}>
                    {reviews.length > 0 ? (
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={20}
                            loop={true}
                            pagination={{
                                clickable: true,
                            }}
                            grabCursor={true}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            {reviews.map((review, id) => (
                                <SwiperSlide key={id}>
                                    <Review review={review}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <p>Loading reviews...</p>
                    )}
                </div>
            </div>
        </>
    );
}

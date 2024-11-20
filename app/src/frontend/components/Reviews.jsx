import styles from "./Reviews.module.css";
import React, {useEffect, useState} from "react";
import Review from "./Review.jsx";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Grid, Pagination} from 'swiper/modules';

export default function Reviews() {
    const [reviews, setReviews] = useState([]);

    const fetchData = async () => {
        try {
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
                            slidesPerView={3}
                            spaceBetween={10}
                            grabCursor={true}
                            centeredSlides={false}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Grid, Pagination]}
                            className={styles.mySwiper}
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

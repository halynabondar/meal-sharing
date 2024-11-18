import styles from './HomeMealsSwiper.module.css';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import HomeMeal from "./HomeMeal.jsx";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {EffectCoverflow, Pagination, Navigation} from 'swiper/modules';

export default function HomeMealsSwiper() {
    const [meals, setMeals] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3007/api/meals${document.location.search}`);
            const data = await response.json();
            setMeals(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleButtonClick = () => {
        navigate('/meals');
    };

    return (
        <>
            <div className={styles.swiperContainer}>
                <div className={styles.swiperItem}>
                    {meals.length > 0 ?
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={false}
                            slidesPerView={3}
                            navigation={true}
                            coverflowEffect={{
                                rotate: 15,
                                stretch: 5,
                                depth: 50,
                                modifier: -1,
                                slideShadows: false
                            }}
                            pagination={true}
                            modules={[EffectCoverflow, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {meals.map((meal, index) => (
                                <SwiperSlide key={index}>
                                    <HomeMeal meal={meal}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        : (
                            <p>Loading reviews...</p>
                        )}
                </div>
                <div className={styles.btnContainer}>
                    <button onClick={handleButtonClick} className={styles.btn}>Find more meals</button>
                </div>
            </div>
        </>
    )
}
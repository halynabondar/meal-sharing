"use client"

import styles from './HomePage.module.css';
import Navbar from "../Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import HomeMealsSwiper from "./HomeMealsSwiper.jsx";
import {useNavigate} from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/meals');
    };

    const backgroundStyle = {
        backgroundImage: 'url(/background14.webp)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '850px',
        paddingTop: '30px',
        marginTop: '50px',
    };
    return (
        <>
            <Navbar/>
            <div style={backgroundStyle}>
                <section className={styles.container}>
                    {/*<h1 className={styles.title}>We are sharing food</h1>*/}
                    <p className={styles.text}>Bringing people together, one meal at a time – share flavors, create
                        memories, and feel the warmth of community.</p>
                    <div className={styles.containerBtn}>
                        <button className={styles.homeBtn} onClick={handleClick}>Get started</button>
                    </div>
                </section>
            </div>
            <HomeMealsSwiper/>
            <Footer/>
        </>
    );
}

export default HomePage;
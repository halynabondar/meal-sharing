"use client"

import styles from './HomePage.module.css';
import Navbar from "../Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import HomeMealsSwiper from "./HomeMealsSwiper.jsx";

function HomePage() {

    const backgroundStyle = {
        backgroundImage: 'url(/background14.webp)',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        height: '800px',
        paddingTop: '30px',
        marginTop: '50px',
    };
    return (
        <>
            <Navbar/>
            <div style={backgroundStyle}>
                <section className={styles.container}>
                    <p className={styles.text}>Bringing people together, one meal at a time – share flavors, create
                        memories, and feel the warmth of community.</p>
                    <div className={styles.containerBtn}>
                        <button className={styles.homeBtn}><a href="#target-section">Get started</a>
                        </button>
                    </div>
                </section>
            </div>
            <HomeMealsSwiper/>
            <Footer/>
        </>
    );
}

export default HomePage;
import React from 'react';
import Navbar from "../Navbar.jsx";
import styles from "./AboutUs.module.css";

export default function AboutUs() {
    const backgroundAboutUs = {
        backgroundImage: 'url(/public/background_about.jpg)',
        backgroundSize: '40%',
        backgroundRepeat: 'no-repeat',
        marginTop: '20px',
        backgroundPosition: 'right',
        height: '100%',
        width: '100%'
    };
    return (
        <>
            <Navbar/>
            <div style={backgroundAboutUs}>
                <section className={styles.container}>
                    <h1 className={styles.title}>About Us</h1>
                    <p className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aut
                        autem cupiditate deserunt et
                        laborum nostrum quod ratione repellendus sapiente. Ex itaque non vitae? Eveniet exercitationem
                        nemo
                        quia. Aliquid eos explicabo in quas, quia quis sint veritatis? Architecto inventore, ipsam
                        laboriosam.</p>
                    <button className={styles.btn}>Find a meal</button>
                </section>
            </div>
        </>
    )
}
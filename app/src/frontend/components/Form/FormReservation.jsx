"use client"

import React, {useState} from "react";
import styles from "./Form.module.css";

function FormReservation({modalActive}) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const path = document.location.pathname;
    const idMatch = path.match(/^\/meals\/([^\/]+)$/);
    const mealId = idMatch[1];

    const [formData, setFormData] = useState({
        number_of_guests: '',
        contact_name: '',
        contact_email: '',
        contact_phonenumber: '',
        meal_id: mealId
    });

    // Handle input changes
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleReservationSubmit = (event) => {
        event.preventDefault();

        const fetchOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        };

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3007/api/reservations`, fetchOptions);
                if (response.ok) {
                    modalActive(false);
                } else {
                    alert(`Error: Unable to make reservation.`);
                }
            } catch (error) {
                console.error("Error submitting reservation:", error);
                alert("An unexpected error occurred. Please try again.");
            }
        }
        fetchData();
    }

    return (
        <>
            <div className={styles.formContainer}>
                <h1 className={styles.formTitle}>Book reservation</h1>
                <form onSubmit={handleReservationSubmit} className={styles.form}>
                    <div className={styles.formItem}>
                        <label className={styles.formLabel} htmlFor="guests">Number of guests</label>
                        <input value={formData.number_of_guests} onChange={handleChange}
                               placeholder="Number of guests..." type="number" name="number_of_guests"
                               id="guests"
                               className={styles.formInput} required/>
                    </div>
                    <div className={styles.formItem}>
                        <label className={styles.formLabel} htmlFor="name">Name</label>
                        <input value={formData.contact_name} onChange={handleChange}
                               placeholder="Enter your name..."
                               type="text" name="contact_name" id="name"
                               className={styles.formInput} required/>
                    </div>
                    <div className={styles.formItem}>
                        <label className={styles.formLabel} htmlFor="email">Your e-mail</label>
                        <input value={formData.contact_email} onChange={handleChange}
                               placeholder="Enter your e-mail..."
                               type="text" name="contact_email" id="email"
                               className={styles.formInput} required/>
                    </div>
                    <div className={styles.formItem}>
                        <label className={styles.formLabel} htmlFor="phone">Your phone number</label>
                        <input value={formData.contact_phonenumber} onChange={handleChange}
                               minLength="8" placeholder="Enter your phone number..." type="text"
                               name="contact_phonenumber"
                               id="phone"
                               className={styles.formInput} required/>
                    </div>
                    <button onClick={handleClick}  type="submit" className={styles.formBtn}>Add reservation</button>
                </form>
            </div>
        </>
    )
}

export default FormReservation;
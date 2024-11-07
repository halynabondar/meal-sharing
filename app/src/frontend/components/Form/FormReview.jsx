import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import styles from "./Form.module.css";

function FormReview() {
    const path = document.location.pathname;
    const idMatch = path.match(/^\/meals\/([^\/]+)$/);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        stars: 5,
        meal_id: idMatch[1]
    });

    // Handle input changes
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const handleStarClick = (star) => {
    //     setFormData({
    //         ...formData,
    //         stars: star,
    //     });
    // };

    // Handle form submission
    const handleReviewSubmit = (event) => {
        event.preventDefault();
        const fetchOptions = {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json', // Content-Type header
            },
            body: JSON.stringify(formData) // Stringify JSON object for the body
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3007/api/reviews`, fetchOptions);
                if (response.status === 200) {
                    alert(response.body);
                } else {
                    alert(response.body);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }

    return (
        <>
            <div className={styles.formContainer}>
                <h1 className={styles.formTitle}>Tell us your experience</h1>
                <form onSubmit={handleReviewSubmit} className={styles.form}>
                    <div className={styles.formItem}>
                        <label className={styles.formLabel} htmlFor="title">Title</label>
                        <input value={formData.title} onChange={handleInputChange} placeholder="Enter title..."
                               type="text" name="title" id="title" className={styles.formInput} required/>
                    </div>
                    <div className={styles.formItem}>
                        <label className={styles.formLabel} htmlFor="description">Description</label>
                        <input value={formData.description} onChange={handleInputChange}
                               placeholder="Enter description..." type="text" name="description" id="description"
                               className={styles.formInputDescription} required/>
                    </div>
                    <div className={styles.mealRating}><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon
                        icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/>
                        <FontAwesomeIcon icon={faStar}/>
                    </div>
                    <button className={styles.formBtn}>Add review</button>
                </form>
            </div>
        </>
    )
}

export default FormReview;
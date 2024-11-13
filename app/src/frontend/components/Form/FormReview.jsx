import React, {useState} from "react";
import styles from "./Form.module.css";
import ReactStars from "react-rating-stars-component";

function FormReview({modalActive}) {
    const path = document.location.pathname;
    const idMatch = path.match(/^\/meals\/([^\/]+)$/);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        stars: 0,
        meal_id: idMatch ? idMatch[1] : null
    });

    // Handle input changes
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const ratingChangeHandler = (newRating) => {
        setFormData((prevData) => ({
            ...prevData,
            stars: newRating,
        }));
    };

    // Handle form submission
    const handleReviewSubmit = (event) => {
        event.preventDefault();
        const fetchOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3007/api/reviews`, fetchOptions);
                if (response.status === 200 || response.status === 201) {
                    modalActive(false);
                } else {
                    alert(response.body.toString());
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>Tell us your experience</h1>
            <form onSubmit={handleReviewSubmit} className={styles.form}>
                <div className={styles.formItem}>
                    <label className={styles.formLabel} htmlFor="title">Title</label>
                    <input
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter title..."
                        type="text"
                        name="title"
                        id="title"
                        className={styles.formInput}
                        required
                    />
                </div>
                <div className={styles.formItem}>
                    <label className={styles.formLabel} htmlFor="description">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter description..."
                        name="description"
                        id="description"
                        className={styles.formInputDescription}
                        required
                    />
                </div>
                <div className={styles.starRating}>
                    <ReactStars
                        count={5}
                        value={formData.stars}
                        onChange={ratingChangeHandler}
                        size={18}
                        activeColor="#ffa600"
                    />
                </div>
                <button className={styles.formBtn}>Add review</button>
            </form>
        </div>
    );
}

export default FormReview;
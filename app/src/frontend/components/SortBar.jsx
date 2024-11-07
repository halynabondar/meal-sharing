import React from 'react';
import styles from './SortFilter.module.css';

function SortBar() {
    return (
        <>
            <fieldset className={styles.panel}>
                <legend className={styles.legend}>Sort by:</legend>
                <div className={styles.items}>
                    <div className={styles.item}>
                        <input className={styles.input} type="radio" id="name" name="filterBy"></input>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className={styles.item}>
                        <input className={styles.input} type="radio" id="date" name="filterBy"></input>
                        <label htmlFor="date">Date</label>
                    </div>
                    <div className={styles.item}>
                        <input className={styles.input} type="radio" id="price" name="filterBy"></input>
                        <label htmlFor="price">Price</label>
                    </div>
                    <div className={styles.item}>
                        <input className={styles.input} type="radio" id="rating" name="filterBy"></input>
                        <label htmlFor="rating">Rating</label>
                    </div>
                </div>
            </fieldset>
        </>
    )
}

export default SortBar;
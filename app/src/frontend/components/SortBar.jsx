import React from 'react';
import styles from './SortFilter.module.css';

function SortBar() {
    return (
        <>
            <fieldset className={styles.panel}>
                <legend className={styles.legend}>Sort by:</legend>
                <div className={styles.items}>
                    <div className={styles.item}>
                        <input className={styles.input} type="Checkbox" id="name" name="name"></input>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className={styles.item}>
                        <input className={styles.input} type="Checkbox" id="date" name="date"></input>
                        <label htmlFor="date">Date</label>
                    </div>
                    <div className={styles.item}>
                        <input className={styles.input} type="Checkbox" id="price" name="price"></input>
                        <label htmlFor="price">Price</label>
                    </div>
                    <div className={styles.item}>
                        <input className={styles.input} type="Checkbox" id="rating" name="rating"></input>
                        <label htmlFor="rating">Rating</label>
                    </div>
                </div>
            </fieldset>
        </>
    )
}

export default SortBar;
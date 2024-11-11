import React from 'react';
import styles from "./SortFilter.module.css";

function FilterBar() {
    return (
        <>
            <fieldset className={styles.panel}>
                <legend className={styles.legend}>Filter by:</legend>
                <div className={styles.items}>
                    <div className={styles.item}>
                        <input className={styles.input} type="Checkbox" id="cheap" name="cheap"></input>
                        <label htmlFor="cheap">Cheap</label>
                    </div>
                    <div className={styles.item}>
                        <input className={styles.input} type="Checkbox" id="expensive" name="expensive"></input>
                        <label htmlFor="expensive">Expensive</label>
                    </div>
                    <div className={styles.item}>
                        <input className={styles.input} type="Checkbox" id="new" name="new"></input>
                        <label htmlFor="new">New</label>
                    </div>
                    <div className={styles.item}>
                        <input className={styles.input} type="Checkbox" id="highest" name="highest"></input>
                        <label htmlFor="highest">Highest rating</label>
                    </div>
                    <div className={styles.item}>
                        <input className={styles.input} type="Checkbox" id="available" name="available"></input>
                        <label htmlFor="available">Available</label>
                    </div>
                </div>
            </fieldset>
        </>
    )
}

export default FilterBar;
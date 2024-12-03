import React, {useState} from 'react';
import styles from './SortFilter.module.css';
import {useSearch} from "./SearchContext.jsx";

function SortBar() {
    const {setSorting} = useSearch(); // Access setFilters from the context
    const [sortOptions, setSortOptions] = useState(""); // Local state for the selected sort option

    const handleSortChange = (e) => {
        const selectedSort = e.target.value;
        setSortOptions(selectedSort); // Update local state
        setSorting(selectedSort); // Update filters in context
    }

    return (
        <>
            <fieldset className={styles.panel}>
                <h4 className={styles.title}>Sort by</h4>
                <div className={styles.items}>
                    <div className={styles.item}>
                        <input className={styles.input} value="title" checked={sortOptions === "title"} onChange={handleSortChange} type="radio" id="title" name="sortBy"></input>
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className={styles.item}>
                        <input className={styles.input} value="when" checked={sortOptions === "when"} onChange={handleSortChange} type="radio" id="when" name="sortBy"></input>
                        <label htmlFor="when">Date</label>
                    </div>
                    <div className={styles.item}>
                        <input className={styles.input} value="price" checked={sortOptions === "price"} onChange={handleSortChange} type="radio" id="price" name="sortBy"></input>
                        <label htmlFor="price">Price</label>
                    </div>
                    <div className={styles.item}>
                        <input className={styles.input} value="rating" checked={sortOptions === "rating"} onChange={handleSortChange} type="radio" id="rating" name="sortBy"></input>
                        <label htmlFor="rating">Rating</label>
                    </div>
                </div>
            </fieldset>
        </>
    )
}

export default SortBar;
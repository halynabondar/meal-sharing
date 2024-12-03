import React, {useState} from 'react';
import styles from "./../Meals/MealList.module.css";
import {useSearch} from "./SearchContext.jsx";

function ResultsPaginator() {
    const {state, loadMore} = useSearch();

    const handleLoadMore = () => {
        loadMore();
    }
    return (
        <>
            {state.results.length < state.allResults.length && (
                <button onClick={handleLoadMore} className={styles.showMoreBtn}
                        aria-label="Show more meals">
                    Show More
                </button>
            )}
        </>
    );
}

export default ResultsPaginator;
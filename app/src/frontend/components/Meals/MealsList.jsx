import React from "react";
import styles from "./MealList.module.css";
import Navbar from "../Navbar.jsx";
import SortBar from "../SearchSortFilter/SortBar.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchBar from "../SearchSortFilter/SearchBar.jsx";
import {SearchProvider} from "../SearchSortFilter/SearchContext.jsx";
import FilterBar from "../SearchSortFilter/FilterBar.jsx";
import Results from "../SearchSortFilter/Results.jsx";


function MealsList() {

    return (
        <>
            <SearchProvider>
                <Navbar />
                <SearchBar />
                <section className={styles.container}>
                    <div className={styles.aside}>
                        <SortBar />
                        <FilterBar />
                    </div>
                    <div className={styles.column}>
                        <div className={styles.mealsContainer}>
                            <Results></Results>
                        </div>
                        <div>
                            {/*{visibleCount < meals.length && (*/}
                            {/*    <button onClick={showMoreMeals} className={styles.showMoreBtn}*/}
                            {/*            aria-label="Show more meals">*/}
                            {/*        Show More*/}
                            {/*    </button>*/}
                            {/*)}*/}
                        </div>
                    </div>
                </section>
            </SearchProvider>
            <Footer/>
        </>
    );
}

export default MealsList;

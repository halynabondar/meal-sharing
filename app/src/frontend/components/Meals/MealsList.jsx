import React from "react";
import styles from "./MealList.module.css";
import Navbar from "../Navbar.jsx";
import SortBar from "../SearchSortFilter/SortBar.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchBar from "../SearchSortFilter/SearchBar.jsx";
import {SearchProvider} from "../SearchSortFilter/SearchContext.jsx";
import FilterBar from "../SearchSortFilter/FilterBar.jsx";
import Results from "../SearchSortFilter/Results.jsx";
import ResultsPaginator from "../SearchSortFilter/ResultsPaginator.jsx";


function MealsList() {

    return (
        <>
            <SearchProvider>
                <Navbar/>
                <div className={styles.main}>
                    <SearchBar/>
                    <section className={styles.container}>
                        <div className={styles.aside}>
                            <SortBar/>
                            <FilterBar/>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.mealsContainer}>
                                <Results/>
                            </div>
                            <div>
                                <ResultsPaginator />
                            </div>
                        </div>
                    </section>
                </div>
            </SearchProvider>
            <Footer/>
        </>
    );
}

export default MealsList;

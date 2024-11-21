import Meal from "./Meal.jsx";
import React, { useEffect, useState } from "react";
import styles from "./MealList.module.css";
import Navbar from "../Navbar.jsx";
import SortBar from "../SearchSortFilter/SortBar.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchPage from "../SearchSortFilter/SearchPage.jsx";
import Results from "../SearchSortFilter/Results.jsx";

function MealsList() {
    const [meals, setMeals] = useState([]);
    const [visibleCount, setVisibleCount] = useState(9);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const showMoreMeals = () => {
        setVisibleCount((prev) => prev + 9);
    };

    const fetchData = async () => {
        try {
            const searchParams = new URLSearchParams(document.location.search);
            const query = searchParams.toString();
            const response = await fetch(`http://localhost:3007/api/meals?${query}`);
            if (!response.ok) throw new Error("Failed to fetch meals");
            const data = await response.json();
            setMeals(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <Navbar />
            <SearchPage />
            <SortBar />
            <Results />
            <section className={styles.container}>
                <div className={styles.aside}>

                </div>
                <div className={styles.column}>
                    <div className={styles.mealsContainer}>
                        {isLoading ? (
                            <p>Loading meals...</p>
                        ) : error ? (
                            <p className={styles.error}>{error}</p>
                        ) : meals.length > 0 ? (
                            meals.slice(0, visibleCount).map((meal) => (
                                <Meal key={meal.id} meal={meal} />
                            ))
                        ) : (
                            <p>No meals available.</p>
                        )}
                    </div>
                    <div>
                        {visibleCount < meals.length && (
                            <button onClick={showMoreMeals} className={styles.showMoreBtn} aria-label="Show more meals">
                                Show More
                            </button>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default MealsList;

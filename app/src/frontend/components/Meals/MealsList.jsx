import Meal from "./Meal.jsx";
import React, {useEffect, useState} from 'react';
import styles from "./MealList.module.css";
import Navbar from "../Navbar.jsx";
import SortBar from "../SortBar.jsx";
import FilterBar from "../FilterBar.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchContainer from "../SearchContainer.jsx";

function MealsList() {
    const [meals, setMeals] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3007/api/meals${document.location.search}`);
            const data = await response.json();
            setMeals(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <SearchContainer />
            <section className={styles.container}>
                <div className={styles.aside}>
                    <SortBar />
                    <FilterBar />
                </div>
                <div>
                    <div className={styles.mealsContainer}>
                        {meals.length > 0 ? (
                            meals.map((meal, index) => (
                                <Meal key={index} meal={meal}/>
                            ))
                        ) : (
                            <p>Loading meals...</p>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default MealsList;
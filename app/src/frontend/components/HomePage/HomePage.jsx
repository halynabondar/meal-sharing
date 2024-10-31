import React from 'react';
import MealsList from '../MealsList.jsx';
import styles from './HomePage.module.css';

function HomePage({title, description, price}) {
    return (
        <div>
            <h1 className={styles.title}>Welcome to the HomePage</h1>
            <MealsList title={title} description={description} price={price} />
        </div>
    );
}

export default HomePage;
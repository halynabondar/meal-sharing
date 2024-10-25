"use client"

import React from 'react';
import MealsList from '../MealsList';

function HomePage() {
    return (
        <div>
            <h1>Welcome to the HomePage</h1>
            <MealsList title={title} description={description} price={price} />
        </div>
    );
}

export default HomePage;
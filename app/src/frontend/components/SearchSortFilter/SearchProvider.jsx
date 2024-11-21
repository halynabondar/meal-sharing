import React from 'react';
import {SearchProvider} from "./SearchContext.jsx";
import MealsList from "../Meals/MealsList.jsx";

function SearchProvider() {
    return (
        <SearchProvider>
            <MealsList />
        </SearchProvider>
    )
}

export default SearchProvider;
import React from 'react';
import {useSearch} from "./SearchContext.jsx";
import Meal from "../Meals/Meal.jsx";

const Results = () => {
    const {state} = useSearch();

    return (
        <>
            {state.results.length > 0 ? (
                state.results.map((meal) => (
                    <Meal key={meal.id} meal={meal}/>
                ))
            ) : (
                <div>No meals available.</div>
            )}
        </>
    );
};

export default Results;
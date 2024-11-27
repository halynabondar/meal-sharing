import React, {createContext, useContext, useEffect, useReducer} from "react";

const SearchContext = createContext();

const searchReducer = (state, action) => {
    switch (action.type) {
        case "SET_RESULTS":
            return {...state, results: action.payload};
        case "SET_FILTERS":
            return {...state, filters: action.payload};
        default:
            return state;
    }
};

export const SearchProvider = ({children}) => {
    const [state, dispatch] = useReducer(searchReducer, {results: [], filters: {}});



    const objectToQueryParams = (data) => {
        if (!data) return '';

        let pairs = [];
        Object.keys(data).forEach((key) => { pairs.push(`${key}=${data[key]}`); });
        return pairs.join('&');
    }


    const fetchResults = async (searchParams) => {
        try {
            const response = await fetch(`http://localhost:3007/api/meals?${objectToQueryParams(searchParams)}`);
            const data = await response.json();
            dispatch({ type: "SET_RESULTS", payload: data });
        } catch (error) {
            console.error("Error fetching results:", error);
        }
    }

    useEffect(() => {
        fetchResults();
    }, [])


    const setFilters = (filters) => {
        console.log('7')
        dispatch({type: "SET_FILTERS", payload: filters});
        fetchResults(filters); // Re-fetch with new filters
    }

    return (
        <SearchContext.Provider value={{state, fetchResults, setFilters, dispatch}}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearch = () => {
    const context = useContext(SearchContext);

    if (!context) {
        console.error("useSearch must be used within a SearchProvider");
    }
    return context;
}
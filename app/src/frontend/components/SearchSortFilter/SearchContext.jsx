import React, {createContext, useContext, useEffect, useReducer} from "react";

const SearchContext = createContext();

const searchReducer = (state, action) => {
    switch (action.type) {
        case "SET_RESULTS":
            return {...state, results: action.payload};
        case "SET_FILTERS":
            return {...state, filters: action.payload};
        case "SET_SORTING":
            return {...state, sort: action.payload};
        case "SET_SEARCH_QUERY":
            return {...state, query: action.payload};
        default:
            return state;
    }
};

export const SearchProvider = ({children}) => {
    const [state, dispatch] = useReducer(searchReducer, {results: [], filters: {}});
    const { filters, query, sort } = state;
    const objectToQueryParams = (data) => {
        if (!data) return '';

        let pairs = [];
        Object.keys(data).forEach((key) => { pairs.push(`${key}=${data[key]}`); });
        return pairs.join('&');
    }


    const fetchResults = async (params) => {
        try {
            const response = await fetch(`http://localhost:3007/api/meals?${objectToQueryParams(params)}`);
            const data = await response.json();
            dispatch({ type: "SET_RESULTS", payload: data });
        } catch (error) {
            console.error("Error fetching results:", error);
        }
    }

    const collectRequestParams = () => {
        const params = {
            ...filters,
            title: query,
            sortKey: sort

        }
        // Remove keys with undefined or null
        return Object.fromEntries(
            Object.entries(params).filter(([key, value]) => value !== undefined && value !== null)
        );
    }

    useEffect(() => {
        fetchResults(collectRequestParams());
    }, [filters, query, sort]);


    const setFilters = (data) => {
        dispatch({type: "SET_FILTERS", payload: data});
    }

    const setSearchQuery = (data) => {
        dispatch({type: "SET_SEARCH_QUERY", payload: data});
    }

    const setSorting = (data) => {
        dispatch({type: "SET_SORTING", payload: data});
    }

    return (
        <SearchContext.Provider value={{state, fetchResults, setFilters, setSearchQuery, setSorting}}>
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
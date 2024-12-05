import React, {createContext, useContext, useEffect, useReducer} from "react";
import results from "./Results.jsx";

const SearchContext = createContext();

const resultsPerPage = 6;

const getNextPage = (allResults, currentPage) => {
    // Calculate starting and ending indices
    const totalResults = allResults.length;
    const startIndex = currentPage * resultsPerPage;

    // Check if startIndex is beyond total results, if so return an empty array
    if (startIndex >= totalResults) {
        return [];
    }

    const endIndex = startIndex + resultsPerPage;

    // Extract and return elements within the range, gracefully handling the end
    return allResults.slice(startIndex, endIndex);
};


const searchReducer = (state, action) => {
    switch (action.type) {
        case "SET_RESULTS":
            const allResults = action.payload;
            return {...state, results: getNextPage(allResults, 0),   allResults: allResults, page: 0};
        case "SET_FILTERS":
            return {...state, filters: action.payload};
        case "SET_SORTING":
            return {...state, sort: action.payload};
        case "SET_SEARCH_QUERY":
            return {...state, query: action.payload};
        case "LOAD_MORE":
            // Load new results only if there is something to load
            if (state.results.length < state.allResults.length) {
                const nextPage = state.page + 1;
                const nextPageItems = [...state.results, ...getNextPage(state.allResults, nextPage)];

                return {
                    ...state,
                    page: nextPage,
                    results: nextPageItems
                };
            } else {
                // Otherwise return what was before, or basically do nothing and ignore the action
                return state;
            }
        default:
            return state;
    }
};

export const SearchProvider = ({children}) => {
    const [state, dispatch] = useReducer(searchReducer, {results: [], allResults: [], filters: {}});
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
        if (params.sortKey === 'rating') {
            params.sortDir = 'desc';
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

    const loadMore = () => {
        dispatch({type: "LOAD_MORE"});
    }

    return (
        <SearchContext.Provider value={{state, fetchResults, setFilters, setSearchQuery, setSorting, loadMore}}>
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
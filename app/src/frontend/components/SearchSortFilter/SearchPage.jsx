import React from 'react';
import SearchBar from "./SearchBar.jsx";
import FilterBar from "./FilterBar.jsx";
import Results from "./Results.jsx";


const SearchPage = () => {
    return (
        <div>
            <SearchBar />
            <FilterBar />
            <Results />
        </div>
    )
}

export default SearchPage;
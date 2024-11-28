import React, {useState} from "react";
import {useSearch} from "./SearchContext.jsx";
import styles from './SearchBar.module.css';


function SearchBar() {
    const {setSearchQuery} = useSearch();
    const [query, setQuery] = useState();

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(query);
    }

    return (
        <>
            <form className={styles.searchForm} onSubmit={handleSearch}>
                <input className={styles.searchInput} value={query} onChange={(e) => setQuery(e.target.value)} type="text" id="input" name="search" placeholder="Search..." />
                <button className={styles.searchBtn} type="submit">Search</button>
            </form>
        </>
    )
}

export default SearchBar;
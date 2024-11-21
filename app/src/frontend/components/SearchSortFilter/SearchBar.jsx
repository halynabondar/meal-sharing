import React, {useState} from "react";
import {useSearch} from "./SearchContext.jsx";
import styles from './SearchBar.module.css';

function SearchBar() {
    const {fetchResults} = useSearch();
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        fetchResults({query});
    }

    return (
        <>
            <form className={styles.searchForm}>
                <input className={styles.searchInput} value={query} onChange={(e) => setQuery(e.target.value)} type="text" id="input" name="search" placeholder="Search..." />
                <button className={styles.searchBtn} onClick={handleSearch}>Search</button>
            </form>
        </>
    )
}

export default SearchBar;
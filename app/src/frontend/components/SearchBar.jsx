import React, {useState} from "react";
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    }
    return (
        <>
            <form className={styles.searchForm}>
                <input className={styles.searchInput} value={query} onChange={handleChange} type="text" id="input" name="search" />
                <button className={styles.searchBtn}>Search</button>
            </form>
        </>
    )
}

export default SearchBar;
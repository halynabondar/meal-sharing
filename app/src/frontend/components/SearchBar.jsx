import React, {useState} from "react";
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <>
            <form className={styles.searchForm} onSubmit={handleFormSubmit}>
                <input className={styles.searchInput} value={query} onChange={handleInputChange} type="text" id="input" name="search" placeholder="Search..." />
                <button className={styles.searchBtn} type="submit">Search</button>
            </form>
        </>
    )
}

export default SearchBar;
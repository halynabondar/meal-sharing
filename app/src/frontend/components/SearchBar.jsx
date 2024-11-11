import React from "react";
import styles from './SearchBar.module.css';

function clearInput() {
    document.getElementById("searchInput").value = "";
    document.getElementById("searchInput").focus();
}

function Search() {
    return (
        <>
            <form className={styles.searchForm}>
                <span className={styles.iconSearch}>🔍</span>
                <input className={styles.searchInput} type="text" id="input" name="search" />
                <span className={styles.iconClear} onClick={clearInput}>✖️</span>
                <button className={styles.searchBtn}>Search</button>
            </form>
        </>
    )
}

export default Search;
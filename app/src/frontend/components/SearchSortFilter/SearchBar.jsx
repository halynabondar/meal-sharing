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

    const clearInput = () => {
        if (query && query !== "") {
            setQuery("");
            setSearchQuery(undefined);
        }
    }

    return (
        <>
            <div className={styles.container}>
                <form className={styles.searchForm} onSubmit={handleSearch}>
                    <div className={styles.inputWrapper}>
                        <input className={styles.searchInput} value={query} onChange={(e) => setQuery(e.target.value)}
                               type="text" required placeholder="Search..."/>
                        {query && (
                            <button type="button" className={styles.clearBtn} onClick={clearInput}>&times;</button>
                        )}
                    </div>
                    <button className={styles.searchBtn} type="submit">Search</button>
                </form>
            </div>
        </>
    )
}

export default SearchBar;
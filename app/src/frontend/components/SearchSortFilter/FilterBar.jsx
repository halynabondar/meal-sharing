import React from 'react';
import styles from "./SortFilter.module.css";
import {useSearch} from "./SearchContext.jsx";
import {Slider} from "@mui/material";
import FirstComponent from "../Date.jsx";

function FilterBar() {
    const {setFilters} = useSearch();

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    }

    return (
        <>
            <fieldset className={styles.panel}>
                <legend className={styles.legend}>Filter by:</legend>
                <legend className={styles.legend}>By price:</legend>
                <div className={styles.items}>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                    <legend className={styles.legend}>By date:</legend>
                    <FirstComponent />
                    <legend className={styles.legend}>By availability:</legend>
                    <div className={styles.item}>
                        <input className={styles.input} type="Checkbox" id="available" name="available"></input>
                        <label htmlFor="available">Available only</label>
                    </div>
                </div>
                <div className={styles.itemsBtn}>
                    <button className={styles.btn} onClick={handleFilterChange}>Apply</button>
                    <button className={styles.btn}>Reset</button>
                </div>
            </fieldset>
        </>
    )
}

export default FilterBar;
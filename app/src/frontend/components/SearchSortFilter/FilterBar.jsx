import React, {useState} from 'react';
import styles from "./SortFilter.module.css";
import {useSearch} from "./SearchContext.jsx";
import {Slider} from "@mui/material";
import DatePickerPanel from "../Date.jsx";

function FilterBar() {
    const {setFilters} = useSearch();
    console.log(useSearch());
    const [priceRange, setPriceRange] = useState([150, 300]);

    const handleFilterChange = () => {
        setFilters({priceRange});
    }

    const handleChange = (event, newValue) => {
        setPriceRange(newValue);
    }

    const valuetext = (value) => `${value}$`;

    return (
        <>
            <fieldset className={styles.panel}>
                <h4 className={styles.title}>Filter by</h4>
                <div className={styles.item}>
                    <legend className={styles.legend}>By price:</legend>
                    <div className={styles.items}>
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={priceRange}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            min={0} max={500}
                        />
                        <legend className={styles.legend}>By date:</legend>
                        <DatePickerPanel/>
                        <legend className={styles.legend}>By availability:</legend>
                        <div className={styles.item}>
                            <input className={styles.input} type="Checkbox" id="available" name="available"></input>
                            <label htmlFor="available">Available only</label>
                        </div>
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
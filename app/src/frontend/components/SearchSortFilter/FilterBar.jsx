import React, {useState} from 'react';
import styles from "./SortFilter.module.css";
import {useSearch} from "./SearchContext.jsx";
import {Slider} from "@mui/material";
import DatePickerPanel from "../Date.jsx";

function FilterBar() {
    const {setFilters} = useSearch();
    const [priceRange, setPriceRange] = useState([5, 70]);
    const [date, setDate] = useState('');
    const [availableOnly, setAvailableOnly] = useState(false);

    const handleFilterChange = () => {
        setFilters({
            maxPrice: priceRange[1],
            minPrice: priceRange[0],
            dateBefore: date,
            availableOnly: availableOnly
        })
    }

    const handleFiltersReset = () => {setFilters({})}

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    }

    const handleDateChange = (event) => {
        const dataStr = event.toISOString().replace('T', ' ').replace(/\..+/, '');
        setDate(dataStr);
    }

    const handleAvailabilityChange = (event) => {
        setAvailableOnly(event.target.checked);
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
                            getAriaLabel={() => 'Price range'}
                            value={priceRange}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            min={0} max={100}
                        />
                        <legend className={styles.legend}>By date:</legend>
                        <DatePickerPanel
                            onChange={handleDateChange}
                        />
                        <legend className={styles.legend}>By availability:</legend>
                        <div className={styles.item}>
                            <input className={styles.input} type="Checkbox" id="available" name="available" onChange={handleAvailabilityChange}></input>
                            <label htmlFor="available">Available only</label>
                        </div>
                    </div>
                </div>
                <div className={styles.itemsBtn}>
                    <button className={styles.btn} onClick={handleFilterChange}>Apply</button>
                    <button className={styles.btn} onClick={handleFiltersReset}>Reset</button>
                </div>
            </fieldset>
        </>
    )
}

export default FilterBar;
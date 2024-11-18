import {useState} from "react";
import SearchBar from "./SearchBar.jsx";
import Meal from "./Meals/Meal.jsx";

function SearchContainer() {
    const [results, setResults] = useState([]);

    const handleSearch = async (query) => {
        const response = await fetch(`/api/search?query=${query}`);
        const data = await response.json();
        setResults(data);
    }

    return (
        <>
            <div>
                <SearchBar onSearch={handleSearch} />
                <ul>
                    {results.map((item) => (
                        <Meal key={item.id}>{item.title}</Meal>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default SearchContainer;
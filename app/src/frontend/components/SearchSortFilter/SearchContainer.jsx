// import {useState} from "react";
// import SearchBar from "./SearchBar.jsx";
// import Meal from "../Meals/Meal.jsx";
//
// function SearchContainer() {
//     const [results, setResults] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//
//     const handleSearch = async (query) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch(`/api/search?query=${query}`);
//             if (!response.ok) {
//                 throw new Error(`Error: ${response.statusText}`);
//             }
//             const data = await response.json();
//             setResults(data);
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <div>
//             <SearchBar onSearch={handleSearch} />
//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error}</p>}
//             <ul>
//                 {results.map((item) => (
//                     <Meal key={item.id}>{item.title}</Meal>
//                 ))}
//             </ul>
//         </div>
//     );
// }
//
// export default SearchContainer;
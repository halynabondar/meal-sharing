// import {useState} from "react";
// import SearchBar from "./SearchBar.jsx";
// import Meal from "../Meals/Meal.jsx";
//
// function objToQueryString(obj) {
//     const params = new URLSearchParams(obj);
//     return params.toString();
// }
//
// function SearchContainer() {
//     const [results, setResults] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//
//     const handleSearch = async (query) => {
//         setLoading(true);
//         setError(null);
//         const queryString = objToQueryString(query);
//
//         try {
//             const response = await fetch(`/api/search?${queryString}`);
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
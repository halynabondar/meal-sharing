import React from 'react';
import {useSearch} from "./SearchContext.jsx";

const Results = React.memo(() => {
    const { state } = useSearch();
    const { results } = state;

    return (
        <div>
            {results.map(result => (
                <div key={result.id}>{result.name}</div>
            ))}
        </div>
    );
});

export default Results;
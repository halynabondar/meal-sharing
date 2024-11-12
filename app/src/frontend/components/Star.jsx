import React from "react";

const Star = ({ filled, color = "#ffa600", emptyColor = "#ccc", size = 18 }) => (
    <svg
        height={size}
        width={size}
        viewBox="0 0 24 24"
        fill={filled ? color : emptyColor}
    >
        <path d="M12 .587l3.668 7.429 8.2 1.191-5.933 5.788 1.4 8.168L12 18.896l-7.335 3.865 1.4-8.168L.132 9.207l8.2-1.191z" />
    </svg>
);

export default Star;

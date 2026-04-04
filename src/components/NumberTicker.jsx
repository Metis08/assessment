import React, { useState, useEffect } from 'react';

const NumberTicker = ({ value, duration = 1500, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0);
    // Handle string values with commas or K suffixes
    const numericValue = typeof value === 'string'
        ? parseFloat(value.replace(/[^0-9.]/g, ''))
        : value;

    const isK = typeof value === 'string' && value.toUpperCase().includes('K');

    useEffect(() => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3); // cubic out

            const currentCount = easedProgress * numericValue;
            setCount(currentCount);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [numericValue, duration]);

    const formattedValue = isK
        ? (count / 1000).toFixed(1) + 'K'
        : Math.floor(count).toLocaleString();

    return <span>{prefix}{formattedValue}{suffix}</span>;
};

export default NumberTicker;

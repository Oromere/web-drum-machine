import React from "react";

export default function RangeInput({
    name,
    label,
    max,
    min,
    step,
    value,
    onChange,
}) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                name={name}
                id={name}
                type="range"
                min={min}
                max={max}
                value={value}
                step={step}
                onChange={onChange}
            />
            <span className="current-value">{value}</span>
        </div>
    );
}

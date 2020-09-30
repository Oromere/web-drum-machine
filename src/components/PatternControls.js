import React, { useState, useEffect } from "react";

export default function PatternControls({ pattern, number, onUpdate }) {
    const [active, setActive] = useState(pattern.active);
    useEffect(() => {
        pattern.setActive(active);
    }, [active]);

    const [stepLength, setStepLength] = useState(pattern.stepLength);
    useEffect(() => {
        pattern.setStepLength(stepLength);
        onUpdate();
    }, [stepLength]);

    const [repeats, setRepeats] = useState(pattern.repeats);
    useEffect(() => {
        pattern.setRepeats(repeats);
    }, [repeats]);

    const onClear = () => {
        pattern.clearSteps();
        onUpdate();
    };

    useEffect(() => {
        setActive(pattern.active);
        setStepLength(pattern.stepLength);
        setRepeats(pattern.repeats)
    }, [pattern])

    return (
        <div className="local-pattern-controls">
            <div className="pattern-title">{number + 1}</div>
            <div className="pattern-active-input">
                <label htmlFor="active">Active</label>
                <label className="switch" id="active">
                    <input
                        type="checkbox"
                        onChange={(e) => setActive(e.target.checked)}
                        checked={active}
                    />
                    <span className="slider"></span>
                </label>
            </div>
            <div className="pattern-length-input">
                <label htmlFor="length">Length</label>
                <select
                    name="length"
                    id="length"
                    type="select"
                    value={stepLength}
                    onChange={(e) => setStepLength(parseInt(e.target.value))}
                >
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                    <option value={16}>16</option>
                </select>
            </div>
            <div className="pattern-repeats-input">
                <label>Repeats</label>
                <button
                    className="down-count btn btn-info"
                    title="Down"
                    disabled={repeats === 0}
                    onClick={() => setRepeats(repeats - 1)}
                >
                    -
                </button>
                <input
                    className="repeat-counter"
                    type="text"
                    placeholder="value..."
                    value={repeats}
                    readOnly
                />
                <button
                    className="up-count btn btn-info"
                    title="Up"
                    onClick={() => setRepeats(repeats + 1)}
                >
                    +
                </button>
            </div>
            <div>
                <button className="pattern-clear-button" onClick={onClear}>Clear</button>
            </div>
        </div>
    );
}

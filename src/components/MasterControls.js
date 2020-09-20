import React, { useState } from "react";
import { Transport, Destination } from "tone";
import VolumeInput from "./VolumeInput";

export default function MasterControls({ onPlayButtonPress }) {
    const [started, setStarted] = useState(false);
    const [bpm, setBPM] = useState(120);

    const handlePlayButtonClick = () => {
        !started ? Transport.start() : Transport.stop();
        onPlayButtonPress();
        setStarted(!started);
    };

    const handleBPMChange = (event) => {
        const value = event.target.value;
        setBPM(parseFloat(value));
        Transport.bpm.value = parseFloat(value);
    };

    const handleVolumeChange = (value) => {
        if (value === -40) {
            Destination.mute = true;
        } else {
            Destination.mute = false;
            Destination.volume.value = parseFloat(value);
        }
    };

    return (
        <section className="controls-main">
            <button
                className={`play-button ${started ? "active" : ""}`}
                onClick={handlePlayButtonClick}
                title={started ? "Stop" : "Start"}
            ></button>
            <div>
                <label htmlFor="bpm">BPM</label>
                <input
                    name="bpm"
                    id="bpm"
                    type="range"
                    min="60"
                    max="180"
                    value={bpm}
                    step="1"
                    onChange={handleBPMChange}
                />
                <span id="bpmVal">{bpm}</span>
            </div>
            <VolumeInput onChange={handleVolumeChange} />
        </section>
    );
}

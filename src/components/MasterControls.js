import React, { useState } from "react";
import * as Tone from "tone";
import VolumeInput from "./VolumeInput";

export default function MasterControls({
    onPlayButtonPress,
    patternsNumber,
    activePattern,
    onActivePatternChange,
    noActivatedPattern,
    toneStarted
}) {
    const [started, setStarted] = useState(false);
    const [bpm, setBPM] = useState(120);

    const handlePlayButtonClick = async () => {
        if(!toneStarted){
            await Tone.start()
        }

        if(noActivatedPattern){
            alert("Activate atleast one pattern!");
            return;
        }
        
        if (!started) {
            onPlayButtonPress();
            Tone.Transport.start();
        } else {
            Tone.Transport.stop();
        }
        setStarted(!started);
    };

    const handleBPMChange = (event) => {
        const value = event.target.value;
        setBPM(parseFloat(value));
        Tone.Transport.bpm.value = parseFloat(value);
    };

    const handleVolumeChange = (value) => {
        if (value === -40) {
            Tone.Destination.mute = true;
        } else {
            Tone.Destination.mute = false;
            Tone.Destination.volume.value = parseFloat(value);
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
            <MasterPatternControls
                patternsNumber={patternsNumber}
                activePattern={activePattern}
                onActivePatternChange={onActivePatternChange}
            />
        </section>
    );
}

function MasterPatternControls({
    patternsNumber,
    activePattern,
    onActivePatternChange,
}) {
    return (
        <div className="patern-controls-main">
            <label>Pattern</label>
            {[...Array(patternsNumber)].map((val, index) => (
                <button
                    key={`pattern-button-${index}`}
                    onClick={() => onActivePatternChange(index)}
                    className={`${activePattern === index ? "active" : ""}`}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
}

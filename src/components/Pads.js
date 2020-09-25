import React, { useState } from "react";
import LocalControls from "./LocalControls";
import settings from "../assets/icons/settings.png";

export default function Pads({
    instrument,
    number,
    parentNumber,
    onTrigger,
    stepCount,
    currentStep,
    currentPattern,
    activeSteps
}) {
    const [controlsVisable, setControlsVisable] = useState(false);

    return (
        <div className="sound">
            <div className="sound-title">{instrument.name}</div>
            <div className="sound-local-controls-trigger">
                <button onClick={() => setControlsVisable(!controlsVisable)}>
                    <img src={settings} alt="Settings" />
                </button>
            </div>
            <div className="sound-pads">
                {[...Array(stepCount)].map((e, index) => (
                    <Pad
                        onTrigger={onTrigger}
                        index={index}
                        instrumentNumber={number}
                        key={`${instrument.name}-${index}`}
                        highlighted={currentStep === index && parentNumber === currentPattern}
                        activated={activeSteps[index]}
                    />
                ))}
            </div>
            <LocalControls
                visable={controlsVisable}
                onVolumeChange={instrument.setVolume}
                onPitchChange={instrument.setPitchShift}
                onTempoChange={instrument.setTempo}
                onReverbChange={instrument.setReverb}
            />
        </div>
    );
}

function Pad({ onTrigger, index, instrumentNumber, highlighted, activated }) {
    const [active, setActive] = useState(activated);

    return (
        <button
            className={`${active ? "active" : ""} ${
                highlighted ? "highlighted" : ""
            }`}
            onClick={() => {
                onTrigger(index, instrumentNumber);
                setActive(!active);
            }}
        />
    );
}

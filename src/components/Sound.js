import React, { useState } from "react";
import LocalControls from "./LocalControls";
import settings from "../assets/icons/settings.png"

export default function Sound({
  instrument,
  number,
  onTrigger,
  stepCount,
  currentStep
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
            soundNumber={number}
            key={`${instrument.name}-${index}`}
            highlighted={currentStep === index}
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

function Pad({ onTrigger, index, soundNumber, highlighted }) {
  const [active, setActive] = useState(false);

  return (
    <button
      className={`${active ? "active" : ""} ${
        highlighted ? "highlighted" : ""
      }`}
      onClick={() => {
        onTrigger(index, soundNumber);
        setActive(!active);
      }}
    />
  );
}

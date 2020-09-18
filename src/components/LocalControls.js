import React, { useState } from "react";
import VolumeInput from "./VolumeInput";

export default function LocalControls({
  visable,
  onVolumeChange,
  onPitchChange,
  onAttackChange,
  onDecayChange,
  onSustainChange,
  onReleaseChange,
}) {
  return (
    <div className="sound-local-controls" visable={visable ? "true" : "false"}>
      <VolumeInput onChange={onVolumeChange} />
      <PitchInput onChange={onPitchChange} />
    </div>
  );
}

function PitchInput({ onChange }) {
  const [pitch, setPitch] = useState(0);

  const handleChange = (event) => {
    const input = event.target.value;
    const value = parseInt(input);
    setPitch(value);
    onChange(value);
  };

  return (
    <div>
      <label htmlFor="pitch">Pitch</label>
      <input
        name="pitch"
        id="pitch"
        type="range"
        min="-1200"
        max="1200"
        value={pitch}
        step="50"
        onChange={handleChange}
      />
      <span className="current-value" id="pitchVal">
        {pitch}
      </span>
    </div>
  );
}

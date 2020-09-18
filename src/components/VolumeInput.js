import React, { useState } from "react";

export default function VolumeInput({ onChange }) {
  const [volume, setVolume] = useState(100);

  const handleVolumeChange = (event) => {
    const input = event.target.value;
    setVolume(parseInt(input));
    const value = parseInt(-40 - (-40 * input) / 100);
    onChange(value);
  };

  return (
    <div>
      <label htmlFor="volume">Volume</label>
      <input
        name="volume"
        id="bpm"
        type="range"
        min="0"
        max="100"
        value={volume}
        step="1"
        onChange={handleVolumeChange}
      />
      <span className="current-value" id="volumeVal">
        {volume > 0 ? `${volume}%` : "Mute"}
      </span>
    </div>
  );
}

import React, { useState } from "react";
import { Transport } from "tone";

export default function MasterControls({ onPlayButtonPress, playDisabled }) {
  const [started, setStarted] = useState(false);
  const [bpm, setBPM] = useState(120)

  const handlePlayButtonClick = () => {
    !started ? Transport.start() : Transport.stop();
    onPlayButtonPress();
    setStarted(!started);
  };

  const handleBPMChange = (event) => {
    const value = event.target.value
    setBPM(parseFloat(value))
    Transport.bpm.value = parseFloat(value)
  }

  return (
    <section className="controls-main">
      <button
        className={`play-button ${started ? "active": ""}`}
        onClick={handlePlayButtonClick}
        title={started ? "Stop" : "Start"}
        disabled={playDisabled}
      >
      </button>
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
        <span id="bpmval">{bpm}</span>
      </div>
    </section>
  );
}

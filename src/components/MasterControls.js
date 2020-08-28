import React, { useState } from "react";
import { Transport } from "tone";

export default function MasterControls({onPlayButtonPress, playDisabled}) {
  const [started, setStarted] = useState(false);

  const handlePlayButtonClick = () => {
    !started ? Transport.start() : Transport.stop();
    onPlayButtonPress();
    setStarted(!started);
  };

  return (
    <div>
      <button
        onClick={handlePlayButtonClick}
        title={started ? "Stop" : "Start"}
        disabled={playDisabled}
      >
        {started ? "Stop" : "Start"}
      </button>
    </div>
  );
}

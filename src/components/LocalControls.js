import React, { useState } from "react";
import VolumeInput from "./VolumeInput";
import RangeInput from "./RangeInput";

export const LocalControls = ({
  visable,
  onVolumeChange,
  onPitchChange,
  onTempoChange,
  onReverbChange,
}) => {
  const style = {
    display: !visable && "none",
  };
  return (
    <div className="sound-local-controls" style={style}>
      <VolumeInput onChange={onVolumeChange} />
      <PitchInput onChange={onPitchChange} />
      <TempoInput onChange={onTempoChange} />
      <ReverbInput onChange={onReverbChange} />
    </div>
  );
};

function PitchInput({ onChange }) {
  const [pitch, setPitch] = useState(0);

  const handleChange = (event) => {
    const input = event.target.value;
    const value = parseInt(input);
    setPitch(value);
    onChange(value);
  };

  return (
    <RangeInput
      name={"pitch"}
      label={"Pitch"}
      max={1200}
      min={-1200}
      step={50}
      value={pitch}
      onChange={handleChange}
    />
  );
}

function TempoInput({ onChange }) {
  const [tempo, setTempo] = useState(1);

  const handleChange = (event) => {
    const input = event.target.value;
    const value = parseFloat(input);
    setTempo(value);
    onChange(value);
  };

  return (
    <RangeInput
      name={"tempo"}
      label={"Tempo"}
      max={3}
      min={0.1}
      step={0.1}
      value={tempo}
      onChange={handleChange}
    />
  );
}

function ReverbInput({ onChange }) {
  const [reverb, setReverb] = useState(0);

  const handleChange = (event) => {
    const input = event.target.value;
    const value = parseFloat(input);
    setReverb(value);
    onChange(value);
  };

  return (
    <RangeInput
      name={"reverb"}
      label={"Reverb"}
      max={1}
      min={0}
      step={0.1}
      value={reverb}
      onChange={handleChange}
    />
  );
}

export default LocalControls;

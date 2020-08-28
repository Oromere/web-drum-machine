import React, { useState } from "react";

export default function Sound({ id, number, name, onTrigger, stepCount, currentStep }) {
  return (
    <div className="sound">
      <div className="sound-title">{name}</div>
      <div className="sound-local-controls"></div>
      <div className="sound-pads">
        {[...Array(stepCount)].map((e, index) => (
          <Pad
            onTrigger={onTrigger}
            index={index}
            soundNumber={number}
            key={`${name}-${index}`}
            highlighted={currentStep === index}
          />
        ))}
      </div>
    </div>
  );
}

function Pad({ onTrigger, index, soundNumber, highlighted }) {
  const [active, setActive] = useState(false);

  return (
    <button
      className={`${active ? "active" : ""} ${highlighted ? "highlighted": ""}`}
      onClick={() => {
        onTrigger(index, soundNumber);
        setActive(!active);
      }}
    />
  );
}

import React from "react";
import "./App.css";

import Sequencer from "./components/Sequencer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Web Drum machine</p>
      </header>
      <section>
        <Sequencer />
      </section>
    </div>
  );
}

export default App;

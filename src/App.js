import React from "react";
import "./App.css";

import Sequencer from "./components/Sequencer";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>Web Drum Machine</p>
            </header>
            <main className="App-content">
                <Sequencer />
            </main>
        </div>
    );
}

export default App;

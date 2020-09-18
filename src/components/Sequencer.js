import React, { Component } from "react";
import Sound from "./Sound";
import MasterControls from "./MasterControls";
import { Sequence, Draw, Destination } from "tone";
import Instrument from "./instrument";
import { sounds } from "../assets/sounds";

class Sequencer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSteps: [],
      currentStep: -1,
      instruments: [],
    };

    this.handleNoteTrigger = this.handleNoteTrigger.bind(this);
    this.tick = this.tick.bind(this);
    this.triggerInstrument = this.triggerInstrument.bind(this);
  }

  componentDidMount() {
    this.steps = 16;
    this.subdivision = "16n";
    const instruments = sounds.map(
      (sound) => new Instrument(sound.src, sound.name)
    );

    this.setState({
      activeSteps: this.setupMatrix(),
      instruments: instruments,
    });

    Destination.volume.value = 0;

    this.sequencer = new Sequence(
      this.tick,
      [...Array(this.steps).keys()],
      this.subdivision
    ).start(0);
  }
  // create 16 x 4 array filled with false
  setupMatrix = () => {
    return Array.from(Array(this.steps), () =>
      Array(this.state.instruments.length).fill(false)
    );
  };

  triggerInstrument(row, time) {
    this.state.instruments[row].trigger(time);
  }

  tick(time, index) {
    Draw.schedule(() => {
      this.setState({ currentStep: index });
    }, time);

    this.state.activeSteps[index].forEach((value, rowIndex) => {
      if (value) {
        this.triggerInstrument(rowIndex, time);
      }
    });
  }

  handleNoteTrigger(column, row) {
    const newMatrix = this.state.activeSteps;
    newMatrix[column][row] = !this.state.activeSteps[column][row];
    this.setState({ activeSteps: newMatrix });
  }

  render() {
    return (
      <div name="sequencer">
        <MasterControls
          onPlayButtonPress={() => this.setState({ currentStep: -1 })}
        />
        <section>
          {this.state.instruments.map((instrument, index) => (
            <Sound
              key={`sound-${instrument.name}`}
              instrument={instrument}
              number={index}
              onTrigger={this.handleNoteTrigger}
              stepCount={this.steps}
              currentStep={this.state.currentStep}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default Sequencer;

import React, { Component } from "react";
import Sound from "./Sound";
import MasterControls from "./MasterControls";
import { sounds } from "../assets/sounds";
import { Sequence, Players, Draw } from "tone";

class Sequencer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      samplesLoaded: false,
      activeSteps: [],
      currentStep: -1,
    };

    this.handleNoteTrigger = this.handleNoteTrigger.bind(this);
    this.tick = this.tick.bind(this);
    this.trigger = this.trigger.bind(this);
  }

  componentDidMount() {
    this.instrumentNumber = 4;
    this.steps = 16;
    this.subdivision = "8n";

    this.setState({
      activeSteps: this.setupMatrix(),
    });

    this.players = new Players({
      urls: Object.assign(sounds.map((sound) => sound.src)),
      onload: () => this.setState({ samplesLoaded: true }),
      fadeOut: "64n",
    }).toDestination();

    this.sequencer = new Sequence(
      this.tick,
      [...Array(this.steps).keys()],
      this.subdivision
    ).start(0);
  }

  trigger(row, time) {
    this.players.player(row).start(time, 0, "16t");
  }

  // create 16 x 4 array filled with false
  setupMatrix = () => {
    return Array.from(Array(this.steps), () =>
      Array(this.instrumentNumber).fill(false)
    );
  };

  tick(time, index) {
    Draw.schedule(() => {
      this.setState({currentStep: index})
    }, time);

    this.state.activeSteps[index].forEach((value, rowIndex) => {
      if (value) {
        this.trigger(rowIndex, time);
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
          playDisabled={!this.state.samplesLoaded}
        />
        {sounds.map((sound, index) => (
          <Sound
            {...sound}
            key={sound.id}
            onTrigger={this.handleNoteTrigger}
            stepCount={this.steps}
            currentStep={this.state.currentStep}
          />
        ))}
      </div>
    );
  }
}

export default Sequencer;

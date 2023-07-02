import React, { Component } from "react";
import MasterControls from "./MasterControls";
import { Draw, Destination, Transport } from "tone";
import PatternConrols from "./PatternControls";
import Pattern from "../models/pattern";
import Pads from "./Pads";

class Sequencer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patterns: [],
            currentStep: -1,
            activePattern: 0,
            playingPattern: null,
            patternUpdated: 0,
            repeats: 0,
            toneStarted: false
        };

        this.tick = this.tick.bind(this);
        this.handlePlayButtonPressed = this.handlePlayButtonPressed.bind(this);
    }

    componentDidMount() {
        Destination.volume.value = 0;

        const patterns = [
            new Pattern(this.tick, 0),
            new Pattern(this.tick, 1),
            new Pattern(this.tick, 2),
            new Pattern(this.tick, 3),
        ];
        patterns[0].setActive(true);

        this.setState({
            patterns: patterns,
        });
    }

    tick(time, index, patternNumber) {
        const pattern = this.state.patterns[patternNumber];

        Draw.schedule(() => {
            if (patternNumber !== this.state.playingPattern) {
                this.setState({
                    playingPattern: patternNumber,
                    currentStep: index,
                    repeats: pattern.repeats,
                });
            } else {
                this.setState({ currentStep: index });
            }
        }, time);

        pattern.steps[index].forEach((step, index) => {
            if (step === true) {
                pattern.triggerInstrument(index, time);
            }
        });

        const { repeats } = this.state;
        // if index == currentPattern length call the next active sequence
        if (index === pattern.stepLength - 1) {
            if (repeats == 0) {
                const next = this.findNextSequence(patternNumber);
                if (next !== null && next !== patternNumber) {
                    pattern.sequence.stop();
                    const nextSequence = this.state.patterns[next].sequence;
                    nextSequence.start(Transport.seconds);
                }
            } else {
                this.setState({
                    repeats: repeats - 1,
                });
            }
        }
    }

    findNextSequence = (current) => {
        const patterns = this.state.patterns;
        let index = current;
        const loop = true;
        while (loop) {
            index++;
            if (index > patterns.length - 1) {
                index = 0;
            }

            if (patterns[index].active) {
                return index;
            }
        }
    };

    handlePlayButtonPressed() {
        const { patterns } = this.state;
        this.setState({ currentStep: -1, playingPattern: null, toneStarted: true });
        // stop all sequence
        patterns.forEach((pattern) => pattern.sequence.stop());
        // start first active sequence, -1 to start with 0
        const next = this.findNextSequence(-1);
        patterns[next].sequence.start(0);
    }

    render() {
        const { patterns, activePattern, toneStarted } = this.state;
        const currentPattern = patterns[activePattern];
        const noActivatedPattern = patterns.find(pattern => pattern.active) === undefined
        return (
            <div id="sequencer">
                <MasterControls
                    onPlayButtonPress={this.handlePlayButtonPressed}
                    patternsNumber={this.state.patterns.length}
                    activePattern={this.state.activePattern}
                    onActivePatternChange={(index) =>
                        this.setState({ activePattern: index })
                    }
                    noActivatedPattern={noActivatedPattern}
                    toneStarted={toneStarted}
                />
                <section className="pattern-container">
                    {currentPattern !== undefined && (
                        <div>
                            <PatternConrols
                                pattern={currentPattern}
                                number={activePattern}
                                onUpdate={() =>
                                    this.setState({
                                        patternUpdated:
                                            this.state.patternUpdated + 1,
                                    })
                                }
                            />
                            {currentPattern.instruments.map(
                                (instrument, instrumentIndex) => (
                                    <Pads
                                        key={`pads-${activePattern}-${instrument.name}-v${this.state.patternUpdated}`}
                                        instrument={instrument}
                                        number={instrumentIndex}
                                        parentNumber={activePattern}
                                        onTrigger={currentPattern.toggleStep}
                                        stepCount={currentPattern.stepLength}
                                        currentStep={this.state.currentStep}
                                        currentPattern={
                                            this.state.playingPattern
                                        }
                                        activeSteps={currentPattern.getActiveStepsForInstrument(
                                            instrumentIndex
                                        )}
                                    />
                                )
                            )}
                        </div>
                    )}
                </section>
            </div>
        );
    }
}

export default Sequencer;

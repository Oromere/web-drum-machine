import { sounds } from "../assets/sounds";
import Instrument from "./instrument";
import { Sequence } from "tone";

export default class Pattern {
    constructor(sequenceCallback, number) {
        this.active = false;
        this.stepLength = 16;
        this.instruments = setupInstruments();
        this.steps = setupMatrix(this.stepLength, this.instruments.length);
        this.number = number;
        this.repeats = 0;
        this.sequence = new Sequence(
            (time, value) => sequenceCallback(time, value, number),
            [...Array(this.stepLength).keys()],
            "16n"
        );

        this.toggleStep = this.toggleStep.bind(this);
        this.setActive = this.setActive.bind(this);
        this.setRepeats = this.setRepeats.bind(this);
        this.clearSteps = this.clearSteps.bind(this);
        this.getActiveStepsForInstrument = this.getActiveStepsForInstrument.bind(
            this
        );
    }

    toggleStep(step, instrumentNumber) {
        const newMatrix = this.steps;
        newMatrix[step][instrumentNumber] = !this.steps[step][instrumentNumber];
        this.steps = newMatrix;
    }

    setStepLength(length) {
        let newSteps = [];
        if (this.stepLength > length) {
            // slice current steps to get subarray
            newSteps = this.steps.slice(0, length);
        } else {
            // take old steps and add the difference as empty steps
            console.log("newlengt", length - this.stepLength);
            const differenceArray = setupMatrix(
                length - this.stepLength,
                this.instruments.length
            );
            newSteps = this.steps.concat(differenceArray);
        }
        this.steps = newSteps;
        this.stepLength = length;

        const sequenceCB = this.sequence.callback;
        if (this.sequence) {
            this.sequence.dispose();
        }

        this.sequence = new Sequence(
            sequenceCB,
            [...Array(this.stepLength).keys()],
            "16n"
        );
    }

    setActive(active) {
        this.active = active;
    }

    setRepeats(repeats) {
        this.repeats = repeats
    }

    triggerInstrument(number, time) {
        this.instruments[number].trigger(time);
    }

    getActiveStepsForInstrument(instrumentNumber) {
        return this.steps.map((step) => step[instrumentNumber]);
    }

    clearSteps() {
        this.steps = setupMatrix(this.stepLength, this.instruments.length)
    }
}

const setupInstruments = () => {
    const instruments = sounds.map(
        (sound) => new Instrument(sound.src, sound.name)
    );
    return instruments;
};

const setupMatrix = (steps, instrumentsNumber) => {
    return Array.from(Array(steps), () => Array(instrumentsNumber).fill(false));
};

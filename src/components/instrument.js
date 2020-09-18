import { GrainPlayer } from "tone";

class Instrument {
  constructor(instrument, name) {
    this.player = new GrainPlayer(instrument).toDestination();
    this.name = name;

    this.setVolume = this.setVolume.bind(this)
    this.setPitchShift = this.setPitchShift.bind(this)
  }

  trigger(time) {
    this.player.start(time);
  }

  setVolume(volume) {
    if (volume !== undefined && typeof volume === "number") {
      if (volume === -40) {
        this.player.mute = true;
      } else {
        this.player.mute = false;
        this.player.volume.value = volume;
      }
    }
  }

  setPitchShift(pitch) {
    if (pitch !== undefined && typeof pitch === "number") {
      this.player.detune = pitch;
    }
  }
}

export default Instrument;

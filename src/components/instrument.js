import { GrainPlayer, Destination, Reverb } from "tone";

class Instrument {
  constructor(instrument, name) {
    this.player = new GrainPlayer(instrument)
    this.reverb = new Reverb({wet: 0});

    this.connectEffects()
  
    this.name = name;
    this.setVolume = this.setVolume.bind(this);
    this.setPitchShift = this.setPitchShift.bind(this);
    this.setTempo = this.setTempo.bind(this);
    this.setReverb = this.setReverb.bind(this);
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

  setReverb(reverb) {
    if (reverb !== undefined && typeof reverb === "number") {
      this.reverb.dispose()
      if(reverb === 0) {
        this.reverb = new Reverb({wet: 0});
      } else {
        this.reverb = new Reverb({decay: reverb, wet: 0.5});
      }
      this.connectEffects();
    }
  }

  setTempo(tempo) {
    if (tempo !== undefined && typeof tempo === "number") {
      this.player.playbackRate = tempo;
  
    }
  }

  connectEffects() {
    this.player.disconnect();
    this.player.chain(this.reverb, Destination);
  }
}

export default Instrument;

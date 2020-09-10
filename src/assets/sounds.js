import { kick, snare, hihatOpen, hihatClose, clap, tom } from "./samples";
export const sounds = [
  {
    id: 1,
    number: 0,
    name: "Kick",
    src: kick,
  },
  {
    id: 2,
    number: 1,
    name: "Snare",
    src: snare,
  },
  {
    id: 3,
    number: 2,
    name: "Closed hihat",
    src: hihatClose,
  },
  {
    id: 4,
    number: 3,
    name: "Open Hihat",
    src: hihatOpen,
  },
  {
    id: 5,
    number: 4,
    name: "Clap",
    src: clap
  },
  {
    id: 6,
    number: 5,
    name: "Tom",
    src: tom
  }
];

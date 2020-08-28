import { kick, snare, hihatOpen, hihatClose } from "./samples";
export const sounds = [
  {
    id: 1,
    number: 0,
    name: "kick",
    src: kick,
  },
  {
    id: 2,
    number: 1,
    name: "snare",
    src: snare,
  },
  {
    id: 3,
    number: 2,
    name: "closed hihat",
    src: hihatClose,
  },
  {
    id: 4,
    number: 3,
    name: "open hihat",
    src: hihatOpen,
  },
];

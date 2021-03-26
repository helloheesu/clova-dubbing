import { atom } from "recoil";

export const currentTimeState = atom<millisecond>({
  key: "currentTime",
  default: 0,
});
export const audioBoxsState = atom<AudioBox[]>({
  key: "audioBoxs",
  default: [],
});
export const totalInfoState = atom({
  key: "totalInfo",
  default: {
    duration: 2000000,
  },
});
export const stepInfoState = atom({
  key: "stepInfo",
  default: {
    duration: 5000,
    width: 160,
  },
});
export const isPlayingState = atom<boolean>({
  key: "isPlaying",
  default: false,
});

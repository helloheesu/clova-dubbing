import { atom } from "recoil";

export const currentTimeState = atom<millisecond>({
  key: "currentTime",
  default: 0,
});
export const audioBoxsState = atom<AudioBox[]>({
  key: "audioBoxs",
  default: [],
});

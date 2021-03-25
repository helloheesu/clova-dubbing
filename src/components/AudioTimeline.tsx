import React from "react";
import { useRecoilValue } from "recoil";
import { audioBoxsState } from "../recoil/atoms";
import { localeMs, timeToPosition } from "../utils/time";

interface Props {
  scale: millisecond;
  stepWidth: pixel;
}
const AudioTimeline = ({ scale, stepWidth }: Props) => {
  const audioBoxs = useRecoilValue(audioBoxsState);

  return (
    <ul
      className="audio-box-timeline"
      style={{ backgroundColor: "yellow", height: "200px" }}
    >
      {audioBoxs.map(({ src, startAt }) => {
        return (
          <li
            className="audio-box"
            style={{
              width: timeToPosition(src.duration, scale, stepWidth),
              left: `${timeToPosition(startAt, scale, stepWidth)}px`,
            }}
          >
            {localeMs(startAt)} {src.name}
          </li>
        );
      })}
    </ul>
  );
};
export default AudioTimeline;

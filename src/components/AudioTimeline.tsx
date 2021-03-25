import React from "react";
import { timeToPosition, localeMs } from "../utils/time";

interface Props {
  audioBoxs: AudioBox[];
  scale: millisecond;
  stepWidth: pixel;
}
const AudioTimeline = ({ audioBoxs, scale, stepWidth }: Props) => {
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

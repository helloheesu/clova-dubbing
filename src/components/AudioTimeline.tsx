import React from "react";
import { timeToPosition, localeMs } from "../utils/time";

interface Props {
  audioBoxs: AudioBox[];
  scale: millisecond;
}
const AudioTimeline = ({ audioBoxs, scale }: Props) => {
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
              width: timeToPosition(src.duration, scale),
              left: `${timeToPosition(startAt, scale)}px`,
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

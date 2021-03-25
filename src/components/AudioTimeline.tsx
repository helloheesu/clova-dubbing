import React from "react";
import { useRecoilValue } from "recoil";
import { audioBoxsState, stepInfoState } from "../recoil/atoms";
import { localeMs, timeToPosition } from "../utils/time";

const AudioTimeline = () => {
  const { duration: stepDuration, width: stepWidth } = useRecoilValue(
    stepInfoState
  );
  const audioBoxs = useRecoilValue(audioBoxsState);

  return (
    <ul
      className="audio-box-timeline"
      style={{ backgroundColor: "yellow", height: "200px" }}
    >
      {audioBoxs.map(({ src, startAt }) => {
        return (
          <li
            key={`${startAt}-${src.url}`}
            className="audio-box"
            style={{
              width: timeToPosition(src.duration, stepDuration, stepWidth),
              left: `${timeToPosition(startAt, stepDuration, stepWidth)}px`,
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

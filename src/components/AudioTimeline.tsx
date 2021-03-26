import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { audioBoxsState, stepInfoState } from "../recoil/atoms";
import { localeMs, timeToPosition } from "../utils/time";

const AudioTimeline = () => {
  const { duration: stepDuration, width: stepWidth } = useRecoilValue(
    stepInfoState
  );
  const [audioBoxs, setAudioBoxs] = useRecoilState(audioBoxsState);

  return (
    <ul
      className="audio-box-timeline"
      style={{ backgroundColor: "yellow", height: "200px" }}
    >
      {audioBoxs.map(({ key, src, startAt }) => {
        return (
          <li
            key={key}
            className="audio-box"
            tabIndex={1}
            onKeyDown={(e) => {
              if (e.code !== "ArrowLeft" && e.code !== "ArrowRight") {
                return;
              }

              e.preventDefault();

              setAudioBoxs((audioBoxs) => {
                const findingKey = key;
                const audioBoxIndex = audioBoxs.findIndex(
                  ({ key }) => key === findingKey
                );

                return [
                  ...audioBoxs.slice(0, audioBoxIndex),
                  {
                    key,
                    src,
                    startAt:
                      e.code === "ArrowRight" ? startAt + 100 : startAt - 100,
                  },
                  ...audioBoxs.slice(audioBoxIndex + 1),
                ];
              });
            }}
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

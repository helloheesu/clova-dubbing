import React, { useRef } from "react";
import { localeMs, positionToTime, timeToPosition } from "../utils/time";

import TimeStep from "./TimeStep";
import CurrentPositionIndicator from "./CurrentPositionIndicator";

import "./Timeline.scss";

interface props {
  length: millisecond;
  scale: millisecond;
  currentTime: millisecond;
  setCurrentTime: React.Dispatch<React.SetStateAction<millisecond>>;
  audioBoxs: AudioBox[];
}

const ProgressBar = ({
  length,
  scale,
  currentTime,
  setCurrentTime,
  audioBoxs,
}: props) => {
  const handleClick = (e) => {
    const offsetX = e.nativeEvent.offsetX;
    const offsetLeft = e.target.offsetLeft;
    const position = offsetX + offsetLeft;
    setCurrentTime(Math.min(positionToTime(position, scale), length));
  };

  const playingFrameRef = useRef(null);
  const handleKeyDown = ({ code }) => {
    if (code !== "Space") {
      return;
    }

    if (playingFrameRef.current) {
      playingFrameRef.current = null;
      return;
    }

    let previousTime = null;
    const step = (time) => {
      const delta = previousTime ? time - previousTime : 0;
      previousTime = time;

      setCurrentTime((currentTime) => {
        if (currentTime + delta > length) {
          playingFrameRef.current = null;
          return length;
        } else {
          return currentTime + delta;
        }
      });

      if (playingFrameRef.current) {
        playingFrameRef.current = requestAnimationFrame(step);
      }
    };

    playingFrameRef.current = requestAnimationFrame(step);
  };

  const timesteps = Array.apply(
    null,
    Array(Math.floor(length / scale) + 1)
  ).map((_, i) => <TimeStep key={i * scale} time={i * scale} />);

  return (
    <div className="timeline" tabIndex={0} onKeyPress={handleKeyDown}>
      <div className="wrapper" onClick={handleClick}>
        <CurrentPositionIndicator
          position={timeToPosition(currentTime, scale)}
          time={localeMs(currentTime)}
        />
        {timesteps}
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
      </div>
    </div>
  );
};

export default ProgressBar;

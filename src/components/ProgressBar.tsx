import React, { useState, useRef } from "react";
import { localeMs } from "../utils/time";

import TimeStep from "./TimeStep";
import CurrentPositionIndicator from "./CurrentPositionIndicator";

import "./Timeline.scss";

interface props {
  length: millisecond;
  scale: millisecond;
}

const STEP_WIDTH: pixel = 400;
const LEFT_PADDING: pixel = 24;

const ProgressBar = ({ length, scale }: props) => {
  const [currentTime, setCurrentTime] = useState(0);

  const positionToTime = (position: pixel): millisecond => {
    return ((position - LEFT_PADDING) * scale) / STEP_WIDTH;
  };

  const timeToPosition = (time: millisecond): pixel => {
    return (time * STEP_WIDTH) / scale + LEFT_PADDING;
  };

  const handleClick = (e) => {
    const offsetX = e.nativeEvent.offsetX;
    const offsetLeft = e.target.offsetLeft;
    const position = offsetX + offsetLeft;
    setCurrentTime(Math.min(positionToTime(position), length));
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
          position={timeToPosition(currentTime)}
          time={localeMs(currentTime)}
        />
        {timesteps}
        <div
          className="audio-box-timeline"
          style={{ backgroundColor: "yellow", height: "200px" }}
        >
          audio-box-timeline skeleton
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

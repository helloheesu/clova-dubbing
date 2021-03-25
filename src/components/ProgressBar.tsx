import React, { useRef } from "react";
import { localeMs, positionToTime, timeToPosition } from "../utils/time";

import TimeStep from "./TimeStep";
import CurrentPositionIndicator from "./CurrentPositionIndicator";

import "./Timeline.scss";
import { useRecoilState } from "recoil";
import { currentTimeState } from "../recoil/atoms";

interface props {
  length: millisecond;
  scale: millisecond;
  stepWidth: pixel;
  children: React.ReactNode;
}

const ProgressBar = ({ length, scale, stepWidth, children }: props) => {
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);

  const handleClick = (e) => {
    const offsetX = e.nativeEvent.offsetX;
    const offsetLeft = e.target.offsetLeft;
    const position = offsetX + offsetLeft;
    setCurrentTime(
      Math.min(positionToTime(position, scale, stepWidth), length)
    );
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
  ).map((_, i) => (
    <TimeStep key={i * scale} time={i * scale} width={stepWidth} />
  ));

  return (
    <div className="timeline" tabIndex={0} onKeyPress={handleKeyDown}>
      <div className="wrapper" onClick={handleClick}>
        <CurrentPositionIndicator
          position={timeToPosition(currentTime, scale, stepWidth)}
          time={localeMs(currentTime)}
        />
        {timesteps}
        {children}
      </div>
    </div>
  );
};

export default ProgressBar;

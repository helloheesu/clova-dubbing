import React, { useState } from "react";
import { localeMs } from "../utils/time";

import TimeStep from "./TimeStep";
import CurrentPositionIndicator from "./CurrentPositionIndicator";

import "./Timeline.scss";

interface props {
  length: millisecond;
  scale: millisecond;
}

const STEP_WIDTH = 400;

const Timeline = ({ length, scale }: props) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const positionToTime = (position: number) => {
    return (position * scale) / STEP_WIDTH;
  };

  const handleClick = (e) => {
    const offsetX = e.nativeEvent.offsetX;
    const offsetLeft = e.target.offsetLeft;
    const position = offsetX + offsetLeft;
    setCurrentPosition(position);
    setCurrentTime(positionToTime(position));
  };

  const timesteps = Array.apply(
    null,
    Array(Math.floor(length / scale) + 1)
  ).map((_, i) => <TimeStep key={i * scale} time={i * scale} />);

  return (
    <div className="timeline">
      <div className="wrapper" onClick={handleClick}>
        <CurrentPositionIndicator
          position={currentPosition}
          time={localeMs(currentTime)}
        />
        {timesteps}
      </div>
    </div>
  );
};

export default Timeline;

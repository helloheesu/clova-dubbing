import React, { useState } from "react";
import { localeMs } from "../utils/time";

import TimeStep from "./TimeStep";
import CurrentPositionIndicator from "./CurrentPositionIndicator";

import "./Timeline.scss";

interface props {
  length: millisecond;
  scale: millisecond;
}

const STEP_WIDTH: pixel = 400;

const Timeline = ({ length, scale }: props) => {
  const [currentTime, setCurrentTime] = useState(0);

  const positionToTime = (position: pixel): millisecond => {
    return (position * scale) / STEP_WIDTH;
  };

  const timeToPosition = (time: millisecond): pixel => {
    return (time * STEP_WIDTH) / scale;
  };

  const handleClick = (e) => {
    const offsetX = e.nativeEvent.offsetX;
    const offsetLeft = e.target.offsetLeft;
    const position = offsetX + offsetLeft;
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
          position={timeToPosition(currentTime)}
          time={localeMs(currentTime)}
        />
        {timesteps}
      </div>
    </div>
  );
};

export default Timeline;

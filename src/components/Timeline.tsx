import React, { useState } from "react";
import "./Timeline.scss";

type millisecond = number;
interface timelineProps {
  length: millisecond;
  scale: millisecond;
}

interface timeIndicatorProps {
  time: millisecond;
}

const localeMs = (ms: millisecond) => {
  const SECOND_TO_MS = 1000;
  const MINUTE_TO_MS = 60 * SECOND_TO_MS;

  const minute = Math.floor(ms / MINUTE_TO_MS)
    .toString()
    .padStart(2, "0");
  const second = Math.floor((ms % MINUTE_TO_MS) / SECOND_TO_MS)
    .toString()
    .padStart(2, "0");
  const millisecond = Math.floor(ms % SECOND_TO_MS)
    .toString()
    .padStart(2, "0");

  return `${minute}:${second}.${millisecond}`;
};

const TimeStep = ({ time }: timeIndicatorProps) => (
  <div className="timestep">
    <span>{localeMs(time)}</span>
  </div>
);

const CurrentPositionIndicator = ({ time }: timeIndicatorProps) => {
  return (
    <div className="position-indicator" style={{ left: time }}>
      {time}
    </div>
  );
};

const Timeline = ({ length, scale }: timelineProps) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const handleClick = (e) => {
    const offsetX = e.nativeEvent.offsetX;
    const offsetLeft = e.target.offsetLeft;
    setCurrentPosition(offsetX + offsetLeft);
  };

  const timesteps = Array.apply(
    null,
    Array(Math.floor(length / scale) + 1)
  ).map((_, i) => <TimeStep key={i * scale} time={i * scale} />);

  return (
    <div className="timeline">
      <div className="wrapper" onClick={handleClick}>
        <CurrentPositionIndicator time={currentPosition} />
        {timesteps}
      </div>
    </div>
  );
};

export default Timeline;

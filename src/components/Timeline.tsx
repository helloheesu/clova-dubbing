import React, { useState } from "react";

import TimeStep from "./TimeStep";
import CurrentPositionIndicator from "./CurrentPositionIndicator";

import "./Timeline.scss";

interface props {
  length: millisecond;
  scale: millisecond;
}

const Timeline = ({ length, scale }: props) => {
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
        <CurrentPositionIndicator position={currentPosition} />
        {timesteps}
      </div>
    </div>
  );
};

export default Timeline;

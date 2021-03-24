import React from "react";

interface props {
  position: pixel;
  time: string;
}

const CurrentPositionIndicator = ({ position, time }: props) => {
  return (
    <div className="position-indicator" style={{ left: position }}>
      <span>{time}</span>
    </div>
  );
};

export default CurrentPositionIndicator;

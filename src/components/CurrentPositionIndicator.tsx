import React from "react";

interface props {
  position: number;
  time: string;
}

const CurrentPositionIndicator = ({ position, time }: props) => {
  return (
    <div className="position-indicator" style={{ left: position }}>
      {time}
    </div>
  );
};

export default CurrentPositionIndicator;

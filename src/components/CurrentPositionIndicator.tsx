import React from "react";

interface props {
  position: number;
}

const CurrentPositionIndicator = ({ position }: props) => {
  return (
    <div className="position-indicator" style={{ left: position }}>
      {position}
    </div>
  );
};

export default CurrentPositionIndicator;

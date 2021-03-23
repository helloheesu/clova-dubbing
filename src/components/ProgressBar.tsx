import React from "react";
import Timeline from "./Timeline";

type millisecond = number;
interface props {
  length: millisecond;
  scale: millisecond;
}

const ProgressBar = ({ length, scale }: props) => (
  <div className="progress-bar">
    <Timeline length={length} scale={scale} />
    <div className="current-position-indicator">
      <div className="time-display"></div>
    </div>
    <div className="hover-position-indicator"></div>
  </div>
);
export default ProgressBar;

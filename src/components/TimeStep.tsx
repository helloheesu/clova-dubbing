import React from "react";
import { localeMs } from "../utils/time";
interface props {
  time: millisecond;
  width: pixel;
}

const TimeStep = ({ time, width }: props) => (
  <div className="timestep" style={{ width: `${width}px` }}>
    <span>{localeMs(time)}</span>
  </div>
);

export default TimeStep;

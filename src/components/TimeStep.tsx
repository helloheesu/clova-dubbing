import React from "react";
import { localeMs } from "../utils/time";
interface props {
  time: millisecond;
}

const TimeStep = ({ time }: props) => (
  <div className="timestep">
    <span>{localeMs(time)}</span>
  </div>
);

export default TimeStep;

import React from "react";

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

interface props {
  time: millisecond;
}

const TimeStep = ({ time }: props) => (
  <div className="timestep">
    <span>{localeMs(time)}</span>
  </div>
);

export default TimeStep;

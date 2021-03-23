import React from "react";
import "./Timeline.scss";

type millisecond = number;
interface props {
  length: millisecond;
  scale: millisecond;
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

const TimeStep = ({ time }: { time: millisecond }) => (
  <div className="timestep">
    <span>{localeMs(time)}</span>
  </div>
);

const Timeline = ({ length, scale }: props) => {
  const timesteps = Array.apply(
    null,
    Array(Math.floor(length / scale) + 1)
  ).map((_, i) => <TimeStep key={i * scale} time={i * scale} />);

  return <div className="timeline">{timesteps}</div>;
};

export default Timeline;

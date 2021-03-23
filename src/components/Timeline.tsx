import React from "react";
import "./Timeline.scss";

type millisecond = number;
interface props {
  length: millisecond;
  scale: millisecond;
}

const Timeline = ({ length, scale }: props) => {
  return (
    <div className="timeline">
      {length}, {scale}
    </div>
  );
};
export default Timeline;

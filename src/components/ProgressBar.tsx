import React, { useEffect, useRef } from "react";
import { localeMs, positionToTime, timeToPosition } from "../utils/time";

import TimeStep from "./TimeStep";
import CurrentPositionIndicator from "./CurrentPositionIndicator";

import "./Timeline.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentTimeState,
  isPlayingState,
  stepInfoState,
  totalInfoState,
} from "../recoil/atoms";

interface props {
  children: React.ReactNode;
}

const ProgressBar = ({ children }: props) => {
  const { duration: totalDuration } = useRecoilValue(totalInfoState);
  const { duration: stepDuration, width: stepWidth } = useRecoilValue(
    stepInfoState
  );
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const handleClick = (e) => {
    const scrollLeft = wrapperRef.current.getBoundingClientRect().x;
    const clientX = e.clientX;
    const position = clientX - scrollLeft;
    setCurrentTime(
      Math.min(positionToTime(position, stepDuration, stepWidth), totalDuration)
    );
  };

  const playingFrameRef = useRef(null);
  const previousTimeRef = useRef(null);
  useEffect(() => {
    if (!isPlaying) {
      playingFrameRef.current = null;
      previousTimeRef.current = null;
      return;
    }

    const step = (time) => {
      const delta = previousTimeRef.current
        ? time - previousTimeRef.current
        : 0;
      previousTimeRef.current = time;

      setCurrentTime((currentTime) => {
        if (currentTime + delta > totalDuration) {
          playingFrameRef.current = null;
          return totalDuration;
        } else {
          return currentTime + delta;
        }
      });

      if (playingFrameRef.current) {
        playingFrameRef.current = requestAnimationFrame(step);
      }
    };

    playingFrameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(playingFrameRef.current);
  }, [isPlaying]);

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.code !== "Space") {
        return;
      }

      e.preventDefault();
      setIsPlaying(!isPlaying);
    };

    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [isPlaying]);

  const timesteps = Array.apply(
    null,
    Array(Math.floor(totalDuration / stepDuration) + 1)
  ).map((_, i) => (
    <TimeStep
      key={i * stepDuration}
      time={i * stepDuration}
      width={stepWidth}
    />
  ));

  return (
    <div className="timeline">
      <div className="wrapper" onClick={handleClick} ref={wrapperRef}>
        <CurrentPositionIndicator
          position={timeToPosition(currentTime, stepDuration, stepWidth)}
          time={localeMs(currentTime)}
        />
        {timesteps}
        {children}
      </div>
    </div>
  );
};

export default ProgressBar;

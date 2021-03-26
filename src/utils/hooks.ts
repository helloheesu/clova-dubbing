import { useEffect, useRef, useState } from "react";

// ref: https://stackoverflow.com/a/47686478
export const useAudio = (url: url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  const handleEndled = () => setPlaying(false);

  useEffect(() => {
    audio.addEventListener("ended", handleEndled);
    return () => {
      audio.removeEventListener("ended", handleEndled);
    };
  }, []);

  return { playing, toggle };
};

type frameHandler = (delta: millisecond) => void;
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useAnimationFrame = (callback: frameHandler, shouldContine) => {
  const savedCallback = useRef<frameHandler>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const playingFrameRef = useRef(null);
  const previousTimeRef = useRef(null);

  useEffect(() => {
    if (!shouldContine) {
      playingFrameRef.current = null;
      previousTimeRef.current = null;
      return;
    }

    const step = (time) => {
      const delta = previousTimeRef.current
        ? time - previousTimeRef.current
        : 0;
      previousTimeRef.current = time;

      savedCallback.current(delta);

      if (playingFrameRef.current) {
        playingFrameRef.current = requestAnimationFrame(step);
      }
    };

    playingFrameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(playingFrameRef.current);
  }, [shouldContine]);
};

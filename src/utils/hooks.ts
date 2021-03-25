import { useEffect, useState } from "react";

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

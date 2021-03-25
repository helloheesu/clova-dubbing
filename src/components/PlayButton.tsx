import React, { useState, useEffect } from "react";

// ref: https://stackoverflow.com/a/47686478
const useAudio = (url: url) => {
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

interface Props {
  url: string;
}
const PlayButton = ({ url }: Props) => {
  const { playing, toggle } = useAudio(url);

  return <button onClick={toggle}>{playing ? "⏸" : "▶️"}</button>;
};

export default PlayButton;

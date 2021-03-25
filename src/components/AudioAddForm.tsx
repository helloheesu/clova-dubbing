import React, { useState, useEffect } from "react";
import "./AudioAddForm.scss";

const AUDIO_SAMPLES = [
  {
    name: "CantinaBand3sec",
    url: "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav",
  },
  {
    name: "preamble",
    url: "https://www2.cs.uic.edu/~i101/SoundFiles/preamble.wav",
  },
  {
    name: "taunt",
    url: "https://www2.cs.uic.edu/~i101/SoundFiles/taunt.wav",
  },
];

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
  url: url;
  name: string;
}
const AudioAddButton = ({ url, name }: Props) => {
  const { playing, toggle } = useAudio(url);

  return (
    <div className="audio-add-button">
      <button onClick={toggle}>
        {playing ? "⏸" : "▶️"} {name}
      </button>
    </div>
  );
};

const AudioAddForm = () => {
  const audioAddButtons = AUDIO_SAMPLES.map(({ name, url }) => (
    <AudioAddButton key={url} name={name} url={url} />
  ));
  return <div className="audio-add-form">{audioAddButtons}</div>;
};
export default AudioAddForm;

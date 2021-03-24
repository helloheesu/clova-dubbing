import React, { useState, useEffect } from "react";
import "./AudioAddForm.scss";

const AUDIO_SAMPLES = [
  {
    name: "테스트 음원 1",
    url:
      "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3",
  },
  {
    name: "테스트 음원 2",
    url: "https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3",
  },
  {
    name: "테스트 음원 3",
    url: "https://dl.espressif.com/dl/audio/gs-16b-1c-44100hz.mp3",
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

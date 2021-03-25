import React from "react";
import PlayButton from "./PlayButton";
import "./AudioAddForm.scss";
import { useRecoilState, useSetRecoilState } from "recoil";
import { audioBoxsState, currentTimeState } from "../recoil/atoms";

const AUDIO_SAMPLES: AudioSource[] = [
  {
    name: "CantinaBand3sec",
    url: "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav",
    duration: 3000,
  },
  {
    name: "preamble",
    url: "https://www2.cs.uic.edu/~i101/SoundFiles/preamble.wav",
    duration: 19097.959,
  },
  {
    name: "taunt",
    url: "https://www2.cs.uic.edu/~i101/SoundFiles/taunt.wav",
    duration: 4099.384,
  },
];

const AudioAddForm = () => {
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);
  const setAudioBoxs = useSetRecoilState(audioBoxsState);

  const addAudioBox = (src: AudioSource) => {
    setAudioBoxs((audioBoxs) => [
      ...audioBoxs,
      {
        src,
        startAt: currentTime,
      },
    ]);
  };
  const handleAddAudio = (src: AudioSource) => {
    addAudioBox(src);
    setCurrentTime((currentTime) => currentTime + src.duration);
  };

  return (
    <ul className="audio-add-form">
      {AUDIO_SAMPLES.map((src) => {
        const { name, url } = src;
        return (
          <li key={url} className="audio-add-button">
            <PlayButton url={url} />
            {name}
            <button onClick={() => handleAddAudio(src)}>➕</button>
          </li>
        );
      })}
    </ul>
  );
};

export default AudioAddForm;

import React from "react";
import PlayButton from "./PlayButton";
import "./AudioAddForm.scss";

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
  return (
    <ul className="audio-add-form">
      {AUDIO_SAMPLES.map(({ name, url }) => (
        <li key={url} className="audio-add-button">
          <PlayButton url={url} />
          {name}
          <button>➕</button>
        </li>
      ))}
    </ul>
  );
};

export default AudioAddForm;

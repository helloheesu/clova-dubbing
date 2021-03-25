import React, { useState } from "react";
import "./App.scss";
import ProgressBar from "./components/ProgressBar";
import AudioAddForm from "./components/AudioAddForm";
import AudioTimeline from "./components/AudioTimeline";

const App = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [audioBoxs, setAudioBoxs] = useState<AudioBox[]>([]);

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
    <>
      <AudioAddForm onAddAudio={handleAddAudio} />
      <ProgressBar
        length={20000}
        scale={5000}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
      >
        <AudioTimeline audioBoxs={audioBoxs} scale={5000} />
      </ProgressBar>
    </>
  );
};
export default App;

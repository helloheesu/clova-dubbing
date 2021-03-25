import React, { useState } from "react";
import "./App.scss";
import ProgressBar from "./components/ProgressBar";
import AudioAddForm from "./components/AudioAddForm";
import AudioTimeline from "./components/AudioTimeline";

const DURATION: millisecond = 200000;
const STEP_DURATION: millisecond = 5000;
const STEP_WIDTH: pixel = 400;

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
        length={DURATION}
        scale={STEP_DURATION}
        stepWidth={STEP_WIDTH}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
      >
        <AudioTimeline
          audioBoxs={audioBoxs}
          scale={STEP_DURATION}
          stepWidth={STEP_WIDTH}
        />
      </ProgressBar>
    </>
  );
};
export default App;

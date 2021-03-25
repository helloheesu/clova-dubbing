import React, { useRef, useState } from "react";
import "./App.scss";
import ProgressBar from "./components/ProgressBar";
import AudioAddForm from "./components/AudioAddForm";

const App = () => {
  const currentTimeRef = useRef(0);
  const [audioBoxs, setAudioBoxs] = useState<AudioBox[]>([]);

  const addAudioBox = (src: AudioSource) => {
    setAudioBoxs((audioBoxs) => [
      ...audioBoxs,
      {
        src,
        startAt: currentTimeRef.current,
      },
    ]);
  };

  return (
    <>
      <AudioAddForm onAddAudio={addAudioBox} />
      <ProgressBar
        length={20000}
        scale={5000}
        currentTimeRef={currentTimeRef}
        audioBoxs={audioBoxs}
      />
    </>
  );
};
export default App;

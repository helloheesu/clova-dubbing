import React, { useRef } from "react";
import "./App.scss";
import ProgressBar from "./components/ProgressBar";
import AudioAddForm from "./components/AudioAddForm";

const App = () => {
  const currentTimeRef = useRef(0);

  return (
    <>
      <AudioAddForm />
      <ProgressBar
        length={20000}
        scale={5000}
        currentTimeRef={currentTimeRef}
      />
    </>
  );
};
export default App;

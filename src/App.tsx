import React from "react";
import { RecoilRoot } from "recoil";
import "./App.scss";
import ProgressBar from "./components/ProgressBar";
import AudioAddForm from "./components/AudioAddForm";
import AudioTimeline from "./components/AudioTimeline";

const DURATION: millisecond = 2000000;
const STEP_DURATION: millisecond = 5000;
const STEP_WIDTH: pixel = 160;

const App = () => {
  return (
    <RecoilRoot>
      <AudioAddForm />
      <ProgressBar
        length={DURATION}
        scale={STEP_DURATION}
        stepWidth={STEP_WIDTH}
      >
        <AudioTimeline scale={STEP_DURATION} stepWidth={STEP_WIDTH} />
      </ProgressBar>
    </RecoilRoot>
  );
};
export default App;

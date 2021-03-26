import React from "react";
import { RecoilRoot } from "recoil";
import "./App.scss";
import ProgressBar from "./components/ProgressBar";
import AudioAddForm from "./components/AudioAddForm";
import AudioTimeline from "./components/AudioTimeline";
import AudioController from "./components/AudioController";

const App = () => {
  return (
    <RecoilRoot>
      <AudioAddForm />
      <ProgressBar>
        <AudioTimeline />
      </ProgressBar>
      <AudioController />
    </RecoilRoot>
  );
};
export default App;

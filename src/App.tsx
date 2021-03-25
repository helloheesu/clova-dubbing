import React from "react";
import { RecoilRoot } from "recoil";
import "./App.scss";
import ProgressBar from "./components/ProgressBar";
import AudioAddForm from "./components/AudioAddForm";
import AudioTimeline from "./components/AudioTimeline";

const App = () => {
  return (
    <RecoilRoot>
      <AudioAddForm />
      <ProgressBar>
        <AudioTimeline />
      </ProgressBar>
    </RecoilRoot>
  );
};
export default App;

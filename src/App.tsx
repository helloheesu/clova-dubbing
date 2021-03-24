import React from "react";
import "./App.scss";
import ProgressBar from "./components/ProgressBar";
import AudioAddForm from "./components/AudioAddForm";

const App = () => (
  <>
    <AudioAddForm />
    <ProgressBar length={20000} scale={5000} />
  </>
);
export default App;

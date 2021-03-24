import React from "react";
import "./App.scss";
import Timeline from "./components/Timeline";
import AudioAddForm from "./components/AudioAddForm";

const App = () => (
  <>
    <AudioAddForm />
    <Timeline length={20000} scale={5000} />
  </>
);
export default App;

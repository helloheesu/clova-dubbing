import React from "react";
import { useAudio } from "../utils/hooks";

interface Props {
  url: string;
}
const PlayButton = ({ url }: Props) => {
  const { playing, toggle } = useAudio(url);

  return <button onClick={toggle}>{playing ? "⏸" : "▶️"}</button>;
};

export default PlayButton;

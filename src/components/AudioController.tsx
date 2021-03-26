import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  audioBoxsState,
  currentTimeState,
  isPlayingState,
} from "../recoil/atoms";
import { useAnimationFrame } from "../utils/hooks";

const AudioController = () => {
  const audioBoxs = useRecoilValue(audioBoxsState);
  const isPlaying = useRecoilValue(isPlayingState);
  const currentTime = useRecoilValue(currentTimeState);

  const [playingAudioBox, setPlayingAudio] = useState<AudioBox>(null);

  useAnimationFrame(() => {
    const audioBox = audioBoxs.find(
      ({ src, startAt }) =>
        currentTime > startAt && currentTime <= startAt + src.duration
    );
    setPlayingAudio(audioBox);
  }, isPlaying);

  useEffect(() => {
    if (!playingAudioBox) {
      return;
    }

    const audio = new Audio(playingAudioBox.src.url);
    audio.play();
    return () => audio.pause();
  }, [playingAudioBox]);

  useEffect(() => {
    if (!isPlaying) {
      setPlayingAudio(null);
    }
  }, [isPlaying]);

  return null;
};
export default AudioController;

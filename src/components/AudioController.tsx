import { useEffect, useRef, useState } from "react";
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
  const playingAudioRef = useRef<HTMLAudioElement>(null);

  useAnimationFrame(() => {
    const audioBox = audioBoxs.find(
      ({ src, startAt }) =>
        currentTime > startAt && currentTime <= startAt + src.duration
    );
    setPlayingAudio(audioBox);
  }, isPlaying);

  const play = () => {
    if (!playingAudioRef.current || !playingAudioBox) {
      return;
    }

    const startAt = currentTime - playingAudioBox.startAt;
    playingAudioRef.current.currentTime = startAt / 1000;
    playingAudioRef.current.play();
  };

  useEffect(() => {
    if (!playingAudioBox) {
      return;
    }

    const audio = new Audio(playingAudioBox.src.url);
    playingAudioRef.current = audio;

    play();

    return () => playingAudioRef.current.pause();
  }, [playingAudioBox]);

  useEffect(() => {
    if (!isPlaying) {
      playingAudioRef.current?.pause();
    } else {
      play();
    }
  }, [isPlaying]);

  return null;
};
export default AudioController;

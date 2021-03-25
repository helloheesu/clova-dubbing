type millisecond = number;
type pixel = number;
type url = string;

type AudioSource = {
  url: url;
  name: string;
  duration: millisecond;
};

type AudioBox = {
  src: AudioSource;
  startAt: millisecond;
};

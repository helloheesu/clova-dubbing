type millisecond = number;
type pixel = number;
type url = string;

type AudioSource = {
  url: url;
  name: string;
  duration: millisecond;
};

type AudioBox = {
  key: string;
  src: AudioSource;
  startAt: millisecond;
};

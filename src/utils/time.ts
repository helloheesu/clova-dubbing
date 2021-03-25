export const localeMs = (ms: millisecond) => {
  const SECOND_TO_MS = 1000;
  const MINUTE_TO_MS = 60 * SECOND_TO_MS;

  const minute = Math.floor(ms / MINUTE_TO_MS)
    .toString()
    .padStart(2, "0");
  const second = ((ms % MINUTE_TO_MS) / SECOND_TO_MS)
    .toFixed(2)
    .toString()
    .padStart(5, "0");

  return `${minute}:${second}`;
};

const STEP_WIDTH: pixel = 400;

export const positionToTime = (
  position: pixel,
  scale: millisecond
): millisecond => {
  return (position * scale) / STEP_WIDTH;
};

export const timeToPosition = (
  time: millisecond,
  scale: millisecond
): pixel => {
  return (time * STEP_WIDTH) / scale;
};

const getDuration = (duration: number) => {
  const totalSeconds = Math.floor(duration / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const message =
    `${hours > 0 ? hours.toString() + 'h ' : ''}` +
    `${minutes > 0 ? minutes.toString() + 'm ' : ''}` +
    `${seconds > 0 ? seconds.toString() + 's ' : ''}`;

  return message;
};

export { getDuration };

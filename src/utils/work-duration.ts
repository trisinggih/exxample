export const valueToWorkDuration = (duration: number) => {
  if (!duration) {
    return null;
  }

  let hours = Math.floor(duration / 3600000);
  let minutes = Math.floor((duration % 3600000) / 60000);
  let seconds = Math.floor((duration % 60000) / 1000);

  // Round up if seconds >= 50
  if (seconds >= 50) {
    minutes += 1;
    seconds = 0;
  }

  // Round up if minutes >= 50
  if (minutes >= 50) {
    hours += 1;
    minutes = 0;
  }

  // Apply padding separately
  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};

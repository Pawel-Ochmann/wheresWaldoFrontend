export default function timeHandler(timeInSeconds: number): string  {
  const totalSeconds = Math.floor(timeInSeconds);
  const hours = Math.floor(totalSeconds / 3600);
  const remainingSeconds = totalSeconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const tenths = Math.floor((timeInSeconds - Math.floor(timeInSeconds)) * 10);

  const formattedHours = hours > 0 ? `${hours}:` : '';
  const formattedMinutes =
    hours > 0 || minutes > 0 ? `${minutes < 10 ? '0' : ''}${minutes}:` : '';
  const formattedSeconds = `${seconds < 10 ? '0' : ''}${seconds.toFixed(0)}`;
  const formattedTenths = `${tenths}`;

  return `${formattedHours}${formattedMinutes}${formattedSeconds}.${formattedTenths}`;
}

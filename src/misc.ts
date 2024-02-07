export function getTime(milliseconds: number): string {
  // Calculate hours, minutes, seconds, and milliseconds
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  const remainingMilliseconds = milliseconds % 1000;

  // Construct the formatted time string
  let formattedTime = '';
  if (hours > 0) {
    formattedTime += `${hours}h `;
  }
  if (minutes > 0 || hours > 0) {
    formattedTime += `${minutes}m `;
  }
  if (seconds > 0 || minutes > 0 || hours > 0) {
    formattedTime += `${seconds}s `;
  }
  formattedTime += `${remainingMilliseconds}ms`;

  return formattedTime.trim();
}



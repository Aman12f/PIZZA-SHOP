export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes} min ${remainingSeconds} sec`;
    } else {
      return `${remainingSeconds} sec`;
    }
  }
  export const sizeTimeMap = {
    Small: 180, // 3 minutes in seconds
    Medium: 240, // 4 minutes in seconds
    Large: 300, // 5 minutes in seconds
  };
  
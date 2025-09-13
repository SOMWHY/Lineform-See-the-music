export function secondToMinuteSecond(seconds) {
    if (seconds < 60) {
        return (seconds < 10 ? "0" + seconds : seconds) + "s";
    } else {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return minutes + "min" + (remainingSeconds > 0 ? (remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds) + "s" : "");
    }
}
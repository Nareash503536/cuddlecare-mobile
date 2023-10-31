const updateCountdown = () => {
    if (isRunning) {
        const currentTime = new Date();
        const elapsedTime = currentTime - startTime;
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
        const hours = Math.floor((elapsedTime / 1000 / 3600) % 24);
        setCountdown(`${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`);
    } else {
        setCountdown('00:00:00');
    }
};
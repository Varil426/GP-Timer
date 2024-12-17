export const stopwatchModule = () => {
  const stopwatch = document.querySelector(".stopwatch__wrapper");
  if (!stopwatch) throw "Couldn't find the stopwatch!";

  const display = stopwatch.querySelector(".stopwatch__display");
  if (!display) throw "Couldn't find the stopwatch display!";

  const startPauseButton = stopwatch.querySelector(
    ".stopwatch__button--play-pause"
  );
  const restartButton = stopwatch.querySelector(".stopwatch__button--restart");
  if (!startPauseButton || !restartButton) throw "Issue with buttons!";

  const targetTime = 5 * 60 * 1000; // 5 minutes

  let isRunning = false;
  let start = null;
  let timerIntervalId = null;

  const millisecondsToString = (value) =>
    secondsToString(Math.floor(value / 1000));

  const secondsToString = (value) => {
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes * 60;

    return `${minutes.toString().padStart(2, 0)}:${seconds
      .toString()
      .padStart(2, 0)}`;
  };

  const updateDisplay = (value) => {
    display.innerHTML = value;
  };

  const startTimer = () => {
    start = Date.now();

    // TODO Start from here
    // setInterval();

    isRunning = true;
  };

  const startPauseButtonOnClick = () => {
    if (isRunning) {
    } else {
      startTimer();
    }
  };

  const restartButtonOnClick = () => {
    if (isRunning) {
    } else {
      startTimer();
    }
  };

  // Init
  updateDisplay(millisecondsToString(targetTime));
};

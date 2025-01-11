const $5_MINUTES = 5 * 60 * 1000; // 5 minutes

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

  let selectedTime = $5_MINUTES; // TODO Custom or selectable time
  let targetTime = selectedTime;
  let isRunning = false;
  let start = null;
  let timerIntervalId = null;

  /**
   * Converts milliseconds into mm:ss string.
   * @param {number} value A time span in milliseconds.
   * @returns String in mm:ss format.
   */
  const millisecondsToString = (value) =>
    secondsToString(Math.floor(value / 1000));

  const secondsToString = (value) => {
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes * 60;

    return `${minutes.toString().padStart(2, 0)}:${seconds
      .toString()
      .padStart(2, 0)}`;
  };

  /**
   * Updates the display.
   * @param {string} value
   */
  const updateDisplay = (value) => {
    display.innerHTML = value;
  };

  const updateTimer = () => {
    const timeLeft = start + targetTime - Date.now();

    updateDisplay(millisecondsToString(timeLeft));

    if (timeLeft <= 0) {
      pauseTimer();
      // TODO Timer ended - maybe flash?
      updateDisplay("00:00");
      alert("The time has come!");
    }
  };

  const startTimer = () => {
    start = Date.now();
    timerIntervalId = setInterval(updateTimer, 200);
    isRunning = true;
  };

  const pauseTimer = () => {
    clearInterval(timerIntervalId);
    targetTime = targetTime - (Date.now() - start);
    updateDisplay(millisecondsToString(targetTime));
    isRunning = false;
  };

  const restartTimer = () => {
    clearInterval(timerIntervalId);
    targetTime = selectedTime;
    startTimer();
  };

  const startPauseButtonOnClick = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const restartButtonOnClick = () => {
    restartTimer();
  };

  // Init
  updateDisplay(millisecondsToString(targetTime));

  startPauseButton.addEventListener("click", startPauseButtonOnClick);
  restartButton.addEventListener("click", restartButtonOnClick);
};

import { cssHelper } from "../helpers/cssHelpers.js";

export const backgroundModule = async () => {
  const stopwatch = document.querySelector(".stopwatch__wrapper");
  if (!stopwatch) throw "Couldn't find the stopwatch!";

  // Preload backgrounds
  getAvailableBackgrounds().then((backgrounds) => preloadImages(backgrounds));

  const backgroundSwitchButton = stopwatch.querySelector(
    ".stopwatch__button--backgroundSwitch"
  );

  if (backgroundSwitchButton) {
    backgroundSwitchButton.addEventListener(
      "click",
      backgroundSwitchButtonOnClick
    );
  }

  const backgroundAutoplayButton = stopwatch.querySelector(
    ".stopwatch__button--backgroundAutoplay"
  );

  if (backgroundAutoplayButton) {
    backgroundAutoplayButton.addEventListener("click", () =>
      backgroundAutoplayButtonOnClick(backgroundAutoplayButton)
    );
  }
};

const BACKGROUND_DIRECTORY_URL = "/assets/backgrounds";

let avilableBackgrounds = [];

const getAvailableBackgrounds = async () => {
  if (avilableBackgrounds.length !== 0) {
    return avilableBackgrounds;
  }

  var response = await fetch(BACKGROUND_DIRECTORY_URL);
  if (!response.ok) {
    console.error("Failed to fetch backgrounds");
    return;
  }

  const body = await response.text();

  const domParser = new DOMParser();
  const html = domParser.parseFromString(body, "text/html");

  avilableBackgrounds = [...html.querySelectorAll("a.icon-image")].map(
    (x) => new URL(x.href).pathname
  );
  return avilableBackgrounds;
};

/**
 * Preloads images.
 * @param {string[]} urls
 */
const preloadImages = (urls) => {
  urls.forEach((url) => (new Image().src = url));
};

const getCurrentBackground = () =>
  document.body.style.backgroundImage.match(/url\(\"(?<backgroundUrl>.*)\"\)/)
    .groups.backgroundUrl;

const setCurrentBackground = (url) =>
  (document.body.style.backgroundImage = cssHelper.getCssUrl(url));

const switchBackground = async () => {
  const currentBackground = getCurrentBackground();
  const availableBackgrounds = (await getAvailableBackgrounds()).filter(
    (bg) => bg !== currentBackground
  );

  const chosenBackgroundIndex = Math.floor(
    Math.random() * availableBackgrounds.length
  );

  setCurrentBackground(availableBackgrounds[chosenBackgroundIndex]);
};

const ACTIVE_BUTTON_CSS_CLASS = "active";

const backgroundSwitchButtonOnClick = switchBackground;

let backgroundAutoplayIntervalId = null;
const BACKGROUND_AUTOPLAY_DURATION = 5000;

/**
 * @param {Element} autoplayButton
 */
const backgroundAutoplayButtonOnClick = (autoplayButton) => {
  if (!autoplayButton.classList.contains(ACTIVE_BUTTON_CSS_CLASS)) {
    backgroundAutoplayIntervalId = setInterval(
      switchBackground,
      BACKGROUND_AUTOPLAY_DURATION
    );
  } else {
    clearInterval(backgroundAutoplayIntervalId);
  }

  autoplayButton.classList.toggle(ACTIVE_BUTTON_CSS_CLASS);
};

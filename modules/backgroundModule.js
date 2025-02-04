export const backgroundModule = async () => {
  const stopwatch = document.querySelector(".stopwatch__wrapper");
  if (!stopwatch) throw "Couldn't find the stopwatch!";

  const backgroundSwitchButton = stopwatch.querySelector(
    ".stopwatch__button--backgroundSwitch"
  );

  if (!backgroundSwitchButton) throw "Background swtich button not found!";

  backgroundSwitchButton.addEventListener(
    "click",
    backgroundSwitchButtonOnClick
  );
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

const getCurrentBackground = () =>
  document.body.style.backgroundImage.match(/url\(\"(?<backgroundUrl>.*)\"\)/)
    .groups.backgroundUrl;

const setCurrentBackground = (url) =>
  (document.body.style.backgroundImage = `url("${url}")`);

const backgroundSwitchButtonOnClick = async () => {
  const currentBackground = getCurrentBackground();
  const availableBackgrounds = (await getAvailableBackgrounds()).filter(
    (bg) => bg !== currentBackground
  );

  const chosenBackgroundIndex = Math.floor(
    Math.random() * availableBackgrounds.length
  );

  setCurrentBackground(availableBackgrounds[chosenBackgroundIndex]);
};

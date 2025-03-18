export const themeModule = async () => {
  const switchThemeButton = document.querySelector(
    ".footer__button--switchTheme"
  );

  if (!switchThemeButton) {
    console.warn("Couldn't find switch theme button!");
    return;
  }

  switchThemeButton.addEventListener("click", () =>
    changeThemeHandler(switchThemeButton)
  );
};

let currentTheme = "dark";

const themes = {
  dark: {
    modalBackgroundColor: "rgba(0, 0, 0, 0.5)",
    modalButtonBackgroundColor: "rgba(0, 0, 0, 0.5)",
    buttonBackgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#FFF",
    font: "400 1em 'Doto', serif",
  },
  light: {
    modalBackgroundColor: "rgba(255, 255, 255, 0.8)",
    modalButtonBackgroundColor: "rgba(255, 180, 180, 0.8)",
    buttonBackgroundColor: "rgba(255, 180, 180, 0.8)",
    color: "#000",
    font: "400 1em 'Electrolize', sans-serif",
  },
};

const changeThemeHandler = (button) => {
  let selectedTheme;
  let buttonIcon;
  switch (currentTheme) {
    case "dark":
      selectedTheme = "light";
      buttonIcon = "🌕";
      break;
    default:
      selectedTheme = "dark";
      buttonIcon = "☀️";
      break;
  }

  applyTheme(themes[selectedTheme]);
  currentTheme = selectedTheme;
  button.textContent = buttonIcon;
};

/**
 * Applies the provided theme.
 * @param {*} theme A value from the "themes" constant.
 */
const applyTheme = (theme) => {
  const rootStyle = document.documentElement.style;

  rootStyle.setProperty("--color", theme.color);
  rootStyle.setProperty("--modal-background-color", theme.modalBackgroundColor);
  rootStyle.setProperty(
    "--modal-button-background-color",
    theme.modalButtonBackgroundColor
  );
  rootStyle.setProperty(
    "--button-background-color",
    theme.buttonBackgroundColor
  );
  rootStyle.setProperty("--font", theme.font);
};

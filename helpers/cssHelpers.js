export const cssHelper = {
  getCssUrl: (url) => `url("${url}")`,

  toMilliseconds: (milliseconds) => `${milliseconds}ms`,

  /**
   * Converts a number to a percentage.
   * @param {*} number [0,1]
   * @returns
   */
  toPercentage: (number) => `${number * 100}%`,

  setRootVariable: (variableName, value) =>
    document.documentElement.style.setProperty(variableName, value),
};

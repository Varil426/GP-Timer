import { backgroundModule } from "./modules/backgroundModule.js";
import { stopwatchModule } from "./modules/stopwatchModule.js";
import { themeModule } from "./modules/themeModule.js";

const modules = [backgroundModule, stopwatchModule, themeModule];

modules.forEach((module) => module());

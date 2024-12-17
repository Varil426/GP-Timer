import { backgroundModule } from "./modules/backgroundModule.js";
import { stopwatchModule } from "./modules/stopwatchModule.js";

const modules = [backgroundModule, stopwatchModule];

modules.forEach((module) => module());

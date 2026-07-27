import {
  getCurrentStage,
  getNextStage,
} from "./stageService";

console.log(
  getCurrentStage("gettingComfortable"),
);

console.log(
  getNextStage("gettingComfortable"),
);

console.log(
  getNextStage("lookingForward"),
);

import {
  createPassport,
  completeChapter,
} from "./services/passportService";

let passport =
  createPassport(1);

console.log(passport);

passport =
  completeChapter(passport, 1);

console.log(passport);

passport =
  completeChapter(passport, 2);

console.log(passport);

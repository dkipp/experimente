import { Observable, timer, combineLatest } from "rxjs";
import * as cv from "../js/opencv.js";

class MyLib {
  static add(p1: number, p2: number): number {
    return p1 + p2;
  }

  static sub(p1: number, p2: number): number {
    return p1 - p2;
  }
}

let point = new cv.Point(12, 34);

//https://coursetro.com/posts/code/148/RxJS-Observables-Tutorial---Creating-&-Subscribing-to-Observables
//timerOne emits first value at 1s, then once every 4s
const timerOne = timer(1000, 4000);
//timerTwo emits first value at 2s, then once every 4s
const timerTwo = timer(2000, 4000);
//timerThree emits first value at 3s, then once every 4s
const timerThree = timer(3000, 4000);

const libF1 = combineLatest(timerOne, timerTwo, (one: number, two: number) => {
  return MyLib.add(one, two);
});

const libF2 = combineLatest(libF1, timerThree, (one: number, two: number) => {
  return MyLib.sub(one, two);
});

//log values
const subscribe1 = libF1.subscribe((latestValuesProject: number) =>
  console.log("subscribe1", latestValuesProject)
);

const subscribe2 = libF2.subscribe((latestValuesProject: number) =>
  console.log("subscribe2", latestValuesProject)
);

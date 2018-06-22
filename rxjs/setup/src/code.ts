import { Observable, timer, combineLatest } from 'rxjs';

//https://coursetro.com/posts/code/148/RxJS-Observables-Tutorial---Creating-&-Subscribing-to-Observables
//timerOne emits first value at 1s, then once every 4s
const timerOne = timer(1000, 4000);
//timerTwo emits first value at 2s, then once every 4s
const timerTwo = timer(2000, 4000);
//timerThree emits first value at 3s, then once every 4s
const timerThree = timer(3000, 4000);

//combineLatest also takes an optional projection function
const combinedProject = combineLatest(
  timerOne,
  timerTwo,
  timerThree,
  (one:number, two:number, three:number) => {
    return `Timer One (Proj) Latest: ${one}, Timer Two (Proj) Latest: ${two}, Timer Three (Proj) Latest: ${three}`;
  }
);

//log values
const subscribe = combinedProject.subscribe( (latestValuesProject: string) =>
  console.log(latestValuesProject)
);
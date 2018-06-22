import { timer, combineLatest, of as observableOf} from 'rxjs';
import { share } from 'rxjs/operators';

/* concept for building a reactive graph */

//input nodes
const i1 = observableOf(1000).pipe( share() );
const i2 = observableOf(2000).pipe( share() );
const i3 = observableOf(3000).pipe( share() );
const i4 = observableOf(4000).pipe( share() );

// nodes
const n1 = combineLatest(i1, i4, timer);
const n2 = combineLatest(i2, i4, timer);
const n3 = combineLatest(i3, i4, timer);

// custom nodes
const n4 = (one:number, two:number, three:number) => {
  return `Timer One (Proj) Latest: ${one}, Timer Two (Proj) Latest: ${two}, Timer Three (Proj) Latest: ${three}`;
};

const n5 = combineLatest(n1, n2, n3, n4);

const subscribe = n5.subscribe( (latestValuesProject: string) =>  console.log(latestValuesProject) );



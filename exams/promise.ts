/***
 * ES6 introduced Promises, which provided a clearer syntax that chains asynchronous commands as a series.
 * This is more readable than callbacks and does not result in a callback-hell.
 * 
 * callback-hell: run1(a, (b) => { run2(b, (c) => { run3(c, (d) => { run4(d, (...) => { }) }) }) })
 */

// i. Promisify the setTimeout
function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), milliseconds);
  });
}

// ii. Promisify any async callback function
function pA() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('a'), 100);
  });
}
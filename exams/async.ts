const a = (cb: Function) => setTimeout(() => cb('a'), 100);
const b = (cb: Function) => setTimeout(() => cb('b'), 50);
const c = (cb: Function) => setTimeout(() => cb('c'), 0);

function runTasks(tasks: Array<Function>, callback: Function) {
  let wait = tasks.length;
  let results: Array<string> = [];

  const check = () => {
    if (wait > 0) {
      setImmediate(check);
      return;
    }
    callback(results);
  }
  setImmediate(check);

  tasks.forEach((task, i) => {
    console.time(`cb ${i}`);
    task((ans: string) => {
      console.timeEnd(`cb ${i}`);
      wait -= 1;
      results[i] = ans;
    })
  });
}

console.time('runTasks');
runTasks([a, b, c], (results: Array<string>) => {
  console.log(results)
  console.timeEnd('runTasks')
});

// What estimated execution time in your runTasks function?
// /> ~110ms


// Can you make it finished in the following execution time?
// /> a. Yes
// /> b.c. that 'a' function minimum time is 100ms
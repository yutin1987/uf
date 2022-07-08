console.log('start')

process.nextTick(() => console.log('tick1'))

setImmediate(() => console.log('immediate'))

setTimeout(() => console.log('timeout'))

new Promise((resolve) => {
  console.log('promise')
  resolve(true)
})
.then(() => console.log('then1'))
.then(() => console.log('then2'))

;(async function () {
  await 10
  console.log('async')
})().then(() => console.log('then3'))

console.log('end')

// What's the output on the following script?
// /> start > promise > end > tick1 > then1 > async > then2 > then3 > timeout > immediate

// Please explain why?
// /> high priority 1. nextTick queue <process.nextTick>
// /> high priority 2. microTask queue <Promise> <then>
// /> timers > pending callbacks > idle, prepare > polling > check > close callbacks

// /> timers queue <setTimeout>
// /> check queue <setImmediate>

/**
 * 1. main) print 'start'
 * 2. nextTick queue) ** process.nextTick(() => console.log('tick1')) **
 * 3. check queue) ** setImmediate(() => console.log('immediate')) **
 * 4. timers queue) ** setTimeout(() => console.log('timeout')) **
 * 5. main) Promise constructor) print 'promise'
 * 6. microTask queue) ** .then(() => console.log('then1')) **
 *  (function() {
 *    return new Promise(function(resolve, reject) {
 *      resolve(10);
 *    }).then(() => console.log('async'));
 *  })();
 * 7. microTask queue) ** .then(() => console.log('async')) **
 * 8. main) print 'end'
 * 9. nextTick) print tick1
 * 10. microTask) print then1
 * 11. microTask queue) ** .then(() => console.log('then2')) **
 * 12. microTask) print async
 * 13. microTask queue) ** .then(() => console.log('then3')) **
 * 14. microTask) print then2
 * 15. microTask) print then3
 * 16. timers) print timeout
 * 17. check) print immediate
 */
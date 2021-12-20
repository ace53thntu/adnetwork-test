export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export function ensureFlagIsSet(timeout, flag) {
  let start = Date.now();
  return new Promise(waitForFoo); // set the promise object within the ensureFooIsSet object

  // waitForFoo makes the decision whether the condition is met
  // or not met or the timeout has been exceeded which means
  // this promise will be rejected
  function waitForFoo(resolve, reject) {
    if (flag) resolve(flag);
    else if (timeout && Date.now() - start >= timeout)
      reject(new Error('timeout'));
    else setTimeout(waitForFoo.bind(this, resolve, reject), 30);
  }
}

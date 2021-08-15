import React from 'react';

function useComputedValue(...allArgs) {
  // normally setting current during render like this is not good and you'll
  // want to do that in a useEffect.
  // However, we need access to these values *during* render.
  const args = React.useRef();
  args.current = allArgs;
  const ref = React.useRef();
  if (!ref.current) {
    ref.current = {};
    Object.defineProperty(ref.current, 'result', {
      get() {
        const [cb, deps] = args.current;

        // only call the given callback if we haven't already calculated
        // the value or the dependencies have changed.
        if (
          !ref.current.__value ||
          !ref.current.__deps ||
          !ref.current.__deps.every((dep, i) => Object.is(dep, deps[i]))
        ) {
          ref.current.__value = cb();
          ref.current.__deps = deps;
        }
        return ref.current.__value;
      },
    });
  }
  return ref.current;
}
export {useComputedValue};

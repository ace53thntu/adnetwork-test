/**
 * This custom hook clone from: https://github.com/kentcdodds/use-deep-compare-effect
 * You can go to the link and read about that.
 */

import {dequal as deepEqual} from 'dequal';
import React from 'react';

function checkDeps(deps) {
  if (!deps || !deps.length) {
    throw new Error(
      'useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.'
    );
  }
  if (deps.every(isPrimitive)) {
    throw new Error(
      'useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.'
    );
  }
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val);
}

export function useDeepCompareMemoize(value) {
  const ref = React.useRef();

  if (!deepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffect(callback, dependencies) {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(dependencies);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(callback, useDeepCompareMemoize(dependencies));
}

export function useDeepCompareEffectNoCheck(callback, dependencies) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(callback, useDeepCompareMemoize(dependencies));
}

export default useDeepCompareEffect;

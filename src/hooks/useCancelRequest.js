import {useEffect, useRef} from 'react';
import axios from 'axios';

export function useCancelRequest() {
  const axiosCancelSource = useRef(axios.CancelToken.source());

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      axiosCancelSource.current?.cancel();
    };
  }, []);

  return {
    cancelToken: axiosCancelSource.current.token
  };
}

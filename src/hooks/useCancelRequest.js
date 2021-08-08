import axios from 'axios';
import * as React from 'react';

export function useCancelRequest() {
  const axiosCancelSource = React.useRef(axios.CancelToken.source());

  React.useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      axiosCancelSource.current?.cancel();
    };
  }, []);

  return {
    cancelToken: axiosCancelSource.current.token
  };
}

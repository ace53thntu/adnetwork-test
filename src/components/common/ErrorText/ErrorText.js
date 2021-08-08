import * as React from 'react';
import {Alert} from 'reactstrap';

export function ErrorText({message = 'Something went wrong.'}) {
  return <Alert color="danger">{message}</Alert>;
}

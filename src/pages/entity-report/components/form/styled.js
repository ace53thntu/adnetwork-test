import {Button} from 'reactstrap';
import styled from 'styled-components';

export const ErrorMessageStyled = styled.div`
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
  font-weight: bold;
`;

export const UnitButton = styled(Button)`
  cursor: ${props => (props.readOnly ? 'default !important' : 'pointer')};
`;

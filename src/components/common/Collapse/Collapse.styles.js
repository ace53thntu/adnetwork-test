import {FormGroup} from 'reactstrap';
import styled from 'styled-components';

export const CollapseContainer = styled(FormGroup)`
  border: 1px solid ${props => (props.hasError ? 'red' : '#dee2e6')};
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;
export const CollapseLegend = styled.legend`
  cursor: pointer;
  width: auto;
  padding-right: 10px;
  padding-left: 10px;
`;

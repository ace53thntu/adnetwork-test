import {Button} from '@material-ui/core';
import styled from 'styled-components';

export const FilterWrap = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const FilterContent = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
`;

export const FormFieldItem = styled.div`
  width: ${props => props.width || '180px'};
  padding: 0 5px;
`;

export const FilterButtonStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`;

export const FilterButton = styled(({isActived, ...props}) => (
  <Button {...props} />
))`
  background: ${props => (props.isActived === 'true' ? '#3f51b5' : '#ffffff')};
  color: ${props => (props.isActived === 'true' ? '#ffffff' : '#3f51b5')};
  &:hover {
    color: ${props => (props.isActived === 'true' ? '#ffffff' : 'inherit')};
    background: ${props =>
      props.isActived === 'true' ? '#3f51b5' : 'inherit'};
  }
`;

export const SubmitButtonWrap = styled.div`
  padding-top: 30px;
`;

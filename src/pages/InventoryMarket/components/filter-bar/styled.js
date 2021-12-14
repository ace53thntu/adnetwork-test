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

export const SubmitButtonWrap = styled.div`
  padding-top: 30px;
`;

export const FilterModeGroupStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

import styled from 'styled-components';

export const ReportItemStyled = styled.div`
  min-height: 300px;
  background: ${props => (props.isLoading ? '#cfd2cd' : '#FFFFFF')};
  cursor: isLoading ? progress : pointer;
  padding: 10px;
  border-radius: 8px;
`;

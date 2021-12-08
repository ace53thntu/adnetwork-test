import {ListGroupItem} from 'reactstrap';
import styled from 'styled-components';

const getColorActive = ({active, color, defaultColor}) => {
  if (active) {
    return color;
  }
  return defaultColor;
};

export const SidebarItemStyled = styled(ListGroupItem)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 7.5px 10px;
  background-color: ${props =>
    getColorActive({
      active: props?.active,
      color: '#e0f3ff !important',
      defaultColor: '#FFFFFF'
    })};
  border-color: ${props =>
    getColorActive({
      active: props?.active,
      color: '#e0f3ff !important',
      defaultColor: '#FFFFFF'
    })};
  color: ${props =>
    getColorActive({
      active: props?.active,
      color: '#545cd8 !important',
      defaultColor: '#495057'
    })};
`;

export const SidebarLoadingStyled = styled.div`
  padding: 10px;
  font-size: 14px;
  color: gray;
`;

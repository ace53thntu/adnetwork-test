import styled from 'styled-components';

export const ConceptListItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  margin-right: 15px;
`;

export const ConceptListItemAction = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const ConceptListItemBody = styled.div`
  width: 140px;
  height: 140px;
  cursor: pointer;
  background-color: #bfbfbf;
  border-radius: 10px;
  position: relative;
`;

export const ConceptListItemName = styled.div`
  color: #4f4f4f;
  /* margin: 10px; */
  text-align: center;
  width: 140px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

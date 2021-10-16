import styled from 'styled-components';

import {createTheme} from '@material-ui/core/styles';

export const btnTheme = createTheme({
  overrides: {
    MuiButton: {
      startIcon: {
        marginLeft: 0,
        marginRight: 0
      },
      root: {
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        padding: 0,
        minWidth: 0
      }
    }
  }
});

export const AddConceptContainer = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin-right: 15px;
`;

export const AddConceptContainerBody = styled.div`
  position: relative;
  cursor: pointer;
  background-color: #bfbfbf;
  border-radius: 10px;
  overflow: hidden;

  > div {
    width: 140px;
    height: 140px;
    position: relative;
  }
`;

export const ConceptsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

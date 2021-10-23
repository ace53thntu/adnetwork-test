import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  z-index: 10;
`;

export const Title = styled.div`
  flex-grow: 1;
  flex-basis: 80%;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
`;

export const DeleteIconButton = styled(IconButton)``;
export const DeleteActionWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: none;
`;

export const SwiperItemContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;

  &:hover {
    ${DeleteActionWrapper} {
      display: block;
    }
  }
`;

export const SwiperContent = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  > video {
    width: 100%;
    height: auto;
  }
`;

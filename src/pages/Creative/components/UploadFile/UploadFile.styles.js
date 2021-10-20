import {Button} from 'reactstrap';
import styled from 'styled-components';

const SIZE = 300;
export const DropArea = styled.div`
  width: ${SIZE}px;
  height: ${SIZE}px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: auto;
`;

export const PreviewVideo = styled.video`
  width: 100%;
  height: auto;
`;
export const RemoveImgButton = styled(Button)`
  position: absolute;
  top: 2px;
  right: 2px;
  display: none;
`;
export const FileInformationContainer = styled.div`
  border: #ced4da dashed 2px;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  align-content: center;
  text-align: center;
  width: ${SIZE}px;
  height: ${SIZE}px;
  transition: all 0.2s;
  overflow: hidden;
  position: relative;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  border-bottom-left-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;

  &:hover ${RemoveImgButton} {
    display: block;
  }
`;
export const PreviewInfoContainer = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 10px;
`;

import {FILE_DISPLAY_URL} from 'constants/index';
import PropTypes from 'prop-types';
import * as React from 'react';

import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  ASSET_TYPES_IS_FILE
} from '../BannerForm/constants';
import DeleteAction from './DeleteAction';
import {
  SwiperContent,
  SwiperItemContainer,
  Title,
  TitleContainer
} from './SwiperItem.styles';

function SwiperItem(props) {
  const {
    name,
    file,
    isCreative,
    handleClickName,
    item,
    onDelete,
    isVideo
  } = props;

  const isVideoTypeOfVideo = ALLOWED_VIDEO_TYPES.includes(file?.mimeType);

  const isVideoTypeOfCreative = ALLOWED_VIDEO_TYPES.includes(
    file?.file?.mimeType
  );

  const isImgTypeOfCreative = ALLOWED_IMAGE_TYPES.includes(
    file?.file?.mimeType
  );

  const isNotAFile = !ASSET_TYPES_IS_FILE.includes(file?.type);

  const notFoundText = isCreative
    ? 'Not found Alternative(s)'
    : isVideo
    ? 'Not found file(s)'
    : 'Not found Asset(s).';

  return (
    <SwiperItemContainer>
      <DeleteAction onDelete={onDelete} />
      <TitleContainer>
        <Title
          className="text-truncate"
          title={name}
          onClick={() => handleClickName(item)}
        >
          {name}
        </Title>
      </TitleContainer>

      <SwiperContent>
        {!file && notFoundText}

        {file && isImgTypeOfCreative && (
          <img
            src={`${FILE_DISPLAY_URL}/${file?.file?.uuid}`}
            alt={file?.file?.originalName}
          />
        )}

        {file && isVideoTypeOfCreative && (
          <video src={`${FILE_DISPLAY_URL}/${file?.file.uuid}`} />
        )}

        {file && isVideo && isVideoTypeOfVideo && (
          <video src={`${FILE_DISPLAY_URL}/${file?.uuid}`} />
        )}

        {!isCreative && !isVideo && file && isNotAFile && (
          <>
            <div>Type: {file.type}</div>
            <div>Value: {file.value}</div>
          </>
        )}
      </SwiperContent>
    </SwiperItemContainer>
  );
}

SwiperItem.propTypes = {
  name: PropTypes.string,
  file: PropTypes.any,
  item: PropTypes.any,
  isCreative: PropTypes.bool,
  handleClickName: PropTypes.func,
  isVideo: PropTypes.bool
};
SwiperItem.defaultProps = {
  isCreative: false,
  handleClickName: () => {},
  file: null,
  item: null,
  isVideo: false
};

export default SwiperItem;

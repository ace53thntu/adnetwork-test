import {
  exportToCsvFile,
  exportToJsonFile,
  parseJSONToCSVStr
} from 'utils/helpers/files.helpers';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';
import styled from 'styled-components';

import {SAMPLE_DATA, SAMPLE_FILES} from './constants';

const Container = styled.div`
  margin-top: 1rem;
`;

function DownloadTemplate(props) {
  const {t} = useTranslation();

  function handleDownloadTemplate(fileKey, fileType, filename) {
    const fileData = SAMPLE_DATA[fileKey];
    if (fileType === 'json') {
      return exportToJsonFile(fileData, filename);
    }
    const parsedJsonToCSVStr = parseJSONToCSVStr(fileData);
    return exportToCsvFile(parsedJsonToCSVStr, filename);
  }

  return (
    <Container>
      <UncontrolledButtonDropdown>
        <DropdownToggle caret size="sm">
          {t('download_sample_file')}
        </DropdownToggle>
        <DropdownMenu>
          {SAMPLE_FILES.map(file => (
            <DropdownItem
              key={file.key}
              onClick={() =>
                handleDownloadTemplate(file.key, file.type, file.filename)
              }
            >
              {t(file.key)}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </Container>
  );
}

export default DownloadTemplate;

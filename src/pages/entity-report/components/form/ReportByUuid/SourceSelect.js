//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {FormReactSelect} from 'components/forms';
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import {Sources} from 'pages/entity-report/constants.js';

const propTypes = {
  name: PropTypes.string.isRequired
};

const SourceSelect = ({name = ''}) => {
  const {t} = useTranslation();

  return (
    <FormReactSelect
      label={t('source')}
      placeholder={t('selectSource')}
      options={Sources}
      name={name}
      isRequired={false}
    />
  );
};

SourceSelect.propTypes = propTypes;

export default SourceSelect;

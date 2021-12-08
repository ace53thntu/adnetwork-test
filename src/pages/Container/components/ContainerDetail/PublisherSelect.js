import React from 'react';

import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

import {SelectPaginate} from 'components/forms';
import {usePublisherPagination} from 'pages/Container/hooks/usePublisherPagination';

const propTypes = {
  currentContainer: PropTypes.object,
  isEdit: PropTypes.bool
};

const PublisherSelect = ({currentContainer = {}, isEdit = false}) => {
  const {t} = useTranslation();
  const {loadPublisher} = usePublisherPagination();

  return (
    <SelectPaginate
      required
      disabled={isEdit}
      name="publisher_uuid"
      label={t('publisher')}
      placeholder={t('selectPublisher')}
      loadOptions={loadPublisher}
      additional={{
        page: 1
      }}
      defaultValue={currentContainer?.publisher_uuid || null}
    />
  );
};

PublisherSelect.propTypes = propTypes;

export default PublisherSelect;

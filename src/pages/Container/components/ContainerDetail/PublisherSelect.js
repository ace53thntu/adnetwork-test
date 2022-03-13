import React from 'react';

import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

import {SelectPaginate} from 'components/forms';
import {usePublisherPagination} from 'pages/Container/hooks/usePublisherPagination';
import {getRole} from 'utils/helpers/auth.helpers';
import {USER_ROLE} from 'pages/user-management/constants';

const propTypes = {
  currentContainer: PropTypes.object,
  isEdit: PropTypes.bool
};

const PublisherSelect = ({currentContainer = {}, isEdit = false}) => {
  const {t} = useTranslation();
  const role = getRole();
  const {loadPublisher} = usePublisherPagination();

  return (
    <SelectPaginate
      required
      disabled={isEdit || role === USER_ROLE.PUBLISHER}
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

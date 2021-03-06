//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {useFormContext} from 'react-hook-form';

//---> Internal Modules
import {TrackerTemplateAPIRequest} from 'api/tracker-template.api';
import {SelectPaginate} from 'components/forms';
import {DEFAULT_PAGINATION, IS_RESPONSE_ALL, Statuses} from 'constants/misc';
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';

const propTypes = {
  currentInventory: PropTypes.object
};

const TrackerTemplateSelect = ({currentInventory = {}}) => {
  const {t} = useTranslation();
  const {
    formState: {isSubmitting}
  } = useFormContext();
  const {loadTrackerTemplate} = useTrackerTemplatePagination();

  return (
    <SelectPaginate
      required
      name="tracker_uuid"
      label={t('trackerTemplate')}
      placeholder={t('selectTrackerTemplate')}
      loadOptions={loadTrackerTemplate}
      additional={{
        page: 1
      }}
      defaultValue={currentInventory?.tracker_template_uuid || null}
      disabled={isSubmitting}
    />
  );
};

TrackerTemplateSelect.propTypes = propTypes;

export default TrackerTemplateSelect;

const useTrackerTemplatePagination = () => {
  const loadTrackerTemplate = React.useCallback(
    async (search, prevOptions, {page}) => {
      const res = await TrackerTemplateAPIRequest.getAllTrackerTemplate({
        params: {
          page,
          limit: DEFAULT_PAGINATION.perPage,
          name: search,
          status: Statuses.ACTIVE
        },
        options: {
          isResponseAll: IS_RESPONSE_ALL
        }
      });

      const data = getResponseData(res, IS_RESPONSE_ALL);
      const total = getResponsePagination(res)?.totalItems;
      const perPage = getResponsePagination(res)?.perPage;

      const options = [...data].map(item => ({
        label: item.name,
        value: item.uuid
      }));

      const hasMore = page < Math.ceil(total / perPage);

      return {
        options,
        hasMore,
        additional: {
          page: page + 1
        }
      };
    },
    []
  );

  return {
    loadTrackerTemplate
  };
};

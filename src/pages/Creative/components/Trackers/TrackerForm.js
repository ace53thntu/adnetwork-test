import {Collapse} from 'components/common';
import {SelectPaginate} from 'components/forms';
import PropTypes from 'prop-types';
import {useCreateTracker, useEditTracker} from 'queries/tracker';
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Button, Col, Row} from 'reactstrap';
import {isJsonObject} from 'utils/helpers/misc.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';

import VariablesForm from './VariablesForm';
import {formValuesToRepo, trackerToFormValues} from './dto';
import {useGetTrackerTemplatesPagination} from './hooks';

function TrackerForm(props) {
  const {handleAddTracker, referenceId, referenceType, tracker} = props;

  return (
    <Collapse
      initialOpen={!tracker}
      title={!!tracker ? `${tracker?.tracker_template?.name}` : 'New tracker'}
      unMount={false}
    >
      <TrackerFormBody
        handleAddTracker={handleAddTracker}
        referenceId={referenceId}
        referenceType={referenceType}
        tracker={tracker}
      />
    </Collapse>
  );
}

TrackerForm.propTypes = {
  handleAddTracker: PropTypes.func,
  referenceId: PropTypes.any,
  referenceType: PropTypes.any,
  tracker: PropTypes.any
};
TrackerForm.defaultProps = {};

export default TrackerForm;

const formDefaultValues = {
  template: null
};

function TrackerFormBody(props) {
  const {handleAddTracker, referenceId, referenceType, tracker} = props;
  const {t} = useTranslation();
  const {loadTrackerTemplates} = useGetTrackerTemplatesPagination();
  const {mutateAsync: createTracker} = useCreateTracker();
  const {mutateAsync: updateTracker} = useEditTracker();

  const isEdit = !!tracker;

  const getFormDefaultValues = React.useMemo(() => {
    if (isEdit) {
      return trackerToFormValues(tracker);
    }
    return formDefaultValues;
  }, [isEdit, tracker]);

  const methods = useForm({
    defaultValues: getFormDefaultValues
  });
  const {
    handleSubmit,
    formState: {isDirty},
    watch
  } = methods;

  const [isLoading, setIsLoading] = React.useState(false);

  const watchTemplate = watch('template');

  const onSubmit = async values => {
    const bodyRequest = formValuesToRepo(values, referenceId, referenceType);

    setIsLoading(true);

    if (!isEdit) {
      try {
        await createTracker(bodyRequest);
        setIsLoading(false);
        ShowToast.success('Add tracker successfully!');
        handleCancel();
      } catch (error) {
        setIsLoading(false);
        ShowToast.error(error?.msg);
      }
    } else {
      try {
        await updateTracker({trackerId: tracker?.uuid, data: bodyRequest});
        setIsLoading(false);
        ShowToast.success('Update tracker successfully!');
        handleCancel();
      } catch (error) {
        setIsLoading(false);
        ShowToast.error(error?.msg);
      }
    }
  };

  const handleCancel = () => {
    handleAddTracker();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} name="tracker-form">
        <Row>
          <Col>
            <SelectPaginate
              required
              name="template"
              label="Template"
              placeholder="Select tracker template..."
              loadOptions={loadTrackerTemplates}
              additional={{
                page: 1
              }}
              defaultValue={null}
              disabled={isLoading}
            />
          </Col>
        </Row>

        {watchTemplate && isJsonObject(watchTemplate?.variables) ? (
          <Row>
            <Col>
              <VariablesForm
                variables={
                  getFormDefaultValues?.variables ??
                  watchTemplate?.variables ??
                  {}
                }
              />
            </Col>
          </Row>
        ) : null}

        <Row>
          <Col>
            <div className="d-flex justify-content-end">
              <Button
                color="secondary"
                onClick={handleCancel}
                disabled={isLoading}
                type="button"
                className="ml-2"
              >
                {t('cancel')}
              </Button>

              <Button
                type="submit"
                color="primary"
                className="ml-2"
                disabled={isLoading || !isDirty}
              >
                {t('save')}
              </Button>
            </div>
          </Col>
        </Row>
      </form>
    </FormProvider>
  );
}

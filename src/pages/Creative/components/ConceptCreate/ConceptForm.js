import {TextField} from 'components/forms';
import PropTypes from 'prop-types';
import {useCreateConcept, useUpdateConcept} from 'queries/concept';
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router';
import {Button, Card, CardBody, CardFooter, Col, Row} from 'reactstrap';
import {
  addConceptRedux,
  selectConceptRedux,
  updateConceptRedux
} from 'store/reducers/creative';
import {ShowToast} from 'utils/helpers/showToast.helpers';

import {createConceptModelToRepo} from './dto';
import {createConceptResolver} from './utils';

const formDefaultValues = {
  name: ''
};

function ConceptForm(props) {
  const {concept} = props;

  const {t} = useTranslation();
  const navigate = useNavigate();
  const {advertiserId} = useParams();
  const dispatch = useDispatch();

  const {mutateAsync: createConceptRequest} = useCreateConcept();
  const {mutateAsync: updateConceptRequest} = useUpdateConcept();

  const isEdit = !!concept;

  const defaultValues = React.useMemo(() => {
    if (isEdit) {
      const {name} = concept;
      return {
        name
      };
    } else {
      return formDefaultValues;
    }
  }, [concept, isEdit]);

  const methods = useForm({
    defaultValues,
    resolver: createConceptResolver()
  });

  const {
    handleSubmit,
    formState: {isDirty}
    // reset
  } = methods;

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async values => {
    const bodyRequest = createConceptModelToRepo(values, advertiserId);

    setIsLoading(true);

    try {
      if (isEdit) {
        await updateConceptRequest({
          data: bodyRequest,
          conceptId: concept?.uuid
        });
        ShowToast.success('Update Concept successfully!');
        setIsLoading(false);
        dispatch(updateConceptRedux(concept?.uuid, bodyRequest));
      } else {
        const res = await createConceptRequest(bodyRequest);
        ShowToast.success('Create Concept successfully!');
        setIsLoading(false);
        dispatch(addConceptRedux(res?.data));
        handleCancel();
      }
    } catch (error) {
      setIsLoading(false);
      ShowToast.error(error?.msg);
    }
  };

  const handleCancel = () => {
    navigate('..');
    dispatch(selectConceptRedux(null, advertiserId));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <TextField
                  type="text"
                  placeholder={'Enter Concept name here...'}
                  id={'name'}
                  name={'name'}
                  label={'Name'}
                  isRequired={true}
                  disabled={isLoading}
                  // plaintext={disabled}
                />
              </Col>
            </Row>
          </CardBody>

          <CardFooter className="justify-content-end">
            <Button
              color="secondary"
              onClick={handleCancel}
              disabled={isLoading}
            >
              {t('cancel')}
            </Button>
            <Button
              color="primary"
              disabled={!isDirty}
              type="submit"
              className="ml-2"
            >
              {t('save')}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}

ConceptForm.propTypes = {
  concept: PropTypes.any
};
ConceptForm.defaultProps = {
  concept: null
};

export default ConceptForm;

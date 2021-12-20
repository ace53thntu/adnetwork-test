//---> Build-in Modules
import React, {useEffect} from 'react';

//---> External Modules
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, CustomInput, ListGroup, ListGroupItem} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

//---> Internal Modules
import {ShowToast} from 'utils/helpers/showToast.helpers';

const Concept = ({goTo, isSummary = false, strategyData, isView}) => {
  const navigate = useNavigate();

  const {t} = useTranslation();
  const {id: strategyId} = useParams();
  // const {data: concepts = []} = useGetConcepts({
  //   params: {advertiser_id: selectedAdvertiser}
  // });

  const concepts = [];
  const methods = useForm();
  const {handleSubmit, setValue} = methods;
  // const {mutateAsync: updateStrategy} = useEditStrategy();
  const updateStrategy = new Promise(resolve => resolve('ok'));

  useEffect(() => {
    if (strategyData) {
      const concepts = [{id: 1}];
      if (concepts && concepts.length > 0) {
        concepts.forEach((element, idx) => {
          setValue(`concept_ids[${idx}]`, element?.id);
        });
      }
    }
  }, [setValue, strategyData]);

  const onSubmit = async formData => {
    if (strategyId) {
      const {concept_ids} = formData;
      const data = concept_ids?.map(item => parseInt(item, 10)) ?? null;
      const destructureData = [...data].filter(item => item);
      try {
        await updateStrategy({
          strategyId,
          data: {concept_ids: destructureData}
        });
        ShowToast.success('Add concept successfully');
        navigate(
          `/campaigns/${strategyData?.campaign_id}/strategy/${strategyId}/edit?next_tab=summary`
        );
      } catch (error) {
        ShowToast.error(error?.msg || 'Fail to add concept to Strategy');
      }
      return;
    }
    // goTo({nextTab: 'summary'});
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="mb-3"
        >
          <ListGroup>
            {concepts?.data?.map((conceptItem, conceptIdx) => {
              return (
                <ConceptItem
                  key={`pr-${conceptIdx}`}
                  conceptItem={conceptItem}
                  conceptIdx={conceptIdx}
                  isView={isView}
                />
              );
            })}
          </ListGroup>
          {!isSummary && !isView ? (
            <div className="mt-3 d-flex justify-content-end">
              <Button
                type="submit"
                className="mb-2 mr-2 btn-icon"
                color="success"
              >
                <i className="pe-7s-upload btn-icon-wrapper"> </i>
                {t('saveAndNext')}
              </Button>
            </div>
          ) : null}
        </form>
      </FormProvider>
      {!concepts || concepts.length === 0 ? (
        <Button color="link">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-warning"
          />{' '}
          You don't have any concept
        </Button>
      ) : null}
    </>
  );
};

const ConceptItem = ({conceptItem, conceptIdx, isView}) => {
  const {register} = useFormContext();

  return (
    <ListGroupItem>
      <div className="todo-indicator bg-success" />
      <div className="widget-content p-0">
        <div className="widget-content-wrapper">
          <div className="widget-content-left flex2">
            <CustomInput
              type="checkbox"
              label={conceptItem?.name}
              name={`concept_ids[${conceptIdx}]`}
              id={`concept=${conceptItem?.id}`}
              innerRef={register()}
              value={conceptItem?.id}
              disabled={isView}
            />
          </div>
          <div className="widget-content-right ml-3">
            <div className="badge badge-pill badge-success">
              {conceptItem?.status}
            </div>
          </div>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default Concept;

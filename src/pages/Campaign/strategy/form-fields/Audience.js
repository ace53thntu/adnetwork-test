//---> Build-in Modules
import React, {useMemo, useCallback, useState} from 'react';

//---> External Modules
import {useForm, FormProvider} from 'react-hook-form';
import {
  Button,
  ListGroup,
  ListGroupItem,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  Input,
  Alert,
  Form
} from 'reactstrap';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useTranslation} from 'react-i18next';

//---> Internal Modules
// import {useGetListAudiences} from 'core/queries/audiences';

const Audience = ({
  goTo,
  footer = true,
  listAudiences = [],
  dataStrategy = {},
  setDataStrategy,
  setListErrors,
  viewOnly
}) => {
  const {t} = useTranslation();
  // const [audience, setAudiences] = useState(dataStrategy?.audience || '');
  // const [inValid, setInvalid] = useState(false);
  // const {data: audiences = []} = useGetListAudiences();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const audiences = [];
  const [searchText, setSearchText] = useState('');
  const methods = useForm({});
  const {handleSubmit} = methods;

  const onChangeAudiences = useCallback(audienceID => {
    // setAudiences(audienceID);
  }, []);

  const audienceSelected = dataStrategy?.audience || '';

  const handleSearch = value => {
    setSearchText(value);
  };

  const onSubmit = useCallback(async () => {
    // setListErrors(prev => {
    //   delete prev.tab2;
    //   return prev;
    // });
    // if (!audience) {
    //   setInvalid(true);
    //   setListErrors(prev => ({
    //     ...prev,
    //     tab2: t('tab2Error')
    //   }));
    //   return;
    // } else {
    //   setInvalid(false);
    // }
    // setDataStrategy(prev => ({
    //   ...prev,
    //   audience
    // }));
    goTo({nextTab: 'concept'});
  }, [goTo]);

  const renderAudiences = useMemo(
    () =>
      (
        audiences?.filter(item => {
          const auName = item.name.toUpperCase();
          return auName.includes(searchText.toUpperCase());
        }) || []
      ).map(({id: audienceID, name: audienceName, active: status}) => (
        <ListGroupItem key={audienceID}>
          <div className="todo-indicator bg-success" />
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left flex2">
                <CustomInput
                  type="checkbox"
                  id={`pr-${audienceID}`}
                  label={audienceName}
                  name="customRadio"
                />
              </div>
              <div className="widget-content-right ml-3">
                <div className="badge badge-pill badge-success">{status}</div>
              </div>
            </div>
          </div>
        </ListGroupItem>
      )),
    [audiences, searchText]
  );

  const renderViewOnly = () => {
    const audienceSelectedDetail =
      listAudiences?.find(item => item.id === audienceSelected) || [];

    return (
      <div className="widget-content pt-0 pb-0">
        <div className="widget-content-wrapper">
          <div className="widget-content-left flex2">
            <CustomInput
              onClick={() =>
                onChangeAudiences(audienceSelectedDetail?.audienceID)
              }
              type="radio"
              id={`pr-${audienceSelectedDetail?.id}`}
              label={audienceSelectedDetail?.name}
              defaultChecked={true}
              name="customRadio"
            />
          </div>
          <div className="widget-content-right ml-3">
            <div className="badge badge-pill badge-success">
              {audienceSelectedDetail?.status}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return viewOnly && listAudiences?.length ? (
    renderViewOnly()
  ) : (
    <div>
      <div
        style={{
          marginBottom: 15,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <InputGroup style={{width: '40%'}}>
          <InputGroupAddon addonType="prepend">
            <div className="input-group-text">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </InputGroupAddon>
          <Input
            onChange={e => handleSearch(e.target.value)}
            placeholder={t('search')}
          />
        </InputGroup>
      </div>
      {!listAudiences?.length ? (
        <div>
          <Alert color="info">{t('noAudienceAvaliable')}</Alert>
        </div>
      ) : (
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ListGroup flush>{renderAudiences}</ListGroup>
            {/* {inValid && (
              <div className="invalid-feedback d-block">
                {t('chooseAnAudience')}
              </div>
            )} */}
            {footer && (
              <div style={{marginTop: 15}} className="d-block text-right mr-15">
                <Button
                  onClick={() => goTo({nextTab: 'description'})}
                  className="mb-2 mr-2 btn-icon"
                  color="secondary"
                >
                  <i className="pe-7s-refresh btn-icon-wrapper"> </i>
                  {t('previous')}
                </Button>
                <Button
                  type="submit"
                  className="mb-2 mr-2 btn-icon"
                  color="success"
                >
                  <i className="pe-7s-upload btn-icon-wrapper"> </i>
                  {t('saveAndNext')}
                </Button>
              </div>
            )}
          </Form>
        </FormProvider>
      )}
    </div>
  );
};

export default Audience;

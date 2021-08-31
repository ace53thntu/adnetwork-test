import React, {useCallback, useMemo, useState} from 'react';
import {
  useForm,
  useFieldArray,
  FormProvider,
  Controller
} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {object, array, string} from 'yup';
import {v4 as uuidv4} from 'uuid';
import _ from 'lodash';

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Form,
  Label,
  InputGroup,
  InputGroupAddon,
  FormGroup,
  FormFeedback
} from 'reactstrap';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import Loader from 'react-loaders';

import {FormRadioGroup, FormReactSelect, FormTextInput} from 'components/forms';
import {StatusToggle} from '../index';

// import {
//   useCreateTransferFile,
//   useUpdateTransferFile
// } from 'core/queries/containers';

import {IMPORT_FILE_TYPES} from '../../constants';

const FormTransferFile = ({updateListTransfer, setActiveTab, updateItem}) => {
  const transferField = useMemo(() => {
    return {
      name: updateItem ? updateItem.name : '',
      dataType: updateItem ? updateItem.dataType : 'crm',
      startDate: updateItem
        ? new Date(updateItem?.startDate || new Date())
        : new Date(),
      endDate: updateItem
        ? new Date(updateItem?.endDate || new Date())
        : new Date(),
      frequency: updateItem
        ? {id: updateItem.frequency, label: updateItem.frequency}
        : {
            id: 'Scheduled',
            label: 'Scheduled'
          },
      isActive: updateItem
        ? updateItem.isActive
          ? 'active'
          : 'inactive'
        : 'active',
      configuration: updateItem
        ? `Endpoint: /containers/containers/transfer/v1 \nAccess Key: ${updateItem.accessKey} \nSecret Key: ${updateItem.secretKey}`
        : '',
      id: uuidv4()
    };
  }, [updateItem]);
  // const {cid: containerId} = useParams();
  // const [createTransferFile] = useCreateTransferFile();
  // const [updateTransferFile] = useUpdateTransferFile();

  const [onLoadRenewKey, setOnLoadRenewKey] = useState(false);

  const schema = yup.object().shape({
    transfer: array()
      .of(
        object().shape({
          name: string().required('Required!!!'),
          startDate: yup.date().required('Required.').nullable(),
          endDate: yup
            .date()
            .required('Required.')
            .min(
              yup.ref('startDate'),
              "Finish date can't be before Start date."
            )
            .nullable()
        })
      )
      .required()
  });

  const defaultValues = {
    transfer: [transferField]
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const {control, trigger, handleSubmit, setValue, errors} = methods;
  const {fields, append} = useFieldArray({
    control,
    name: 'transfer'
  });

  // const handleValues = useCallback(values => {
  //   const currentLength = values.length;
  //   const currentData = values[currentLength - 1];
  //   return {
  //     ...currentData,
  //     frequency: currentData.frequency?.id,
  //     isActive: currentData.isActive === 'active' ? true : false,
  //     status: 'active',
  //     configuration: ''
  //   };
  // }, []);

  const onComplete = React.useCallback(async () => {
    // const formValues = getValues();
    // const currentData = handleValues(formValues.transfer);

    const result = await trigger();

    if (result) {
      try {
        // const data = await createTransferFile({
        //   cid: containerId,
        //   data: {
        //     ...currentData,
        //     dataType: formValues.dataType
        //   }
        // });
        // if (data?.code === 201) {
        //   updateListTransfer();
        //   setActiveTab();
        //   reset();
        // }
      } catch (error) {}
    }
  }, [trigger]);

  const onSubmit = useCallback(
    async values => {
      // const currentIndex = values.transfer.length - 1;
      // const currentData = handleValues(values.transfer);
      if (updateItem) {
        // const dataTransfer = await updateTransferFile({
        //   cid: containerId,
        //   tcid: updateItem.id,
        //   data: {
        //     ...currentData,
        //     dataType: values.dataType
        //   }
        // });
        // if (dataTransfer?.code === 200) {
        //   try {
        //     updateListTransfer();
        //     setActiveTab();
        //   } catch (err) {}
        // }
      } else {
        append({...transferField, id: uuidv4()});
        // const dataTransfer = await createTransferFile({
        //   cid: containerId,
        //   data: {
        //     ...currentData,
        //     dataType: values.dataType
        //   }
        // });
        // if (dataTransfer?.code === 201) {
        //   try {
        //     updateListTransfer();
        //   } catch (err) {}
        //   setValue(
        //     `transfer[${currentIndex}].configuration`,
        //     `Endpoint: /containers/containers/transfer/v1 \nAccess Key: ${dataTransfer?.data?.accessKey} \nSecret Key: ${dataTransfer?.data?.secretKey}`
        //   );
        // }
      }
    },
    [append, transferField, updateItem]
  );

  const onRenewKey = useCallback(async () => {
    setOnLoadRenewKey(true);
    setValue(`transfer[0].configuration`, '');
    // const formValues = getValues();
    // const currentData = handleValues(formValues.transfer);
    // const dataTransfer = await updateTransferFile({
    //   cid: containerId,
    //   tcid: updateItem.id,
    //   isRenewKey: true,
    //   data: {
    //     ...currentData,
    //     dataType: formValues.dataType
    //   }
    // });
    // setOnLoadRenewKey(false);
    // if (dataTransfer?.code === 200) {
    //   try {
    //     updateListTransfer();
    //   } catch (err) {}
    //   setValue(
    //     `transfer[0].configuration`,
    //     `Endpoint: /containers/containers/transfer/v1 \nAccess Key: ${dataTransfer?.data?.AccessKey} \nSecret Key: ${dataTransfer?.data?.SecretKey}`
    //   );
    // }
  }, [setOnLoadRenewKey, setValue]);

  return (
    <React.Fragment>
      <Row>
        <Col sm="12">
          <FormProvider {...methods}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Card className="main-card mb-3">
                <CardHeader>New transfers</CardHeader>
                <CardBody>
                  {fields?.map((item, idx) => {
                    return (
                      <div key={idx} className={`${idx ? 'mt-3' : ''}`}>
                        <Card>
                          <CardBody>
                            <FormTextInput
                              type="text"
                              placeholder="Name"
                              id="name"
                              name={`transfer[${idx}].name`}
                              label="Name"
                              defaultValue={item.name}
                              isRequired={true}
                            />

                            <FormRadioGroup
                              inline
                              label="Type"
                              name="dataType"
                              defaultValue={item.dataType}
                              items={IMPORT_FILE_TYPES.map((item, index) => ({
                                id: `type_${idx}_${index}`,
                                label: item.label,
                                name: `transfer[${idx}].dataType`,
                                value: item.value
                              }))}
                            />

                            <FormGroup>
                              <Row>
                                <Col xs="6">
                                  <Label>Start date</Label>
                                  <Controller
                                    control={control}
                                    name={`transfer[${idx}].startDate`}
                                    defaultValue={item.startDate}
                                    render={({
                                      onChange,
                                      onBlur,
                                      value,
                                      name
                                    }) => {
                                      const error = _.get(
                                        errors,
                                        `transfer[${idx}].startDate`
                                      );
                                      const hasError = !!error;

                                      return (
                                        <InputGroup>
                                          <InputGroupAddon addonType="prepend">
                                            <div className="input-group-text">
                                              <FontAwesomeIcon
                                                icon={faCalendarAlt}
                                              />
                                            </div>
                                          </InputGroupAddon>
                                          <DatePicker
                                            className={`form-control ${
                                              hasError && 'is-invalid'
                                            }`}
                                            selected={value}
                                            onChange={onChange}
                                          />
                                          {hasError && (
                                            <FormFeedback className="d-block">
                                              {error?.message}
                                            </FormFeedback>
                                          )}
                                        </InputGroup>
                                      );
                                    }}
                                  />
                                </Col>
                                <Col xs="6">
                                  <Label>Finish date</Label>
                                  <Controller
                                    control={control}
                                    name={`transfer[${idx}].endDate`}
                                    defaultValue={item.endDate}
                                    render={({
                                      onChange,
                                      onBlur,
                                      value,
                                      name
                                    }) => {
                                      const error = _.get(
                                        errors,
                                        `transfer[${idx}].endDate`
                                      );
                                      const hasError = !!error;

                                      return (
                                        <InputGroup>
                                          <InputGroupAddon addonType="prepend">
                                            <div className="input-group-text">
                                              <FontAwesomeIcon
                                                icon={faCalendarAlt}
                                              />
                                            </div>
                                          </InputGroupAddon>
                                          <DatePicker
                                            className={`form-control ${
                                              hasError && 'is-invalid'
                                            }`}
                                            selected={value}
                                            onChange={date => {
                                              onChange(date);
                                            }}
                                          />
                                          {hasError && (
                                            <FormFeedback className="d-block">
                                              {error?.message}
                                            </FormFeedback>
                                          )}
                                        </InputGroup>
                                      );
                                    }}
                                  />
                                </Col>
                              </Row>
                            </FormGroup>

                            <FormGroup>
                              <Row>
                                <Col xs="6">
                                  <FormReactSelect
                                    required
                                    defaultValue={item.frequency}
                                    name={`transfer[${idx}].frequency`}
                                    label="Frequency"
                                    placeholder="Select a frequency..."
                                    options={[
                                      'Punctual',
                                      'Scheduled',
                                      'Instantaneous'
                                    ].map(ad => ({
                                      id: ad,
                                      label: ad
                                    }))}
                                  />
                                </Col>
                                <Col xs="6">
                                  <Label>Status</Label>
                                  <Controller
                                    control={control}
                                    name={`transfer[${idx}].isActive`}
                                    defaultValue={item.isActive}
                                    render={({
                                      onChange,
                                      onBlur,
                                      value,
                                      name
                                    }) => (
                                      <StatusToggle
                                        value={value}
                                        onChange={onChange}
                                      />
                                    )}
                                  />
                                </Col>
                              </Row>
                            </FormGroup>

                            <FormTextInput
                              type="textarea"
                              placeholder="Configuration"
                              id="configuration"
                              name={`transfer[${idx}].configuration`}
                              label="Configuration"
                              defaultValue={item.configuration}
                              disable={true}
                              rows="3"
                            />
                            {updateItem ? (
                              <div className="text-right">
                                {onLoadRenewKey ? (
                                  <Loader type="ball-pulse" />
                                ) : (
                                  <Button
                                    type="button"
                                    className="ml-2"
                                    color="primary"
                                    onClick={onRenewKey}
                                  >
                                    Renew key
                                  </Button>
                                )}
                              </div>
                            ) : null}

                            {/* <FormGroup>
                            {!fileIndex ? (
                              <Progress className="progress-bar-sm mb-3" value="100" />
                            ) : (
                              <Progress className="progress-bar-sm" multi>
                                <Progress bar value="15" />
                                <Progress bar color="success" value="30" />
                                <Progress bar color="info" value="25" />
                                <Progress bar color="warning" value="20" />
                                <Progress bar color="danger" value="5" />
                              </Progress>
                            )}
                          </FormGroup> */}
                          </CardBody>
                        </Card>
                      </div>
                    );
                  })}
                </CardBody>
                <CardFooter className="d-block text-right">
                  {updateItem ? (
                    <Button type="submit" className="ml-2" color="primary">
                      Update
                    </Button>
                  ) : (
                    <>
                      <Button type="submit" className="ml-2" color="primary">
                        Save & Add more
                      </Button>
                      <Button
                        type="button"
                        className="ml-2"
                        color="success"
                        onClick={onComplete}
                      >
                        Complete
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            </Form>
          </FormProvider>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default React.memo(FormTransferFile);

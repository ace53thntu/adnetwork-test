import React, {useCallback, useState} from 'react';
import BlockUi from 'react-block-ui';
import {Controller, FormProvider, useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Label,
  Row
} from 'reactstrap';
import * as yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';

import {IMPORT_FILE_LOCATIONS, IMPORT_FILE_TYPES} from '../../constants';
import DownloadTemplate from './DownloadTemplate';
import Uploader from './Uploader';
import {FormRadioGroup} from 'components/forms';
import {ShowToast} from 'utils/helpers/showToast.helpers';

const FormImportFile = ({
  updateListImport,
  setActiveTab,
  updateItem,
  dataListImportFiles
}) => {
  let defaultValues = {
    dataType: updateItem?.dataType ?? 'crm',
    location: updateItem?.location ?? 'location',
    file: updateItem?.name ?? null
  };

  const isView = !!updateItem?.id;

  return (
    <React.Fragment>
      <Row>
        <Col sm="12">
          <FormCreate
            defaultValues={defaultValues}
            setActiveTab={setActiveTab}
            updateListImport={updateListImport}
            isView={isView}
            dataListImportFiles={dataListImportFiles}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default React.memo(FormImportFile);

function FormCreate({
  defaultValues,
  setActiveTab,
  updateListImport,
  isView = false,
  dataListImportFiles
}) {
  const {cid: containerId} = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = yup.object().shape({
    file: yup
      .mixed()
      .required('Required!')
      .test('must-have', 'Required!', value => {
        if (value?.name) {
          return true;
        }
        return false;
      })
  });

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const {control, handleSubmit, reset, errors} = methods;

  const createSuccess = fileName => {
    setIsSubmitted(true);
    ShowToast.success(
      fileName
        ? `Upload ${fileName} successfully!`
        : `Upload file successfully!`,
      {
        closeOnClick: true
      }
    );
  };

  const handleBack = () => setActiveTab();

  const onSubmit = useCallback(
    async values => {
      const submitData = {
        ...values
      };
      setIsLoading(true);
      const fileName = submitData?.file?.name;
      try {
        if (fileName) {
          const formData = new FormData();
          formData.append('type', submitData.dataType);
          formData.append('file', submitData.file);
          formData.append(
            'file_type',
            submitData.file.type === 'application/json' ? 'json' : 'csv'
          );

          // const res = await ContainerService.uploadImportFile(
          //   containerId,
          //   formData
          // );
          const res = await new Promise(resolve => resolve('ok'));
          submitData.file = res?.data?.id;
        }
        updateListImport();
        reset();
        setIsLoading(false);
        createSuccess(fileName);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [reset, updateListImport]
  );

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card className="main-card mb-3">
          <CardHeader>New files</CardHeader>
          <BlockUi blocking={isLoading}>
            <CardBody>
              <div className={'mt-3'}>
                <Card>
                  <CardBody>
                    <div className="d-flex align-items-center">
                      <FormRadioGroup
                        name="dataType"
                        inline
                        label="Type"
                        defaultValue={defaultValues.dataType}
                        items={IMPORT_FILE_TYPES.map((item, index) => ({
                          id: `dataType_${index}`,
                          label: item.label,
                          name: `dataType`,
                          value: item.value
                        }))}
                        disabled={isView}
                      />

                      <DownloadTemplate />
                    </div>

                    <FormRadioGroup
                      name="location"
                      inline
                      label="Location"
                      defaultValue={defaultValues.location}
                      items={IMPORT_FILE_LOCATIONS.map((item, index) => ({
                        id: `location_${index}`,
                        label: item.label,
                        name: `location`,
                        value: item.value
                      }))}
                      disabled={isView}
                    />

                    {isView ? (
                      <div>File name: {defaultValues?.file}</div>
                    ) : (
                      <Controller
                        control={control}
                        name={`file`}
                        defaultValue={defaultValues?.file ?? null}
                        render={({onChange, onBlur, value, name}) => (
                          <FormGroup>
                            <Label for="exampleTime">File</Label>
                            <Uploader
                              onChange={onChange}
                              name={name}
                              value={value}
                              setIsSubmitted={setIsSubmitted}
                              isSubmitted={isSubmitted}
                              errors={errors?.['file']}
                            />
                          </FormGroup>
                        )}
                      />
                    )}
                  </CardBody>
                </Card>
              </div>
            </CardBody>
          </BlockUi>

          <CardFooter className="d-block text-right">
            {isView ? (
              <Button
                type="button"
                className="ml-2"
                color="success"
                onClick={handleBack}
              >
                Back
              </Button>
            ) : (
              <>
                <Button
                  type="submit"
                  className="ml-2"
                  color="primary"
                  disabled={isLoading}
                >
                  Save & Add more
                </Button>
                <Button
                  type="button"
                  className="ml-2"
                  color="success"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  Back
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      </Form>
    </FormProvider>
  );
}

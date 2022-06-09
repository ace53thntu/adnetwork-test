import {NativeAdAPI} from 'api/native-ad.api';
import {ApiError, BlockOverlay, CollapseBox} from 'components/common';
import {EntityTypes} from 'constants/report';
import {USER_ROLE} from 'pages/user-management/constants';
import PropTypes from 'prop-types';
import {useCreateNativeAd} from 'queries/native-ad';
import {GET_NATIVE_ADS} from 'queries/native-ad/constants';
import {useUpdateNativeAd} from 'queries/native-ad/useUpdateNativeAd';
import * as React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useQueryClient} from 'react-query';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {Button} from 'reactstrap';
import {useCommonSelector} from 'store/reducers/common';
import {
  dirtyForm,
  toggleCreateCreativeDialog,
  toggleCreativeDetailDialog
} from 'store/reducers/creative';
import {difference} from 'utils/helpers/difference.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';

import Report from '../Report';
import Assets from './Assets';
import NativeAdInformationForm from './NativeAdInformationForm';
import {
  assetFormValuesToRepo,
  nativeAdFormValuesToRepo,
  nativeAdRawToFormValues
} from './dto';
import {createNativeAdResolver} from './validations';

const defaultValues = {
  name: '',
  click_url: '',
  // dco_product: '',
  // product_query_string: '',
  extra_trackers: '',
  //
  assets: []
};

function NativeAdForm(props) {
  const {nativeAd, isCreate} = props;
  const dispatch = useDispatch();
  const client = useQueryClient();
  const {t} = useTranslation();
  const {conceptId} = useParams();
  const {isUploading} = useCommonSelector();

  const {mutateAsync: createNativeAdRequest} = useCreateNativeAd();
  const {mutateAsync: updateNativeAdRequest} = useUpdateNativeAd();

  const [isLoading, setIsLoading] = React.useState(false);

  const getDefaultValues = React.useMemo(() => {
    if (nativeAd) {
      return nativeAdRawToFormValues(nativeAd);
    }
    return defaultValues;
  }, [nativeAd]);

  const methods = useForm({
    defaultValues: getDefaultValues,
    resolver: createNativeAdResolver(!isCreate)
  });
  const {
    handleSubmit,
    formState: {isDirty},
    control,
    watch
  } = methods;

  React.useEffect(() => {
    dispatch(dirtyForm(isDirty));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  const handleError = error => {
    setIsLoading(false);
    ShowToast.error(<ApiError apiError={error} />);
  };

  const createAssets = async (nativeAdId, data) => {
    const assetsRequestData = [...data].map(item =>
      assetFormValuesToRepo(item, nativeAdId)
    );

    if (assetsRequestData.length) {
      let promises = [];
      assetsRequestData.forEach(item => {
        promises.push(NativeAdAPI.createAsset({data: item, options: {}}));
      });
      await Promise.all(promises);
    }
  };

  const checkAssets = values => {
    const newAssets = values?.assets?.filter(asset => !asset.uuid);

    createAssets(nativeAd.uuid, newAssets);
  };

  const onSubmit = async values => {
    setIsLoading(true);

    if (isCreate) {
      const requestData = nativeAdFormValuesToRepo(values, conceptId);
      try {
        const res = await createNativeAdRequest(requestData);

        if (res.data?.uuid && values?.assets?.length) {
          const nativeAdId = res.data.uuid;
          await createAssets(nativeAdId, values.assets);
        }

        setIsLoading(false);
        ShowToast.success('Create Native Banner successfully!');
        handleCloseDialog();
        client.invalidateQueries([GET_NATIVE_ADS]);
      } catch (error) {
        handleError(error);
      }
    } else {
      const requestData = nativeAdFormValuesToRepo(values, conceptId);
      const nativeId = nativeAd.uuid;
      const isDiff = difference(requestData, nativeAd);

      try {
        if (Object.keys(isDiff).length) {
          await updateNativeAdRequest({
            nativeAdId: nativeId,
            data: requestData
          });
        }
        checkAssets(values);
        setIsLoading(false);
        ShowToast.success('Update Native Banner successfully!');
        handleCloseDialog();
        client.invalidateQueries([GET_NATIVE_ADS]);
      } catch (error) {
        handleError(error);
      }
    }
  };

  const handleCloseDialog = () => {
    if (isCreate) {
      dispatch(toggleCreateCreativeDialog());
    } else {
      dispatch(toggleCreativeDetailDialog(null));
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="native-ad-form"
          name="native-ad-form"
        >
          {isLoading && <BlockOverlay />}
          <CollapseBox open title="Information">
            <NativeAdInformationForm defaultValues={getDefaultValues} />
          </CollapseBox>

          <Assets
            control={control}
            nativeAdId={nativeAd?.id}
            rawNativeAd={nativeAd}
            formWatch={watch}
          />
        </form>
      </FormProvider>

      {/* BEGIN: Report */}
      {nativeAd?.uuid && (
        <Report
          entity={EntityTypes.NATIVE_AD}
          entityId={nativeAd?.uuid}
          ownerRole={USER_ROLE.ADVERTISER}
          entityName={nativeAd?.name}
          groupObjectId={nativeAd?.advertiser_uuid}
        />
      )}

      {/* END: Report */}

      <div className="d-flex justify-content-end">
        <Button
          color="secondary"
          onClick={handleCloseDialog}
          disabled={isLoading}
        >
          Close
        </Button>
        <Button
          color="primary"
          disabled={!isDirty || isLoading || isUploading}
          type="submit"
          className="ml-2"
          form="native-ad-form"
        >
          {t('save')}
        </Button>
      </div>
    </>
  );
}

NativeAdForm.propTypes = {
  nativeAd: PropTypes.any,
  isCreate: PropTypes.bool
};
NativeAdForm.defaultProps = {
  onSuccess: () => {},
  isCreate: false
};

export default NativeAdForm;

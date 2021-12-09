import {Collapse} from 'components/common/Collapse';
import PropTypes from 'prop-types';
import * as React from 'react';
import {useFieldArray} from 'react-hook-form';
import {Button} from 'reactstrap';

import AssetForm from './AssetForm';
import {ASSET_TYPES} from './constants';

const defaultValues = {
  custom_id: '',
  type: ASSET_TYPES[0],
  value: '',
  file: null,
  id: null
};

function Assets(props) {
  const {control, nativeAdId, rawNativeAd, formWatch, isLoading} = props;

  const {fields: assets, append, remove} = useFieldArray({
    control,
    name: 'assets'
  });

  return (
    <div>
      {assets?.map((asset, idx) => {
        const assetIndex = idx;
        const assetName = `assets[${idx}]`;

        return (
          <Collapse
            key={`${idx}-${asset?.id}`}
            title={`Asset ${idx + 1}`}
            unMount={false}
            initialOpen={!asset.id}
          >
            <AssetForm
              assetName={assetName}
              assetIndex={assetIndex}
              remove={remove}
              formWatch={formWatch}
              data={asset}
              nativeAdId={nativeAdId}
              assetId={rawNativeAd?.assets?.[idx]?.id}
              isLoading={isLoading}
            />
          </Collapse>
        );
      })}

      <div className="pb-5 ml-auto">
        <Button
          color="primary"
          type="button"
          className="mt-2"
          onClick={() => append(defaultValues)}
        >
          Add Asset
        </Button>
      </div>
    </div>
  );
}

Assets.propTypes = {
  control: PropTypes.any,
  formWatch: PropTypes.func,
  rawNativeAd: PropTypes.any,
  isLoading: PropTypes.bool
};
Assets.defaultProps = {
  isLoading: false
};

export default Assets;

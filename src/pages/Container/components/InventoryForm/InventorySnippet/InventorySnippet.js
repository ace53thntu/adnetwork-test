import {Collapse} from 'components/common';
import {SOURCE_FROM_TAG} from 'constants/container';
import {InventoryFormats} from 'pages/Container/constants';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import AndroidBannerAdsSnippet from '../../Snippets/AndroidBannerAdsSnippet';
import AndroidVideoAdsSnippet from '../../Snippets/AndroidVideoAdsSnippet';
import IosBannerAdsSnippet from '../../Snippets/IosBannerAdsSnippet';
import IosVideoAdsSnippet from '../../Snippets/IosVideoAdsSnippet';
import WebInventorySnippet from '../../Snippets/WebInventorySnippet';

const InventorySnippet = ({inventoryId}) => {
  const {watch} = useFormContext();
  const formatSelected = watch('format');
  const format = formatSelected?.value;
  const {source} = useParams();

  const isIos =
    source === SOURCE_FROM_TAG?.ios || source === SOURCE_FROM_TAG?.appletv;


  const isAndroid =
    source === SOURCE_FROM_TAG?.android ||
    source === SOURCE_FROM_TAG?.androidtv;

  function renderSippet() {
    if (format === InventoryFormats.BANNER) {
      if (isIos) {
        return <IosBannerAdsSnippet inventoryId={inventoryId} />;
      } else if (isAndroid) {
        return <AndroidBannerAdsSnippet inventoryId={inventoryId} />;
      } else {
        return <WebInventorySnippet inventoryId={inventoryId} />;
      }
    } else if (format === InventoryFormats.VIDEO) {
      if (isIos) {
        return <IosVideoAdsSnippet inventoryId={inventoryId} />;
      } else if (isAndroid) {
        return <AndroidVideoAdsSnippet inventoryId={inventoryId}/>
      } else {
        return <WebInventorySnippet inventoryId={inventoryId} />;
      }
    }
  }

  return (
    <Collapse initialOpen={false} title="Snippet" unMount={false}>
      {renderSippet()}
    </Collapse>
  );
};

export default React.memo(InventorySnippet);

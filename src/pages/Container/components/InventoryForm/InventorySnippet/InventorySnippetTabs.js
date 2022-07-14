import {SOURCE_FROM_TAG} from 'constants/container';
import {InventoryFormats} from 'pages/Container/constants';
import * as React from 'react';
import {useFormContext} from 'react-hook-form';
import Tabs from 'react-responsive-tabs';
import {useParams} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import AndroidBannerAdsSnippet from '../../Snippets/AndroidBannerAdsSnippet';
import AndroidVideoAdsSnippet from '../../Snippets/AndroidVideoAdsSnippet';
import IosBannerAdsSnippet from '../../Snippets/IosBannerAdsSnippet';
import IosVideoAdsSnippet from '../../Snippets/IosVideoAdsSnippet';
import WebInventorySnippet from '../../Snippets/WebInventorySnippet';

const dummy = [
  {
    name: 'Option 1'
  },
  {
    name: 'Option 2'
  }
];

function InventorySnippetTabs({inventoryId}) {
  const {watch} = useFormContext();
  const formatSelected = watch('format');
  const format = formatSelected?.value;
  const {source} = useParams();

  const isIos =
    source === SOURCE_FROM_TAG?.ios || source === SOURCE_FROM_TAG?.appletv;

  const isAndroid =
    source === SOURCE_FROM_TAG?.android ||
    source === SOURCE_FROM_TAG?.androidtv;

  const renderSippet = React.useCallback(
    index => {
      if (format === InventoryFormats.BANNER) {
        if (isIos) {
          return <IosBannerAdsSnippet inventoryId={inventoryId} />;
        } else if (isAndroid) {
          return <AndroidBannerAdsSnippet inventoryId={inventoryId} />;
        } else {
          return (
            <WebInventorySnippet inventoryId={inventoryId} option={index} />
          );
        }
      } else if (format === InventoryFormats.VIDEO) {
        if (isIos) {
          return <IosVideoAdsSnippet inventoryId={inventoryId} />;
        } else if (isAndroid) {
          return <AndroidVideoAdsSnippet inventoryId={inventoryId} />;
        } else {
          return (
            <WebInventorySnippet inventoryId={inventoryId} option={index} />
          );
        }
      }
    },
    [format, inventoryId, isAndroid, isIos]
  );

  const items = React.useMemo(() => {
    return dummy.map(({name}, index) => ({
      key: index,
      title: name,
      getContent: () => renderSippet(index)
    }));
  }, [renderSippet]);

  if (!isIos && !isAndroid) {
    return (
      <CSSTransition
        transitionName="TabsAnimation"
        classNames="fade-in"
        timeout={200}
      >
        <Tabs
          tabsWrapperClass="body-tabs"
          items={items}
          showMore
          transform
          showInkBar
          selectedTabKey={0}
          transformWidth={400}
        />
      </CSSTransition>
    );
  }

  return <>{renderSippet()}</>;
}

export default InventorySnippetTabs;

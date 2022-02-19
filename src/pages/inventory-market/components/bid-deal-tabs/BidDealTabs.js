//---> Build-in Modules
import React, {useCallback, useMemo, useState} from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

//---> Internal Modules
import Tabs from './Tabs';
import {DealList} from '../deal-list';
import {BidList} from '../bid-list';
import {Collapse} from 'components/common';

const propTypes = {
  inventoryId: PropTypes.string
};

const BidDealTabs = ({inventoryId}) => {
  const {t} = useTranslation();
  const [currentTab, setCurrentTab] = useState('deal');

  const tabDetail = useMemo(
    () =>
      [
        {
          name: t('dealList'),
          content: <DealList inventoryId={inventoryId} />
        },
        {
          name: t('bidList'),
          content: <BidList inventoryId={inventoryId} />
        }
      ].map(({name, content}, index) => ({
        key: index,
        title: name,
        getContent: () => content
      })),
    [t, inventoryId]
  );

  const getTab = index => {
    switch (index) {
      case 0:
        setCurrentTab('deal');
        break;
      case 1:
        setCurrentTab('bid');
        break;

      default:
        setCurrentTab('deal');
        break;
    }
  };

  const tabPicker = useCallback(() => {
    switch (currentTab) {
      case 'deal':
        return 0;
      case 'bid':
        return 1;

      default:
        return 0;
    }
  }, [currentTab]);
  return (
    <div>
      <Collapse unMount={false} initialOpen title="Deal/Bid List">
        <Tabs items={tabDetail} tab={tabPicker} getTab={getTab} />
      </Collapse>
    </div>
  );
};

BidDealTabs.propTypes = propTypes;

export default React.memo(BidDealTabs);

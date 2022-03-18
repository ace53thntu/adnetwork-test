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

const TabIndex = {
  DEAL: 0,
  BID: 1
};

const TabName = {
  DEAL: 'deal',
  BID: 'bid'
};

const propTypes = {
  inventoryId: PropTypes.string
};

const BidDealTabs = ({inventoryId, excludeDates}) => {
  const {t} = useTranslation();
  const [currentTab, setCurrentTab] = useState('deal');

  const tabDetail = useMemo(
    () =>
      [
        {
          name: t('dealList'),
          content: (
            <DealList inventoryId={inventoryId} excludeDates={excludeDates} />
          )
        },
        {
          name: t('bidList'),
          content: (
            <BidList inventoryId={inventoryId} excludeDates={excludeDates} />
          )
        }
      ].map(({name, content}, index) => ({
        key: index,
        title: name,
        getContent: () => content
      })),
    [t, inventoryId, excludeDates]
  );

  const getTab = index => {
    switch (index) {
      case TabIndex.DEAL:
        setCurrentTab(TabName.DEAL);
        break;
      case TabIndex.BID:
        setCurrentTab(TabName.BID);
        break;

      default:
        setCurrentTab(TabName.DEAL);
        break;
    }
  };

  const tabPicker = useCallback(() => {
    switch (currentTab) {
      case TabName.DEAL:
        return TabIndex.DEAL;
      case TabName.BID:
        return TabIndex.BID;

      default:
        return TabIndex.DEAL;
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

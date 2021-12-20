//---> Build-in Modules
import React from 'react';

//---> External Modules
import {useTranslation} from 'react-i18next';
import {Input} from 'reactstrap';

//---> Internal Modules
import ExtendSidebar from 'components/layouts/Admin/components/ExtendSidebar';
import {TreeSidebar} from './sidebar-tree';

const style_1 = {
  paddingLeft: 5,
  paddingRight: 5,
  paddingTop: 7,
  paddingBottom: 7
};

const CampaignTree = ({listAdvertisers}) => {
  const {t} = useTranslation();

  return (
    <ExtendSidebar
      classes="aic-sidebar"
      heading={t('campaignManagement')}
      isLink
      path={'/campaigns'}
    >
      <div className="mb-2">
        <Input placeholder={t('search')} />
      </div>
      <div style={style_1} className="border mb-2">
        <TreeSidebar />
      </div>
    </ExtendSidebar>
  );
};
export default CampaignTree;

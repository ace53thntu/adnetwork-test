import ThemeOptions from './ThemeOptions';
import {campaignReducer} from './campaign';
import {commonReducer} from './common';
import {containerReducer} from './container';
import {creativeReducer} from './creative';
import {entityReportReducer} from './entity-report';
import {inventoryMarketReducer} from './inventory-market';
import {advertiserReducer} from './advertiser';
import {publisherReducer} from './publisher';
import {dspReducer} from './dsp';
import {userReducer} from './user';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ThemeOptions,
  campaignReducer,
  containerReducer,
  creativeReducer,
  entityReportReducer,
  inventoryMarketReducer,
  advertiserReducer,
  publisherReducer,
  dspReducer,
  userReducer,
  commonReducer
};

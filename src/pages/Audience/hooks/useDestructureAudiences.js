import {IS_RESPONSE_ALL} from 'constants/misc';
import React from 'react';
import {getResponseData} from 'utils/helpers/misc.helpers';

const mockAudience = [
  {
    created_at: '2022-02-24T17:17:15.53869Z',
    updated_at: '2022-02-24T17:17:21.945904Z',
    deleted_at: null,
    id: 'e45312a8-06ec-4dfc-a458-b836ece2d723',
    user_id: 5,
    role: 'agency',
    role_ref_id: 1,
    activation_id: 'VZQM775JBWCOZ3V7',
    audience_id: 'e45312a8-06ec-4dfc-a458-b836ece2d723',
    audience_name: 'Login succes- Android - AVOD - VZQM775JBWCOZ3V7',
    audience_type: '',
    sender_code: 'aicactus-dmp',
    vendor_code: 'google',
    start_date: '2022-02-24T17:17:15.538279Z',
    last_transfer_date: '2022-02-24T17:17:17.822892Z'
  },
  {
    created_at: '2021-11-06T08:49:16.137425Z',
    updated_at: '2021-11-06T12:55:04.006405Z',
    deleted_at: null,
    id: '7975fb35-51ba-4709-9b73-803b7f4a4eea',
    user_id: 126,
    role: 'agency',
    role_ref_id: 14,
    activation_id: 'DIGTUMPLQEAG08GR',
    audience_id: '7975fb35-51ba-4709-9b73-803b7f4a4eea',
    audience_name: 'test 1',
    audience_type: '',
    sender_code: 'aicactus-dmp',
    vendor_code: 'google',
    start_date: '2021-11-06T08:49:16.136932Z',
    last_transfer_date: '2021-11-06T12:55:03.175509Z'
  }
];

export const useDestructureAudiences = ({pages = []}) => {
  return React.useMemo(() => {
    return mockAudience;
    // return pages?.reduce((acc, page) => {
    //   const data = getResponseData(page, IS_RESPONSE_ALL);
    //   const itemsDestructure = data?.map(item => ({
    //     ...item,
    //     id: item?.uuid,
    //     status: !item?.status ? 'inactive' : item?.status
    //   }));
    //   return [...acc, ...itemsDestructure];
    // }, []);
  }, []);
};

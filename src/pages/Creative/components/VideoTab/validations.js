import * as Yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';

import {checkValidJson} from '../BannerForm/utils';

export function createVideoFormResolver() {
  return yupResolver(
    Yup.object().shape({
      name: Yup.string().required('Required.'),
      click_url: Yup.string().required('Required.'),
      width: Yup.string().test(
        'is-number',
        'Width must be a integer number and greater than 0.',
        val => {
          const reg = /^\d+$/;
          const parsed = parseInt(val, 10);
          const isNumber = reg.test(val);
          if (isNumber && parsed > 0) {
            return true;
          }
          return false;
        }
      ),
      height: Yup.string().test(
        'is-number',
        'Width must be a integer number and greater than 0.',
        val => {
          const reg = /^\d+$/;
          const parsed = parseInt(val, 10);
          const isNumber = reg.test(val);
          if (isNumber && parsed > 0) {
            return true;
          }
          return false;
        }
      ),
      video_metadata: Yup.string().test(
        'isValidJson',
        'Invalid JSON object',
        val => {
          if (val?.length) {
            return checkValidJson(val);
          }

          return true;
        }
      ),
      third_party_tag: Yup.string().when('type', {
        is: type => type.value === 'third_party',
        then: Yup.string().required('Required.')
      })
    })
  );
}

import * as Yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';
import {InputStatus} from 'constants/misc';
import {validateFloatInput, validateNumberInput} from 'utils/yupValidations';
import {checkValidJson} from 'pages/Creative/components/BannerForm/utils';
import {InteractivePlayType} from './constant';

export const validationInventory = t => {
  return yupResolver(
    Yup.object().shape({
      name: Yup.string().required('This field is required.'),
      type: Yup.object()
        .required('This field is required.')
        .typeError('This field is required.'),
      market_type: Yup.object()
        .required('This field is required.')
        .typeError('This field is required.'),
      format: Yup.object()
        .required('This field is required.')
        .typeError('This field is required.'),
      position_uuid: Yup.object()
        .required('This field is required.')
        .typeError('This field is required.'),
      price_engine: Yup.object()
        .required('This field is required.')
        .typeError('This field is required.'),
      market_dsps: Yup.array()
        .nullable()
        .when('market_type', marketTypeVal => {
          if (marketTypeVal?.value === 'private') {
            return Yup.array()
              .required('This field is required.')
              .typeError('This field is required.');
          }
          return Yup.array().nullable().notRequired();
        }),
      floor_price: Yup.string().required('This field is required.'),
      deal_floor_price: Yup.string().when('allow_deal', value => {
        if (value === InputStatus.ACTIVE) {
          return Yup.string()
            .required('This field is required.')
            .test({
              name: 'floor_price',
              exclusive: false,
              params: {},
              // eslint-disable-next-line no-template-curly-in-string
              message:
                'The deal floor price must be greater than the floor price',
              test: function (value) {
                // You can access the budget global field with `this.parent`.
                return parseFloat(value) > parseFloat(this.parent?.floor_price);
              }
            });
        }
        return Yup.string().nullable().notRequired();
      }),
      cpm: Yup.string()
        .required('This field is required.')
        .test({
          name: 'cpm_floor_price',
          exclusive: false,
          params: {},
          // eslint-disable-next-line no-template-curly-in-string
          message: 'The CPM must be greater than the floor price',
          test: function (value) {
            // You can access the budget global field with `this.parent`.
            return parseFloat(value) >= parseFloat(this.parent?.floor_price);
          }
        }),
      metadata: Yup.object({
        width: Yup.string()
          .required('This field is required.')
          .test('is-number', 'Invalid number', value => {
            return validateFloatInput(value);
          }),
        height: Yup.string()
          .required('This field is required.')
          .test('is-number', 'Invalid number', value => {
            return validateFloatInput(value);
          }),

        min_bitrate: Yup.string().test('is-number', 'Invalid number', value => {
          return validateNumberInput(value);
        }),
        max_bitrate: Yup.string()
          .test('is-number', 'Invalid number', value => {
            return validateNumberInput(value);
          })
          .test(
            'max-min-bitrate',
            'Max bitrate must be greater than Min bitrate',
            function (value) {
              if (parseInt(value) <= parseInt(this.parent?.min_bitrate)) {
                return false;
              }

              return true;
            }
          ),
        min_duration: Yup.string().test(
          'is-number',
          'Invalid number',
          value => {
            return validateNumberInput(value);
          }
        ),
        max_duration: Yup.string()
          .test('is-number', 'Invalid number', value => {
            return validateNumberInput(value);
          })
          .test(
            'max-min-duration',
            'Max duration must be greater than Min duration',
            function (value) {
              if (!value && parseInt(value) !== 0) {
                return true;
              }

              if (parseInt(value) < parseInt(this.parent?.min_duration)) {
                return false;
              }

              return true;
            }
          )
          .test(
            'max-duration-skip-min',
            'Max duration must be greater than skip min',
            function (value) {
              if (!value) {
                return true;
              }

              if (parseInt(value) < parseInt(this.parent?.skip_min)) {
                return false;
              }

              return true;
            }
          )
          .test(
            'max-duration-skip-after',
            'Max duration must be greater than skip after',
            function (value) {
              if (!value) {
                return true;
              }
              if (parseInt(value) < parseInt(this.parent?.skip_after)) {
                return false;
              }

              return true;
            }
          )
          .test(
            'max-duration-min-duration',
            'Max duration must be greater than min duration',
            function (value) {
              if (!value) {
                return true;
              }
              if (parseInt(value) < parseInt(this.parent?.min_duration)) {
                return false;
              }

              return true;
            }
          ),
        skip_after: Yup.string()
          .test('is-number', 'Invalid number', value => {
            return validateNumberInput(value);
          })
          .test(
            'skip-after-min-duration',
            'Skip after must be greater than min duration',
            function (value) {
              if (!value) {
                return true;
              }
              if (this.parent?.skip !== 'true') {
                return true;
              }
              if (parseInt(value) < parseInt(this.parent?.min_duration)) {
                return false;
              }

              return true;
            }
          ),
        skip_min: Yup.string()
          .test('is-number', 'Invalid number', value => {
            return validateNumberInput(value);
          })
          .test(
            'skip-min-skip-later',
            'Skip min must be greater than skip after',
            function (value) {
              if (!value) {
                return true;
              }
              if (this.parent?.skip !== 'true') {
                return true;
              }
              if (parseInt(value) < parseInt(this.parent?.skip_after)) {
                return false;
              }

              return true;
            }
          )
          .test(
            'skip-min-min-duration',
            'Skip min must be greater than min duration',
            function (value) {
              if (!value) {
                return true;
              }
              if (this.parent?.skip !== 'true') {
                return true;
              }
              if (parseInt(value) < parseInt(this.parent?.min_duration)) {
                return false;
              }

              return true;
            }
          ),
        extra: Yup.string().test('isValidJson', 'Invalid JSON object', val => {
          if (val?.length) {
            return checkValidJson(val);
          }

          return true;
        })
      }),
      tracker: Yup.object({
        template_uuid: Yup.object()
          .nullable()
          .when('variables', variablesVal => {
            if (variablesVal) {
              return Yup.object()
                .required(t('required'))
                .typeError(t('requried'));
            }
            return Yup.object().nullable();
          }),
        variables: Yup.string()
      }),
      custom_play_type_data: Yup.array().of(
        Yup.object().shape({
          file_type: Yup.object().nullable(),
          play_type: Yup.object().nullable(),
          price: Yup.string()
            .test(
              'is-number',
              'The price must be a integer number and greater than 0.',
              val => {
                if (!val) {
                  return true;
                }

                const parsed = parseFloat(val);
                if (parsed > 0) {
                  return true;
                }
                return false;
              }
            )
            .typeError('Invalid number'),
          meta: Yup.string()
            .test('isValidJson', 'Invalid JSON object', val => {
              if (val?.length) {
                return checkValidJson(val);
              }

              return true;
            })
            .test(
              'cross-time-required',
              'Field cross_time is required',
              function (val) {
                if (
                  this.parent?.play_type?.value ===
                  InteractivePlayType.INTERACTIVE_BANNER_MFV
                ) {
                  try {
                    const parsed = JSON.parse(val);
                    return parsed?.cross_time;
                  } catch (error) {
                    return false;
                  }
                }
                return true;
              }
            )
        })
      ),
      interactive_add: Yup.object().shape({
        file_type: Yup.object().nullable(),
        play_type: Yup.object().nullable(),
        price: Yup.string()
          .test(
            'is-number',
            'The price must be a integer number and greater than 0.',
            function (val) {
              if (this.parent?.play_type?.value) {
                if (!val) {
                  return true;
                }

                const parsed = parseFloat(val);
                if (parsed > 0) {
                  return true;
                }
                return false;
              }
              return true;
            }
          )
          .typeError('Invalid number'),
        meta: Yup.string()
          .test('isValidJson', 'Invalid JSON object', val => {
            if (val?.length) {
              return checkValidJson(val);
            }

            return true;
          })
          .test(
            'cross-time-required',
            'Field cross_time is required',
            function (val) {
              if (
                this.parent?.play_type?.value ===
                InteractivePlayType.INTERACTIVE_BANNER_MFV
              ) {
                try {
                  const parsed = JSON.parse(val);
                  return parsed?.cross_time;
                } catch (error) {
                  return false;
                }
              }
              return true;
            }
          )
      })
    })
  );
};

import {isValidURL} from 'utils/helpers/validations.helpers';
import {ALL_TRACK_EVENTS} from 'pages/Container/constants';
import * as Yup from 'yup';

import {yupResolver} from '@hookform/resolvers/yup';
import {USER_ROLE} from 'pages/user-management/constants';
const VALID_NUMBER = /^\d*\.?\d*$/;

export const validationDescriptionTab = (containers, role) => {
  const baseSchema = {
    name: Yup.string()
      .required('Container name is required.')
      .test('is-exist', 'Container name is invalid or exist.', value => {
        if (value?.length) {
          const currentName = value.trim().toLowerCase();
          const isInValidName =
            currentName.startsWith('demographic@') ||
            currentName.startsWith('keyword@') ||
            new RegExp(/^iab-\d{1,}@/gm).test(currentName) ||
            currentName.indexOf('@') >= 0;

          if (isInValidName) {
            return false;
          }
          return containers.every(
            container => container?.name?.trim().toLowerCase() !== currentName
          );
        }
        return true;
      }),
    url: Yup.string()
      .nullable()
      .notRequired()
      .test('is-url', 'Enter correct url!', value => {
        if (value.length) {
          return isValidURL(value);
        }
        return true;
      }),
    defaults: Yup.object().shape({
      deal_floor_price: Yup.string().test({
        name: 'floor_price',
        exclusive: false,
        params: {},
        message: 'The deal floor price must be greater than the floor price',
        test: function (dealPrice) {
          const floorPrice = this.parent?.floor_price;
          if (
            (!isNaN(floorPrice) && !isNaN(dealPrice)) ||
            (isNaN(floorPrice) && !isNaN(floorPrice))
          ) {
            return parseFloat(dealPrice) > parseFloat(this.parent?.floor_price);
          }
          return true;
        }
      })
    })
  };
  if ([USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(role)) {
    return yupResolver(
      Yup.object().shape({
        ...baseSchema,
        cost: Yup.string()
          .required('This field is required')
          .test('is-float', 'Invalid number', value =>
            (value + '').match(VALID_NUMBER)
          )
          .test(
            'is-max',
            'The Commission Cost must be between 0.01 and 0.99',
            value => parseFloat(value) <= 0.99 && parseFloat(value) >= 0.01
          )
          .typeError('Invalid number')
      })
    );
  }
  return yupResolver(
    Yup.object().shape({
      ...baseSchema
    })
  );
};

export const validationPage = (pages = [], isMobile = false) => {
  if (isMobile) {
    return yupResolver(
      Yup.object().shape({
        name: Yup.string()
          .required('Page name is required.')
          .test('is-exist', 'Page name existed.', value => {
            if (value?.length) {
              if (pages?.length) {
                return pages.every(
                  page =>
                    page?.name?.trim().toLowerCase() !==
                    value.trim().toLowerCase()
                );
              }
              return true;
            }
            return true;
          })
      })
    );
  }
  return yupResolver(
    Yup.object().shape({
      name: Yup.string()
        .required('Page name is required.')
        .test('is-exist', 'Page name existed.', value => {
          if (value?.length) {
            if (pages?.length) {
              return pages.every(
                page =>
                  page?.name?.trim().toLowerCase() !==
                  value.trim().toLowerCase()
              );
            }
            return true;
          }
          return true;
        }),
      url: Yup.string()
        .required('Page URL is required.')
        .test('is-url', 'Enter correct url!', value => {
          if (value?.length) {
            return isValidURL(value);
            // return true;
          }
          return true;
        })
    })
  );
};

export const validationEvent = (events = [], isUpdate = false) => {
  if (isUpdate) {
    return yupResolver(
      Yup.object().shape({
        status: Yup.string().required('Status is required.')
      })
    );
  }
  return yupResolver(
    Yup.object().shape({
      status: Yup.string().required('Status is required.'),
      type: Yup.object().nullable().required('Event type is required.'),
      name: Yup.string().when('type', typeVal => {
        if (ALL_TRACK_EVENTS.includes(typeVal.id)) {
          return Yup.string()
            .required('Event name is required.')
            .test('is-exist', 'Event name existed.', value => {
              if (value?.length) {
                return events.every(
                  event =>
                    event?.name?.trim().toLowerCase() !==
                    value.trim().toLowerCase()
                );
              }
              return true;
            });
        }
        return Yup.string().notRequired();
      })
    })
  );
};

export const validationProperty = manualCollect => {
  return yupResolver(
    Yup.object().shape({
      propertyName: Yup.string().required('Property name is required.'),
      propertyType: manualCollect
        ? Yup.string().nullable().notRequired()
        : Yup.object().nullable(),
      propertyContent: Yup.string().when('propertyType', val => {
        if (val) {
          return Yup.string().required('Content is required.');
        }
        return Yup.string().notRequired();
      })
    })
  );
};

/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Button, ModalHeader, ModalBody, ModalFooter, Badge} from 'reactstrap';
import {FormProvider, useForm} from 'react-hook-form';
import {makeStyles} from '@material-ui/core';
import {useQueryClient} from 'react-query';
import BlockUi from 'react-block-ui';

//---> Internal Modules
import {getInventoryMarketTypeColor, getInventoryTypeColor} from '../helpers';
import {INPUTS_NAME} from '../constants';
import {mappingFormToApi} from './dto';
import {
  useBidInventory,
  useDealInventory,
  useGetInventoryBids,
  useGetInventoryDeals
} from 'queries/inventory';
import DealForm from './deal.form';
import InventoryBidForm from './bid.form';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useExcludePeriod} from '../hooks';
import {GET_INVENTORIES} from 'queries/inventory/constants';
import {getResponseData} from 'utils/helpers/misc.helpers';
import {IS_RESPONSE_ALL} from 'constants/misc';
import {schemaValidate} from './validation';
import {useTranslation} from 'react-i18next';
import {BidDealTabs} from './bid-deal-tabs';
import {ApiError, Collapse} from 'components/common';
import {formatValue} from 'react-currency-input-field';
import * as HandleCurrencyFields from 'utils/handleCurrencyFields';

const useStyles = makeStyles({
  bgHover: {
    '&:hover': {
      backgroundColor: '#e0f3ff'
    }
  }
});

const InventoryDetails = ({
  modal = false,
  toggle = () => {},
  inventoryData = {},
  className = '',
  isBid = false,
  isDeal = false,
  isEdit = false,
  params
}) => {
  const {t} = useTranslation();
  let title = isBid ? 'Bid:' : '';
  title = isDeal ? 'Deal:' : title;
  const classes = useStyles();
  const client = useQueryClient();

  //---> Executing queries
  const {data: dealsResp} = useGetInventoryDeals({
    params: {
      inventory_uuid: inventoryData?.uuid
    },
    enabled: !!inventoryData?.uuid && isDeal
  });
  const listDeals = React.useMemo(() => {
    return getResponseData(dealsResp, IS_RESPONSE_ALL);
  }, [dealsResp]);

  const {data: bidsResp} = useGetInventoryBids({
    params: {inventory_uuid: inventoryData?.uuid},
    enabled: isBid && !!inventoryData?.uuid
  });
  const bidsList = React.useMemo(() => {
    return getResponseData(bidsResp, IS_RESPONSE_ALL);
  }, [bidsResp]);

  const {mutateAsync: dealInventory} = useDealInventory(
    inventoryData?.page_uuid
  );
  const {mutateAsync: bidInventory} = useBidInventory(inventoryData?.page_uuid);

  const methods = useForm({
    defaultValues: isBid
      ? {
          [INPUTS_NAME.STATUS]: 'active',
          [INPUTS_NAME.DSP_UUID]: '',
          [INPUTS_NAME.START_AT]: new Date(),
          [INPUTS_NAME.END_AT]: null,
          [INPUTS_NAME.HEADER_BIDDING]: 'inactive',
          [INPUTS_NAME.BUDGET]: {
            [INPUTS_NAME.GLOBAL]: '',
            [INPUTS_NAME.DAILY]: ''
          }
        }
      : {
          [INPUTS_NAME.NAME]: '',
          [INPUTS_NAME.STATUS]: 'active',
          [INPUTS_NAME.DSP_UUID]: '',
          [INPUTS_NAME.START_AT]: new Date(),
          [INPUTS_NAME.END_AT]: null,
          [INPUTS_NAME.HEADER_BIDDING]: 'inactive',
          [INPUTS_NAME.DEAL_PRICE]: '',
          [INPUTS_NAME.LIMIT_IMPRESSION]: ''
        },
    resolver: schemaValidate(t, isBid)
  });
  const {handleSubmit, formState, watch} = methods;
  const selectedDsp = watch(INPUTS_NAME.DSP_UUID);

  //---> Get invalid dates to bid/deal
  const excludeDates = useExcludePeriod({
    dataList: isBid ? bidsList : listDeals,
    dsp: selectedDsp?.value
  });

  async function executeDealInventory({formData}) {
    const submitData = mappingFormToApi({
      formData,
      isDeal: true,
      inventoryId: inventoryData?.uuid
    });
    try {
      await dealInventory({
        data: submitData,
        inventoryId: inventoryData?.uuid
      });
      ShowToast.success('Deal inventory successfully');
      toggle();
    } catch (error) {
      ShowToast.error(error?.msg || 'Fail to deal inventory');
    }
  }

  async function executeBidInventory({formData}) {
    const submitData = mappingFormToApi({
      formData,
      isDeal: false,
      inventoryId: inventoryData?.uuid
    });
    try {
      await bidInventory({
        data: submitData,
        inventoryId: inventoryData?.uuid
      });
      await client.invalidateQueries([GET_INVENTORIES, params]);
      ShowToast.success('Bid inventory successfully');
      toggle();
    } catch (error) {
      ShowToast.error(<ApiError apiError={error}/>);
    }
  }

  const onSubmit = async formData => {
    if (!isDeal) {
      await executeBidInventory({formData});
    } else {
      await executeDealInventory({formData});
    }
  };

  return (
    <>
      <ModalHeader toggle={toggle}>
        {title} {inventoryData?.name}
      </ModalHeader>
      <ModalBody>
        <Collapse unMount={false} initialOpen title="Description">
          <div className={`d-flex flex-wrap ${classes.bgHover}`}>
            {/* Type */}
            <InventoryPartial label="Type">
              <Badge color={getInventoryTypeColor({type: inventoryData?.type})}>
                {inventoryData?.type}
              </Badge>
            </InventoryPartial>
            <InventoryPartial label="Market Type">
              <Badge
                color={getInventoryMarketTypeColor({
                  type: inventoryData?.market_type
                })}
              >
                {inventoryData?.market_type}
              </Badge>
            </InventoryPartial>

            {/* Click rate */}
            <InventoryPartial label="Click rate">
              <Badge color="info" pill>
                {inventoryData?.click_rate ?? 0}
              </Badge>
            </InventoryPartial>

            {/* Minimum Price */}
            <InventoryPartial label="Floor price">
              <Badge color="info" pill>
                {inventoryData?.floor_price
                  ? formatValue({
                      value: HandleCurrencyFields.convertApiToGui({
                        value: inventoryData?.floor_price
                      })?.toString(),
                      groupSeparator: ',',
                      decimalSeparator: '.',
                      prefix: '$'
                    })
                  : ''}
              </Badge>
            </InventoryPartial>

            {/* Format */}
            <InventoryPartial label="Format">
              {inventoryData?.format}
            </InventoryPartial>

            {/* Fill rate */}
            <InventoryPartial label="Fill rate">
              <Badge color="info" pill>
                {inventoryData?.fill_rate ?? 0}
              </Badge>
            </InventoryPartial>

            {/* Position */}
            <InventoryPartial label="Position">
              {inventoryData?.position_name}
            </InventoryPartial>

            {/* Width */}
            <InventoryPartial label="Width">
              <Badge color="light" pill>
                {inventoryData?.metadata?.width ?? 0}
              </Badge>
            </InventoryPartial>

            {/* Height */}
            <InventoryPartial label="Height">
              <Badge color="light" pill>
                {inventoryData?.metadata?.height ?? 0}
              </Badge>
            </InventoryPartial>

            {/* Background color */}
            <InventoryPartial label="Background color">
              <span
                style={{
                  color: inventoryData?.metadata?.background_color ?? ''
                }}
              >
                {inventoryData?.metadata?.background_color}
              </span>
            </InventoryPartial>

            <InventoryPartial label="Auto created">
              <Badge color="light" pill>
                {inventoryData?.is_auto_create.toString()}
              </Badge>
            </InventoryPartial>
          </div>
        </Collapse>

        {!isBid && !isDeal && (
          <BidDealTabs
            inventoryId={inventoryData?.uuid}
            excludeDates={excludeDates}
          />
        )}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            id="bidInventoryFormId"
          >
            <BlockUi tag="div" blocking={formState.isSubmitting}>
              {isBid && (
                <InventoryBidForm
                  excludeDates={excludeDates}
                  inventoryId={inventoryData?.uuid}
                />
              )}
              {/* Render date range picker */}
              {isDeal && <DealForm excludeDates={excludeDates} />}
            </BlockUi>
          </form>
        </FormProvider>
      </ModalBody>
      <ModalFooter>
        <Button color="link" onClick={toggle}>
          Cancel
        </Button>
        {isBid && (
          <React.Fragment>
            {isEdit && (
              <React.Fragment>
                <Button type="button" color="danger">
                  Delete
                </Button>
                <Button type="button" color="warning">
                  Finish
                </Button>
              </React.Fragment>
            )}
            <Button
              form="bidInventoryFormId"
              type="submit"
              color="primary"
              disabled={!formState.isDirty}
            >
              Bid
            </Button>
          </React.Fragment>
        )}
        {isDeal && (
          <Button
            form="bidInventoryFormId"
            type="submit"
            color="primary"
            disabled={!formState.isDirty}
          >
            Deal
          </Button>
        )}
      </ModalFooter>
    </>
  );
};

const InventoryPartial = React.memo(({label = '', children}) => {
  return (
    <div className="d-flex" style={{width: '33.33333%', padding: '7.5px'}}>
      <div className="font-weight-bold">{label}:</div>
      <div className="ml-2">{children}</div>
    </div>
  );
});

export default React.memo(InventoryDetails);

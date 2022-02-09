/**
 * Copyright (c) 2021-present, AiCactus, Inc.
 * All rights reserved.
 *
 * @flow
 */

//---> Build-in Modules
import React from 'react';

//---> External Modules
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  Badge
} from 'reactstrap';
import {FormProvider, useForm} from 'react-hook-form';
import {makeStyles} from '@material-ui/core';

//---> Internal Modules
import {getInventoryTypeColor} from '../helpers';
import {INPUTS_NAME} from '../constants';
import {mappingFormToApi} from './dto';
import {
  useBidInventory,
  useDealInventory,
  useGetInventoryBids,
  useGetInventoryDeals
} from 'queries/inventory';
import BlockUi from 'react-block-ui';
import DealForm from './deal.form';
import InventoryBidForm from './bid.form';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useExcludePeriod} from '../hooks';
import {useQueryClient} from 'react-query';
import {GET_INVENTORIES} from 'queries/inventory/constants';

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
  let title = isBid ? 'Bid:' : '';
  title = isDeal ? 'Deal:' : title;
  const classes = useStyles();
  const client = useQueryClient();

  //---> Executing queries
  const {data: listDeals} = useGetInventoryDeals({
    inventoryId: inventoryData?.uuid,
    isDeal
  });
  const {data: bidsList} = useGetInventoryBids({
    inventoryId: inventoryData?.uuid,
    isBid
  });
  const {mutateAsync: dealInventory} = useDealInventory(
    inventoryData?.page_uuid
  );
  const {mutateAsync: bidInventory} = useBidInventory(inventoryData?.page_uuid);

  const methods = useForm({
    defaultValues: {
      [INPUTS_NAME.NAME]: '',
      [INPUTS_NAME.STATUS]: 'active',
      [INPUTS_NAME.DSP_UUID]: '',
      [INPUTS_NAME.START_AT]: null,
      [INPUTS_NAME.END_AT]: null
    }
  });
  const {handleSubmit, formState, watch} = methods;
  const selectedDsp = watch(INPUTS_NAME.DSP_UUID);

  //---> Get invalid dates to bid/deal
  const excludeDates = useExcludePeriod({
    dataList: isBid ? bidsList : listDeals,
    dsp: selectedDsp?.value
  });
  console.log(
    '🚀 ~ file: inventory-detail.js ~ line 90 ~ excludeDates',
    excludeDates
  );

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
      console.log('🚀 ~ file: inventory-detail.js ~ line 75 ~ error', error);
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
      console.log('🚀 ~ file: inventory-detail.js ~ line 75 ~ error', error);
      ShowToast.error(error?.msg || 'Fail to bid inventory');
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
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        id="bidInventory"
      >
        <BlockUi tag="div" blocking={formState.isSubmitting}>
          <ModalHeader>
            {title} {inventoryData?.name}
          </ModalHeader>
          <ModalBody>
            <Card className="mb-3">
              <CardBody className={classes.bgHover}>
                <div className="d-flex flex-wrap">
                  {/* Type */}
                  <InventoryPartial label="Type">
                    <Badge
                      color={getInventoryTypeColor({type: inventoryData?.type})}
                    >
                      {inventoryData?.type}
                    </Badge>
                  </InventoryPartial>

                  {/* Click rate */}
                  <InventoryPartial label="Click rate">
                    <Badge color="light" pill>
                      {inventoryData?.click_rate ?? 0}
                    </Badge>
                  </InventoryPartial>

                  {/* Fill rate */}
                  <InventoryPartial label="Fill rate">
                    <Badge color="info" pill>
                      {inventoryData?.fill_rate ?? 0}
                    </Badge>
                  </InventoryPartial>

                  {/* Minimum Price */}
                  <InventoryPartial label="Floor price">
                    <Badge color="warning" pill>
                      {inventoryData?.floor_price ?? 0}
                    </Badge>
                  </InventoryPartial>

                  {/* Format */}
                  <InventoryPartial label="Format">
                    {inventoryData?.format}
                  </InventoryPartial>
                  {/* Merge */}
                  <InventoryPartial label="Merge">
                    {inventoryData?.merge}
                  </InventoryPartial>

                  {/* Position */}
                  <InventoryPartial label="Position">
                    {inventoryData?.position}
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
                </div>
              </CardBody>
            </Card>
            {isBid && <InventoryBidForm excludeDates={excludeDates} />}
            {/* Render date range picker */}
            {isDeal && <DealForm excludeDates={excludeDates} />}
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
                type="submit"
                color="primary"
                disabled={!formState.isDirty}
              >
                Deal
              </Button>
            )}
          </ModalFooter>
        </BlockUi>
      </form>
    </FormProvider>
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

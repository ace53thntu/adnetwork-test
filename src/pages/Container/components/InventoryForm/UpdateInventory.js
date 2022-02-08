//---> Build-in Modules
import React, {useCallback, useEffect, useState} from 'react';

//---> External Modules
import {useForm, FormProvider} from 'react-hook-form';
import {ModalHeader, ModalBody} from 'reactstrap';

//---> Internal Modules
import {getInventoryFormats, getInventoryTypes} from '../../constants';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {useEditInventory, useGetInventory} from 'queries/inventory';
import {useDefaultInventory} from 'pages/Container/hooks/useDefaultInventory';
import {mappingInventoryFormToApi} from './dto';
import InventoryFormContent from './InventoryFormContent';
import {validationInventory} from './validation';

export default function UpdateInventory({
  toggle = () => {},
  inventoryId = null,
  pageId
}) {
  const {data: inventory, isFetching} = useGetInventory(inventoryId);

  if (isFetching) {
    return (
      <>
        <ModalHeader>Inventory Information</ModalHeader>
        <ModalBody>
          <div>Loading...</div>
        </ModalBody>
      </>
    );
  }

  return <FormUpdate toggle={toggle} inventory={inventory} pageId={pageId} />;
}

function FormUpdate({toggle, inventory, pageId}) {
  const inventoryTypes = getInventoryTypes();
  const inventoryFormats = getInventoryFormats();
  const defaultValues = useDefaultInventory({
    inventory
  });
  const methods = useForm({
    defaultValues,
    resolver: validationInventory([], true)
  });
  const {handleSubmit, reset} = methods;

  const {mutateAsync: editInventory} = useEditInventory();

  // local states
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onHandleSubmit = useCallback(
    async values => {
      const formData = mappingInventoryFormToApi({pageId, formData: values});
      setIsLoading(true);
      try {
        await editInventory({inventoryId: defaultValues?.uuid, data: formData});
        ShowToast.success('Update Inventory successfully!', {
          closeOnClick: true
        });
        setIsLoading(false);

        toggle();
      } catch (err) {
        setIsLoading(false);
        ShowToast.error(err?.msg || 'Fail to update inventory', {
          closeOnClick: true
        });
      }
    },
    [defaultValues?.uuid, editInventory, pageId, toggle]
  );

  const formProps = React.useMemo(
    () => ({
      isLoading,
      inventory,
      typeOptions: inventoryTypes,
      inventoryFormatOptions: inventoryFormats,
      toggle
    }),
    [inventory, inventoryFormats, inventoryTypes, isLoading, toggle]
  );

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onHandleSubmit)}
          name="create-inventory"
          key="create-inventory"
          autoComplete="off"
        >
          <InventoryFormContent {...formProps} />
        </form>
      </FormProvider>
    </>
  );
}

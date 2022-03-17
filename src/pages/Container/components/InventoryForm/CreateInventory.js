//---> Build-in Modules
import React, {useState} from 'react';

//---> External Modules
import {Modal} from 'reactstrap';
import {FormProvider, useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';

//---> Internal Modules
import {
  getInventoryFormats,
  getInventoryTypes
} from 'pages/Container/constants';
import {useCreateInventory} from 'queries/inventory';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {mappingInventoryFormToApi} from './dto';
import InventoryFormContent from './InventoryFormContent';
import {validationInventory} from './validation';

function CreateInventory({isOpen = false, toggle = () => {}}) {
  const {pageId} = useParams();
  const inventoryTypes = getInventoryTypes();
  const inventoryFormats = getInventoryFormats();
  const {mutateAsync: createInventory} = useCreateInventory();

  const methods = useForm({
    defaultValues: {
      status: 'active',
      allow_deal: 'inactive',
      type: null,
      metadata: {
        loop: 'active'
      }
    },
    resolver: validationInventory()
  });
  const {handleSubmit} = methods;

  // local states
  const [isLoading, setIsLoading] = useState(false);

  const onHandleSubmit = async values => {
    const formData = mappingInventoryFormToApi({pageId, formData: values});
    setIsLoading(true);
    try {
      await createInventory(formData);
      ShowToast.success('Created Inventory successfully!', {
        closeOnClick: true
      });

      setIsLoading(false);
      toggle();
    } catch (err) {
      setIsLoading(false);
      ShowToast.error(err?.msg || 'Fail to create Inventory', {
        closeOnClick: true
      });
    }
  };

  const formProps = React.useMemo(
    () => ({
      isLoading: isLoading,
      typeOptions: inventoryTypes,
      inventoryFormatOptions: inventoryFormats,
      toggle
    }),
    [inventoryFormats, inventoryTypes, isLoading, toggle]
  );

  return (
    <Modal
      unmountOnClose
      size="lg"
      className="modal-dialog shadow-none"
      isOpen={isOpen}
    >
      <FormProvider {...methods} key="create-event">
        <form
          onSubmit={handleSubmit(onHandleSubmit)}
          name="create-event"
          key="create-event"
          autoComplete="off"
        >
          <InventoryFormContent {...formProps} />
        </form>
      </FormProvider>
    </Modal>
  );
}

export default CreateInventory;

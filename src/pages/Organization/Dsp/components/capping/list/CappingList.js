// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';

// Internal Modules
import {getResponseData} from 'utils/helpers/misc.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {formToApi, getExistedType, getListByType} from '../dto';
import {ApiError, DialogConfirm, LoadingIndicator} from 'components/common';
import {
  CappingTypes,
  DEFAULT_PAGINATION,
  IS_RESPONSE_ALL
} from 'constants/misc';
import {
  useDeleteCapping,
  useEditCapping,
  useGetCappings
} from 'queries/capping';
import AddTypeButton from '../actions/AddTypeButton';
import CappingFormContainer from '../form/CappingFormContainer';
import BudgetList from './BudgetList';

const propTypes = {
  referenceUuid: PropTypes.string.isRequired
};

const CappingList = ({referenceUuid = '', referenceType = ''}) => {
  const {mutateAsync: editCapping} = useEditCapping();
  const {mutateAsync: deleteCapping} = useDeleteCapping();

  const [openForm, setOpenForm] = React.useState(false);
  const [activeCapping, setActiveCapping] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const {data, isLoading} = useGetCappings({
    params: {
      per_page: 100,
      page: DEFAULT_PAGINATION.page,
      sort: 'updated_at DESC',
      reference_uuid: referenceUuid
    },
    enabled: !!referenceUuid
  });

  const cappings = React.useMemo(() => {
    const cappingData = getResponseData(data, IS_RESPONSE_ALL);

    return cappingData?.map(item => ({...item, id: item?.uuid}));
  }, [data]);

  const budgetList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.BUDGET.value});
  }, [cappings]);

  const budgetManagerList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.BUDGET_MANAGER.value});
  }, [cappings]);

  const existedTypes = getExistedType(cappings);

  function toggleModal() {
    setOpenForm(prevState => !prevState);
  }

  function onClickMenu(index, item) {
    setActiveCapping(item);
    if (index === 0) {
      setOpenForm(true);
    } else if (index === 1) {
      setOpenDialog(true);
    }
  }

  function onClickItem(item) {
    setActiveCapping(item);
    setOpenForm(true);
  }
  function onCancelDelete() {
    setOpenDialog(false);
  }

  async function onEditCapping(formData) {
    const requestBody = formToApi({formData, type: activeCapping?.type});
    setIsSubmitting(true);
    try {
      await editCapping({cappingId: activeCapping?.uuid, data: requestBody});
      setIsSubmitting(false);

      ShowToast.success('Updated capping successfully');
      toggleModal();
      setActiveCapping(null);
    } catch (err) {
      setIsSubmitting(false);

      ShowToast.error(<ApiError apiError={err} />);
    }
  }

  async function onSubmitDelete(params) {
    setIsSubmitting(true);

    try {
      if (
        activeCapping?.type !== CappingTypes.BUDGET.value &&
        activeCapping?.type !== CappingTypes.IMPRESSION.value
      ) {
        await deleteCapping({cappingId: activeCapping?.uuid});
      } else {
        await editCapping({cappingId: activeCapping?.uuid, data: {target: 0}});
      }
      setIsSubmitting(false);

      ShowToast.success('Deleted capping successfully');
      setOpenDialog(false);
      setActiveCapping(null);
    } catch (err) {
      setIsSubmitting(false);

      ShowToast.error(<ApiError apiError={err} />);
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-end mb-2">
        <AddTypeButton
          existedTypes={existedTypes}
          referenceType={referenceType}
          referenceUuid={referenceUuid}
          cappings={cappings}
        />
      </div>
      {isLoading && <LoadingIndicator />}

      {/* Capping List */}

      {budgetList?.length > 0 && (
        <BudgetList
          list={budgetList}
          onClickMenu={onClickMenu}
          onClickItem={onClickItem}
        />
      )}

      {budgetManagerList?.length > 0 && (
        <BudgetList
          title="Budget manager"
          list={budgetManagerList}
          onClickMenu={onClickMenu}
          onClickItem={onClickItem}
          isManager
        />
      )}

      {/* Capping Form */}
      {openForm && (
        <CappingFormContainer
          cappingId={activeCapping?.uuid}
          onSubmit={onEditCapping}
          isSubmitting={isSubmitting}
          openForm={openForm}
          toggleModal={toggleModal}
        />
      )}

      {openDialog && (
        <DialogConfirm
          open={openDialog}
          title="Are you sure delete this capping?"
          handleClose={onCancelDelete}
          handleAgree={onSubmitDelete}
          isLoading={isSubmitting}
        />
      )}
    </div>
  );
};

CappingList.propTypes = propTypes;

export default CappingList;

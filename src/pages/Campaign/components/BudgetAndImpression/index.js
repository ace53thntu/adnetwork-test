import React from 'react';
import BudgetList from '../capping/list/BudgetList';
import {formToApi, getListByType} from '../capping/dto';
import {
  CappingTypes,
  DEFAULT_PAGINATION,
  IS_RESPONSE_ALL
} from '../../../../constants/misc';
import {
  useDeleteCapping,
  useEditCapping,
  useGetCappings
} from '../../../../queries/capping';
import {getResponseData} from '../../../../utils/helpers/misc.helpers';
import CappingFormContainer from '../capping/form/CappingFormContainer';
import {ApiError, DialogConfirm} from '../../../../components/common';
import {ShowToast} from '../../../../utils/helpers/showToast.helpers';

const propTypes = {};

const BudgetAndImpression = ({referenceUuid = ''}) => {
  const {mutateAsync: editCapping} = useEditCapping();
  const {mutateAsync: deleteCapping} = useDeleteCapping();

  const {data} = useGetCappings({
    params: {
      per_page: DEFAULT_PAGINATION.perPage,
      page: DEFAULT_PAGINATION.page,
      sort: 'created_at DESC',
      reference_uuid: referenceUuid
    },
    enabled: !!referenceUuid
  });

  const [openForm, setOpenForm] = React.useState(false);
  const [activeCapping, setActiveCapping] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const cappings = React.useMemo(() => {
    const cappingData = getResponseData(data, IS_RESPONSE_ALL);

    return cappingData?.map(item => ({...item, id: item?.uuid}));
  }, [data]);

  const budgetList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.BUDGET.value});
  }, [cappings]);

  const impressionList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.IMPRESSION.value});
  }, [cappings]);

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

  function toggleModal() {
    setOpenForm(prevState => !prevState);
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

      ShowToast.error(<ApiError apiError={err || 'Fail to update capping'} />);
    }
  }

  async function onSubmitDelete() {
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

      ShowToast.error(<ApiError apiError={err || 'Fail to delete capping'} />);
    }
  }

  return (
    <div>
      {budgetList?.length > 0 && (
        <BudgetList
          list={budgetList}
          onClickMenu={onClickMenu}
          onClickItem={onClickItem}
        />
      )}

      {impressionList?.length > 0 && (
        <BudgetList
          title="Impression"
          list={impressionList}
          onClickMenu={onClickMenu}
          onClickItem={onClickItem}
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

BudgetAndImpression.propTypes = propTypes;

export default BudgetAndImpression;

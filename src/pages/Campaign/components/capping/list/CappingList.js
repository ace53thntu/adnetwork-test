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
import DomainList from './DomainList';
import KeywordList from './KeywordList';
import ScheduleList from './ScheduleList';

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
      per_page: DEFAULT_PAGINATION.perPage,
      page: DEFAULT_PAGINATION.page,
      sort: 'created_at DESC',
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

  const impressionList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.IMPRESSION.value});
  }, [cappings]);

  const userList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.USER.value});
  }, [cappings]);

  const userClickList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.USER_CLICK.value});
  }, [cappings]);

  const userViewableList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.USER_VIEWABLE.value});
  }, [cappings]);

  const clickList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.CLICK.value});
  }, [cappings]);

  const viewableList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.VIEWABLE.value});
  }, [cappings]);

  const budgetManagerList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.BUDGET_MANAGER.value});
  }, [cappings]);

  const domainList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.DOMAIN.value});
  }, [cappings]);

  const keywordList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.KEYWORD.value});
  }, [cappings]);

  const scheduleList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.SCHEDULE.value});
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

      {impressionList?.length > 0 && (
        <BudgetList
          title="Impression"
          list={impressionList}
          onClickMenu={onClickMenu}
          onClickItem={onClickItem}
        />
      )}

      {userList?.length > 0 && (
        <BudgetList
          title="User"
          list={userList}
          onClickMenu={onClickMenu}
          onClickItem={onClickItem}
          type={CappingTypes.USER.value}
        />
      )}

      {userClickList?.length > 0 && (
        <BudgetList
          title="User click"
          list={userClickList}
          onClickMenu={onClickMenu}
          onClickItem={onClickItem}
          type={CappingTypes.USER_CLICK.value}
        />
      )}

      {userViewableList?.length > 0 && (
        <BudgetList
          title="User viewable"
          list={userViewableList}
          onClickMenu={onClickMenu}
          onClickItem={onClickItem}
          type={CappingTypes.USER_VIEWABLE.value}
        />
      )}

      {clickList?.length > 0 && (
        <BudgetList
          title="Click"
          list={clickList}
          onClickMenu={onClickMenu}
          onClickItem={onClickItem}
          type={CappingTypes.CLICK.value}
        />
      )}

      {viewableList?.length > 0 && (
        <BudgetList
          title="Viewable"
          list={viewableList}
          onClickMenu={onClickMenu}
          onClickItem={onClickItem}
          type={CappingTypes.VIEWABLE.value}
        />
      )}

      {domainList?.length > 0 && (
        <DomainList
          list={domainList}
          onClickMenu={onClickMenu}
          onClickItem={onClickItem}
        />
      )}
      {keywordList?.length > 0 && (
        <KeywordList
          list={keywordList}
          onClickMenu={onClickMenu}
          onClickItem={onClickItem}
        />
      )}

      {scheduleList?.length > 0 && (
        <ScheduleList
          list={scheduleList}
          onClickMenu={onClickMenu}
          onClickItem={onClickItem}
          isManager
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

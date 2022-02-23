// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

// Internal Modules
import {getResponseData} from 'utils/helpers/misc.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {formToApi, getExistedType, getListByType} from './dto';
import {
  ButtonLoading,
  DialogConfirm,
  LoadingIndicator
} from 'components/common';
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
import AddTypeButton from './AddTypeButton';
import CappingFormContainer from './CappingFormContainer';
import BudgetList from './BudgetList';
import DomainList from './DomainList';
import KeywordList from './KeywordList';

const propTypes = {
  referenceUuid: PropTypes.string.isRequired
};

const CappingList = ({referenceUuid = '', referenceType = ''}) => {
  const {t} = useTranslation();
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

  const domainList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.DOMAIN.value});
  }, [cappings]);

  const keywordList = React.useMemo(() => {
    return getListByType({cappings, type: CappingTypes.KEYWORD.value});
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
    console.log(
      '🚀 ~ file: CappingList.js ~ line 122 ~ onEditCapping ~ formData',
      formData
    );
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

      ShowToast.error(err?.msg || 'Fail to update capping');
    }
  }

  async function onSubmitDelete(params) {
    setIsSubmitting(true);

    try {
      await deleteCapping({cappingId: activeCapping?.uuid});
      setIsSubmitting(false);

      ShowToast.success('Deleted capping successfully');
      setOpenDialog(false);
      setActiveCapping(null);
    } catch (err) {
      setIsSubmitting(false);

      ShowToast.error(err?.msg || 'Fail to delete capping');
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-end mb-2">
        <AddTypeButton
          existedTypes={existedTypes}
          referenceType={referenceType}
          referenceUuid={referenceUuid}
        />
      </div>
      {isLoading && <LoadingIndicator />}

      {/* Capping List */}

      <BudgetList
        list={budgetList}
        onClickMenu={onClickMenu}
        onClickItem={onClickItem}
      />

      <BudgetList
        title="Impression"
        list={impressionList}
        onClickMenu={onClickMenu}
        onClickItem={onClickItem}
      />

      <DomainList
        list={domainList}
        onClickMenu={onClickMenu}
        onClickItem={onClickItem}
      />

      <KeywordList
        list={keywordList}
        onClickMenu={onClickMenu}
        onClickItem={onClickItem}
      />

      {/* Capping Form */}
      {openForm && (
        <Modal isOpen={openForm}>
          <ModalHeader>Edit capping</ModalHeader>
          <ModalBody>
            <CappingFormContainer
              cappingId={activeCapping?.uuid}
              onSubmit={onEditCapping}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="link" className="mr-2" onClick={toggleModal}>
              Close
            </Button>
            <ButtonLoading
              type="submit"
              className="mr-2 btn-primary"
              form="cappingForm"
              loading={isSubmitting}
            >
              {t('save')}
            </ButtonLoading>
          </ModalFooter>
        </Modal>
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

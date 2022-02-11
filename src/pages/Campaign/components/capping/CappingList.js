// Build-in Modules
import React from 'react';

// External Modules
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

// Internal Modules
import {
  getResponseData,
  getResponsePagination
} from 'utils/helpers/misc.helpers';
import {ShowToast} from 'utils/helpers/showToast.helpers';
import {capitalize} from 'utils/helpers/string.helpers';
import {formToApi, getExistedType} from './dto';
import {
  ButtonLoading,
  DialogConfirm,
  LoadingIndicator
} from 'components/common';
import CustomPagination from 'components/common/CustomPagination';
import {List} from 'components/list';
import {CustomStatus} from 'components/list/status';
import {
  BudgetTimeFrames,
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

const renderCappingTypeColor = type => {
  switch (type) {
    case CappingTypes.BUDGET?.value:
      return 'primary';
    case CappingTypes.IMPRESSION?.value:
      return 'success';
    case CappingTypes.DOMAIN?.value:
      return 'warning';
    case CappingTypes.KEYWORD?.value:
      return 'info';
    case CappingTypes.SCHEDULE?.value:
      return 'light';
    default:
      return 'secondary';
  }
};

const propTypes = {
  referenceUuid: PropTypes.string.isRequired
};

const CappingList = ({referenceUuid = ''}) => {
  const {t} = useTranslation();
  const {mutateAsync: editCapping} = useEditCapping();
  const {mutateAsync: deleteCapping} = useDeleteCapping();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [openForm, setOpenForm] = React.useState(false);
  const [activeCapping, setActiveCapping] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const {data, isLoading, isPreviousData} = useGetCappings({
    params: {
      per_page: DEFAULT_PAGINATION.perPage,
      page: currentPage,
      sort: 'created_at DESC',
      reference_uuid: referenceUuid
    },
    enabled: !!referenceUuid,
    keepPreviousData: true
  });

  const cappings = React.useMemo(() => {
    const cappingData = getResponseData(data, IS_RESPONSE_ALL);

    return cappingData?.map(item => ({...item, id: item?.uuid}));
  }, [data]);

  const existedTypes = getExistedType(cappings);

  const paginationInfo = React.useMemo(() => {
    return getResponsePagination(data);
  }, [data]);

  //---> Define columns
  const columns = React.useMemo(() => {
    return [
      {
        header: 'Capping type',
        accessor: 'type',
        cell: row => (
          <Badge color={renderCappingTypeColor(row?.value)}>
            {Object.entries(CappingTypes).find(
              ([key, type]) => type.value === row?.value
            )?.[1]?.label || ''}
          </Badge>
        )
      },
      {
        header: 'Target',
        accessor: 'target',
        cell: row => row?.value?.toString() || ''
      },
      {
        header: 'Budget',
        accessor: 'time_frame',
        cell: row => {
          console.log(
            '🚀 ~ file: CappingList.js ~ line 124 ~ columns ~ row',
            row
          );

          return (
            <>
              {row.original?.type === CappingTypes.BUDGET.value &&
                row?.value === BudgetTimeFrames.DAILY && (
                  <Badge color="primary" pill>
                    {row?.value === BudgetTimeFrames.DAILY && 'Daily'}
                  </Badge>
                )}
              {(row.original?.type === CappingTypes.BUDGET.value &&
                row?.value) === BudgetTimeFrames.GLOBAL && (
                <Badge color="success" pill>
                  {row?.value === BudgetTimeFrames.GLOBAL && 'Global'}
                </Badge>
              )}
            </>
          );
        }
      },
      {
        accessor: 'status',
        cell: row => {
          let statusProps = {
            label: capitalize(row?.value)
          };
          switch (row.value) {
            case 'active':
              statusProps.color = 'success';
              break;
            default:
              statusProps.color = 'error';
              break;
          }
          return <CustomStatus {...statusProps} />;
        }
      }
    ];
  }, []);

  function onPageChange(evt, page) {
    evt.preventDefault();
    setCurrentPage(page);
  }

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
        <AddTypeButton existedTypes={existedTypes} />
      </div>
      {isLoading && <LoadingIndicator />}

      {/* Capping List */}
      <List
        data={cappings || []}
        columns={columns}
        showAction
        actions={[t('edit'), t('delete')]}
        handleAction={onClickMenu}
        handleClickItem={onClickItem}
      />
      <CustomPagination
        currentPage={currentPage}
        totalCount={paginationInfo?.totalItems}
        onPageChange={(evt, page) => onPageChange(evt, page)}
        disabled={isPreviousData}
      />

      {/* Capping Form */}
      {openForm && (
        <Modal isOpen={openForm} size="lg">
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

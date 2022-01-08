import {useDeleteCapping} from 'queries/capping';
import {useDeleteWeekpart} from 'queries/weekpart';
import {useContext} from 'react';

// import {useDeleteCapping} from 'core/queries/capping';
// import {useDeleteWeekPart} from 'core/queries/week-part';
import {CappingContext} from '../CappingContext';

const useHandleCapping = () => {
  const [state, setState] = useContext(CappingContext);
  const {
    currentObject,
    currentObjectType,
    typeText,
    titleDialog,
    showFormCapping,
    showFormWeekPart,
    openConfirmDialog
  } = state;

  const {mutateAsync: deleteCapping} = useDeleteCapping();
  const {mutateAsync: deleteWeekPart} = useDeleteWeekpart();

  const handleShowCappingForm = () => {
    setState({
      ...state,
      showFormCapping: true,
      showFormWeekPart: false,
      typeText: 'Capping'
    });
  };

  const handleShowWeekPartForm = () => {
    setState({
      ...state,
      showFormWeekPart: true,
      showFormCapping: false,
      typeText: 'Weekpart'
    });
  };

  const handleCloseCappingForm = () => {
    setState({...state, showFormCapping: false});
  };

  const handleCloseWeekPartForm = () => {
    setState({...state, showFormWeekPart: false});
  };

  function handleEdit({type, id}) {
    if (type === 'capping') {
      setState({
        ...state,
        showFormCapping: true,
        currentObject: id,
        currentObjectType: type,
        typeText: 'Capping'
      });
      return;
    }

    if (type === 'week-part') {
      setState({
        ...state,
        showFormWeekPart: true,
        currentObject: id,
        currentObjectType: type,
        typeText: 'Week Part'
      });
      return;
    }
  }

  function handleDelete({type, id, title}) {
    setState({
      ...state,
      openConfirmDialog: true,
      currentObject: id,
      currentObjectType: type,
      titleDialog: `Are you sure delete this ${title}`
    });
  }

  const handleCancelDelete = () => {
    setState({...state, openConfirmDialog: false});
  };

  const handleSubmitDelete = async () => {
    try {
      if (currentObjectType === 'capping') {
        await deleteCapping({cappingId: currentObject});
        setState({
          ...state,
          showFormCapping: false,
          openConfirmDialog: false,
          currentObject: null
        });
      } else {
        await deleteWeekPart({weekpartId: currentObject});
        setState({
          ...state,
          showFormWeekPart: false,
          openConfirmDialog: false,
          currentObject: null
        });
      }
    } catch (error) {}
  };

  return {
    handleShowCappingForm,
    handleShowWeekPartForm,
    handleCloseCappingForm,
    handleCloseWeekPartForm,
    handleEdit,
    handleDelete,
    handleSubmitDelete,
    handleCancelDelete,
    currentObject,
    currentObjectType,
    typeText,
    titleDialog,
    showFormCapping,
    showFormWeekPart,
    openConfirmDialog
  };
};

export default useHandleCapping;

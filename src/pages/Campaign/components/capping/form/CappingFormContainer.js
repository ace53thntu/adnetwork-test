//---> Build-in Modules
import React from 'react';

//---> External Modules
import PropTypes from 'prop-types';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import {useGetCapping} from 'queries/capping';
import CappingForm from './CappingForm';
import {ButtonLoading} from 'components/common';
import {useTranslation} from 'react-i18next';

const propTypes = {
  cappingId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  toggleModal: PropTypes.func,
  openForm: PropTypes.bool
};

const CappingFormContainer = ({
  cappingId = '',
  onSubmit = () => null,
  openForm = false,
  toggleModal = () => null,
  isSubmitting = false
}) => {
  const {t} = useTranslation();
  const {data: capping, isLoading} = useGetCapping(cappingId);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Modal isOpen={openForm} size="lg">
          <ModalHeader>Edit capping</ModalHeader>
          <ModalBody>
            <CappingForm capping={capping} onSubmit={onSubmit} />
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
    </>
  );
};

CappingFormContainer.propTypes = propTypes;

export default CappingFormContainer;

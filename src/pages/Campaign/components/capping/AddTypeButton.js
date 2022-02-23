//---> Build-in Modules
import React from 'react';

//---> External Modules
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';
import PropTypes from 'prop-types';

//---> Internal Modules
import {CappingTypeButtons, CappingTypes} from 'constants/misc';
import BudgetCreateModal from './BudgetCreateModal';
import DomainCreateModal from './DomainCreateModal';
import KeywordCreateModal from './KeywordCreateModal';

const disabledExistedType = ({existedTypes, currentType}) => {
  const typeFound = existedTypes.find(existedType => {
    if (
      existedType.type === currentType.type &&
      existedType.sub_type === currentType.sub_type
    ) {
      return true;
    }

    return false;
  });

  if (typeFound) {
    return true;
  }
  return false;
};

const propTypes = {
  existedTypes: PropTypes.array,
  referenceType: PropTypes.string,
  referenceUuid: PropTypes.string
};

const AddTypeButton = ({
  existedTypes = [],
  referenceType = 'campaign',
  referenceUuid = ''
}) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [activeType, setActiveType] = React.useState({});

  function toggleModal() {
    setOpenModal(prevState => !prevState);
  }

  function openCappingCreate(evt, item) {
    evt.preventDefault();
    setOpenModal(true);
    setActiveType(item);
  }

  return (
    <>
      <UncontrolledButtonDropdown direction="down">
        <DropdownToggle caret color="primary">
          Add capping
        </DropdownToggle>
        <DropdownMenu>
          {CappingTypeButtons?.map((item, idx) => {
            if (
              referenceType === 'campaign' &&
              item?.type === CappingTypes.SCHEDULE.value
            ) {
              return null;
            }
            if (item?.type === CappingTypes.BUDGET_MANAGER.value) {
              return null;
            }
            return (
              <DropdownItem
                key={`pr-${item.type}-${item.sub_type}`}
                disabled={disabledExistedType({
                  existedTypes,
                  currentType: item
                })}
                onClick={evt => openCappingCreate(evt, item)}
              >
                {item?.label}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </UncontrolledButtonDropdown>

      {[CappingTypes.BUDGET.value, CappingTypes.IMPRESSION.value].includes(
        activeType.type
      ) && (
        <BudgetCreateModal
          openForm={openModal}
          toggleModal={toggleModal}
          cappingType={activeType}
          referenceType={referenceType}
          referenceUuid={referenceUuid}
        />
      )}

      {activeType.type === CappingTypes.DOMAIN.value && (
        <DomainCreateModal
          openForm={openModal}
          toggleModal={toggleModal}
          cappingType={activeType}
          referenceType={referenceType}
          referenceUuid={referenceUuid}
        />
      )}

      {activeType.type === CappingTypes.KEYWORD.value && (
        <KeywordCreateModal
          openForm={openModal}
          toggleModal={toggleModal}
          cappingType={activeType}
          referenceType={referenceType}
          referenceUuid={referenceUuid}
        />
      )}
    </>
  );
};

AddTypeButton.propTypes = propTypes;

export default React.memo(AddTypeButton);

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

const disabledExistedType = ({existedTypes, currentType}) => {
  return existedTypes.find(existedType => {
    if (
      existedType.type === currentType.type &&
      existedType.sub_type === currentType.sub_type
    ) {
      return true;
    }

    return false;
  });
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
  console.log('🚀 ~ file: AddTypeButton.js ~ line 43 ~ activeType', activeType);

  function toggleModal() {
    setOpenModal(prevState => !prevState);
  }

  function openCappingCreate(evt, item) {
    evt.preventDefault();
    console.log('===== current type', item);
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
            if (item?.type === CappingTypes.SCHEDULE.value) {
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

      <BudgetCreateModal
        openForm={openModal}
        toggleModal={toggleModal}
        cappingType={activeType}
        referenceType={referenceType}
        referenceUuid={referenceUuid}
      />
    </>
  );
};

AddTypeButton.propTypes = propTypes;

export default React.memo(AddTypeButton);

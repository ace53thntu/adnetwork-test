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
import BudgetCreateModal from '../modal/BudgetCreateModal';
import DomainCreateModal from '../modal/DomainCreateModal';
import KeywordCreateModal from '../modal/KeywordCreateModal';
import {disabledExistedType} from '../dto';
import ScheduleCreateModal from '../modal/ScheduleCreateModal';

const propTypes = {
  existedTypes: PropTypes.array,
  referenceType: PropTypes.string,
  referenceUuid: PropTypes.string
};

/**
 * @Component Add Type Button Component
 * @param {*}
 * @returns
 */
const AddTypeButton = ({
  existedTypes = [],
  referenceType = 'campaign',
  referenceUuid = '',
  cappings = []
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
              (referenceType === 'campaign' &&
                item?.type === CappingTypes.SCHEDULE.value) ||
              item?.type === CappingTypes.BUDGET_MANAGER.value
            ) {
              return null;
            }

            if (
              referenceType === 'strategy' &&
              (item?.type === CappingTypes.DOMAIN.value ||
                item?.type === CappingTypes.KEYWORD.value)
            ) {
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

      {openModal &&
        [CappingTypes.BUDGET.value, CappingTypes.IMPRESSION.value].includes(
          activeType.type
        ) && (
          <BudgetCreateModal
            openForm={openModal}
            toggleModal={toggleModal}
            cappingType={activeType}
            referenceType={referenceType}
            referenceUuid={referenceUuid}
            existedTypes={existedTypes}
            cappings={cappings}
          />
        )}

      {openModal && activeType.type === CappingTypes.DOMAIN.value && (
        <DomainCreateModal
          openForm={openModal}
          toggleModal={toggleModal}
          cappingType={activeType}
          referenceType={referenceType}
          referenceUuid={referenceUuid}
        />
      )}

      {openModal && activeType.type === CappingTypes.KEYWORD.value && (
        <KeywordCreateModal
          openForm={openModal}
          toggleModal={toggleModal}
          cappingType={activeType}
          referenceType={referenceType}
          referenceUuid={referenceUuid}
        />
      )}

      {openModal && activeType.type === CappingTypes.SCHEDULE.value && (
        <ScheduleCreateModal
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

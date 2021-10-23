import {Collapse} from 'components/common';
// import PropTypes from 'prop-types';
import * as React from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {Button} from 'reactstrap';

import AlternativeForm from './AlternativeForm';
import {formAlternativeName} from './constants';

const alternativeDefaultValues = {
  name: '',
  description: '',
  priority: '0',
  sound: false,
  min_products: '10',
  max_products: '100',
  product_query_string: '',
  product_width: '0',
  product_height: '0',
  products: '', // JSON Encoded of list of product id. e.g: [1,2,3,4]
  extra_config: '',
  only_catalog_products: false,
  catalog_id: '0',
  file: null,
  rawId: null
};

function Alternatives(props) {
  const {control} = useFormContext();

  const {
    fields: alternativeFields,
    remove: removeAlternativeField,
    append: addAlternativeField
  } = useFieldArray({
    control,
    name: formAlternativeName
  });

  const handleAddAlternative = () => {
    addAlternativeField(alternativeDefaultValues);
  };

  return (
    <div>
      {alternativeFields?.map((item, index) => {
        const isOpen = item.name.length
          ? false
          : index === alternativeFields.length - 1;
        const title = item.name.length ? item.name : 'Alternative Information';

        return (
          <Collapse
            initialOpen={isOpen}
            key={item.id}
            title={title}
            unMount={false}
          >
            <AlternativeForm
              itemIndex={index}
              defaultValues={item}
              handleRemoveAlternative={removeAlternativeField}
            />
          </Collapse>
        );
      })}

      <div className="pb-5 ml-auto">
        <Button
          color="primary"
          type="button"
          className="mt-2"
          onClick={handleAddAlternative}
        >
          Add Alternative
        </Button>
      </div>
    </div>
  );
}

Alternatives.propTypes = {};
Alternatives.defaultProps = {};

export default Alternatives;

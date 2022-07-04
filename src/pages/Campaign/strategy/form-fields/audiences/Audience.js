//---> Build-in Modules
import React from 'react';

//---> External Modules
import {Button} from 'reactstrap';
import {useFormContext} from 'react-hook-form';
import PropTypes from 'prop-types';

//---> Internal Modules
import {Collapse} from 'components/common';
import AudienceEdit from './AudienceEdit';
import AudienceView from './AudienceView';

const propTypes = {
  defaultAudiences: PropTypes.array,
  audienceInStrategy: PropTypes.array
};

const Audience = ({defaultAudiences = [], audienceInStrategy = []}) => {
  const [isViewMode, setIsViewMode] = React.useState(true);
  const {
    formState: {isSubmitted}
  } = useFormContext();

  function handleAudienceMode(evt) {
    evt.preventDefault();
    setIsViewMode(prevState => !prevState);
  }

  React.useEffect(() => {
    setIsViewMode(true);
  }, [isSubmitted]);

  return (
    <Collapse initialOpen title="Audience" unMount={false}>
      <div>
        <div className="d-flex justify-content-end mb-2">
          <Button color="primary" onClick={handleAudienceMode} type="button">
            {isViewMode ? 'Edit audience' : 'View audience'}
          </Button>
        </div>
        {isViewMode ? (
          <AudienceView
            defaultAudiences={defaultAudiences}
            audienceInStrategy={audienceInStrategy}
          />
        ) : (
          <AudienceEdit defaultAudiences={defaultAudiences} />
        )}
      </div>
    </Collapse>
  );
};

Audience.propTypes = propTypes;

export default Audience;

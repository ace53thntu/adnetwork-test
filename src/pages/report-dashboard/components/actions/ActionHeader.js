import {faFilter, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';

import {Button} from 'reactstrap';

const ActionHeader = ({
  reports,
  pageId,
  showSelect,
  onSelectReport = () => null,
  modeSelectReport,
  handleShowSelect,
  isFollowed,
  onFollowPage
}) => {
  return (
    <div className="w-100 d-flex justify-content-end">
      {reports && reports.length > 0 && !pageId && (
        <>
          <Button
            type="button"
            className={showSelect ? '' : 'd-none'}
            color="primary"
            onClick={onSelectReport}
          >
            {!modeSelectReport ? 'Select' : 'Un-select'}
          </Button>
          <Button
            type="button"
            color="success"
            className="ml-2"
            onClick={handleShowSelect}
            outline
          >
            <FontAwesomeIcon icon={faFilter} />
          </Button>
        </>
      )}
      {pageId && (
        <Button
          color={isFollowed ? 'secondary' : 'primary'}
          outline
          onClick={onFollowPage}
        >
          <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
          {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
      )}
    </div>
  );
};

export default ActionHeader;

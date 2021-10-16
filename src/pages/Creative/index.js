import PropTypes from 'prop-types';
import * as React from 'react';
import {Navigate} from 'react-router-dom';
import {useCreativeSelector} from 'store/reducers/creative';

import CreativeBodyLayout from './components/CreativeLayout/CreativeBodyLayout';

function CreativePage(props) {
  const {isLoading, advertisers} = useCreativeSelector();

  return (
    <CreativeBodyLayout heading="Creative Management">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <RedirectToFirstAdvertiser advertisers={advertisers} />
      )}
    </CreativeBodyLayout>
  );
}

CreativePage.propTypes = {};
CreativePage.defaultProps = {};

export default CreativePage;

function RedirectToFirstAdvertiser(props) {
  const {advertisers} = props;

  if (advertisers?.length) {
    return <Navigate to={`${advertisers[0].id}`} />;
  }

  return <div>Not found Advertisers</div>;
}

RedirectToFirstAdvertiser.propTypes = {
  advertisers: PropTypes.arrayOf(PropTypes.any)
};

RedirectToFirstAdvertiser.defaultProps = {
  advertisers: []
};

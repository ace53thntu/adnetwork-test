import React from 'react';

import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';
import Tabs from 'react-responsive-tabs';
import {Card} from 'reactstrap';
import dummyData from './dummyData';

const generateDummyData = () =>
  dummyData.map(({name, biography}, index) => ({
    key: index,
    title: name,
    getContent: () => biography
  }));

const propTypes = {
  items: PropTypes.array,
  tab: PropTypes.func,
  getTab: PropTypes.func,
  isCreate: PropTypes.bool
};

const AnimatedLinesTabs = ({
  items = generateDummyData(),
  tab = () => 0,
  getTab = () => null,
  isCreate = false
}) => {
  const tabConfig = React.useMemo(
    () => ({
      activeTab: '1',
      showMore: true,
      transform: true,
      showInkBar: true,
      transformWidth: 400,
      items,
      selectedTabKey: tab(),
      onChange: i => getTab(i)
    }),
    [items, getTab, tab]
  );

  const cardTabsClassName = React.useMemo(
    () => (items.length === 2 ? 'card-tabs2' : 'card-tabs4'),
    [items]
  );

  return (
    <React.Fragment>
      <CSSTransition timeout={0} classNames="TabsAnimation">
        <div>
          <Card
            className={`mb-3 ${cardTabsClassName} card-tabs-animated`}
            style={{pointerEvents: isCreate ? 'none' : ''}}
          >
            <Tabs tabsWrapperClass="card-header" {...tabConfig} />
          </Card>
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};

AnimatedLinesTabs.propTypes = propTypes;

export default AnimatedLinesTabs;

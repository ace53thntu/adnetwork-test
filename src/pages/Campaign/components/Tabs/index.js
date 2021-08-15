import React, {
  Fragment,
  useMemo
  // useState
} from 'react';
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

const AnimatedLinesTabsExample = ({
  items = generateDummyData(),
  tab = () => 0,
  getTab = () => null
}) => {
  const tabConfig = useMemo(
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

  // const toggle = tab => {
  //   if (activeTab !== tab) {
  //     setActiveTab(tab);
  //   }
  // };

  const cardTabsClassName = useMemo(
    () => (items.length === 2 ? 'card-tabs2' : 'card-tabs4'),
    [items]
  );

  return (
    <Fragment>
      <CSSTransition timeout={0} classNames="TabsAnimation">
        <div>
          <Card className={`mb-3 ${cardTabsClassName} card-tabs-animated`}>
            <Tabs tabsWrapperClass="card-header" {...tabConfig} />
          </Card>
        </div>
      </CSSTransition>
    </Fragment>
  );
};

export default AnimatedLinesTabsExample;

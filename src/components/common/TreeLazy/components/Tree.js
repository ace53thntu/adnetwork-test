// open/close animation for ReactCSSTransitionGroup
import '../animations/index.css';

import React, {Component} from 'react';
import {CSSTransition} from 'react-transition-group';

// default components and theme
import {defaultTheme as DEFAULT_THEME} from '../theme';
// depth and indent width determine hierarchical indentation
import {DEFAULT_DEPTH, DEFAULT_INDENT_WIDTH} from '../util/constants';
import DEFAULT_BODY from './Body';
import DEFAULT_CHECKBOX from './Checkbox';
import DEFAULT_DEPTH_PADDING from './DepthPadding';
import DEFAULT_EXPANDER from './Expander';
import DEFAULT_LIST from './List';
import DEFAULT_LIST_ITEM from './ListItem';
import DEFAULT_LOADING from './Loading';
import DEFAULT_PAGINATOR from './Paginator';
import TreeNode from './TreeNode';

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginatorLoading: false
    };
  }

  // default loadChildren implementation to be overridden via props
  loadChildren = async (node, pageLimit, page) => node.children;

  handleLoadMoreInRoot = async e => {
    this.setState({
      paginatorLoading: true
    });
    await this.props.handleLoadMoreInRoot(e);
    this.setState({
      paginatorLoading: false
    });
  };

  render() {
    const {
      depth = DEFAULT_DEPTH,
      style,
      className,
      nodes,
      theme = DEFAULT_THEME,
      indentWidth = DEFAULT_INDENT_WIDTH,
      List = DEFAULT_LIST,
      ListItem = DEFAULT_LIST_ITEM,
      Expander = DEFAULT_EXPANDER,
      Checkbox = DEFAULT_CHECKBOX,
      Body = DEFAULT_BODY,
      Paginator = DEFAULT_PAGINATOR,
      Loading = DEFAULT_LOADING,
      DepthPadding = DEFAULT_DEPTH_PADDING,
      loadChildren = this.loadChildren,
      parse,
      pageLimit,
      toggleCallback,
      selectCallback,
      useLocalState,
      paginated,
      doubleClickSelect,
      // handleLoadMoreInRoot,
      isLast = true,
      isCreative = false
    } = this.props;

    const parsedNodes = parse ? parse(nodes) : nodes;

    return (
      <ul style={{...theme.treeStyle, ...style}} className={className}>
        {parsedNodes.map((node, index) => {
          return (
            <TreeNode
              key={node.id || index}
              depth={depth}
              node={node}
              theme={theme}
              indentWidth={indentWidth}
              List={List}
              ListItem={ListItem}
              Expander={Expander}
              Checkbox={Checkbox}
              Body={Body}
              Paginator={Paginator}
              Loading={Loading}
              DepthPadding={DepthPadding}
              loadChildren={loadChildren}
              parse={parse}
              pageLimit={pageLimit}
              toggleCallback={toggleCallback}
              selectCallback={selectCallback}
              useLocalState={useLocalState}
              paginated={paginated}
              doubleClickSelect={doubleClickSelect}
              isCreative={isCreative}
            />
          );
        })}
        {!isLast && (
          <List theme={theme}>
            {/* Animation for node expand / collapse */}
            <CSSTransition classNames="fade-in" timeout={200}>
              <>
                <div>
                  {this.state.paginatorLoading && <Loading theme={theme} />}
                  {!this.state.paginatorLoading && (
                    <Paginator
                      theme={theme}
                      indentWidth={indentWidth}
                      depth={depth}
                      onClick={e => this.handleLoadMoreInRoot(e)}
                    />
                  )}
                </div>
              </>
            </CSSTransition>
          </List>
        )}
      </ul>
    );
  }
}

export default Tree;

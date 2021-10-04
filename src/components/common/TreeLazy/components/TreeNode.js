import deepEquals from 'fast-deep-equal';
import React, {Component} from 'react';
import {CSSTransition} from 'react-transition-group';

import {hasChildren, isFullyFetched, shouldShowMore} from '../util';

class TreeNode extends Component {
  // Each TreeNode contains its own state, but props are the real
  // source of truth (unless usesLocalState === true) so we need
  // to ensure that important prop changes (selected, expanded, children)
  // are also reflected in the local state.

  static getDerivedStateFromProps({node, useLocalState}, state) {
    const {selected, expanded, children} = state;
    if (
      !useLocalState &&
      (selected !== node.selected ||
        expanded !== node.expanded ||
        !deepEquals(children, node.children))
    ) {
      return {
        selected: node.selected,
        expanded: node.expanded,
        children: node.children
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const {node} = props;
    const {expanded, selected, children, page} = node;
    this.state = {
      expanderLoading: false,
      paginatorLoading: false,
      expanded,
      selected,
      children,
      page
    };
  }

  // PERFORMANCE: only update the node when pertinent component
  // state changes. This synergizes with getDerivedStateFromProps
  shouldComponentUpdate(nextProps, nextState) {
    return !deepEquals(this.state, nextState);
  }

  // handler for paginating on a list of siblings. Determine if more siblings need to be
  // loaded and append them to the end of the list. This method is only called
  // if we are paginating
  loadMore = async (e, node) => {
    const {paginated, pageLimit, parse, loadChildren} = this.props;
    const state = {...this.state};
    if (
      !isFullyFetched(node, state.children.length) &&
      paginated &&
      pageLimit
    ) {
      state.page += 1;
      const loadedChildren = await loadChildren(node, pageLimit, state.page);
      state.children = state.children.concat(
        parse ? parse(loadedChildren) : loadedChildren
      );
    }
    this.setState(state);
  };

  onKeyLoadMore = async (e, node) => {
    if (e.key === 'Enter') {
      await this.loadMore(e, node);
    }
  };

  // handler for expanding / collapsing a node. Determine if children need to be
  // loaded and set expanded state.
  // fires toggleCallback() prop with event and node
  toggle = async (e, node) => {
    const {
      pageLimit,
      parse,
      loadChildren,
      toggleCallback,
      paginated
    } = this.props;
    const state = {...this.state};
    if (
      // nothing is loaded so we should load
      (state.children.length === 0 && hasChildren(node)) ||
      // we're not paginating and the children aren't fully loaded so let's load them
      // i.e. when you have nodes that have shared identities
      (!paginated && state.children.length < node.numChildren)
    ) {
      state.page += 1;
      const loadedChildren = await loadChildren(node, pageLimit, state.page);
      state.children = parse ? parse(loadedChildren) : loadedChildren;
    }
    state.expanded = !state.expanded;
    this.setState(state);
    if (toggleCallback) {
      toggleCallback(e, node, state);
    }
  };

  onKeyToggle = async (e, node) => {
    if (e.key === 'Enter') {
      await this.toggle(e, node);
    }
  };

  // handler for selecting a node.
  // fires selectCallback() prop with event and node
  select = (e, node) => {
    const {selectCallback} = this.props;
    const state = {...this.state};
    state.selected = !state.selected;
    this.setState(state);
    if (selectCallback) {
      selectCallback(e, node, state);
    }
  };

  onKeySelect = (e, node) => {
    if (e.key === 'Enter') {
      this.select(e, node);
    }
  };

  // node "toggle" handler to set expander loading states and prevent
  // multiple "toggle" actions from being triggered simultaneously.
  // currently relies on stopPropagation so that toggling doesn't trigger
  // parent level select handler but this may change in future versions
  handleToggle = async (e, node, callable, disabled) => {
    e.stopPropagation();
    if (!disabled) {
      const {expanded, children} = this.state;
      if (!expanded && children.length === 0) {
        this.setState({expanderLoading: true});
        await callable(e, node);
        this.setState({expanderLoading: false});
      } else {
        await callable(e, node);
      }
    }
  };

  // pagination "load more" handler to set paginator loading states and
  // prevent multiple "load more" actions from being triggered simultaneously.
  handleLoadMore = async (e, node, callable, disabled) => {
    if (!disabled) {
      this.setState({paginatorLoading: true});
      await callable(e, node);
      this.setState({paginatorLoading: false});
    }
  };

  // render children if they exist and the node is expanded
  // ensure that depth is incremented for hierarchical indentation
  renderChildren() {
    const {depth, node} = this.props;
    const {expanded, children} = this.state;
    let childComponents = [];
    if (expanded && hasChildren(node)) {
      childComponents = children.map((childNode, index) => (
        <TreeNode
          {...this.props}
          key={childNode.id || index}
          depth={depth + 1}
          node={childNode}
        />
      ));
    }
    return childComponents;
  }

  render() {
    const {
      depth,
      node,
      theme,
      indentWidth,
      List,
      ListItem,
      Expander,
      Checkbox,
      Body,
      Paginator,
      Loading,
      DepthPadding,
      paginated,
      doubleClickSelect
    } = this.props;

    const {expanderLoading, paginatorLoading, expanded, selected} = this.state;

    const children = this.renderChildren();
    //only supports single click OR double click
    let doubleClickFunction = doubleClickSelect
      ? e => this.select(e, node)
      : undefined;
    let clickFunction = doubleClickSelect
      ? undefined
      : e => this.select(e, node);
    return (
      <React.Fragment>
        {/* ListItem: Overridable container component */}
        <ListItem
          theme={theme}
          node={node}
          onClick={clickFunction}
          onDoubleClick={doubleClickFunction}
          onKeyPress={e => this.onKeySelect(e, node)}
          selected={selected}
        >
          {/* DepthPadding: Overridable Component for hierarchical indentation */}
          <DepthPadding indentWidth={indentWidth} depth={depth} />
          {/* Expander: Overridable Component for toggling expanded/collapsed state */}
          {hasChildren(node) ? (
            <Expander
              theme={theme}
              node={node}
              onClick={e =>
                this.handleToggle(e, node, this.toggle, expanderLoading)
              }
              onKeyPress={e =>
                this.handleToggle(e, node, this.onKeyToggle, expanderLoading)
              }
              expanded={expanded}
            />
          ) : (
            <span style={theme.expanderStyle} />
          )}
          {/* CheckBox: Overridable Component for visualizing selection state */}
          <Checkbox theme={theme} node={node} selected={selected} />
          {/* Body: Overridable node body  */}
          <Body theme={theme} node={node} />
        </ListItem>
        {/* List: Overridable container component for node children */}
        <List theme={theme}>
          {/* Animation for node expand / collapse */}
          <CSSTransition classNames="fade-in" timeout={200}>
            <>
              {/* Loading: Overridable loading bar for pagination */}
              {expanderLoading && <Loading theme={theme} node={node} />}
              {children.length > 0 && (
                <div>
                  {/* render children here */}
                  {children}
                  {/* Loading: Overridable loading bar for pagination */}
                  {paginatorLoading && (
                    <Loading
                      theme={theme}
                      node={node}
                      indentWidth={indentWidth}
                      depth={depth}
                    />
                  )}
                  {/* Paginator: Overridable "load more" pagination button */}
                  {!paginatorLoading &&
                    paginated &&
                    shouldShowMore(node, children.length) && (
                      <Paginator
                        theme={theme}
                        node={node}
                        indentWidth={indentWidth}
                        depth={depth}
                        onClick={e =>
                          this.handleLoadMore(
                            e,
                            node,
                            this.loadMore,
                            paginatorLoading
                          )
                        }
                        onKeyPress={e =>
                          this.handleLoadMore(
                            e,
                            node,
                            this.onKeyLoadMore,
                            paginatorLoading
                          )
                        }
                      />
                    )}
                </div>
              )}
            </>
          </CSSTransition>
        </List>
      </React.Fragment>
    );
  }
}

export default TreeNode;

import _defineProperty from "/Users/vince/Library/Mobile Documents/com~apple~CloudDocs/Sources/react-horizontal-timeline/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "/Users/vince/Library/Mobile Documents/com~apple~CloudDocs/Sources/react-horizontal-timeline/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useEffect, useState } from 'react';
import DefaultBasicElement from '../DefaultElement/DefaultBasicElement/DefaultBasicElement';
import DefaultDetailedElement from '../DefaultElement/DefaultDetailedElement/DefaultDetailedElement';
import ItemsGrid from '../ItemsGrid/ItemsGrid';
import classes from './GroupItemsGrid.module.css';

var GroupItemsGrid = function GroupItemsGrid(props) {
  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      groupedItems = _useState2[0],
      setGroupItems = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      elementHovered = _useState4[0],
      setElementHovered = _useState4[1];

  useEffect(function () {
    var groupedItemsTmp = {};
    props.items.forEach(function (item) {
      // Set a string ID to the group to avoid key sorting
      var groupId = "group_".concat(item.itemId);

      if (!groupedItemsTmp[groupId]) {
        groupedItemsTmp[groupId] = [];
      }

      groupedItemsTmp[groupId].push(item);
    });
    setGroupItems(groupedItemsTmp);
  }, [props.items, props.startDate]);
  var hoverStyle = {
    background: 'rgba(250, 250, 250, 1'
  };
  var grouped = Object.keys(groupedItems).map(function (items, index) {
    var borderStyle = index < Object.keys(groupedItems).length - 1 ? {
      borderBottom: '1px solid #f1f1f1'
    } : null;
    return React.createElement(React.Fragment, {
      key: "groups_items_".concat(items).concat(index)
    }, React.createElement("div", {
      className: classes.Groups,
      style: elementHovered === index ? _objectSpread({}, hoverStyle, {}, borderStyle) : borderStyle,
      onMouseOver: function onMouseOver() {
        return setElementHovered(index);
      },
      onMouseLeave: function onMouseLeave() {
        return setElementHovered(null);
      }
    }, React.createElement(DefaultDetailedElement, {
      item: groupedItems[items][0],
      className: classes.CustomItem,
      style: {
        background: 'transparent'
      }
    })), React.createElement("div", {
      className: classes.Items,
      style: elementHovered === index ? hoverStyle : null,
      onMouseOver: function onMouseOver() {
        return setElementHovered(index);
      },
      onMouseLeave: function onMouseLeave() {
        return setElementHovered(null);
      }
    }, React.createElement(ItemsGrid, Object.assign({}, props, {
      width: props.width - props.leftWidth
      /* Set the width of the itemGrid to fit inside the grid defined*/
      ,
      style: _objectSpread({}, props.style, {}, borderStyle, {
        marginTop: 0
      }),
      items: groupedItems[items],
      colorIndex: index,
      grouped: true
    }))));
  });
  return React.createElement("div", {
    className: classes.GroupViewGrid,
    style: {
      width: "".concat((props.width - props.leftWidth) * props.monthList.length + props.leftWidth, "px"),
      gridTemplateColumns: "".concat(props.leftWidth, "px ").concat((props.width - props.leftWidth) * props.monthList.length, "px")
    }
  }, React.createElement("div", {
    className: classes.SpacerLeft
  }), React.createElement("div", {
    className: classes.SpacerRight
  }), grouped);
};

GroupItemsGrid.defaultProps = {
  items: [],
  customElementType: DefaultBasicElement,
  leftWidth: 220
};
export default GroupItemsGrid;
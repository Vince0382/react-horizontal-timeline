import _defineProperty from "/Users/vince/Library/Mobile Documents/com~apple~CloudDocs/Sources/react-horizontal-timeline/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "/Users/vince/Library/Mobile Documents/com~apple~CloudDocs/Sources/react-horizontal-timeline/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import * as helpers from '../../Helpers/Functions';
import DropZone from '../DropZone/DropZone';
import classes from './DaysGrid.module.css';
import { MONTHS } from '../../Constants/Constants';
export var MARGIN = 20;

var DaysGrid = function DaysGrid(props) {
  var month = props.month,
      width = props.width,
      offset = props.offset,
      rest = _objectWithoutProperties(props, ["month", "width", "offset"]);

  var daysDropGrid = [];
  var days = helpers.getDaysInMonth(month.month, month.year);
  var effectiveWidth = width - offset;
  var style = {
    width: effectiveWidth / days
  };

  for (var i = 1; i <= days; i++) {
    if (i === days) style = _objectSpread({}, style, {
      border: 'none'
    });
    daysDropGrid.push(React.createElement(DropZone, Object.assign({}, rest, {
      style: style,
      key: "grid_".concat(month.month, "_").concat(i),
      dropDate: new Date(month.year, month.month - 1, i)
    })));
  }

  var borderSytle = {
    borderLeftStyle: !props.grouped && props.index === 0 ? 'none' : 'solid'
  };
  return React.createElement("div", {
    className: classes.DaysGrid,
    style: {
      width: effectiveWidth,
      left: offset
    }
  }, React.createElement("div", {
    className: classes.MonthWrapper,
    style: _objectSpread({}, props.style, {
      width: effectiveWidth
    }, borderSytle)
  }, React.createElement("div", {
    className: classes.Month
  }, "".concat(MONTHS[props.month.month], " ").concat(props.month.year))), React.createElement("div", {
    className: classes.DropZones,
    style: _objectSpread({}, props.style, {}, borderSytle, {
      width: effectiveWidth
    })
  }, daysDropGrid));
};

DaysGrid.defaultProps = {
  width: 0,
  grouped: false,
  index: 0,
  offset: 0
};
export default DaysGrid;
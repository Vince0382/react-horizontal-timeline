import _defineProperty from "/Users/vince/Library/Mobile Documents/com~apple~CloudDocs/Sources/react-horizontal-timeline/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "/Users/vince/Library/Mobile Documents/com~apple~CloudDocs/Sources/react-horizontal-timeline/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import { useDrag } from 'react-dnd';
import { ELEMENT } from '../../Constants/Constants';
import classes from './ResizeHandle.module.css';

var ResizeHandle = function ResizeHandle(props) {
  var _useDrag = useDrag({
    item: _objectSpread({
      type: ELEMENT
    }, props.item, {
      resizing: props.orientation,
      moving: false
    })
  }),
      _useDrag2 = _slicedToArray(_useDrag, 2),
      resize = _useDrag2[1];

  var innerStyle = props.orientation === 'left' ? {
    left: 0
  } : {
    right: 0
  };
  return React.createElement("div", {
    className: classes.ResizeHandle,
    style: _objectSpread({}, innerStyle, {
      backgroundColor: props.bgColor
    }),
    ref: resize
  });
};

ResizeHandle.defaultProps = {
  item: {}
};
export default ResizeHandle;
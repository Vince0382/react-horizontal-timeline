import _defineProperty from "/Users/vince/Library/Mobile Documents/com~apple~CloudDocs/Sources/react-horizontal-timeline/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import { rgbaFromArray } from '../../../Helpers/Functions';
import classes from './DefaultDetailedElement.module.css';
var alpha = 0.7;
var defaultColors = {
  outerElement: [204, 204, 204],
  innerElement: [70, 130, 180]
};

var DefaultDetailedElement = function DefaultDetailedElement(props) {
  return React.createElement("div", {
    className: [classes.DefaultDetailedElement, props.className].join(' '),
    style: _objectSpread({
      background: props.innerElement ? rgbaFromArray(props.bgColor, alpha) : rgbaFromArray(defaultColors.outerElement, alpha),
      boxShadow: props.shadowed ? '4px 4px 6px -6px rgba(0,0,0,0.75)' : 'none'
    }, props.style)
  }, React.createElement("div", {
    className: classes.ItemFlex
  }, React.createElement("div", {
    className: classes.ImagesWrapper
  }, React.createElement("img", {
    className: classes.Images,
    src: props.item.content.logo,
    alt: "Logo",
    draggable: "false",
    onMouseDown: function onMouseDown(event) {
      return event.preventDefault();
    }
  })), React.createElement("div", {
    className: classes.Content
  }, React.createElement("div", {
    className: classes.Line1
  }, props.item.content.line1), React.createElement("div", {
    className: classes.Line2
  }, props.item.content.line2))));
};

DefaultDetailedElement.defaultProps = {
  item: {
    id: null,
    content: {},
    description: '',
    startDate: '',
    endDate: '',
    type: 'range'
  },
  randomColor: false,
  innerElement: false,
  shadowed: false,
  bgColor: defaultColors.innerElement
};
export default DefaultDetailedElement;
import _defineProperty from "/Users/vince/Library/Mobile Documents/com~apple~CloudDocs/Sources/react-horizontal-timeline/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "/Users/vince/Library/Mobile Documents/com~apple~CloudDocs/Sources/react-horizontal-timeline/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ELEMENT } from '../../Constants/Constants';
import { rgbaFromArray } from '../../Helpers/Functions';
import DefaultDetailedElement from '../DefaultElement/DefaultDetailedElement/DefaultDetailedElement';
import DragPreview from '../DragPreview/DragPreview';
import ResizeHandle from '../ResizeHandle/ResizeHandle';
import classes from './ElementWrapper.module.css'; // Static style section 

var styles = {
  removeButtonLines: {
    shared: {
      position: 'absolute',
      right: '14px',
      top: '7.5px',
      height: '15px',
      width: '2px',
      backgroundColor: '#E76E54'
    },
    first: {
      transform: 'rotate(45deg)'
    },
    second: {
      transform: 'rotate(-45deg)'
    }
  }
}; // Main component

export var ElementWrapper = function ElementWrapper(props) {
  var _useDrag = useDrag({
    item: _objectSpread({
      type: ELEMENT
    }, props.item, {
      resizing: null,
      moving: props.innerElement
    }),
    collect: function collect(monitor) {
      return {
        isDragging: !!monitor.isDragging()
      };
    }
  }),
      _useDrag2 = _slicedToArray(_useDrag, 2),
      isDragging = _useDrag2[0].isDragging,
      drag = _useDrag2[1];

  var hoverStyle = {
    border: "2px solid ".concat(rgbaFromArray(props.bgColor)),
    borderStyle: 'solid none solid none'
  };

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      hoverStyleActive = _useState2[0],
      setHoverStyleActive = _useState2[1]; // if (isDragging && props.innerElement || isResizing) {
  //     return <div ref={drag} />
  // }


  return React.createElement(React.Fragment, null, React.createElement("div", {
    onClick: props.onClick,
    ref: drag,
    className: classes.ElementWrapper,
    style: {
      cursor: props.move ? 'move' : 'grab'
    }
  }, React.createElement(props.customElementType, props), props.showOccurences && props.occurences > 0 ? React.createElement("div", {
    className: classes.ElementOccurences
  }, props.occurences) : null, props.overlay ? React.createElement("div", {
    className: classes.Overlay,
    style: hoverStyleActive,
    onMouseOver: function onMouseOver() {
      return setHoverStyleActive(hoverStyle);
    },
    onMouseLeave: function onMouseLeave() {
      return setHoverStyleActive(null);
    }
  }, React.createElement("div", {
    className: classes.RemoveButton,
    onClick: props.remove
  }, React.createElement("div", {
    style: _objectSpread({}, styles.removeButtonLines.shared, {}, styles.removeButtonLines.first)
  }), React.createElement("div", {
    style: _objectSpread({}, styles.removeButtonLines.shared, {}, styles.removeButtonLines.second)
  })), React.createElement(ResizeHandle, {
    orientation: "left",
    item: props.item,
    bgColor: rgbaFromArray(props.bgColor)
  }), React.createElement(ResizeHandle, {
    orientation: "right",
    item: props.item,
    bgColor: rgbaFromArray(props.bgColor)
  })) : null), !props.innerElement ? React.createElement(DragPreview, null) : null);
};
ElementWrapper.defaultProps = {
  item: {
    id: null,
    logo: '',
    description: '',
    startDate: '',
    endDate: '',
    elementType: 'range'
  },
  overlay: false,
  move: false,
  customElementType: DefaultDetailedElement,
  occurences: 0,
  showOccurences: false
};
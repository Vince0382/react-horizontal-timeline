import _toConsumableArray from "/Users/vince/Library/Mobile Documents/com~apple~CloudDocs/Sources/react-horizontal-timeline/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "/Users/vince/Library/Mobile Documents/com~apple~CloudDocs/Sources/react-horizontal-timeline/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "/Users/vince/Library/Mobile Documents/com~apple~CloudDocs/Sources/react-horizontal-timeline/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState, useEffect, useRef } from 'react';
import * as helpers from '../Helpers/Functions';
import MonthSelector from '../Components/MonthSelector/MonthSelector';
import LayoutGrid from '../Components/LayoutGrid/LayoutGrid';
import classes from './Planner.module.css'; // Component

export var Planner = function Planner(props) {
  var baseIndex = 100000000;
  var PlannerRef = useRef();
  var borderSize = 1;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      items = _useState2[0],
      setItems = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      PlannerWidth = _useState4[0],
      setPlannerWidth = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      monthList = _useState6[0],
      setMonthList = _useState6[1];

  var _useState7 = useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      currentMonth = _useState8[0],
      setCurrentMonth = _useState8[1]; // Get the higher id and increase


  var getNextId = function getNextId() {
    return Math.max.apply(Math, items.map(function (item) {
      return item.id;
    })) + 1;
  }; // Loop inside props.items to assign an ID if missing


  useEffect(function () {
    var verifiedItems = [];
    props.items.forEach(function (item, index) {
      var tmpItem = _objectSpread({}, item, {
        startDate: item.startDate ? new Date(item.startDate) : null,
        endDate: item.endDate ? new Date(item.endDate) : null
      });

      if (item.id) {
        verifiedItems.push(tmpItem);
      } else {
        verifiedItems.push(_objectSpread({}, tmpItem, {
          id: baseIndex + index
        }));
      }
    });
    verifiedItems.sort(function (a, b) {
      a = a.startDate;
      b = b.startDate;
      return a < b ? -1 : a > b ? 1 : 0;
    });
    setItems(verifiedItems);
  }, [props.items]); // Update boxes size on window resized

  useEffect(function () {
    var tmpMonths = [];
    var startDate = new Date(props.options.startDate);
    var endDate = new Date(props.options.endDate);
    var nbreMonth = helpers.monthDiff(startDate, endDate);

    for (var i = 0; i < nbreMonth; i++) {
      tmpMonths.push({
        month: startDate.getMonth() + i + 1,
        year: startDate.getFullYear()
      });
    }

    setMonthList(tmpMonths);
    updateScreenSizeHandler();
    window.addEventListener('resize', updateScreenSizeHandler);
    return function () {
      return window.removeEventListener('resize', updateScreenSizeHandler);
    };
  }, [props.options.startDate, props.options.endDate]);

  var updateScreenSizeHandler = function updateScreenSizeHandler() {
    // Get the Planner element size 
    var PlannerElement = PlannerRef.current.getBoundingClientRect(); // Update the state with the width of the timneline width

    setPlannerWidth(PlannerElement.width - borderSize * 2);
  };

  var onDropHandler = function onDropHandler(item, propagate) {
    // Parsing data from dropped component
    //const item = JSON.parse(event.dataTransfer.getData("text"));
    var newItems = _toConsumableArray(items);

    var existingId = -1;

    var tmpItem = _objectSpread({}, item, {
      id: item.id ? item.id : getNextId() // Check if the item has an ID and if not assign one

    }); //Check if the item is updated or created


    if (item.id) {
      existingId = newItems.findIndex(function (i) {
        return i.id === item.id;
      });
    } // Add the new item to the item array only if it is not already present


    if (existingId === -1) {
      newItems.push(tmpItem);
      if (props.options.callBacks.onAdd && propagate) props.options.callBacks.onAdd({
        item: _objectSpread({}, tmpItem),
        items: _toConsumableArray(newItems)
      });
    } else //Update item
      {
        newItems[existingId] = tmpItem;
        if (props.options.callBacks.onUpdate && propagate) props.options.callBacks.onUpdate({
          item: _objectSpread({}, tmpItem),
          items: _toConsumableArray(newItems)
        });
      } // Update state with the updated items array


    setItems(newItems);
  };

  var onRemoveItemHandler = function onRemoveItemHandler(itemID) {
    var newItems = _toConsumableArray(items);

    var item = null;
    var found = newItems.findIndex(function (i) {
      return i.id === itemID;
    }); // Remove the item at the 'index' position if founded

    if (found !== -1) {
      item = newItems[found];
      newItems.splice(found, 1); // Update state with the new array items

      setItems(newItems);
    } else {
      console.log("ID : ".concat(itemID, " not found"));
    }

    if (props.options.callBacks.onRemove) props.options.callBacks.onRemove({
      item: _objectSpread({}, item),
      items: _toConsumableArray(newItems)
    });
  }; // Props list to pass to the Layout component


  var propagatedProps = {
    items: items,
    width: PlannerWidth,
    monthList: monthList,
    currentMonth: currentMonth,
    onRemove: onRemoveItemHandler,
    onDrop: onDropHandler,
    grouped: props.grouped,
    scroll: props.scroll,
    customInnerElementType: props.customInnerElementType,
    elementClassName: props.elementClassName,
    startDate: new Date(props.options.startDate)
  };
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: "".concat(props.className),
    style: _objectSpread({
      border: "".concat(borderSize, "px solid #ccc"),
      overflowX: props.scroll ? 'scroll' : 'hidden'
    }, props.style),
    ref: PlannerRef
  }, React.createElement(LayoutGrid, propagatedProps)), !props.scroll ? React.createElement(MonthSelector, {
    monthList: monthList,
    currentMonth: currentMonth,
    previousMonthHandler: function previousMonthHandler() {
      return setCurrentMonth(currentMonth - 1 <= 0 ? 0 : currentMonth - 1);
    },
    nextMonthHandler: function nextMonthHandler() {
      return setCurrentMonth(currentMonth + 1 >= monthList.length - 1 ? monthList.length - 1 : currentMonth + 1);
    }
  }) : null);
};
Planner.defaultProps = {
  items: [],
  options: {
    callBacks: {
      onAdd: null,
      onRemove: null,
      onUpdate: null
    },
    startDate: new Date().toISOString(),
    endDate: new Date().setMonth(new Date().getMonth() + 1)
  },
  scroll: false,
  grouped: false,
  className: classes.PlannerDefault
};
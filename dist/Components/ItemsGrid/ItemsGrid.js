import _defineProperty from "/Users/vince/Library/Mobile Documents/com~apple~CloudDocs/Sources/react-horizontal-timeline/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "/Users/vince/Library/Mobile Documents/com~apple~CloudDocs/Sources/react-horizontal-timeline/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState, useEffect } from 'react';
import { ElementWrapper } from '../ElementWrapper/ElementWrapper';
import DefaultBasicElement from '../DefaultElement/DefaultBasicElement/DefaultBasicElement';
import { dayDiff, getDaysInMonth } from '../../Helpers/Functions';
import { COLORS } from '../../Constants/Constants';
import classes from './ItemsGrid.module.css';

var ItemsGrid = function ItemsGrid(props) {
  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      gridItems = _useState2[0],
      setGridItems = _useState2[1]; // const days = () =>{
  //     let nbreDays = 0;
  //     props.monthList.forEach( month => nbreDays += getDaysInMonth( month.month, month.year ));
  //     return nbreDays;
  // }


  var getGridTemplateColumns = function getGridTemplateColumns() {
    var columnTemplate = [];
    props.monthList.forEach(function (month) {
      var days = getDaysInMonth(month.month, month.year);
      var width = props.width / days;

      for (var i = 0; i < days; i++) {
        columnTemplate.push("".concat(width, "px"));
      }
    });
    return columnTemplate;
  };

  var style = {
    width: props.width * props.monthList.length,
    gridTemplateColumns: getGridTemplateColumns().join(' ')
  };
  useEffect(function () {
    var gridColors = [];
    var newGridItems = props.items.map(function (item, index) {
      // Exctract month and year from the project start date
      var monthStart = props.startDate.getMonth();
      var yearStart = props.startDate.getFullYear(); // The gris start at day 1 for each month in the project
      // In order to place the item correctly inside the common grid (shared between all the months)
      // I have to calculate the exact position by calculate the number of days between the item start date
      // and the first day of the starting month of the project

      var position = Math.round(dayDiff(item.startDate, new Date(yearStart, monthStart, 1))) + 1; // Select color for the item. If itemId has already a color assigned pick it else create one

      var color = null; // If the colorIndex is provided use it

      if (props.colorIndex) {
        color = COLORS[props.colorIndex];
      } else // Else we define it by parsing the array        
        {
          var searchItemId = gridColors.find(function (i) {
            return i.itemId === item.itemId;
          });

          if (searchItemId) {
            color = searchItemId.color;
          } else {
            color = COLORS[gridColors.length];
            gridColors.push({
              itemId: item.itemId,
              color: color
            });
          }
        }

      console.log(props.grouped, 'test');
      return React.createElement("div", {
        style: {
          gridColumn: "".concat(position, " / ").concat(position + dayDiff(item.endDate, item.startDate) + 1)
        },
        key: "item_".concat(item.id, "_").concat(index)
      }, React.createElement(ElementWrapper, {
        item: item,
        overlay: true,
        move: true,
        bgColor: color,
        elementClassName: props.elementClassName,
        innerElement: true,
        customElementType: props.grouped ? DefaultBasicElement : props.customInnerElementType,
        style: {
          marginLeft: 0
        },
        onClick: function onClick() {
          return console.log(item);
        },
        remove: function remove() {
          return props.onRemove(item.id);
        }
      }));
    });
    setGridItems(newGridItems);
  }, [props.items, props.startDate]);
  return React.createElement("div", {
    className: classes.ItemsGrid,
    style: _objectSpread({}, style, {}, props.style)
  }, gridItems);
};

ItemsGrid.defaultProps = {
  items: [],
  monthList: [],
  grouped: false
};
export default ItemsGrid;
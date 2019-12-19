import React from 'react';
import DaysGrid from '../DaysGrid/DaysGrid';
import ItemsGrid from '../ItemsGrid/ItemsGrid';
import GroupItemsGrid from '../GroupItemsGrid/GroupItemsGrid';
var leftWidth = 220;

var LayoutGrid = function LayoutGrid(props) {
  var daysGridElements = function daysGridElements(width, offset) {
    return props.monthList.map(function (month, index) {
      return React.createElement(DaysGrid, {
        key: "daysGrid_".concat(month.month, "_").concat(month.year),
        onDrop: props.onDrop,
        month: month,
        index: index,
        scroll: props.scroll,
        grouped: props.grouped,
        offset: offset,
        width: width,
        style: {
          transform: "translateX(".concat(100 * index - 100 * props.currentMonth, "%)")
        }
      });
    });
  }; //Inline view without groups 


  var inLineStyle = React.createElement(React.Fragment, null, daysGridElements(props.width), React.createElement(ItemsGrid, Object.assign({}, props, {
    style: {
      transform: "translateX(-".concat(props.width * props.currentMonth, "px)")
    }
  }))); // Groups view

  var groupedStyle = React.createElement(React.Fragment, null, daysGridElements(props.width, leftWidth), React.createElement(GroupItemsGrid, Object.assign({}, props, {
    width: props.width,
    leftWidth: leftWidth,
    style: {
      transform: "translateX(-".concat((props.width - leftWidth) * props.currentMonth, "px)")
    }
  })));
  return React.createElement(React.Fragment, null, !props.grouped ? inLineStyle : groupedStyle);
};

LayoutGrid.defaultProps = {
  monthList: [],
  currentMonth: 0,
  scroll: false
};
export default LayoutGrid;
import _slicedToArray from "/Users/vince/Library/Mobile Documents/com~apple~CloudDocs/Sources/react-horizontal-timeline/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ELEMENT, DAYS } from '../../Constants/Constants';
import { timeDiff, day } from '../../Helpers/Functions';
import classes from './DropZone.module.css';

var DropZone = function DropZone(props) {
  var _useDrop = useDrop({
    accept: ELEMENT,
    drop: function drop(item) {
      var updatedItem = item;

      if (!item.resizing && !item.moving) {
        updatedItem = initItem(item);
      }

      props.onDrop(updatedItem, true);
    },
    hover: function hover(item, monitor) {
      if (!hovered && (item.resizing || item.moving)) {
        var updatedItem = item;

        if (item.resizing) {
          updatedItem = resizeItem(item);
        } else if (item.moving) {
          updatedItem = moveItem(item);
        }

        props.onDrop(updatedItem);
        setHovered(true);
      }
    },
    collect: function collect(monitor) {
      return {
        isOver: !!monitor.isOver()
      };
    }
  }),
      _useDrop2 = _slicedToArray(_useDrop, 2),
      isOver = _useDrop2[0].isOver,
      drop = _useDrop2[1];

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      hovered = _useState2[0],
      setHovered = _useState2[1];

  useEffect(function () {
    setHovered(false);
  }, [isOver]); // Resize the item on over

  var resizeItem = function resizeItem(item) {
    if (item.resizing === 'right') {
      item.endDate = props.dropDate;
      return item;
    }

    if (item.resizing === 'left') {
      item.startDate = props.dropDate;
      return item;
    }

    return null; // If the value of resizing is not left or right
  }; // Update the item on drop and propagate to host element


  var moveItem = function moveItem(item) {
    // Get the time difference between  previously set startDate and the new one
    var diff = item.startDate ? timeDiff(props.dropDate, item.startDate) : 0; // Set the updated date

    item.startDate = new Date(props.dropDate); // Set the new end date by adding the difference or 0

    item.endDate = new Date(item.endDate);
    item.endDate.setTime(item.endDate.getTime() + diff);
    return item;
  };

  var initItem = function initItem(item) {
    item.startDate = new Date(props.dropDate);
    item.endDate = new Date(props.dropDate); // Set the intial end Date with minimum of 1 day 

    item.endDate.setTime(item.endDate.getTime() + day);
    return item;
  }; // Get the day of the week


  var dayOfWeek = props.dropDate.getDay(); // Detect if the day is a day off (weekend)

  var isWeekEnd = dayOfWeek === 6 || dayOfWeek === 0;
  var overClass = isOver ? classes.DropZoneOver : null;
  var weekendClass = isWeekEnd && !props.includeWeekend ? classes.WeekendStyle : null;
  var dropActivated = !isWeekEnd || props.includeWeekend;
  return React.createElement("div", {
    ref: dropActivated ? drop : null,
    className: [classes.DropZone, overClass, weekendClass].join(' '),
    style: props.style
  }, React.createElement("div", {
    className: classes.Day,
    style: {
      color: isWeekEnd || isOver ? 'white' : '#7787a8'
    }
  }, React.createElement("div", null, DAYS[dayOfWeek].substr(0, 3)), React.createElement("div", null, props.dropDate.getDate())));
};

DropZone.defaultProps = {
  includeWeekend: false
};
export default DropZone;
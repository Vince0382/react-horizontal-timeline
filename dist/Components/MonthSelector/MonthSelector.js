import React from 'react';
import { MONTHS } from '../../Constants/Constants';
import classes from './MonthSelector.module.css';

var MonthSelector = function MonthSelector(props) {
  var currentMonthStr = props.monthList[props.currentMonth] ? MONTHS[props.monthList[props.currentMonth].month] : '';
  var currentYear = props.monthList[props.currentMonth] ? props.monthList[props.currentMonth].year : '';
  var previousMonthButton = React.createElement("p", {
    className: classes.Button,
    style: {
      color: props.currentMonth === 0 ? '#ccc' : 'black'
    },
    onClick: props.previousMonthHandler
  }, "<");
  var nextMonthbutton = React.createElement("p", {
    className: classes.Button,
    style: {
      color: props.currentMonth === props.monthList.length - 1 ? '#ccc' : 'black'
    },
    onClick: props.nextMonthHandler
  }, ">");
  return React.createElement("div", {
    className: classes.MonthSelector
  }, !props.scroll ? previousMonthButton : null, React.createElement("p", {
    style: {
      margin: 0
    }
  }, "".concat(currentMonthStr, " - ").concat(currentYear)), !props.scroll ? nextMonthbutton : null);
};

MonthSelector.defaultProps = {
  monthList: []
};
export default MonthSelector;
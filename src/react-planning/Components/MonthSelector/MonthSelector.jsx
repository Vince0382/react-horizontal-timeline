import React from 'react';
import PropTypes from 'prop-types';

import { MONTHS } from '../../Constants/Constants';
import classes from './MonthSelector.module.css';

const MonthSelector = props => {

    const currentMonthStr = props.monthList[props.currentMonth] ? MONTHS[props.monthList[props.currentMonth].month] : '';
    const currentYear = props.monthList[props.currentMonth] ? props.monthList[props.currentMonth].year : '';

    const previousMonthButton = (
        <p 
            className={classes.Button}
            style={{color: props.currentMonth === 0 ? '#ccc' : 'black'}} 
            onClick={props.previousMonthHandler}
        >
            &#60;
        </p>
    )

    const nextMonthbutton = (
        <p 
            className={classes.Button}
            style={{color: props.currentMonth === props.monthList.length -1 ? '#ccc' : 'black'}} 
            onClick={props.nextMonthHandler}
        >
            &#62;
        </p>
    )

    return (
        <div className={classes.MonthSelector}>
            {
                !props.scroll
                    ?   previousMonthButton
                    :   null   
            }

            <p>{`${currentMonthStr} - ${currentYear}`}</p>
            
            {
                !props.scroll
                    ?   nextMonthbutton
                    :   null
            }

        </div>
    );
}

MonthSelector.defaultProps = {
    monthList : []
}

MonthSelector.propTypes = {
    monthList : PropTypes.array.isRequired,
    currentMonth : PropTypes.number.isRequired,
    previousMonthHandler : PropTypes.func.isRequired,
    nextMonthHandler : PropTypes.func.isRequired,
    scroll: PropTypes.bool,
}

export default MonthSelector;
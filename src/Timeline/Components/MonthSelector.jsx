import React from 'react';
import PropTypes from 'prop-types';

import { MONTHS } from '../Constants';

// Static styles section 

const styles = {
    main : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button : {
        padding: '5px',
        margin: '0 10px',
        cursor: 'pointer'
    }
}


const MonthSelector = props => {

    const currentMonthStr = props.monthList[props.currentMonth] ? MONTHS[props.monthList[props.currentMonth].month] : '';
    const currentYear = props.monthList[props.currentMonth] ? props.monthList[props.currentMonth].year : '';

    return (
        <div style={styles.main}>
            <p style={{
                ...styles.button, 
                color: props.currentMonth === 0 ? '#ccc' : 'black'
                }} 
                onClick={props.previousMonthHandler}
            >
                &#60;
            </p>

            <p>{`${currentMonthStr} - ${currentYear}`}</p>
            
            <p style={{
                ...styles.button,
                color: props.currentMonth === props.monthList.length -1 ? '#ccc' : 'black'
                }} 
                onClick={props.nextMonthHandler}
            >
                &#62;
            </p>
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
    nextMonthHandler : PropTypes.func.isRequired
}

export default MonthSelector;
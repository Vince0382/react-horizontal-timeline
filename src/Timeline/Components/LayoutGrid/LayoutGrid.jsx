import React from 'react';
import PropTypes from 'prop-types';

import DaysGrid from '../DaysGrid/DaysGrid';
import ItemsGrid from '../ItemsGrid/ItemsGrid';
import GroupItemsGrid from '../GroupItemsGrid/GroupItemsGrid';
import classes from './LayoutGrid.module.css';

const leftWidth = 220;

const LayoutGrid = props => {

    const daysGridElements = ( width, offset ) => (
        props.monthList.map(( month, index ) => (
            <DaysGrid 
                key={`daysGrid_${month.month}_${month.year}`}
                onDrop={props.onDrop}
                month={month}
                scroll={props.scroll}
                grouped={props.grouped}
                prevMonth ={props.prevMonth}
                nextMonth={props.nextMonth}
                monthList={props.monthList}
                currentMonth={props.currentMonth}
                width={offset ? width - offset : width}
                style={{transform: `translateX(${( 100 * index ) - ( 100 * props.currentMonth )}%)`, marginLeft: offset ? offset : 0}}
            >
            </DaysGrid>
        ))
    );

    const inLineStyle = (
        <>
            {daysGridElements( props.width )}
            <ItemsGrid {...props} style={{transform: `translateX(-${( props.width * props.currentMonth )}px)`}}/>
        </>
    )

    const groupedStyle = (
        <>
            <div style={{width: leftWidth, background: 'white', height: '33px'}} />
            {daysGridElements( props.width, leftWidth )}
            <div 
                className={classes.GroupsArea}
                style={{width: (props.width - leftWidth) * props.monthList.length + leftWidth}}
            >
                <GroupItemsGrid 
                    {...props} 
                    width={props.width - leftWidth}
                    leftWidth={leftWidth}
                    style={{transform: `translateX(-${(( props.width - leftWidth ) * props.currentMonth )}px)`}}
                />
            </div>
        </>
    )

    return (
        <>
        {
            !props.grouped
                ?   inLineStyle
                :   groupedStyle
        }
        </>
    )

}

LayoutGrid.defaultProps = {
    monthList: [],
    currentMonth: 0,
    scroll: false
}

LayoutGrid.propTypes = {
    grouped: PropTypes.bool,
    monthList: PropTypes.array,
    currentMonth: PropTypes.number,
    onDrop: PropTypes.func,
    width: PropTypes.number,
    scroll: PropTypes.bool
}

export default LayoutGrid;
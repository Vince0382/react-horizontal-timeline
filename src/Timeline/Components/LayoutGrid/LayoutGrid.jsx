import React from 'react';
import PropTypes from 'prop-types';

import DaysGrid from '../DaysGrid/DaysGrid';
import ItemsGrid from '../ItemsGrid/ItemsGrid';
import GroupItemsGrid from '../GroupItemsGrid/GroupItemsGrid';

const leftWidth = 220;

const LayoutGrid = props => {

    const daysGridElements = ( width, offset ) => (
        props.monthList.map(( month, index ) => (
            <DaysGrid 
                key={`daysGrid_${month.month}_${month.year}`}
                onDrop={props.onDrop}
                month={month}
                index={index}
                scroll={props.scroll}
                grouped={props.grouped}
                offset={offset}
                width={width}
                style={{transform: `translateX(${( 100 * index ) - ( 100 * props.currentMonth )}%)`}}
            >
            </DaysGrid>
        ))
    );


    //Inline view without groups 
    const inLineStyle = (
        <>
            {daysGridElements( props.width )}
            <ItemsGrid {...props} style={{transform: `translateX(-${( props.width * props.currentMonth )}px)`}}/>
        </>
    )

    // Groups view
    const groupedStyle = (
        <>
            {daysGridElements( props.width, leftWidth )}
            <GroupItemsGrid
                {...props} 
                width={props.width}
                leftWidth={leftWidth}
                style={{transform: `translateX(-${(( props.width - leftWidth ) * props.currentMonth )}px)`}}
            />
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
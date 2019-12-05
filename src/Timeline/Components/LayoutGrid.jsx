import React from 'react';
import PropTypes from 'prop-types';

import DaysGrid from './DaysGrid';
import ItemsGrid from './ItemsGrid';
import GroupItemsGrid from './GroupItemsGrid';

const leftWidth = 220;

const LayoutGrid = props => {

    const daysGridElements = ( width, offset ) => (
        props.monthList.map(( month, index ) => (
            <DaysGrid 
                key={`daysGrid_${month.month}_${month.year}`}
                onDrop={props.onDrop}
                month={month}
                scroll={props.scroll}
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
            {daysGridElements( props.width, leftWidth )}
            <div style={{width: (props.width - leftWidth) * props.monthList.length + leftWidth}}>
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
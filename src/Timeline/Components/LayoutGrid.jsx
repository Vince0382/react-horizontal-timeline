import React from 'react';
import PropTypes from 'prop-types';

import DaysGrid from './DaysGrid';
import ItemsGrid from './ItemsGrid';
import GroupItemsGrid from './GroupItemsGrid';

const leftWidth = 220;

// Static styles section

const styles = {
    grouped : {
        display: 'grid',
        gridTemplateColumns: `${leftWidth}px auto`,
    },
    daysGridWrapper : {
        marginLeft: leftWidth
    }
}

const LayoutGrid = props => {

    const daysGridElements = ( width, offset ) => (
        props.monthList.map(( month, index ) => (
            <DaysGrid 
                key={`daysGrid_${month.month}_${month.year}`}
                onDrop={props.onDrop}
                month={month} 
                width={offset ? width - offset : width}
                style={{left: `${( 100 * index ) - ( 100 * props.currentMonth )}%`, marginLeft: offset ? offset : 0}}
            >
            </DaysGrid>
        ))
    );

    const inLineStyle = (
        <>
            {daysGridElements( props.width )}
            <ItemsGrid {...props}/>
        </>
    )

    const groupedStyle = (
        <>
            {daysGridElements( props.width, leftWidth )}
            <div style={styles.grouped}>
                <GroupItemsGrid {...props} width={props.width - leftWidth} />
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
    currentMonth: 0
}

LayoutGrid.propTypes = {
    grouped: PropTypes.bool,
    monthList: PropTypes.array,
    currentMonth: PropTypes.number,
    onDrop: PropTypes.func,
    width: PropTypes.number,
}

export default LayoutGrid;
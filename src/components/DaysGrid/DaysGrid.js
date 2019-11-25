import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import * as helpers from '../Helpers/Functions';
import classes from './DaysGrid.module.css';
import DropZone from '../DropZone/DropZone';

export const MARGIN = 20;

const DaysGrid = props => {

    const { month, items, width, ...rest} = props;
    const daysDropGrid = [];
    const [daysGridItems, setDaysGridItems] = useState({});
    const days = helpers.getDaysInMonth( month.month, month.year);

    useEffect(() => {
        let newDaysGridItems = {}
        items.forEach(item => {
            if ( !newDaysGridItems[item.startDate.getDate()] )
            {
                newDaysGridItems = {
                    ...newDaysGridItems,
                    [item.startDate.getDate()] : []
                }
            }
                
            newDaysGridItems[item.startDate.getDate()].push(item);
        });
        setDaysGridItems( newDaysGridItems );
        console.log(newDaysGridItems)
    }, [items])


    for( let i = 1; i <= days; i++ )
    {
        let style = {
            height: '100%',
            width: width / days + 1,
            borderRight : '1px dashed #ccc',
            position: 'relative',
        };

        if ( i === days ) style = {...style, border: 'none'};

        daysDropGrid.push(
            <DropZone 
                {...rest}
                style={style} 
                key={`grid_${month.month}_${i}`} 
                day={i}
                width={width / days + 1}
                startDate={new Date(month.year, month.month - 1, i)}
                daysGridItems={daysGridItems[i]}
            />
        )
    }
    
    return (
        <div className={classes.DaysGrid} style={props.style}>
            {daysDropGrid}
        </div>
    )
}

DaysGrid.defaultProps = {
    items: [],
    width: 0
};

DaysGrid.propTypes = {
    items: PropTypes.array,
    width: PropTypes.number,
    onDrop: PropTypes.func,
    onRemove: PropTypes.func,
    itemClass: PropTypes.string,
    customElementType: PropTypes.elementType
}

export default DaysGrid;
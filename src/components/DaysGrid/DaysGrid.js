import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import * as helpers from '../Helpers/Functions';
import classes from './DaysGrid.module.css';
import DropZone from '../DropZone/DropZone';
import ElementWrapper from '../ElementWrapper/ElementWrapper';

import { dayDiff } from '../Helpers/Functions';

export const MARGIN = 20;

const DaysGrid = props => {

    const { month, items, width, ...rest} = props;
    const daysDropGrid = [];
    const daysGridElement = [];
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
            width: width / days + 1
        };
        if ( i === days ) style = {...style, border: 'none'};

        daysDropGrid.push(
            <DropZone 
                {...rest}
                style={style}
                key={`grid_${month.month}_${i}`} 
                day={i}
                startDate={new Date(month.year, month.month - 1, i)}
                daysGridItems={daysGridItems[i]}
            />
        )

        if ( daysGridItems[i] )
        {
            daysGridElement.push(
                daysGridItems[i].map(( item, index) => 
                    <div style={{gridColumn: `${i} / ${i + dayDiff( item.endDate, item.startDate ) + 1}`}} key={`item_${item.id}_${index}`}>
                        <ElementWrapper
                            item={item} 
                            overlay
                            onClick={() => console.log(item)}
                            remove={() => props.onRemove( item.id )}
                        >
                            <props.customElementType className={props.itemClass} style={{marginLeft: 0}} item={item} />
                        </ElementWrapper>
                    </div>
            ))
        }
        
    }
    
    return (
        <div className={classes.DaysGrid} style={{...props.style}}>
            {daysDropGrid}
            <div style={{display: 'grid', gridTemplateColumns: `repeat(${days}, 1fr)`, position: 'absolute'}}>
                {daysGridElement}
            </div>
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
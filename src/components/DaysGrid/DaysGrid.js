import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import * as helpers from '../Helpers/Functions';
import classes from './DaysGrid.module.css';
import DropZone from '../DropZone/DropZone';
import ElementWrapper from '../ElementWrapper/ElementWrapper';

export const MARGIN = 20;

const DaysGrid = props => {

    const daysDropGrid = [];
    const [daysGridItems, setDaysGridItems] = useState({});
    const days = helpers.getDaysInMonth( props.month.month, props.month.year);

    useEffect(() => {
        let newDaysGridItems = {}
        props.items.forEach(item => {
            newDaysGridItems = {
                ...newDaysGridItems,
                [item.startDate.getDate()]: {
                    ...newDaysGridItems[item.startDate.getDate()],
                    item
                }
            };
        });
        setDaysGridItems( newDaysGridItems );
        console.log(newDaysGridItems)
    }, [props.items])


    for( let i = 1; i <= days; i++ )
    {
        let style = {
            height: '100%',
            width: props.width / days + 1,
            borderRight : '1px dashed #ccc'
        };

        if ( i === days ) style = {...style, border: 'none'};

        daysDropGrid.push(
            <DropZone style={style} onDrop={props.onDrop} key={`grid_${props.month.month}_${i}`} day={i} startDate={new Date(props.month.year, props.month.month - 1, i)}>
                {
                    daysGridItems[i]
                        ?   Object.keys(daysGridItems[i]).map(( dayItem, index ) => {
                                const item = daysGridItems[i][dayItem];
                                return (
                                    <ElementWrapper key={`item_${item.id}_${index}`} item={item} closeButton remove={() => props.onRemove( item.id )}>
                                        <props.customElementType className={props.itemClass} style={{marginLeft: 0}} item={item} />
                                    </ElementWrapper>
                                )
                            })
                        :   null
                }
            </DropZone>
        )
    }
    
    return (
        <div className={classes.DaysGrid} style={props.style}>
            {daysDropGrid}
        </div>
    )
}

DaysGrid.defaultProps = {
    days: 0,
    width: 0
};

DaysGrid.propTypes = {
    days: PropTypes.number,
    width: PropTypes.number,
    onDrop: PropTypes.func,
    onRemove: PropTypes.func
}

export default DaysGrid;
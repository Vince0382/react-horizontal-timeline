import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ElementWrapper from '../ElementWrapper/ElementWrapper';
import { dayDiff, getDaysInMonth } from '../../Helpers/Functions';
import { COLORS } from '../../Constants';

const ItemsGrid = props => {

    const [gridItems, setGridItems] = useState();

    // const days = () =>{
    //     let nbreDays = 0;
    //     props.monthList.forEach( month => nbreDays += getDaysInMonth( month.month, month.year ));
    //     return nbreDays;
    // }
    
    const getGridTemplateColumns = () => {
        const columnTemplate = [];
        props.monthList.forEach( month => {
            const days = getDaysInMonth( month.month, month.year );
            const width = props.width / days;

            for ( let i = 0; i < days ; i++ )
            {
                columnTemplate.push(`${width}px`);
            }
        });

        return columnTemplate
    }

    const style = {
        width: props.width * props.monthList.length,
        gridTemplateColumns: getGridTemplateColumns().join(' '),
        display: 'grid',
        position: 'relative',
        top: 0,
        left: 0,
        transition: 'all 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940)',
        marginTop: '70px',
        userSelect: 'none',
    }


    useEffect(() => {
        const gridColors = [];

        const newGridItems = props.items.map(( item, index) => {
            // Exctract month and year from the project start date
            const monthStart = props.startDate.getMonth();
            const yearStart = props.startDate.getFullYear();
    
            // The gris start at day 1 for each month in the project
            // In order to place the item correctly inside the common grid (shared between all the months)
            // I have to calculate the exact position by calculate the number of days between the item start date
            // and the first day of the starting month of the project
    
            const position = Math.round(dayDiff( item.startDate, new Date( yearStart, monthStart, 1 ))) + 1;

            // Select color for the item. If itemId has already a color assigned pick it else create one
            
            let color = null;

            // If the colorIndex is provided use it
            if ( props.colorIndex )
            {
                color = COLORS[props.colorIndex]
            }
            else    // Else we define it by parsing the array        
            {
                let searchItemId = gridColors.find(i => i.itemId === item.itemId);

                if ( searchItemId )
                {
                    color = searchItemId.color
                }
                else
                {
                    color = COLORS[gridColors.length]

                    gridColors.push({
                        itemId: item.itemId,
                        color: color
                    });
                }
            }
    
            return (
                <div 
                    style={{
                        gridColumn: `${position} / ${position + dayDiff( item.endDate, item.startDate ) + 1}`
                    }} 
                    key={`item_${item.id}_${index}`}
                >
                    <ElementWrapper
                        item={item} 
                        overlay
                        move
                        bgColor={color}
                        elementClassName={props.elementClassName} 
                        innerElement
                        customElementType={props.customElementType}
                        style={{marginLeft: 0}}
                        onClick={() => console.log(item)}
                        remove={() => props.onRemove( item.id )}
                    />
                </div>
            )
        });

        setGridItems( newGridItems );
    }, [props.items, props.startDate]);

    return (
        <div style={{...style, ...props.style}}>
            {gridItems}
        </div>
    );
}

ItemsGrid.defaultProps = {
    items: [],
    monthList: [],
}

ItemsGrid.propTypes = {
    items: PropTypes.array,
    width: PropTypes.number,
    onRemove: PropTypes.func,
    elementClassName: PropTypes.string,
    customElementType: PropTypes.elementType,
    style: PropTypes.object,
    monthList: PropTypes.array,
    startDate: PropTypes.objectOf(Date),
    colorIndex: PropTypes.number
}

export default ItemsGrid;
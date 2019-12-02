import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ElementWrapper from '../ElementWrapper/ElementWrapper';
import { dayDiff, getDaysInMonth } from '../Helpers/Functions';

const ItemsGrid = props => {

    const [gridItems, setGridItems] = useState();

    const days = () =>{
        let nbreDays = 0;
        props.monthList.forEach( month => nbreDays += getDaysInMonth( month.month, month.year ));
        return nbreDays;
    }
    
    const style = {
        width: props.width * props.monthList.length,
        display: 'grid', 
        gridTemplateColumns: `repeat(${days() + 1}, 1fr)`, 
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        marginBottom: '20px'
    }

    useEffect(() => {
        const newGridItems = props.items.map(( item, index) => {
            // Exctract month and year from the project start date
            const monthStart = props.startDate.getMonth();
            const yearStart = props.startDate.getFullYear();
    
            // The gris start at day 1 for each month in the project
            // In order to place the item correctly inside the common grid (shared between all the months)
            // I have to calculate the exact position by calculate the number of days between the item start date
            // and the first day of the starting month of the project
    
            const position = Math.round(dayDiff( item.startDate, new Date( yearStart, monthStart, 1 ))) + 1;
    
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
    }, [props.items]);

    return (
        <div style={{...props.style, ...style}}>
            {gridItems}
        </div>
    );
}

ItemsGrid.defaultProps = {
    items: [],
    monthList: []
}

ItemsGrid.propTypes = {
    items: PropTypes.array,
    width: PropTypes.number,
    onRemove: PropTypes.func,
    elementClassName: PropTypes.string,
    customElementType: PropTypes.elementType,
    style: PropTypes.object,
    monthList: PropTypes.array,
    startDate: PropTypes.objectOf(Date)
}

export default ItemsGrid;
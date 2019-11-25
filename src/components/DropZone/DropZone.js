import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

import ElementWrapper from '../ElementWrapper/ElementWrapper';
import { ELEMENT } from '../Constants';

const DropZone = props => {

    const day = 1000 * 60 * 60 * 24 * 1;

    const [{ isOver }, drop] = useDrop({
		accept: ELEMENT,
		drop: ( item ) => {
            // Get the time difference between  previously set startDate and the new one
            const diff = item.startDate ? Math.abs( props.startDate.getTime() - new Date(item.startDate).getTime()) : 0;
            
            // Set the updated date
            item.startDate = props.startDate;

            // Set the new end date by adding the difference
            item.endDate = item.endDate ? item.endDate : new Date( props.startDate );
            item.endDate.setTime( item.endDate ? item.endDate.getTime() + diff : props.startDate.getTime() + day );

            props.onDrop( item )
        },
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
    });

    const overStyle = isOver ? {background: 'rgba(176,196,222,1)'} : null

    return (
        <div ref={drop} style={{...props.style, ...overStyle}} >
            <p style={{
                color: '#ccc',
                width: '100%',
                textAlign: 'center',
                position: 'absolute',
                bottom: '0px',
            }}>{props.day}</p>
            {
                props.daysGridItems.map(( item, index ) => {
                    //const item = props.daysGridItems[dayItem];
                    //console.log(item)
                    return (
                        <ElementWrapper 
                            key={`item_${item.id}_${index}`}
                            width={props.width}
                            item={item} 
                            closeButton 
                            remove={() => props.onRemove( item.id )}
                        >
                            <props.customElementType className={props.itemClass} style={{marginLeft: 0}} item={item} />
                        </ElementWrapper>
                    )
                })
            }
            </div>
    )
}

DropZone.defaultProps = {
    daysGridItems: []
};

DropZone.propTypes = {
    style: PropTypes.object,
    onDrop: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    daysGridItems: PropTypes.array,
    itemClass: PropTypes.string,
    customElementType: PropTypes.elementType,
    width: PropTypes.number
}

export default DropZone;
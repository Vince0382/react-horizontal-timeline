import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Element from '../Element/Element';

import classes from './Timeline.module.css';

// Wrapping div for the element to add the remove button

const OuterWrapper = props => (
    <div className={classes.OuterWrapper}>
        <div className={classes.RemoveButton} onClick={props.remove}>X</div>
        {props.children}
    </div>
)

const Timeline = props => {

    const [dragClass, setDragClass] = useState( null );
    const [items, setItems] = useState( props.items );

    const onDropHandler = ( event ) => {
        event.preventDefault();

        // Parsing data from dropped component
        const item = JSON.parse(event.dataTransfer.getData("text"));
        const newItems = items;

        // Check if the item has a provided ID and if not add one
        if ( !item.id )
        {
            item.id = newItems.length
        }

        // Add the new item to the item array
        newItems.push(item);

        // Update state with the new array items
        setItems( newItems );

        // Reset the class to remove the specific cursor
        setDragClass( '' )
    }

    const removeItemHandler = itemIndex => {
        
        const newArray = items;

        // Remove the item at the 'index' position
        newArray.splice( itemIndex, 1 );

        // Update state with the new array items
        setItems( newArray );
    }

    return (
        <div
            className={`${props.className} ${dragClass}`}
            onDragOver={( event ) => {event.preventDefault()}}
            onDragEnter={() => setDragClass( props.onDragClass )}
            onDragLeave={() => setDragClass( '' )} 
            onDrop={onDropHandler}
            >

            {
                items.map(( item, index ) => {
                    console.log( "rendering", items);
                    return (
                    <OuterWrapper key={`item_${item.id}_${index}`} remove={() => removeItemHandler( index )}>
                        <props.customElementType className={props.itemClass} item={item} />
                    </OuterWrapper>)
                })
            }

        </div>
    )
}


Timeline.defaultProps = {
  className: classes.TimelineDefaultClass,
  onDragClass: classes.DragDefaultClass,
  items: [],
  customElementType: Element
};

Timeline.propTypes = {
  className: PropTypes.string,
  onDragClass: PropTypes.string,
  itemClass: PropTypes.string,
  items: PropTypes.array,
  customElementType: PropTypes.elementType
}



export default Timeline;
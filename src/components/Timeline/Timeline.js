import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd'

import Element from '../Element/Element';
import ElementWrapper from '../ElementWrapper/ElementWrapper';

import classes from './Timeline.module.css';

import { ELEMENT } from '../Constants';

// Wrapping div for the element to add the remove button


const Timeline = props => {

    const baseIndex = 100000000;

    const [items, setItems] = useState( [] );

	const [{ isOver }, drop] = useDrop({
		accept: ELEMENT,
		drop: ( item ) => onDropHandler( item, props.callBack ),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
	})


    // Get the higher id and increase
    const getNextId = () => {
        return Math.max.apply(Math, items.map(item => { return item.id; })) + 1
    }

    // Loop inside props.items to assign an ID if missing

    useEffect (() => {
        const verifiedItems = [];

        props.items.forEach(( item, index ) => {
            if ( item.id ){
                verifiedItems.push(item);
            }
            else{
                verifiedItems.push({
                    ...item,
                    id: baseIndex + index
                })
            }
        });

        setItems( verifiedItems );

    }, [props.items])

    // const onDragEnterHandler = event => {
    //     event.preventDefault();

    //     counter++;
    //     setDragClass( props.onDragClass )
    // }

    // const onDragLeaveHandler = event => {
    //     event.preventDefault();

    //     counter--;
    //     if (counter === 0) { 
    //         setDragClass( '' );
    //     }
    // }

    const onDropHandler = ( item ) => {

        // Parsing data from dropped component
        // const item = JSON.parse(event.dataTransfer.getData("text"));
        const newItems = items;
        let duplicateId = false;

        // Check if the item has an ID and if not add one
        if ( !item.id )
        {
            item.id = getNextId();
        }
        else
        {
            //Check if the item is already present in the list to avoid duplicate entry
            duplicateId = newItems.find( i => i.id === item.id );
        }

        // Add the new item to the item array only if it is not already present
        if( !duplicateId )
        {
            newItems.push( item );
        }

        // Update state with the new array items
        setItems( newItems );

        if ( props.callBacks.onAdd ) props.callBacks.onAdd( item );

    }

    const removeItemHandler = itemIndex => { 
        const item = items[itemIndex];
        const newArray = [...items];

        // Remove the item at the 'index' position
        newArray.splice( itemIndex, 1 );

        // Update state with the new array items
        setItems( newArray );

        if ( props.callBacks.onRemove ) props.callBacks.onRemove( item );
    }

    return (
        
        <div
            className={`${props.className}`}
            ref={drop}
            // onDragOver={( event ) => {event.preventDefault()}}
            // onDragEnter={onDragEnterHandler}
            // onDragLeave={onDragLeaveHandler}
            // onDrop={onDropHandler}
            >

            {
                items.map(( item, index ) => {
                    console.log( "rendering", items);
                    return (
                        <ElementWrapper key={`item_${item.id}_${index}`} item={item} closeButton remove={() => removeItemHandler( index )}>
                            <props.customElementType className={props.itemClass} item={item} />
                        </ElementWrapper>
                    )
                })
            }

            {isOver && (
                    <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 1,
                        boxShadow: '0 0 3px 0 #5292d6',
                        transition: 'all .3s ease-in',
                    }}
                    />
                )
            }

        </div>
    )
}


Timeline.defaultProps = {
    className: classes.TimelineDefaultClass,
    onDragClass: classes.DragDefaultClass,
    items: [],
    customElementType: Element,
    callBacks: {
        onAdd: null,
        onRemove: null
    }
};

Timeline.propTypes = {
    className: PropTypes.string,
    onDragClass: PropTypes.string,
    itemClass: PropTypes.string,
    items: PropTypes.array,
    customElementType: PropTypes.elementType,
    callBacks: PropTypes.shape({
        onAdd: PropTypes.func,
        onRemove: PropTypes.func
    })
}



export default Timeline;
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

import { ELEMENT } from '../Constants';
import { timeDiff, day } from '../Helpers/Functions';


// Static styles section
const styles = {
    dropZone : {
        height: '100%',
        borderRight : '1px dashed #ccc',
        position: 'relative',
        zIndex: '3',
        userSelect: 'none',
        boxSizing: 'border-box'
    },
    dropZoneOver : {
        background: 'rgba(176,196,222,1)'
    },
    day : {
        width: '100%',
        textAlign: 'center',
        position: 'absolute',
        bottom: '0px',
        margin: '2px 0',
        fontSize: '12px',
        userSelect: 'none'
    },
    weekendStyle : {
        background : '#ccc', 
        borderColor: 'white'
    }
}

const DropZone = props => {

    const [{ isOver }, drop] = useDrop({
        accept: ELEMENT,
        drop: item => {
            let updatedItem = item;
            if ( !item.resizing && !item.moving )
            {
                updatedItem = initItem( item );
            }
            
            props.onDrop( updatedItem, true );
        },
        hover: ( item, monitor ) => {
            if ( !hovered && ( item.resizing || item.moving ) ) {
                let updatedItem = item;
                if ( item.resizing )
                {
                    updatedItem = resizeItem( item );
                }
                else if ( item.moving ){
                    updatedItem = moveItem( item );
                }
                
                props.onDrop( updatedItem );
                setHovered( true );
            }
        },
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
    });

    const[hovered, setHovered] = useState( false );


    useEffect(() => {
        setHovered( false );
    }, [isOver]);


    // Resize the item on over
    const resizeItem = item => {

        if (item.resizing === 'right')
        {
            item.endDate = props.dropDate;
            return item;
        }
        if (item.resizing === 'left')
        {
            item.startDate = props.dropDate;
            return item;
        }
        return null // If the value of resizing is not left or right
    }

    // Update the item on drop and propagate to host element
    const moveItem = item => {
        
        // Get the time difference between  previously set startDate and the new one
        let diff = item.startDate ? timeDiff( props.dropDate, item.startDate ) : 0;

        // Set the updated date
        item.startDate = new Date( props.dropDate );

        // Set the new end date by adding the difference or 0
        item.endDate = new Date( item.endDate );
        item.endDate.setTime( item.endDate.getTime() + diff );

        return item;
    }

    const initItem = item => {
        item.startDate = new Date( props.dropDate );
        item.endDate = new Date( props.dropDate );

        // Set the intial end Date with minimum of 1 day 
        item.endDate.setTime( item.endDate.getTime() + day );

        return item;
    }

    // Get the day of the week
    const dayOfWeek = props.dropDate.getDay();

    // Detect if the day is a day off (weekend)
    const isWeekEnd = (dayOfWeek === 6) || (dayOfWeek === 0);

    const overStyle = isOver ? styles.dropZoneOver : null
    const weekendStyle = isWeekEnd && !props.includeWeekend ? styles.weekendStyle : null

    const dropActivated = !isWeekEnd || props.includeWeekend;

    return (
        <div ref={dropActivated ? drop : null} style={{...styles.dropZone, ...props.style, ...overStyle, ...weekendStyle}} >
            <p style={{...styles.day, color: isWeekEnd || isOver ? 'white' : '#ccc'}}>
                {props.dropDate.getDate()}
            </p>

        </div>
    )
}

DropZone.defaultProps = {
    includeWeekend: false
};

DropZone.propTypes = {
    style: PropTypes.object,
    onDrop: PropTypes.func.isRequired,
    includeWeekend: PropTypes.bool,
    dropDate: PropTypes.objectOf(Date)
}

export default DropZone;
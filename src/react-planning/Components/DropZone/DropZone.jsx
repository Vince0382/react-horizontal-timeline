import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

import { ELEMENT, DAYS } from '../../Constants/Constants';
import { timeDiff, day } from '../../Helpers/Functions';
import classes from './DropZone.module.css';

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

    const overClass = isOver ? classes.DropZoneOver : null
    const weekendClass = isWeekEnd && !props.includeWeekend ? classes.WeekendStyle : null

    const dropActivated = !isWeekEnd || props.includeWeekend;

    return (
        <div 
            ref={dropActivated ? drop : null}
            className={[classes.DropZone, overClass, weekendClass].join(' ')}
            style={props.style}
        >
            <div 
                className={classes.Day} 
                style={{color: isWeekEnd || isOver ? 'white' : '#7787a8'}}
            >
                <div>{DAYS[dayOfWeek].substr(0,3)}</div>
                <div>{props.dropDate.getDate()}</div>
            </div>

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
import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

import { ELEMENT } from '../Constants';
import classes from './DropZone.module.css';
import { timeDiff, day } from '../Helpers/Functions';

const DropZone = props => {

    const [{ isOver }, drop] = useDrop({
		accept: ELEMENT,
		drop: ( item ) => {
            // Get the time difference between  previously set startDate and the new one
            const diff = item.startDate ? timeDiff( props.startDate, item.startDate ) : 0;
            console.log(diff);
            // Set the updated date
            item.startDate = props.startDate;

            // Set the new end date by adding the difference
            item.endDate = item.endDate ? new Date( item.endDate) : new Date( props.startDate );
            item.endDate.setTime( item.endDate.getTime() + diff );

            props.onDrop( item )
        },
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
    });

    // Get the day of the week
    const dayOfWeek = props.startDate.getDay();

    // Detect if the day is a day off (weekend)
    const isWeekEnd = (dayOfWeek === 6) || (dayOfWeek === 0);

    const overStyle = isOver ? {background: 'rgba(176,196,222,1)'} : null
    const weekendStyle = isWeekEnd && !props.includeWeekend ? {background : '#ccc', borderColor: 'white'} : null

    const dropActivated = !isWeekEnd || props.includeWeekend;

    return (
        <div ref={dropActivated ? drop : null} className={classes.DropZone} style={{...props.style, ...overStyle, ...weekendStyle}} >
            <p style={{
                color: isWeekEnd ? 'white' : '#ccc',
                width: '100%',
                textAlign: 'center',
                position: 'absolute',
                bottom: '0px',
            }}>{props.day}</p>

        </div>
    )
}

DropZone.defaultProps = {
    daysGridItems: [],
    includeWeekend: false
};

DropZone.propTypes = {
    style: PropTypes.object,
    onDrop: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    daysGridItems: PropTypes.array,
    itemClass: PropTypes.string,
    customElementType: PropTypes.elementType,
    width: PropTypes.number,
    includeWeekend: PropTypes.bool,
    startDate: PropTypes.objectOf(Date)
}

export default DropZone;
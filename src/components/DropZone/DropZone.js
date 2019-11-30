import React from 'react';
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
        zIndex: '2',
    },
    day : {
        width: '100%',
        textAlign: 'center',
        position: 'absolute',
        bottom: '0px',
        margin: '2px 0',
        fontSize: '12px',
    }
}

const DropZone = props => {

    const [{ isOver }, drop] = useDrop({
		accept: ELEMENT,
		drop: ( item ) => {

            if ( item.resizing )
            {
                item.endDate = props.dropDate;
            }
            else
            {
                // Get the time difference between  previously set startDate and the new one
                let diff = item.startDate ? timeDiff( props.dropDate, item.startDate ) : 0;

                // Set the updated date
                item.startDate = new Date( props.dropDate );

                // Set the new end date by adding the difference or 0 minimum of 1 day if not set
                if ( !item.endDate )
                {
                    item.endDate = new Date( props.dropDate );
                    diff = day;
                }
                else
                {
                    item.endDate = new Date( item.endDate );
                }

                item.endDate.setTime( item.endDate.getTime() + diff );
            }

            props.onDrop( item )
        },
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
    });

    // Get the day of the week
    const dayOfWeek = props.dropDate.getDay();

    // Detect if the day is a day off (weekend)
    const isWeekEnd = (dayOfWeek === 6) || (dayOfWeek === 0);

    const overStyle = isOver ? {background: 'rgba(176,196,222,1)'} : null
    const weekendStyle = isWeekEnd && !props.includeWeekend ? {background : '#ccc', borderColor: 'white'} : null

    const dropActivated = !isWeekEnd || props.includeWeekend;

    return (
        <div ref={dropActivated ? drop : null} style={{...styles.dropZone, ...props.style, ...overStyle, ...weekendStyle}} >
            <p style={{...styles.day, color: isWeekEnd ? 'white' : '#ccc'}}>
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
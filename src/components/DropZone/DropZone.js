import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';


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
            console.log(props.startDate)
            props.onDrop( item )
        },
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
    });

    const overStyle = isOver ? {background: 'rgba(176,196,222,1)'} : null

    return (
        <div ref={drop} style={{...props.style, ...overStyle}}>{props.day}{props.children}</div>
    )
}

DropZone.defaultProps = {

};

DropZone.propTypes = {
    style: PropTypes.object,
    onDrop: PropTypes.func.isRequired
}

export default DropZone;
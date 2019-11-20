import React from 'react';
import PropTypes from 'prop-types';

import classes from './Element.css';

const Element = props => {

    const dragStartHandler = ( event, item ) => {
        event.target.style.cursor = 'grabbing';
        event.dataTransfer.setData('text', JSON.stringify(item));
    };

    return (
        <div 
            className={props.className} 
            draggable="true"
            onDragStart={( event ) => dragStartHandler( event, props.item )}
            onDragEnd={( event ) => event.target.style.cursor = 'grab'}
        >
            <div className={classes.ItemFlex}>
                <img src={props.item.logo} alt='Logo' />
                <div className={classes.Description}>
                    {
                        props.item.description
                    }
                </div>
            </div>
            
        </div>
    )
}

Element.defaultProps = {
    className : classes.ItemDefaultClass,
    item: {
        logo: '',
        description: '',
        startDate: '',
        endDate: '',
        type: 'range',
    } 
}

Element.propTypes = {
    className: PropTypes.object,
    itemClass: PropTypes.object,
    item: propTypes.object.isRequired
}

export default Element;
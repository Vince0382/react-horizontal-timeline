import React from 'react';
import PropTypes from 'prop-types';

import classes from './Element.module.css';

const Element = props => {

    return (
        <div 
            className={props.className}
            style={props.style}
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
        id: null,
        logo: '',
        description: '',
        startDate: '',
        endDate: '',
        type: 'range',
    } 
}

Element.propTypes = {
    className: PropTypes.string,
    itemClass: PropTypes.string,
    item: PropTypes.object.isRequired,
    style: PropTypes.object
}

export default Element;
import React from 'react';
import PropTypes from 'prop-types';

import classes from './Element.module.css';
import { randomRGBAColor } from '../Helpers/Functions';

const Element = props => {

    return (
        <div 
            className={props.className}
            style={{...props.style, background: props.innerElement ? 'rgba(70, 130, 180, 0.8)' : 'rgba(204, 204, 204, 0.8)'}}
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
    className: classes.ItemDefaultClass,
    item: {
        id: null,
        logo: '',
        description: '',
        startDate: '',
        endDate: '',
        type: 'range',
    },
    randomColor: false,
    innerElement: false
}

Element.propTypes = {
    className: PropTypes.string,
    itemClass: PropTypes.string,
    item: PropTypes.object.isRequired,
    style: PropTypes.object,
    innerElement: PropTypes.bool
}

export default Element;
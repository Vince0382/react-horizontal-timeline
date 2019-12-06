import React from 'react';
import PropTypes from 'prop-types';

import { rgbaFromArray } from '../../../Helpers/Functions';
import classes from './DefaultDetailedElement.module.css';

const alpha = 0.7;
const defaultColors = {
    outerElement : [204, 204, 204],
    innerElement : [70, 130, 180]
}

const DefaultDetailedElement = props => {

    return (
        <div 
            className={[classes.DefaultDetailedElement, props.className].join(' ')}
            style={{
                background: props.innerElement ? rgbaFromArray( props.bgColor, alpha ): rgbaFromArray(defaultColors.outerElement, alpha),
                ...props.style,
            }}
                
        >
            <div className={classes.ItemFlex}>
                <div className={classes.ImagesWrapper}>
                    <img 
                        className={classes.Images} 
                        src={props.item.logo} 
                        alt='Logo' 
                        draggable='false' 
                        onMouseDown={event => event.preventDefault()}
                    />
                </div>
                <div className={classes.Description}>
                    {
                        props.item.description
                    }
                </div>
            </div>
            
        </div>
    )
}

DefaultDetailedElement.defaultProps = {
    item: {
        id: null,
        logo: '',
        description: '',
        startDate: '',
        endDate: '',
        type: 'range',
    },
    randomColor: false,
    innerElement: false,
    bgColor: defaultColors.innerElement
}

DefaultDetailedElement.propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
    innerElement: PropTypes.bool,
    bgColor: PropTypes.array
}

export default DefaultDetailedElement;
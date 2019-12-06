import React from 'react';
import PropTypes from 'prop-types';

import { rgbaFromArray } from '../../../Helpers/Functions';
import classes from './DefaultBasicElement.module.css';

const alpha = 0.7;

const DefaultBasicElement = props => {

    return (
        <div 
            className={[classes.DefaultBasicElement, props.className].join(' ')}
            style={{
                ...props.style, 
                background: rgbaFromArray( props.bgColor, alpha )}}
        >   
        </div>
    )
}

DefaultBasicElement.defaultProps = {

}

DefaultBasicElement.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    bgColor: PropTypes.array
}

export default DefaultBasicElement;
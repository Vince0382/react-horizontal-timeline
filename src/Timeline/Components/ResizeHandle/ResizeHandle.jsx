import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { ELEMENT } from '../../Constants';
import classes from './ResizeHandle.module.css';

const ResizeHandle = props => {

    const [, resize ] = useDrag({
        item: { type: ELEMENT, ...props.item, resizing: props.orientation, moving: false },
    })

    const innerStyle = props.orientation === 'left' ? {left: 0} : {right: 0};

    return (
        <div
            className={classes.ResizeHandle}
            style={innerStyle}
            ref={resize}
        />
    )
}

ResizeHandle.defaultProps = {
    item: {},
}

ResizeHandle.propTypes = {
    item: PropTypes.object.isRequired,
    orientation: PropTypes.string
}

export default ResizeHandle;
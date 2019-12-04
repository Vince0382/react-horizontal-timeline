import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { ELEMENT } from '../Constants';

//Static styles section

const styles = {
    resizeArea : {
        position: 'absolute',
        top: 0,
        zIndex: 4,
        height: 'calc(100% - 2px)',
        width: '2px',
        background: 'rgba(204, 204, 204, 0.5)',
        cursor: 'ew-resize',
        border: '1px solid #ccc',
        borderRadius: '4px'
    }
}

const ResizeHandle = props => {

    const [, resize ] = useDrag({
        item: { type: ELEMENT, ...props.item, resizing: props.orientation, moving: false },
    })

    const innerStyle = props.orientation === 'left' ? {left: 0} : {right: 0};

    return (
        <div 
            style={{...styles.resizeArea, ...innerStyle}}
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
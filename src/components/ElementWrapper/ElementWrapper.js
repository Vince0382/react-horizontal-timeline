import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import { ELEMENT } from '../Constants';

// Static style section 

const styles = {
    elementWrapper : {
        position: 'relative',
        width: '100%',
        zIndex: 3,
        fontSize: '12px',
        height: 'fit-content',
        display: 'flex',
        margin: '10px 0',
        overflow: 'hidden',
    },
    overlay : {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        border: '1px solid transparent',
        transition: 'all 0.2s ease-in',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    overlayHover : {
        borderColor: 'rgb(70, 130, 180)',
        opacity: 1,
    },
    removeButton : {
        position: 'absolute',
        top: '5px',
        right: '5px',
        color: 'red',
        fontSize: '14px',
        cursor: 'pointer',
    },
    resizeArea : {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '2px',
        cursor: 'ew-resize',
        resize: 'horizontal',
    }
}


// Internal Component
const ResizeHandle = props => {

    const [{isDragging}, resize ] = useDrag({
        item: { type: ELEMENT, ...props.item, resizing: true },
    })

    const innerStyle = props.orientation === 'left' ? {left: 0} : {right: 0};

    return (
        <div 
            style={{...styles.resizeArea, ...innerStyle}}
            ref={resize}
        />
    )
}

// Main component
const ElementWrapper = props => {

    const [{isDragging}, drag ] = useDrag({
        item: { type: ELEMENT, ...props.item, resizing: false },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    const [hoverStyle, setHoverStyle] = useState( null );

    if (isDragging && props.innerDrag) {
        return <div ref={drag} />
    }

    return (
        <div 
            onClick={props.onClick}
            ref={drag}
            style={{
                ...styles.elementWrapper,
                opacity: isDragging ? 0.5 : 1,
                cursor: props.move ? 'move' : 'grab',
            }}
        >
            {props.children}
            {
                props.overlay
                    ?   <div 
                            style={{...styles.overlay, ...hoverStyle}}
                            onMouseOver={() => setHoverStyle( styles.overlayHover )}
                            onMouseLeave={() => setHoverStyle( null )}
                        >
                            <div style={styles.removeButton} onClick={props.remove}>X</div>
                            <ResizeHandle orientation='right' item={props.item} />
                        </div>
                    :   null
            }
        </div>
    )
}



ElementWrapper.defaultProps = {
    item: {
        id: null,
        logo: '',
        description: '',
        startDate: '',
        endDate: '',
        elementType: 'range',
    },
    innerDrag: false,
    overlay: false,
    move: false
}

ElementWrapper.propTypes = {
    item: PropTypes.object.isRequired,
    width: PropTypes.number,
    innerDrag: PropTypes.bool,
    overlay: PropTypes.bool,
    move: PropTypes.bool
}

export default ElementWrapper;
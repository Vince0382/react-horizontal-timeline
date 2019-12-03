import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import { ELEMENT } from '../Constants';
import { rgbaFromArray } from '../Helpers/Functions';
import DefaultElement from '../DefaultElement/DefaultElement';

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
        overflowX: 'hidden',
    },
    overlay : {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        border: '2px solid transparent',
        transition: 'opacity 0.2s ease-in',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    removeButton : {
        position: 'absolute',
        top: '50%',
        right: '7px',
        transform: 'translateY(-50%)',
        background: 'rgba(204,204,204, 0.8)',
        fontSize: '14px',
        cursor: 'pointer',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
    },
    removeButtonLines: {
        shared: {
            position: 'absolute',
            right: '14px',
            top: '7.5px',
            height: '15px',
            width: '2px',
            backgroundColor: '#E76E54',
          },
          first : {
            transform: 'rotate(45deg)',
          },
          second : {
            transform: 'rotate(-45deg)',
          }
    },
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


// Internal Component
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

// Main component
const ElementWrapper = props => {

    const [{isDragging}, drag ] = useDrag({
        item: { type: ELEMENT, ...props.item, resizing: null, moving: props.innerElement },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const hoverStyle = {
        opacity: 1,
        border: `2px solid ${rgbaFromArray( props.bgColor )}`,
        transition: 'opacity 0.2s ease-in',
    }

    const [hoverStyleActive, setHoverStyleActive] = useState( null );

    // if (isDragging && props.innerElement || isResizing) {
    //     return <div ref={drag} />
    // }

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
            <props.customElementType 
                className={props.elementClassName}
                item={props.item}
                bgColor={props.bgColor}
                innerElement={props.innerElement}
            />
            {
                props.overlay
                    ?   <div 
                            style={{...styles.overlay, ...hoverStyleActive}}
                            onMouseOver={() => setHoverStyleActive( hoverStyle )}
                            onMouseLeave={() => setHoverStyleActive( null )}
                        >
                            <div style={styles.removeButton} onClick={props.remove}>
                                <div style={{...styles.removeButtonLines.shared, ...styles.removeButtonLines.first}}/>
                                <div style={{...styles.removeButtonLines.shared, ...styles.removeButtonLines.second}}/>
                            </div>
                            <ResizeHandle 
                                orientation='left' 
                                item={props.item}
                            />
                            <ResizeHandle 
                                orientation='right' 
                                item={props.item}
                            />
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
    innerElement: false,
    overlay: false,
    move: false,
    customElementType: DefaultElement,
}

ElementWrapper.propTypes = {
    item: PropTypes.object.isRequired,
    width: PropTypes.number,
    innerElement: PropTypes.bool,
    overlay: PropTypes.bool,
    move: PropTypes.bool,
    onClick: PropTypes.func,
    remove: PropTypes.func,
    customElementType: PropTypes.elementType,
    elementClassName: PropTypes.string,
    bgColor: PropTypes.array
}

export default ElementWrapper;
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import { ELEMENT } from '../Constants';
import { rgbaFromArray } from '../Helpers/Functions';
import DefaultDetailedElement from './DefaultElement/DefaultDetailedElement';
import DragPreview from './DragPreview';
import ResizeHandle from './ResizeHandle';

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
        userSelect: 'none'
    },
    elementOccurences: {
        position: 'absolute',
        top: '-15px',
        right: '10px',
        width: 'auto',
        height: '15px',
        textAlign: 'center',
        color: 'white',
        background: 'rgba(146, 168, 209, 0.8)',
        borderRadius: '4px',
        padding: '5px'
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

    const element = (
        <props.customElementType 
            className={props.elementClassName}
            item={props.item}
            bgColor={props.bgColor}
            innerElement={props.innerElement}
        />
    )

    return (
        <>
            <div 
                onClick={props.onClick}
                ref={drag}
                style={{
                    ...styles.elementWrapper,
                    opacity: isDragging ? 0.5 : 1,
                    cursor: props.move ? 'move' : 'grab',
                }}
            >
                { element }
                {
                    props.showOccurences
                        ?   <div style={styles.elementOccurences}>{props.occurences}</div>
                        :   null
                }
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
            <DragPreview innerElement={props.innerElement}/>
        </>
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
    customElementType: DefaultDetailedElement,
    occurences: 0,
    showOccurences: false
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
    bgColor: PropTypes.array,
    occurences: PropTypes.number,
    showOccurences: PropTypes.bool
}

export default ElementWrapper;
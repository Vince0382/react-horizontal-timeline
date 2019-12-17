import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import { ELEMENT } from '../../Constants/Constants';
import { rgbaFromArray } from '../../Helpers/Functions';
import DefaultDetailedElement from '../DefaultElement/DefaultDetailedElement/DefaultDetailedElement';
import DragPreview from '../DragPreview/DragPreview';
import ResizeHandle from '../ResizeHandle/ResizeHandle';
import classes from './ElementWrapper.module.css';

// Static style section 

const styles = {

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
export const ElementWrapper = props => {

    const [{isDragging}, drag ] = useDrag({
        item: { type: ELEMENT, ...props.item, resizing: null, moving: props.innerElement },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const hoverStyle = {
        border: `2px solid ${rgbaFromArray( props.bgColor )}`,
        borderStyle: 'solid none solid none'
    }

    const [hoverStyleActive, setHoverStyleActive] = useState( null );

    // if (isDragging && props.innerElement || isResizing) {
    //     return <div ref={drag} />
    // }

    return (
        <>
            <div 
                onClick={props.onClick}
                ref={drag}
                className={classes.ElementWrapper}
                style={{
                    cursor: props.move ? 'move' : 'grab',
                }}
            >
                <props.customElementType {...props} />

                {
                    props.showOccurences && props.occurences > 0
                        ?   <div className={classes.ElementOccurences}>{props.occurences}</div>
                        :   null
                }
                {
                    props.overlay
                        ?   <div
                                className={classes.Overlay}
                                style={hoverStyleActive}
                                onMouseOver={() => setHoverStyleActive( hoverStyle )}
                                onMouseLeave={() => setHoverStyleActive( null )}
                            >
                                <div 
                                    className={classes.RemoveButton} 
                                    onClick={props.remove}
                                >
                                    <div style={{...styles.removeButtonLines.shared, ...styles.removeButtonLines.first}}/>
                                    <div style={{...styles.removeButtonLines.shared, ...styles.removeButtonLines.second}}/>
                                </div>
                                <ResizeHandle 
                                    orientation='left'
                                    item={props.item}
                                    bgColor={rgbaFromArray( props.bgColor )}
                                />
                                <ResizeHandle 
                                    orientation='right'
                                    item={props.item}
                                    bgColor={rgbaFromArray( props.bgColor )}
                                />
                            </div>
                        :   null
                }
            </div>
            {
                !props.innerElement
                    ?   <DragPreview />
                    :   null
            }
            
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
    overlay: false,
    move: false,
    customElementType: DefaultDetailedElement,
    occurences: 0,
    showOccurences: false
}

ElementWrapper.propTypes = {
    item: PropTypes.object.isRequired,
    width: PropTypes.number,
    overlay: PropTypes.bool,
    move: PropTypes.bool,
    onClick: PropTypes.func,
    remove: PropTypes.func,
    customElementType: PropTypes.elementType,
    bgColor: PropTypes.array,
    occurences: PropTypes.number,
    showOccurences: PropTypes.bool
}

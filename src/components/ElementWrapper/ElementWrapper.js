import React from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import classes from './ElementWrapper.module.css';

import { ELEMENT } from '../Constants';

const ResizeHandle = props => {

    const [{isDragging}, resize ] = useDrag({
        item: { type: ELEMENT, ...props.item, resizing: true },
    })

    return (
        <div 
            className={classes.ResizeArea}
            style={props.orientation === 'left' ? {left: 0} : {right: 0}}
            ref={resize}
        />
    )
}

const ElementWrapper = props => {

    const [{isDragging}, drag ] = useDrag({
        item: { type: ELEMENT, ...props.item, resizing: false },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    if (isDragging && props.innerDrag) {
        return <div ref={drag} />
    }

    return (
        <div 
            className={classes.ElementWrapper}
            onClick={props.onClick}
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: props.move ? 'move' : 'grab',
            }}
        >
            {props.children}
            {
                props.overlay
                    ?   <div className={classes.Overlay} style={{borderColor: 'rgb(70, 130, 180)'}}>
                            <div className={classes.RemoveButton} onClick={props.remove}>X</div>
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

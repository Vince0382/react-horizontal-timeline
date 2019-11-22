import React from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import classes from './ElementWrapper.module.css';

import { ELEMENT } from '../Constants';

const ElementWrapper = props => {

    const [{isDragging}, drag] = useDrag({
        item: { type: ELEMENT, ...props.item },
            collect: monitor => ({
                isDragging: !!monitor.isDragging(),
            }),
      })

    return (
        <div 
            className={classes.ElementWrapper}
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            {
                props.closeButton
                    ?   <div className={classes.RemoveButton} onClick={props.remove}>X</div>
                    :   null
            }
            {props.children}
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
    } 
}

ElementWrapper.propTypes = {
    item: PropTypes.object.isRequired
}

export default ElementWrapper;

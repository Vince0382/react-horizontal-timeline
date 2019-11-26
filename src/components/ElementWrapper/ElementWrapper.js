import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import classes from './ElementWrapper.module.css';

import { ELEMENT } from '../Constants';

const ElementWrapper = props => {

    const [{isDragging}, drag, preview] = useDrag({
        item: { type: ELEMENT, ...props.item },
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
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'grab',
            }}
        >
            {props.children}
            {
                props.closeButton
                    ?   <div className={classes.RemoveButton} onClick={props.remove}>X</div>
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
    innerDrag: true
}

ElementWrapper.propTypes = {
    item: PropTypes.object.isRequired,
    width: PropTypes.number,
    innerDrag: PropTypes.bool
}

export default ElementWrapper;

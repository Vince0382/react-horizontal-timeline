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
            onClick={props.onClick}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'grab',
            }}
        >
            {props.children}
            {
                props.overlay
                    ?   <div className={classes.Overlay}>
                            <div className={classes.RemoveButton} onClick={props.remove}>X</div>
                            <div className={classes.Text}>Open</div>
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
    innerDrag: true,
    overlay: false
}

ElementWrapper.propTypes = {
    item: PropTypes.object.isRequired,
    width: PropTypes.number,
    innerDrag: PropTypes.bool,
    overlay: PropTypes.bool
}

export default ElementWrapper;

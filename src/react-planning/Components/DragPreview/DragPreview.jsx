import React from 'react'
import { useDragLayer } from 'react-dnd';

import { ELEMENT } from '../../Constants/Constants';
import classes from './DragPreview.module.css';


const getItemStyles = (initialOffset, currentOffset) => {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    }
    let { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;

    return {
        transform,
        WebkitTransform: transform,
    }
}

const DragPreview = props => {
    const {
        itemType,
        isDragging,
        item,
        initialOffset,
        currentOffset,

    } = useDragLayer(monitor => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }))

    const renderItem = () => {
        switch (itemType) {
          case ELEMENT:
            return <img className={classes.ImageSytle} src={item.content.logo} alt=''/>
          default:
            return null
        }
      }

    if (!isDragging || item.id) {
        return null
    }

    return (
        <div className={classes.DragPreview}>
            <div 
                className={classes.ItemStyle} 
                style={getItemStyles(initialOffset, currentOffset)}
            >
                {renderItem()}
            </div>
        </div>
    )
}
export default DragPreview

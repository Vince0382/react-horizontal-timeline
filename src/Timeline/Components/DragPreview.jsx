import React from 'react'
import { useDragLayer } from 'react-dnd'

const styles = {
    layerStyle : {
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0,
    },
    itemStyle : {
        height: '40px',
        borderRadius: '4px',
        overflow : 'hidden',
        boxShadow: '0px 0px 2px 0px rgba(146, 168, 209, 0.75)'
    },
    imageSytle : {
        height: '100%',
    }
}


const getItemStyles = (initialOffset, currentOffset) => {
    if (!initialOffset || !currentOffset) {
        return {
        display: 'none',
        }
    }
    let { x, y } = currentOffset
    const transform = `translate(${x}px, ${y}px)`

    return {
        transform,
        WebkitTransform: transform,
    }
}

const DragPreview = props => {
    const {
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

    if (!isDragging || item.id) {
        return null
    }

    return (
        <div style={styles.layerStyle}>
            <div style={{...styles.itemStyle, ...getItemStyles(initialOffset, currentOffset)}}>
                <img style={styles.imageSytle} src={item.logo} alt=''/>
            </div>
        </div>
    )
}
export default DragPreview

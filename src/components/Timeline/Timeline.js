import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Element from './Element/Element';

const Timeline = props => {

    const [dragClass, setDragClass] = useState( null );

    const onDropHandler = ( event ) => {
        console.log(event);
        setDragClass( '' )
    }

    return (
        <div
            className={`${props.className} ${dragClass}`}
            onDragEnter={() => setDragClass( props.onDragClass )}
            onDragLeave={() => setDragClass( '' )} 
            onDrop={onDropHandler}
            >

            {
                props.items.map(( item, index ) => <props.customElementType key={`item_${index}`} item={item } />)
            }

        </div>
    )
}


Timeline.defaultProps = {
  className: classes.TimelineDefaultClass,
  onDragClass: classes.DragDefaultClass,
  items: [],
  customElementType: Element
};

Timeline.propTypes = {
  className: PropTypes.object,
  onDragClass: PropTypes.object,
  itemClass: PropTypes.object,
  items: PropTypes.array.isRequired,
  customElementType: PropTypes.elementType
}



export default Timeline;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DefaultBasicElement from '../DefaultElement/DefaultBasicElement/DefaultBasicElement';
import DefaultDetailedElement from '../DefaultElement/DefaultDetailedElement/DefaultDetailedElement';
import ItemsGrid from '../ItemsGrid/ItemsGrid';
import classes from './GroupItemsGrid.module.css';

const GroupItemsGrid = props => {

    const [groupedItems, setGroupItems] = useState( {} );
    const [elementHovered, setElementHovered] = useState( null );

    useEffect(() => {
        const groupedItemsTmp = {};
        props.items.forEach( item => {
            // Set a string ID to the group to avoid key sorting
            const groupId = `group_${item.itemId}`

            if ( !groupedItemsTmp[groupId] ) 
            {
                groupedItemsTmp[groupId] = []
            }

            groupedItemsTmp[groupId].push( item );
        })

        setGroupItems( groupedItemsTmp );

    }, [props.items, props.startDate]);

    const hoverStyle = {background: 'rgba(250, 250, 250, 1'} 

    const grouped = (
        Object.keys(groupedItems).map(( items, index ) => {
            const borderStyle = 
                index < Object.keys(groupedItems).length - 1
                    ?   {borderBottom:  '1px solid #f1f1f1'}
                    :   null

            return (
                <React.Fragment key={`groups_items_${items}${index}`}>
                    <div 
                        className={classes.Groups}
                        style={elementHovered === index ? {...hoverStyle, ...borderStyle} : borderStyle} 
                        onMouseOver={() => setElementHovered( index )}
                        onMouseLeave={() => setElementHovered( null )}
                    >
                        <DefaultDetailedElement 
                            item={groupedItems[items][0]} 
                            className={classes.CustomItem}
                            style={{background: 'transparent'}}
                        />
                    </div>
                    <div 
                        className={classes.Items}
                        style={elementHovered === index ? hoverStyle : null}
                        onMouseOver={() => setElementHovered( index )}
                        onMouseLeave={() => setElementHovered( null )}
                    >
                        <ItemsGrid 
                            {...props}
                            width={props.width - props.leftWidth} /* Set the width of the itemGrid to fit inside the grid defined*/
                            style={{
                                ...props.style,
                                ...borderStyle,
                                marginTop: 0
                            }}
                            items={groupedItems[items]}
                            colorIndex={index}
                        />
                    </div>
                </React.Fragment>
            )
        })
    )

    return (
        <div 
            className={classes.GroupViewGrid} 
            style={{
                width: `${(props.width - props.leftWidth) * props.monthList.length + props.leftWidth}px`,
                gridTemplateColumns: `${props.leftWidth}px ${(props.width - props.leftWidth) * props.monthList.length}px`
            }}
        >
            <div className={classes.SpacerLeft} />
            <div className={classes.SpacerRight} />
            {grouped}
        </div>
    )
}

GroupItemsGrid.defaultProps = {
    items: [],
    customElementType: DefaultBasicElement,
    leftWidth: 220
}

GroupItemsGrid.propTypes = {
    items: PropTypes.array,
    customElementType: PropTypes.elementType,
    startDate: PropTypes.objectOf(Date),
    leftWidth: PropTypes.number
}

export default GroupItemsGrid;
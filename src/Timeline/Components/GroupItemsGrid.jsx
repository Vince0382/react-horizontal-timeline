import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DefaultBasicElement from './DefaultElement/DefaultBasicElement';
import DefaultDetailedElement from './DefaultElement/DefaultDetailedElement';
import ItemsGrid from './ItemsGrid';

// Static styles section
const styles = {
    groups : {
        gridColumn: 1,
        background: 'white',
        position: 'sticky',
        left: 0,
        zIndex: 300
    },
    items : {
        gridColumn: 2
    },
    item : {
        height: '100%',
        borderRadius: '0',
        border : '1px solid #ccc',
        borderStyle: 'none solid none none',
        background: 'transparent'
    },
    hover : {
        background: '#f1f1f1',
    }
}


const GroupItemsGrid = props => {

    const [groupedItems, setGroupItems] = useState( {} );
    const [elementHovered, setElementHovered] = useState( null );

    useEffect(() => {
        const groupedItemsTmp = {};
        props.items.forEach( item => {
            if ( !groupedItemsTmp[item.itemId] ) 
            {
                groupedItemsTmp[item.itemId] = []
            }

            groupedItemsTmp[item.itemId].push( item );
        })

        setGroupItems( groupedItemsTmp );
        console.log( groupedItemsTmp);

    }, [props.items, props.startDate]);

    const grouped = (
        Object.keys(groupedItems).map(( items, index ) => (
            <React.Fragment key={`groups_items_${items}${index}`}>
                <div 
                    style={elementHovered === index ? {...styles.groups, ...styles.hover} : styles.groups} 
                    onMouseOver={() => setElementHovered( index )}
                    onMouseLeave={() => setElementHovered( null )}
                >
                    <DefaultDetailedElement item={groupedItems[items][0]} style={styles.item}/>
                </div>
                <div 
                    style={elementHovered === index ? {...styles.items, ...styles.hover} : styles.items}
                    onMouseOver={() => setElementHovered( index )}
                    onMouseLeave={() => setElementHovered( null )}
                >
                    <ItemsGrid 
                        {...props} 
                        items={groupedItems[items]}
                        colorIndex={index}
                         />
                </div>
            </React.Fragment>
        ))
    )

    return grouped
}

GroupItemsGrid.defaultProps = {
    items: [],
    customElementType: DefaultBasicElement
}

GroupItemsGrid.propTypes = {
    items: PropTypes.array,
    customElementType: PropTypes.elementType,
    startDate: PropTypes.objectOf(Date)
}

export default GroupItemsGrid;
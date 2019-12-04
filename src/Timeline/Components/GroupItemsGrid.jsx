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
    }
}


const GroupItemsGrid = props => {

    const [groupedItems, setGroupItems] = useState( {} );

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
            <>
                <div style={{...styles.groups}}>
                    <DefaultDetailedElement item={groupedItems[items][0]}/>
                </div>
                <div style={styles.items}>
                    <ItemsGrid {...props} items={groupedItems[items]} key={`grouped_items_${items}${index}`} />
                </div>
            </>
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
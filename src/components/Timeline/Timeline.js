import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import * as helpers from '../Helpers/Functions';
import DaysGrid from '../DaysGrid/DaysGrid';
import ItemsGrid from '../ItemsGrid/ItemsGrid';
import MonthSelector from '../MonthSelector/MonthSelector';

const Timeline = props => {

    const baseIndex = 100000000;
    const timelineRef = useRef();
    const borderSize = 1;

    const [items, setItems] = useState( [] );
    const [timelineWidth, setTimelineWidth] = useState( 0 );
    const [monthList, setMonthList] = useState( [] );
    const [currentMonth, setCurrentMonth] = useState( 0 );

    // Get the higher id and increase
    const getNextId = () => {
        return Math.max.apply(Math, items.map(item => { return item.id; })) + 1
    }

    // Loop inside props.items to assign an ID if missing

    useEffect (() => {
        const verifiedItems = [];

        props.items.forEach(( item, index ) => {
            const tmpItem = {
                ...item,
                startDate: item.startDate ? new Date(item.startDate) : null,
                endDate: item.endDate ? new Date(item.endDate) : null
            }

            if ( item.id ){
                verifiedItems.push(tmpItem);
            }
            else{
                verifiedItems.push({
                    ...tmpItem,
                    id: baseIndex + index
                })
            }
        });

        setItems( verifiedItems );

    }, [props.items])

    // Update boxes size on window resized
    useEffect(() => {

        const tmpMonths = [];
        let startDate = new Date( props.options.startDate );
        const endDate = new Date( props.options.endDate );

        const nbreMonth = helpers.monthDiff( startDate, endDate );

        for (let i = 0; i < nbreMonth; i++){
            tmpMonths.push({
                    month: startDate.getMonth() + i + 1 ,
                    year: startDate.getFullYear()
                })
        }
        setMonthList( tmpMonths );
        updateScreenSizeHandler();

        window.addEventListener( 'resize', updateScreenSizeHandler );
        return () => window.removeEventListener( 'resize', updateScreenSizeHandler );
    }, []);


    const updateScreenSizeHandler = () => {
        // Get the timeline element size 
        const timelineElement = timelineRef.current.getBoundingClientRect();

        // Update the state with the width of the timneline width
        setTimelineWidth( timelineElement.width - ( borderSize * 2 ));

    }

    const onDropHandler = ( item, propagate ) => {

        // Parsing data from dropped component
        //const item = JSON.parse(event.dataTransfer.getData("text"));
        const newItems = [...items];
        let existingId = -1;
        let tmpItem = {
            ...item,
            id: item.id ? item.id : getNextId(), // Check if the item has an ID and if not assign one
        }

        //Check if the item is updated or created
        if ( item.id )
        {
            existingId = newItems.findIndex( i => i.id === item.id );
        }

        // Add the new item to the item array only if it is not already present
        if( existingId === -1 )
        {
            newItems.push( tmpItem );
            if ( props.options.callBacks.onAdd && propagate ) props.options.callBacks.onAdd({item: {...tmpItem}, items: [...newItems]});
        }
        else //Update item
        {
            newItems[existingId] = tmpItem;
            if ( props.options.callBacks.onUpdate && propagate ) props.options.callBacks.onUpdate({item: {...tmpItem}, items: [...newItems]});
        }

        // Update state with the updated items array
        setItems( newItems );


    }

    const onRemoveItemHandler = itemID => {
        const newItems = [...items];
        let item = null;

        const found = newItems.findIndex(i => i.id === itemID );

        // Remove the item at the 'index' position if founded
        if ( found !== -1 )
        {
            item = newItems[found];
            newItems.splice( found, 1 );
            // Update state with the new array items
            setItems( newItems );
        }
        else 
        {
            console.log(`ID : ${itemID} not found`);
        }

        if ( props.options.callBacks.onRemove ) props.options.callBacks.onRemove({item: {...item}, items: [...newItems]});
    }

    // Creattin style object
    
    let style = {
        ...props.style,
        border: `${borderSize}px solid #ccc`, 
        overflowX: props.scroll ? 'scroll' : 'hidden'
    }

    if (!props.className) style= {...style, ...styles.timelineDefault}

    return (
        <React.Fragment>
        <div
            className={`${props.className}`}
            style={style}
            ref={timelineRef}
        >
            {
                monthList.map(( month, index ) => (
                    <DaysGrid 
                        key={`daysGrid_${month.month}_${month.year}`}
                        onDrop={onDropHandler}
                        month={month} 
                        width={timelineWidth}
                        // items={items.filter( item => { 
                        //         return item.startDate.getMonth() + 1 === month.month && item.startDate.getFullYear() === month.year;
                        //     })}
                        style={{left: `${( 100 * index ) - ( 100 * currentMonth )}%`}}
                    >
                    </DaysGrid>
                ))
            }
            <ItemsGrid 
                items={items}
                width={timelineWidth}
                monthList={monthList}
                onRemove={onRemoveItemHandler}
                customElementType={props.customElementType}
                elementClassName={props.elementClassName}
                startDate = {new Date( props.options.startDate )}
                style={{left: `-${( 100 * currentMonth )}%`}}
            />
        </div>
        
        <MonthSelector 
            monthList={monthList}
            currentMonth={currentMonth}
            previousMonthHandler={() => setCurrentMonth( currentMonth - 1 <= 0 ? 0 : currentMonth - 1 )}
            nextMonthHandler={() => setCurrentMonth( currentMonth + 1 >= monthList.length - 1 ? monthList.length - 1 : currentMonth + 1 )}
        />

        </React.Fragment>
    )
}


Timeline.defaultProps = {
    items: [],
    options: {
        callBacks: {
            onAdd: null,
            onRemove: null,
            onUpdate: null
        },
        startDate: new Date().toISOString(),
        endDate: new Date().setMonth( new Date().getMonth() + 1)
    },
    scroll: false
};

Timeline.propTypes = {
    className: PropTypes.string,
    onDragClass: PropTypes.string,
    elementClassName: PropTypes.string,
    items: PropTypes.array,
    customElementType: PropTypes.elementType,
    options: PropTypes.shape({
        callBacks: PropTypes.shape({
            onAdd: PropTypes.func,
            onRemove: PropTypes.func,
            onUpdate: PropTypes.func
        }),
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired
    }),
    scroll: PropTypes.bool
}

export default Timeline;

// Static styles section

const styles = {
    timelineDefault : {
        position: 'relative',
        width: '100%',
        minHeight: '300px',
        height: 'auto',
        transition: 'all .3s ease-in',
        boxSizing: 'border-box',
    },
}
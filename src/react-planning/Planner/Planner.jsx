import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import * as helpers from '../Helpers/Functions';
import MonthSelector from '../Components/MonthSelector/MonthSelector';
import LayoutGrid from '../Components/LayoutGrid/LayoutGrid';

import classes from './Planner.module.css';


// Component
export const Planner = props => {

    const baseIndex = 100000000;
    const PlannerRef = useRef();
    const borderSize = 1;

    const [items, setItems] = useState( [] );
    const [PlannerWidth, setPlannerWidth] = useState( 0 );
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

        verifiedItems.sort((a, b) => {
            a = a.startDate;
            b = b.startDate;
            return a<b ? -1 : a>b ? 1 : 0;
        });

        setItems( verifiedItems );

    }, [props.items]);

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
    }, [props.options.startDate, props.options.endDate]);


    const updateScreenSizeHandler = () => {
        // Get the Planner element size 
        const PlannerElement = PlannerRef.current.getBoundingClientRect();

        // Update the state with the width of the timneline width
        setPlannerWidth( PlannerElement.width - ( borderSize * 2 ));

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

    // Props list to pass to the Layout component

    const propagatedProps = {
        items: items,
        width: PlannerWidth,
        monthList: monthList,
        currentMonth: currentMonth,
        onRemove: onRemoveItemHandler,
        onDrop: onDropHandler,
        grouped: props.grouped,
        scroll: props.scroll,
        customInnerElementType: props.customInnerElementType,
        elementClassName: props.elementClassName,
        startDate: new Date( props.options.startDate ),
    }

    return (
        <>
            <div
                className={`${props.className}`}
                style={{
                    border: `${borderSize}px solid #ccc`, 
                    overflowX: props.scroll ? 'scroll' : 'hidden',
                    ...props.style
                }}
                ref={PlannerRef}
            >
                
                <LayoutGrid {...propagatedProps} />
                
            </div>
            
            {
                !props.scroll
                    ?   <MonthSelector 
                            monthList={monthList}
                            currentMonth={currentMonth}
                            previousMonthHandler={() => setCurrentMonth( currentMonth - 1 <= 0 ? 0 : currentMonth - 1 )}
                            nextMonthHandler={() => setCurrentMonth( currentMonth + 1 >= monthList.length - 1 ? monthList.length - 1 : currentMonth + 1 )}
                        />
                    :   null
            }

        </>
    )
}


Planner.defaultProps = {
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
    scroll: false,
    grouped: false,
    className: classes.PlannerDefault
};

Planner.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onDragClass: PropTypes.string,
    elementClassName: PropTypes.string,
    items: PropTypes.array,
    customInnerElementType: PropTypes.elementType,
    options: PropTypes.shape({
        callBacks: PropTypes.shape({
            onAdd: PropTypes.func,
            onRemove: PropTypes.func,
            onUpdate: PropTypes.func
        }),
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired
    }),
    scroll: PropTypes.bool,
    grouped: PropTypes.bool,
}

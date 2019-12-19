# react-planning

[![npm version](https://badge.fury.io/js/react-planning.svg)](https://badge.fury.io/js/react-planning)

A react component that provide a planning Component with some cool features.

## Getting Started

The planning component is based on a HTML grid system. To add items to the planning you just have to drag and drop the desired item inside the timeline component.
The drag and drop action is handled by react-DnD.

You can pass a customItemType to the ElementWrapper component and a customInnerElementType to the timeline component to customized your planning with your own react component.

No JQuery.

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
npm install --save react-planning
```

## Usage

```
import { Planner } from 'react-planning';
```

## Example

https://vince0382.github.io/react-horizontal-timeline

See the full repository here : https://github.com/Vince0382/react-horizontal-timeline for the full working example

```javascript
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import MouseBackEnd from 'react-dnd-mouse-backend'

import classes from './App.module.css';

import { Timeline, ElementWrapper} from 'react-planning';

//import logo
import logo1 from './assets/images/logo1.png';
import logo2 from './assets/images/logo2.png';
import logo3 from './assets/images/logo3.png';
import logo4 from './assets/images/logo4.png';
import logo5 from './assets/images/logo5.png';
import logo6 from './assets/images/logo6.png';
import logo7 from './assets/images/logo7.png';

const App = () =>  {

    const [scrollEnabled, setScrollEnabled] = useState( true );
    const [groupedEnabled, setGroupedEnabled] = useState( true );
    const [showOccurences, setShowOccurences] = useState( true );

    const items = [
        {
            itemId: 1,
            logo: logo1,
            description: 'Caro Confort',
            elementType: 'range',
        },
        {
            itemId: 2,
            logo: logo2,
            description: 'AB Menuiserie',
            elementType: 'range',
        },
        {
            itemId: 3,
            logo: logo3,
            description: 'Fournier',
            elementType: 'range',
        },
        {
            itemId: 4,
            logo: logo4,
            description: 'Krëfel',
            elementType: 'range',
        },
        {
            itemId: 5,
            logo: logo5,
            description: 'MG Terrassements',
            elementType: 'range',
        },
        {
            itemId: 6,
            logo: logo6,
            description: 'Roosens Bétons',
            elementType: 'range',
        },
        {
            itemId: 7,
            logo: logo7,
            description: 'Sopi Façades',
            elementType: 'range',
        },
    ];

    const [fixedItems, setFixedItems] = useState([
        {
            ...items[0],
            startDate: '2019-10-02',
            endDate: '2019-10-08',
            elementType: 'range',
        },
        {
            ...items[5],
            startDate: '2019-10-08',
            endDate: '2019-10-12',
            elementType: 'range',
        },
        {
            ...items[3],
            startDate: '2019-10-15',
            endDate: '2019-10-17',
            elementType: 'range',
        },
        {
            ...items[1],
            startDate: '2019-10-25',
            endDate: '2019-10-29',
            elementType: 'range',
        },
        {
            ...items[2],
            startDate: '2019-11-15',
            endDate: '2019-11-18',
            elementType: 'range',
        },
        {
            ...items[6],
            startDate: '2019-11-14',
            endDate: '2019-11-21',
            elementType: 'range',
        },
        {
            ...items[1],
            startDate: '2019-11-20',
            endDate: '2019-11-29',
            elementType: 'range',
        },
        {
            ...items[0],
            startDate: '2019-12-07',
            endDate: '2019-12-17',
            elementType: 'range',
        },
        {
            ...items[2],
            startDate: '2019-12-22',
            endDate: '2019-12-27',
            elementType: 'range',
        }
    ]);

    const [occurences, setOccurences] = useState({});

    useEffect(() => {
        if ( showOccurences )
        {
            let itemsOccurences = {}
            fixedItems.forEach( item => {
                itemsOccurences = {
                    ...itemsOccurences,
                    [item.itemId] : itemsOccurences[item.itemId] ? itemsOccurences[item.itemId]  + 1 : 1
                }
            });

            setOccurences( itemsOccurences );
        }
    }, [fixedItems, showOccurences]);

    const startDate = '2019-10-01';
    const endDate = '2019-12-31';

    const addHandler = ( {item, items} ) => {
        console.log( `Added : ${item}` );
    }

    const removeHandler = ( {item, items} ) => {
        console.log( `Removed : ${item}` );
    }

    const updateHandler = ( {item, items} ) => {
        console.log( `Updated : ${item}` );
    }

    const options = {
        callBacks : {
            onAdd : addHandler,
            onRemove: removeHandler,
            onUpdate: updateHandler
        },
        startDate : startDate, 
        endDate: endDate
    }


    return (
        <DndProvider backend={MouseBackEnd}>
            <>
                <div>
                    {
                        items.map(( item, index ) => (
                            <div style={{marginRight: '10px'}} key={`main_item_${index}`}>
                                <ElementWrapper 
                                    item={item}
                                    shadowed
                                    showOccurences={showOccurences}
                                />
                            </div>
                        ))
                    }
                </div>
                <div>
                    <Planner items={fixedItems} options={options} scroll={scrollEnabled} grouped={groupedEnabled}/>
                </div>
            </>
        </DndProvider>


```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
//import HTML5Backend from 'react-dnd-html5-backend';
import MouseBackEnd from 'react-dnd-mouse-backend'

import classes from './App.module.css';

import Timeline from './components/Timeline/Timeline';
import ElementWrapper from './components/ElementWrapper/ElementWrapper';

//import logo
import logo1 from './assets/images/logo1.png';
import logo2 from './assets/images/logo2.png';
import logo3 from './assets/images/logo3.png';

const App = () =>  {

    const [checked, setChecked] = useState( false );

    const items = [
        {
            itemId: 1,
            logo: logo1,
            description: 'Test Element 1',
            elementType: 'range',
        },
        {
            itemId: 2,
            logo: logo2,
            description: 'Test Element 2',
            elementType: 'range',
        },
        {
            itemId: 3,
            logo: logo3,
            description: 'Test Element 3',
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
            ...items[0],
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


    const startDate = '2019-10-01';
    const endDate = '2019-12-31';

    const addHandler = ( {item, items} ) => {
        console.log( `Added : ${item}` );
        setFixedItems( items );
    }

    const removeHandler = ( {item, items} ) => {
        console.log( `Removed : ${item}` );
        setFixedItems( items );
    }

    const updateHandler = ( {item, items} ) => {
        console.log( `Updated : ${item}` );
        setFixedItems( items );
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


//     const [test, setTest] = React.useState([1, 2, 3]);

//     const remove = index => {
//         const tmp = test ;
//         tmp.splice( index, 1);
//         setTest(tmp);
//         console.log('clicked');
//     }


// console.log(test);
    return (
        <DndProvider backend={MouseBackEnd}>
            <div className={classes.Content}>
                <p>Options</p>
                <div className={classes.ScrollEnabler}>
                    <span style={{marginRight: '10px', fontSize: '14px'}}>Enable / Disable Scroll</span>
                    <label className={classes.Switch}>
                        <input type="checkbox" checked={checked} onChange={() => setChecked( !checked )}/>
                        <span className={`${classes.Slider} ${classes.Round}`}></span>
                    </label>
                </div>
                <p>Droppable Items</p>
                <div className={classes.Elements}>
                    {
                        items.map(( item, index ) => (
                            <div style={{marginRight: '10px'}} key={`main_item_${index}`}>
                                <ElementWrapper item={item} />
                            </div>
                        ))
                    }
                </div>
                <div className={classes.Timeline}>
                    <Timeline items={fixedItems} options={options} scroll={checked}/>
                </div>

            </div>
        </DndProvider>
    );
}

export default App;

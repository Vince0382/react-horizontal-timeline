import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
//import HTML5Backend from 'react-dnd-html5-backend';
import MouseBackEnd from 'react-dnd-mouse-backend'

import classes from './App.module.css';

import { Planner, ElementWrapper} from './react-planning';

//import logo
import logo1 from './assets/images/logo1.png';
import logo2 from './assets/images/logo2.png';
import logo3 from './assets/images/logo3.png';
import logo4 from './assets/images/logo4.png';
import logo5 from './assets/images/logo5.png';
import logo6 from './assets/images/logo6.png';
import logo7 from './assets/images/logo7.png';


//Internal Component 

const Option = props => (
    <div className={classes.Option}>
        <span style={{marginRight: '10px', fontSize: '14px'}}>{props.children}</span>
        <label className={classes.Switch}>
            <input type="checkbox" checked={props.checked} onChange={props.onChange}/>
            <span className={`${classes.Slider} ${classes.Round}`}></span>
        </label>
    </div>
)


const App = () =>  {

    const [scrollEnabled, setScrollEnabled] = useState( true );
    const [groupedEnabled, setGroupedEnabled] = useState( true );
    const [showOccurences, setShowOccurences] = useState( true );

    const items = [
        {
            itemId: 1,
            content: {
                logo: logo1,
                line1: 'Caro Confort',
                line2: 'Carrelage'
            }
        },
        {
            itemId: 2,
            content: {
                logo: logo2,
                line1: 'AB Menuiserie',
                line2: 'Menuiserie'
            }
        },
        {
            itemId: 3,
            content: {
                logo: logo3,
                line1: 'Fournier',
                line2: 'Electricité'
            }
        },
        {
            itemId: 4,
            content: {
                logo: logo4,
                line1: 'Krëfel',
                line2: 'Cuisine'
            }
        },
        {
            itemId: 5,
            content: {
                logo: logo5,
                line1: 'MG Terrassements',
                line2: 'Terrassement'
            }
        },
        {
            itemId: 6,
            content: {
                logo: logo6,
                line1: 'Roosens Bétons',
                line2: 'Maçon'
            },
        },
        {
            itemId: 7,
            content: {
                logo: logo7,
                line1: 'Sopi Façades',
                line2: 'Façade'
            }
        }
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


    return (
        <DndProvider backend={MouseBackEnd}>
            <div className={classes.Content}>
                <p>Options</p>
                <div className={classes.Options}>
                    <Option checked={scrollEnabled} onChange={() => setScrollEnabled( !scrollEnabled )}>
                        Enable Scroll
                    </Option>
                    <Option checked={groupedEnabled} onChange={() => setGroupedEnabled( !groupedEnabled )}>
                        Grouped View
                    </Option>
                    <Option checked={showOccurences} onChange={() => setShowOccurences( !showOccurences )}>
                        Show Occurences
                    </Option>
                </div>
                <p>Droppable Items</p>
                <div className={classes.Elements}>
                    {
                        items.map(( item, index ) => (
                            <div style={{marginRight: '10px'}} key={`main_item_${index}`}>
                                <ElementWrapper 
                                    item={item}
                                    shadowed
                                    showOccurences={showOccurences}
                                    occurences={occurences[item.itemId]}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className={classes.Timeline}>
                    <Planner items={fixedItems} options={options} scroll={scrollEnabled} grouped={groupedEnabled}/>
                </div>

            </div>
        </DndProvider>
    );
}

export default App;

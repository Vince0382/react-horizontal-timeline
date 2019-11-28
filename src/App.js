import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import classes from './App.module.css';

import Timeline from './components/Timeline/Timeline';
import Element from './components/Element/Element';
import ElementWrapper from './components/ElementWrapper/ElementWrapper';

const App = () =>  {

    const fixedItems = [
        {
            id: 24,
            logo: '',
            description: 'Test Fixed Element 1',
            startDate: '2019-10-02',
            endDate: '2019-10-08',
            elementType: 'range',
        },
        {
            logo: '',
            description: 'Test Fixed Element 2',
            startDate: '2019-10-15',
            endDate: '2019-10-17',
            elementType: 'range',
        },
        {
            logo: '',
            description: 'Test Fixed Element 3',
            startDate: '2019-10-25',
            endDate: '2019-10-29',
            elementType: 'range',
        },
        {
            logo: '',
            description: 'Test Fixed Element 4',
            startDate: '2019-11-15',
            endDate: '2019-11-18',
            elementType: 'range',
        },
        {
            logo: '',
            description: 'Test Fixed Element 5',
            startDate: '2019-11-20',
            endDate: '2019-11-29',
            elementType: 'range',
        },
        {
            logo: '',
            description: 'Test Fixed Element 6',
            startDate: '2019-12-07',
            endDate: '2019-12-17',
            elementType: 'range',
        },
        {
            logo: '',
            description: 'Test Fixed Element 7',
            startDate: '2019-12-22',
            endDate: '2019-12-27',
            elementType: 'range',
        }
    ];

    const items = [
        {
            logo: '',
            description: 'Test Element 1',
            elementType: 'range',
        },
        {
            logo: '',
            description: 'Test Element 2',
            elementType: 'range',
        },
        {
            logo: '',
            description: 'Test Element 3',
            elementType: 'range',
        },
    ];

    const startDate = '2019-10-01';
    const endDate = '2019-12-31';

    const addHandler = item => {
        //console.log( item );
    }

    const removeHandler = item => {
        console.log( item );
    }

    const updateHandler = item => {
        //console.log( item );
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
        <DndProvider backend={HTML5Backend}>
            <div>
                <div className={classes.Elements}>
                    {
                        items.map(( item, index ) => (
                            <ElementWrapper key={`main_item_${index}`} item={item}>
                                <Element item={item} />
                            </ElementWrapper>
                        ))
                    }
                </div>
                <div className={classes.Timeline}>
                    <Timeline items={fixedItems} options={options}/>
                </div>
                {/* <div>
                    {
                        test.map(( item, index) => <div style={{width: '100px', heigth: '40px', padding: '20px', background: 'navy', color: 'white'}} onClick={() => remove( index )} key={item}>{item}</div>)
                    }
                </div> */}
            </div>
        </DndProvider>
    );
}

export default App;

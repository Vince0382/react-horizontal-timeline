import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import classes from './App.module.css';

import Timeline from './components/Timeline/Timeline';
import Element from './components/Element/Element';
import ElementWrapper from './components/ElementWrapper/ElementWrapper';

const App = () =>  {

    const items = [
        {
            id: 24,
            logo: '',
            description: 'Test element 1',
            startDate: '2019-10-02',
            endDate: '',
            elementType: 'range',
        },
        {
            logo: '',
            description: 'Test element 2',
            startDate: '2019-10-15',
            endDate: '',
            elementType: 'range',
        },
        {
            logo: '',
            description: 'Test element 3',
            startDate: '2019-10-29',
            endDate: '',
            elementType: 'range',
        },
        {
            logo: '',
            description: 'Test element 4',
            startDate: '2019-11-15',
            endDate: '',
            elementType: 'range',
        },
        {
            logo: '',
            description: 'Test element 5',
            startDate: '2019-11-20',
            endDate: '',
            elementType: 'range',
        },
        {
            logo: '',
            description: 'Test element 6',
            startDate: '2019-12-07',
            endDate: '',
            elementType: 'range',
        },
        {
            logo: '',
            description: 'Test element 7',
            startDate: '2019-12-22',
            endDate: '',
            elementType: 'range',
        }
    ];

    const startDate = '2019-10-01';
    const endDate = '2019-12-01';

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
                    <Timeline items={items} options={options}/>
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

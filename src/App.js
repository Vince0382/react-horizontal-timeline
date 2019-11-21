import React from 'react';
import classes from './App.module.css';

import Timeline from './components/Timeline/Timeline';
import Element from './components/Element/Element';

const App = () =>  {

    const items = [
        {
            id: 24,
            logo: '',
            description: 'Test element 1',
            startDate: '',
            endDate: '',
            type: 'range',
        },
        {
            logo: '',
            description: 'Test element 2',
            startDate: '',
            endDate: '',
            type: 'range',
        },
        {
            logo: '',
            description: 'Test element 3',
            startDate: '',
            endDate: '',
            type: 'range',
        },
        {
            logo: '',
            description: 'Test element 4',
            startDate: '',
            endDate: '',
            type: 'range',
        }
    ]

    return (
        <div>
            <div className={classes.Elements}>
                {
                    items.map(( item, index ) => <Element key={`main_item_${index}`} item={item} />)
                }
            </div>
            <div className={classes.Timeline}>
                <Timeline items={items}/>
            </div>
        </div>
    );
}

export default App;

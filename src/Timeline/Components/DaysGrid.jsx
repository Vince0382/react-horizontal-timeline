import React from 'react';
import PropTypes from 'prop-types';

import * as helpers from '../Helpers/Functions';
import DropZone from './DropZone';
import { MONTHS } from '../Constants';

export const MARGIN = 20;


// Static Styles Section

const styles ={
    daysGrid : {
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        flexWrap: 'nowrap',
        transition: 'all 0.3s ease-in-out',
        userSelect: 'none'
    },
    daysString : {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate( -50%, -50% )',
        fontWeight: 'bold',
        color: '#f1f1f1',
        fontSize: '42px',
        zIndex: 5,
        opacity: '0.5'
    }
    
}

const DaysGrid = props => {

    const { month, width, ...rest} = props;
    const daysDropGrid = [];
    const days = helpers.getDaysInMonth( month.month, month.year);

    let style = {
        width: props.width / days
    };

    for( let i = 1; i <= days; i++ )
    {
        if ( i === days ) style = {...style, border: 'none'};

        daysDropGrid.push(
            <DropZone 
                {...rest}
                style={style}
                key={`grid_${month.month}_${i}`}
                dropDate={new Date(month.year, month.month - 1, i)}
            />
        ) 
    }
    
    return (
        <div style={{...styles.daysGrid, ...props.style, width: props.width}}>
            {daysDropGrid}
            {
                props.scroll
                    ?   <div style={styles.daysString}>
                            {
                                MONTHS[month.month]
                            }
                        </div>
                    : null
            }

        </div>
    )
}

DaysGrid.defaultProps = {
    width: 0
};

DaysGrid.propTypes = {
    width: PropTypes.number,
    onDrop: PropTypes.func,
    scroll: PropTypes.bool
}

export default DaysGrid;
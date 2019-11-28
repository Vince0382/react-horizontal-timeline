import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import * as helpers from '../Helpers/Functions';
import classes from './DaysGrid.module.css';
import DropZone from '../DropZone/DropZone';

export const MARGIN = 20;

const DaysGrid = props => {

    const { month, width, ...rest} = props;
    const daysDropGrid = [];
    const days = helpers.getDaysInMonth( month.month, month.year);

    for( let i = 1; i <= days; i++ )
    {
        let style = {
            width: width / days + 1
        };
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
        <div className={classes.DaysGrid} style={{...props.style}}>
            {daysDropGrid}
        </div>
    )
}

DaysGrid.defaultProps = {
    width: 0
};

DaysGrid.propTypes = {
    width: PropTypes.number,
    onDrop: PropTypes.func,
}

export default DaysGrid;
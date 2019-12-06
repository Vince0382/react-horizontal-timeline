import React from 'react';
import PropTypes from 'prop-types';

import * as helpers from '../../Helpers/Functions';
import DropZone from '../DropZone/DropZone';
import classes from './DaysGrid.module.css';
import { MONTHS } from '../../Constants';

export const MARGIN = 20;

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
        <div 
            className={classes.DaysGrid} 
            style={{width: props.width, borderLeft: props.grouped ? '1px solid #ccc' : null}}
        >
            <div className={classes.Month} style={{...props.style, width: props.width, borderLeft: props.grouped ? '1px solid #ccc' : null}}>
                {`${MONTHS[props.month.month]} ${props.month.year}`}
            </div>
            <div className={classes.DropZones} style={{...props.style, borderLeft: props.grouped ? '1px solid #ccc' : null}}>
                {daysDropGrid}
            </div>

        </div>
    )
}

DaysGrid.defaultProps = {
    width: 0,
    grouped: false
};

DaysGrid.propTypes = {
    width: PropTypes.number,
    onDrop: PropTypes.func,
    grouped: PropTypes.bool
}

export default DaysGrid;
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

    const borderSytle = {
        borderLeftStyle: !props.grouped && props.index === 0 ? 'none' : 'solid'
    }
    
    return (
        <div 
            className={classes.DaysGrid} 
            style={{
                width: props.width,
            }}
        >
            <div 
                className={classes.Month} 
                style={{
                    ...props.style,
                    width: props.width,
                    ...borderSytle
                    }}
            >
                {`${MONTHS[props.month.month]} ${props.month.year}`}
            </div>
            <div 
                className={classes.DropZones} 
                style={{
                    ...props.style,
                    ...borderSytle,
                    width: props.width
                    }}
                >
                {daysDropGrid}
            </div>

        </div>
    )
}

DaysGrid.defaultProps = {
    width: 0,
    grouped: false,
    index: 0
};

DaysGrid.propTypes = {
    width: PropTypes.number,
    onDrop: PropTypes.func,
    grouped: PropTypes.bool,
    month: PropTypes.object,
    index: PropTypes.number
}

export default DaysGrid;
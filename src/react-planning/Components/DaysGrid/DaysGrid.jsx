import React from 'react';
import PropTypes from 'prop-types';

import * as helpers from '../../Helpers/Functions';
import DropZone from '../DropZone/DropZone';
import classes from './DaysGrid.module.css';
import { MONTHS } from '../../Constants/Constants';

export const MARGIN = 20;

const DaysGrid = props => {

    const { month, width, offset, ...rest} = props;
    const daysDropGrid = [];
    const days = helpers.getDaysInMonth( month.month, month.year);

    const effectiveWidth = width - offset;

    let style = {
        width: effectiveWidth / days
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
        borderLeftStyle: !props.grouped && props.index === 0 ? 'none' : 'solid',
    }
    
    return (
        <div 
            className={classes.DaysGrid} 
            style={{
                width: effectiveWidth,
                left: offset,
            }}
        >
            <div 
                className={classes.MonthWrapper} 
                style={{
                    ...props.style,
                    width: effectiveWidth,
                    ...borderSytle
                    }}
            >
                <div className={classes.Month}>
                    {`${MONTHS[props.month.month]} ${props.month.year}`}
                </div>
            </div>
            <div 
                className={classes.DropZones} 
                style={{
                    ...props.style,
                    ...borderSytle,
                    width: effectiveWidth
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
    index: 0,
    offset: 0,
};

DaysGrid.propTypes = {
    width: PropTypes.number,
    onDrop: PropTypes.func,
    grouped: PropTypes.bool,
    month: PropTypes.object,
    index: PropTypes.number,
    offset: PropTypes.number,
}

export default DaysGrid;
import React from 'react';
import PropTypes from 'prop-types';

import { rgbaFromArray } from '../../Helpers/Functions';

// Static styles section 

const styles = {
    itemDefault : {
        width: 'calc(100% - 10px)',
        padding: '5px',
        height: '40px',
        borderRadius: '4px',
    },
    itemFlex : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        height: '100%'
    },
    description : {
        paddingLeft: '5px'
    },
    imagesWrapper : {
        height: '40px',
        borderRadius: '4px',
        overflow : 'hidden'
    },
    images : {
        height: '100%',
    }
}

const alpha = 0.7;
const defaultColors = {
    outerElement : [204, 204, 204],
    innerElement : [70, 130, 180]
}

const DefaultDetailedElement = props => {

    return (
        <div 
            style={{
                ...styles.itemDefault, 
                background: props.innerElement ? rgbaFromArray( props.bgColor, alpha ): rgbaFromArray(defaultColors.outerElement, alpha),
                ...props.style,
            }}
                
        >
            <div style={styles.itemFlex}>
                <div style={styles.imagesWrapper}>
                    <img style={styles.images} src={props.item.logo} alt='Logo' draggable='false' onMouseDown={event => event.preventDefault()}/>
                </div>
                <div style={styles.description}>
                    {
                        props.item.description
                    }
                </div>
            </div>
            
        </div>
    )
}

DefaultDetailedElement.defaultProps = {
    item: {
        id: null,
        logo: '',
        description: '',
        startDate: '',
        endDate: '',
        type: 'range',
    },
    randomColor: false,
    innerElement: false,
    bgColor: defaultColors.innerElement
}

DefaultDetailedElement.propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.object,
    innerElement: PropTypes.bool,
    bgColor: PropTypes.array
}

export default DefaultDetailedElement;
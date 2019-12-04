import React from 'react';
import PropTypes from 'prop-types';

import { rgbaFromArray } from '../../Helpers/Functions';

// Static styles section 

const styles = {
    itemDefault : {
        width: '100%',
        height: '20px',
        borderRadius: '4px',
    }
}

const alpha = 0.7;

const DefaultBasicElement = props => {

    return (
        <div 
            style={{
                ...styles.itemDefault, 
                ...props.style, 
                background: rgbaFromArray( props.bgColor, alpha )}}
        >   
        </div>
    )
}

DefaultBasicElement.defaultProps = {

}

DefaultBasicElement.propTypes = {
    style: PropTypes.object,
    bgColor: PropTypes.array
}

export default DefaultBasicElement;
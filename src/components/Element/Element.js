import React from 'react';
import PropTypes from 'prop-types';


// Static styles section 

const styles = {
    itemDefault : {
        width: '100%',
        padding: '5px',
        height: '40px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxShadow: '0 2px 2px #ccc',
    },
    itemFlex : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    description : {

    },   
}


const Element = props => {

    return (
        <div 
            style={{...styles.itemDefault, ...props.style, background: props.innerElement ? 'rgba(70, 130, 180, 0.8)' : 'rgba(204, 204, 204, 0.8)'}}
        >
            <div style={styles.itemFlex}>
                <img src={props.item.logo} alt='Logo' />
                <div style={styles.description}>
                    {
                        props.item.description
                    }
                </div>
            </div>
            
        </div>
    )
}

Element.defaultProps = {
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
}

Element.propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.object,
    innerElement: PropTypes.bool
}

export default Element;
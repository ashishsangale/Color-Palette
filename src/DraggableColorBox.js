import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const styles={
    root: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-4.5px',
        '&:hover svg': {
            color: 'white',
            transform: 'scale(1.3)'
        }
    },
    boxContent: {
        position: 'absolute',
        width: '100%',
        left: '0px',
        bottom: '0px',
        padding: '10px',
        letterSpacing: '1px',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        color: 'rgba(0,0,0,0.5)'
    },
    deleteIcon: {
        transition: 'all 0.3s ease-in-out'
    }
}

function DraggableColorBox(props) {
    const {classes, handleClick, color, name} = props
    return (
        <div className={classes.root} style={{backgroundColor: color}}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteOutlinedIcon className={classes.deleteIcon} onClick={handleClick}/>
            </div>
           
        </div>
    )
}

export default withStyles(styles)(DraggableColorBox);

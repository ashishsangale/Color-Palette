import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root:{
        backgroundColor: 'white',
        border: '2px solid black',
        borderRadius: '5px',
        padding: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        "&:hover:": {
            cursor: 'pointer'
        }
    },
    colors:{
        backgroundColor: 'grey'
    },
    title:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px',
        fontSize: '1rem',
        position: 'relative',
        paddingTop: '0.5rem'
    },
    emoji:{
        marginLeft: '0.5rem',
        fontSize: '1.5rem'
    }
}

function Minipalette(props){
    const {classes, paletteName, emoji} = props
    return(
        <div className={classes.root}>
            <div className={classes.colors}>
                <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
            </div>
        </div>
    )
}

export default withStyles(styles)(Minipalette);
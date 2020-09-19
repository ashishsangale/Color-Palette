import React from 'react';
import styles from './styles/MinipaletteStyles'
import { withStyles } from '@material-ui/core/styles';



function Minipalette(props){
    const {classes, paletteName, emoji, colors} = props
    const miniPalettes = colors.map(color => (
        <div className={classes.miniColor} style={{backgroundColor: color.color}} key={color.name}/>

        
    ))
    return(
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.colors}>
                {miniPalettes}
            </div>
            <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
        </div>
    )
}

export default withStyles(styles)(Minipalette);
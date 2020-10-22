import React,{Component} from 'react';
import styles from './styles/MinipaletteStyles'
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

class Minipalette extends Component{
    constructor(props){
        super(props)
        this.deletePalette = this.deletePalette.bind(this)
    }

    deletePalette(e){
        e.stopPropagation()
        this.props.openDialog(this.props.id)
    }
    render(){
    const {classes, paletteName, emoji, colors} = this.props
    const miniPalettes = colors.map(color => (
        <div className={classes.miniColor} style={{backgroundColor: color.color}} key={color.name}/>  
    ))
    return(
        <div className={classes.root} onClick={this.props.handleClick}>
                <DeleteIcon className={classes.deleteIcon} style={{transition: '0.3s ease-in-out'}} onClick={this.deletePalette}/>
            <div className={classes.colors}>
                {miniPalettes}
            </div>
            <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
        </div>
    )}
}

export default withStyles(styles)(Minipalette);
import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Navbar from './Navbar'
import Footer from './Footer';
import { withStyles } from '@material-ui/core/styles';

const Styles = {
    Palette:{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    colors:{
        height: '90%'
    }
}

class Palette extends Component {
    constructor(props){
        super(props);
        this.state = {
            level:500,
            format: 'hex'
        }
        this.changeLevel = this.changeLevel.bind(this)
        this.changeFormat = this.changeFormat.bind(this)
    }

    changeLevel(newLevel){
        this.setState({
            level: newLevel
        })
    }

    changeFormat(val){
        this.setState({
            format: val
        })
    }

    render() {
        const {level, format} = this.state;
        const {colors, paletteName, emoji, id} = this.props.palette;
        const {classes} = this.props;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color[format]} name={color.name} key={color.id} id={color.id} paletteId={id} fullPalette={true}/>
        ))
        return (
            <div className={classes.Palette}>
                <Navbar level={level} changeLevel={this.changeLevel} handleFormat={this.changeFormat} showSlider={true}/>
                <div className={classes.colors}>
                    {colorBoxes}
                </div>
                <Footer paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(Styles)(Palette);

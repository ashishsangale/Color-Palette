import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import Footer from './Footer';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const Styles = {
    Palette:{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    colors:{
        height: '90%'
    },
    goBack:{
        width: '20%',
        height: '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-4.5px',
        opacity: '1',
        background: 'black',
        '& a':{
        color: 'white',
        width: '100px',
        height: '30px',
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        marginLeft: '-50px',
        marginTop: '-15px',
        outline: 'none',
        background: 'rgba(255, 255, 255, 0.3)',
        fontSize: '1rem',
        lineHeight: '30px',
        textAlign: 'center',
        border: 'none',
        textDecoration: 'none',
        }
    }
}

class SingleColor extends Component {
    constructor(props){
        super(props)
        this._shades = this.gatherShades(this.props.palette, this.props.colorId)
        //console.log(this._shades)
        this.state = {
            format: 'hex'
        }
        this.changeFormat = this.changeFormat.bind(this)
    }

    gatherShades(palette, colorToFilterBy){
        let shades = [];
        let allColors = palette.colors;

        for(let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }

        return shades.slice(1)
    }

    changeFormat(val){
        this.setState({
            format: val
        })
    }
    render() {
        const {format} = this.state
        const {paletteName, emoji, id} = this.props.palette;
        const {classes} = this.props;
        const colorBoxes = this._shades.map(color => (
            <ColorBox key={color.name} name={color.name} background={color[format]} fullPalette ={false}/>
        ))
        return (
            <div className={classes.Palette}>
                <Navbar handleFormat={this.changeFormat} showSlider={false}/>
                <div className={classes.colors}>
                {colorBoxes}
                <div className={classes.goBack}>
                    <Link to={`/palette/${id}`}>GO BACK!</Link>
                </div>
                </div>
                <Footer paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(Styles)(SingleColor);

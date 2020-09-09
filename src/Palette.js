import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Navbar from './Navbar'
import Footer from './Footer';

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
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color[format]} name={color.name} key={color.id} id={color.id} paletteId={id} showLink={true}/>
        ))
        return (
            <div className='Palette'>
                <Navbar level={level} changeLevel={this.changeLevel} handleFormat={this.changeFormat} showSlider={true}/>
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                <Footer paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default Palette;

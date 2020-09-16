import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './ColorBox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/core/styles';


const Styles ={
     
}

class ColorBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            isCopied: false
        }
        this.changeCopyStyle = this.changeCopyStyle.bind(this)
    }
    changeCopyStyle(){
        this.setState(
            {isCopied:true},
            () => {
                setTimeout(() => this.setState({isCopied: false}), 1000)
            }
        )
    }

    render() {
        const {name, background, paletteId, id, showLink} = this.props;
        const {isCopied} = this.state;
        const isDark = chroma(background).luminance() <= 0.08
        const isLight = chroma(background).luminance() > 0.6
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyStyle}>
            <div style={{background:background}} className='ColorBox'>
                <div style={{background}} className={`copy-overlay ${isCopied && 'show'}`}/>
                <div style={{background}} className={`copy-msg ${isCopied && 'show'}`}>
                    <h1>COPIED!</h1>
                    <p className={isLight && 'dark-text'}>{background}</p>
                </div>
                <div className='copy-container'>
                    <div className='box-content'>
                        <span className={isDark && 'light-text'}>{name}</span>
                    </div>
                    <button className={`copy-button ${isLight && 'dark-text'}`}>COPY</button>
                </div>
                {showLink &&
                 (<Link to={`/palette/${paletteId}/${id}`} onClick={(e) => e.stopPropagation()}>
                    <span className={`more ${isLight && 'dark-text'}`}>MORE!</span>
                </Link>)
                }
            </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(Styles)(ColorBox);

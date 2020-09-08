import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './ColorBox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard'


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
        const {name, background, paletteId, id} = this.props;
        const {isCopied} = this.state
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyStyle}>
            <div style={{background:background}} className='ColorBox'>
                <div style={{background}} className={`copy-overlay ${isCopied && 'show'}`}/>
                <div style={{background}} className={`copy-msg ${isCopied && 'show'}`}>
                    <h1>COPIED!</h1>
                    <p>{background}</p>
                </div>
                <div className='copy-container'>
                    <div className='box-content'>
                        <span>{name}</span>
                    </div>
                    <button className='copy-button'>COPY</button>
                </div>
                <Link to={`/palette/${paletteId}/${id}`} onClick={(e) => e.stopPropagation()}>
                    <span className='more'>More!</span>
                </Link>
            </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import styles from './styles/ColorBoxStyles';
import { withStyles } from '@material-ui/core/styles';

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
        const {name, background, paletteId, id, fullPalette, classes} = this.props;
        const {isCopied} = this.state;
        
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyStyle}>
            <div style={{background:background}} className={classes.colorBox}>
                <div style={{background}} className={`${classes.copyOverlay} ${isCopied && classes.showOverlay}`}/>
                <div style={{background}} className={`${classes.copyMessage} ${isCopied && classes.showMessage}`}>
                    <h1>COPIED!</h1>
                    <p className={classes.copyText}>{background}</p>
                </div>
                <div>
                    <div className={classes.boxContent}>
                        <span className={classes.colorName}>{name}</span>
                    </div>
                    <button className={classes.copyButton}>COPY</button>
                </div>
                {fullPalette &&
                 (<Link to={`/palette/${paletteId}/${id}`} onClick={(e) => e.stopPropagation()}>
                    <span className={classes.more}>MORE!</span>
                </Link>)
                }
            </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);

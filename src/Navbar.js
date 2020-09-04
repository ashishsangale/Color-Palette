import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import './Navbar.css';

class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            format: 'hex',
            open: false
        }
        this.handleFormat = this.handleFormat.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }
    
    handleFormat(e){
        this.setState({
            format: e.target.value,
            open: true
        })
        this.props.handleFormat(e.target.value);
    }

    closeSnackbar(){
        this.setState({open:false})
    }

    render() {
        const {level, changeLevel} = this.props;
        const {format} = this.state;
        return (
            <header className='Navbar'>
                <div className='logo'>
                    <Link to='/'>COLOR PALETTE</Link>
                </div>
                <div className='slider-container'>
                    <span>Level: {level}</span>
                    <div className='slider'>
                        <Slider
                        defaultValue={level}
                        min={100}
                        max={900}
                        step={100}
                        onAfterChange={changeLevel}/>
                    </div>
                </div>
                <div className='select'>
                <Select value={format} onChange={this.handleFormat}>
                    <MenuItem value='hex'>HEX-#ffffff</MenuItem>
                    <MenuItem value='rgb'>RGB-rgb(255,255,255)</MenuItem>
                    <MenuItem value='rgba'>RGBA-rgba(255,255,255,1.0)</MenuItem>
                </Select>
                </div>
                <Snackbar 
                anchorOrigin={{vertical: 'bottom', horizontal:'left'}}
                open={this.state.open}
                autoHideDuration={2000}
                message={<span id='message'>Format Changed to {format.toUpperCase()}</span>}
                ContentProps={{
                    "aria-describedby":'message'
                }}
                action={[
                    <IconButton onClick={this.closeSnackbar} color='inherit' keys='close' aria-label='close'>
                        <CloseIcon/>
                    </IconButton>
                ]}
                onClose={this.closeSnackbar}/>
            </header>
        )
    }
}

export default Navbar;

import React, { Component } from 'react';
//import {Link} from 'react-router-dom';
import Minipalette from './Minipalette';
import { withStyles } from '@material-ui/core/styles';

const Styles = {
    root:{
        backgroundColor: 'blue',
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    container:{
        width: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap' 
    },
    nav:{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        color: 'white'

    },
    palettes:{
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3,30%)',
        gridGap: '5px'
    }
}

class PaletteList extends Component {

    goToPalette(id){
        this.props.history.push(`/palette/${id}`)
    }

    render() {
        const {palettes, classes} = this.props
        const paletteList = palettes.map(palette => (
            <Minipalette {...palette} handleClick={() => this.goToPalette(palette.id)}/>
        ))

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>COLOR PALETTE</h1>
                    </nav>
                    <div className={classes.palettes}>
                        {paletteList}
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(Styles)(PaletteList);

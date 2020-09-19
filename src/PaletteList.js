import React, { Component } from 'react';
import Minipalette from './Minipalette';
import styles from './styles/PaletteListStyles';
import { withStyles } from '@material-ui/core/styles';



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

export default withStyles(styles)(PaletteList);

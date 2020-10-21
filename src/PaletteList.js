import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Minipalette from './Minipalette';
import styles from './styles/PaletteListStyles';
import { withStyles } from '@material-ui/core/styles';
import { CSSTransition,TransitionGroup } from 'react-transition-group';

class PaletteList extends Component {

    goToPalette(id){
        this.props.history.push(`/palette/${id}`)
    }

    render() {
        const {palettes, classes, deletePalette} = this.props
        const paletteList = palettes.map(palette => (
            <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                <Minipalette {...palette} handleClick={() => this.goToPalette(palette.id)} key={palette.id} id={palette.id} deletePalette={deletePalette}/>
            </CSSTransition>
        ))

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>COLOR PALETTE</h1>
                        <Link to='/palette/new'>Create new Palette</Link>
                    </nav>
                        <TransitionGroup className={classes.palettes}>
                            {paletteList}
                        </TransitionGroup>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);

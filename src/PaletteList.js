import React, { Component } from 'react';
//import {Link} from 'react-router-dom';
import Minipalette from './Minipalette';

class PaletteList extends Component {

    render() {
        const {palettes} = this.props
        const paletteList = palettes.map(palette => (
            <Minipalette {...palette}/>
        ))

        return (
            <div>
                
                <h1>COLOR PALETTE</h1>
                {paletteList}
            </div>
        )
    }
}

export default PaletteList;

import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class PaletteList extends Component {

    render() {
        const {palettes} = this.props
        const paletteList = palettes.map(palette => (
            <p>
                <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
            </p>
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

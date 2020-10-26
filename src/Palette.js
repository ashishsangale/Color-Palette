import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "./styles/PaletteStyles";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format: "hex",
    };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(newLevel) {
    this.setState({
      level: newLevel,
    });
  }

  changeFormat(val) {
    this.setState({
      format: val,
    });
  }

  render() {
    const { level, format } = this.state;
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { classes } = this.props;
    const colorBoxes = colors[level].map((color) => (
      <Grid item className="box" xs={4} md={2} lg={3}>
        <ColorBox
          background={color[format]}
          name={color.name}
          key={color.id}
          id={color.id}
          paletteId={id}
          fullPalette={true}
        />
      </Grid>
    ));
    return (
      <div className={classes.Palette}>
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleFormat={this.changeFormat}
          showSlider={true}
        />
        <Grid container spacing={1} className="colorbox">
          {colorBoxes}
        </Grid>
        <Footer paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);

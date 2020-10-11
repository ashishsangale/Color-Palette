import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import DraggableColorList from './DraggableColorList'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {arrayMove} from 'react-sortable-hoc';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    height: 'calc(100vh - 64px)',
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class NewPaletteForm extends Component {
  static defaultProps ={
    maxColors : 20
  }
  constructor(props){
    super(props);
    this.state = {
      open: true,
      currentColor: 'yellow',
      colors: this.props.palette[0].colors,
      newColorName: '',
      newPaletteName: ''
    }
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColors = this.addRandomColors.bind(this)
  }

  componentDidMount() {
    // custom rule will have name 'isColorNameUnique'
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => 
        this.state.colors.every(
          ({name}) => name.toLowerCase() !== value.toLowerCase()
        )
    );
    ValidatorForm.addValidationRule('isColorUnique', (value) => 
        this.state.colors.every(
          ({color}) => color !== this.state.currentColor
        )
    );
    ValidatorForm.addValidationRule('isPaletteUnique', (value) => 
        this.props.palette.every(
          ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
        )
    );
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor(newColor){
    this.setState({
      currentColor: newColor.hex
    })
  }

  addNewColor(){
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    }
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: ''
    })
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit(){
    const newName = this.state.newPaletteName
    const newPalette = {
      paletteName: this.state.newPaletteName,
      colors: this.state.colors,
      id: newName.toLowerCase().replace(/ /g,'-')
    };
    this.props.savePalette(newPalette);
    this.props.history.push('/')
  }

  removeColor(colorName){
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    })
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  clearColors(){
    this.setState({colors: []})
  }

  addRandomColors(){
    const allColors = this.props.palette.map(p => p.colors).flat()
    var rand = Math.floor(Math.random() * allColors.length)
    const newRandomColor = allColors[rand]
    this.setState({
      colors: [...this.state.colors, newRandomColor]
    })
  }

  render() {
    const { classes, maxColors } = this.props;
    const { open, colors } = this.state;
    const isPaletteFull = colors.length >= maxColors
    

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          color='default'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator 
              value={this.state.newPaletteName} 
              label='New Palette'
              name='newPaletteName' 
              validators={['required', 'isPaletteUnique' ]}
              errorMessages={['Palette Name cannot be empty','Palette Name already exist']}
              onChange={this.handleChange}/>
              <Button variant='contained' color='primary' type='submit'>Save Palette</Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant='h6'>Make your own Palette</Typography>
          <div>
            <Button variant='contained' color='secondary' onClick={this.clearColors}>
              Clear Palette
            </Button>
            <Button 
            variant='contained' 
            color='primary' 
            onClick={this.addRandomColors}
            disabled={isPaletteFull}>
              Random Color
            </Button>
          </div>
          <ChromePicker
            color={this.state.currentColor}
            onChangeComplete={this.updateCurrentColor}
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator 
            value={this.state.newColorName} 
            name='newColorName'
            onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['this field is required', 'Color Name already taken', 'Color already taken']}/>
            <Button variant='contained' color='primary' style={{background: isPaletteFull ? 'grey': this.state.currentColor}} type='submit' disabled={isPaletteFull}>
              {isPaletteFull ? 'Palette Full' : 'Add Color'}
            </Button>
          </ValidatorForm>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList 
          colors={this.state.colors} 
          removeColor={this.removeColor} 
          axis='xy'
          onSortEnd={this.onSortEnd}/>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
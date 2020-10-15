import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import classNames from "classnames";
import FormDialog from './FormDialog'
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import styles from './styles/PaletteFormNavStyles'

class PaletteFormNav extends Component {
    constructor(props){
        super(props)
        this.state ={
            newPaletteName: '',
            isFormOpen: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    handleChange(e){
        this.setState({
          [e.target.name] : e.target.value
        })
    }

    showForm(){
      this.setState({
        isFormOpen: true
      })
    }

    hideForm(){
      this.setState({
        isFormOpen: false
      })
    }
    render() {
        const {classes, open, palette, handleSubmit} = this.props
        
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
                onClick={this.props.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant='h6' color='inherit' noWrap>
                Create a Palette
                </Typography>
            </Toolbar>
            <div className={classes.navBtn}>
                  <Link to='/'>
                      <Button variant='contained' color='secondary' className={classes.button}>GO Back</Button>
                  </Link>
                  <Button variant="contained" color="primary" onClick={this.showForm} className={classes.button}>
                    Save Palette 
                  </Button>
                </div>
            </AppBar>
            {this.state.isFormOpen && (
              <FormDialog palette={palette} handleSubmit={handleSubmit} hideForm={this.hideForm}/>
            )}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
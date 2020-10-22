import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Minipalette from './Minipalette';
import styles from './styles/PaletteListStyles';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import { CSSTransition,TransitionGroup } from 'react-transition-group';

class PaletteList extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            deleteId: ''
        }
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.goToPalette = this.goToPalette.bind(this);
    }
    goToPalette(id){
        this.props.history.push(`/palette/${id}`)
    }

    openDialog(id){
        this.setState({
            open: true,
            deleteId: id
        })
    }

    closeDialog(){
        this.setState({
            open: false,
            deleteId: ''
        })
    }

    handleDelete(){
        this.props.deletePalette(this.state.deleteId);
        this.closeDialog()
    }

    render() {
        const {palettes, classes} = this.props
        const {open} = this.state
        const paletteList = palettes.map(palette => (
            <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                <Minipalette 
                {...palette} 
                handleClick={this.goToPalette} 
                key={palette.id} 
                id={palette.id} 
                //deletePalette={deletePalette}
                openDialog={this.openDialog}/>
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
                <Dialog open={open} aria-labelledby='delete-palette-dialog' onClose={this.closeDialog}>
                    <DialogTitle>
                        Do you really want to delete this palette?
                    </DialogTitle>
                    <List>
                        <ListItem onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: 'blue'}}>
                                    <CheckIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Yes'/>
                        </ListItem>
                        <ListItem onClick={this.closeDialog}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor: 'red'}}>
                                    <CloseIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='No'/>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);

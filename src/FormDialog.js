import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class FormDialog extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: false,
            newPaletteName: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteUnique', (value) => 
        this.props.palette.every(
          ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
        )
    );
    }

    handleClickOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleChange(e){
        this.setState({
          [e.target.name] : e.target.value
        })
    }
render(){
    const {newPaletteName} = this.state
    return (
    <div>
      <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
            <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
                  <TextValidator 
                  value={newPaletteName} 
                  label='New Palette'
                  name='newPaletteName' 
                  validators={['required', 'isPaletteUnique' ]}
                  errorMessages={['Palette Name cannot be empty','Palette Name already exist']}
                  onChange={this.handleChange}/>
                  <Button variant='contained' color='primary' type='submit'>Save Palette</Button>
            </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
}

export default FormDialog;
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class FormDialog extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: true,
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
      <Dialog open={this.state.open} onClose={this.props.hideForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Save Palette</DialogTitle>
        <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your beautiful Palette. Make sure it's Unique!!! 
          </DialogContentText>
          <Picker/>
                  <TextValidator 
                  value={newPaletteName} 
                  label='New Palette'
                  name='newPaletteName' 
                  fullWidth
                  margin='normal'
                  validators={['required', 'isPaletteUnique' ]}
                  errorMessages={['Palette Name cannot be empty','Palette Name already exist']}
                  onChange={this.handleChange}/>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.props.hideForm}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' type='submit'>Save Palette</Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>
  );
}
}

export default FormDialog;
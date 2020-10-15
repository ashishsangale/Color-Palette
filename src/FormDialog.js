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
            stage: 'form',
            newPaletteName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.addEmoji = this.addEmoji.bind(this);
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

    showEmojiPicker(){
        this.setState({
            stage: 'emoji'
        })
    }

    addEmoji(emoji){
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native
        }
        this.props.handleSubmit(newPalette)
    }
render(){
    const {newPaletteName} = this.state
    return (
        <div>
        <Dialog open={this.state.stage === 'emoji'} onClose={this.props.hideForm}>
            <DialogTitle id="form-dialog-title">Choose Palette Emoji</DialogTitle>
            <Picker onSelect={this.addEmoji}/>
        </Dialog>
        <Dialog open={this.state.stage === 'form'} onClose={this.props.hideForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Save Palette</DialogTitle>
        <ValidatorForm onSubmit={this.showEmojiPicker}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your beautiful Palette. Make sure it's Unique!!! 
          </DialogContentText>
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
      </div>
  );
}
}

export default FormDialog;
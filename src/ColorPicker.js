import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const styles ={
    picker:{
        width: '100% !important',          //over-rule parent styles
        marginTop: '2rem'
    },
    addColor: {
        width: '100%',
        padding: '0.7rem',
        marginTop: '1rem',
        fontSize: '2rem'
    },
    input:{
        width: '100%',
        height: '70px'
    }
}

class ColorPicker extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentColor: 'yellow',
            newColorName: ''
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this )
    }

    componentDidMount() {
        // custom rule will have name 'isColorNameUnique'
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => 
            this.props.colors.every(
              ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', (value) => 
            this.props.colors.every(
              ({color}) => color !== this.state.currentColor
            )
        );
        
      }

    updateCurrentColor(newColor){
        this.setState({
          currentColor: newColor.hex
        })
    }

    handleChange(e){
        this.setState({
          [e.target.name] : e.target.value
        })
    }

    handleSubmit(){
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor)
        this.setState({
            newColorName: ''
        })
    }

    render() {
        const {isPaletteFull, classes} = this.props
        return (
            <div>
                <ChromePicker
                color={this.state.currentColor}
                onChangeComplete={this.updateCurrentColor}
                className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                <TextValidator 
                className={classes.input}
                variant='filled'
                margin='normal'
                placeholder="Color name"
                value={this.state.newColorName} 
                name='newColorName'
                onChange={this.handleChange}
                validators={['required', 'isColorNameUnique', 'isColorUnique']}
                errorMessages={['this field is required', 'Color Name already taken', 'Color already taken']}/>
                <Button variant='contained' color='primary' style={{background: isPaletteFull ? 'grey': this.state.currentColor}} type='submit' disabled={isPaletteFull}
                className={classes.addColor}>
                {isPaletteFull ? 'Palette Full' : 'Add Color'}
                </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPicker);

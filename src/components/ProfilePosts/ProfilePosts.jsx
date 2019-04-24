import React, { Component } from 'react'
import {Grid} from 'semantic-ui-react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { Link } from 'react-router-dom'
import styles from './ProfilePosts.module.scss'
import axios from "axios/index";
import ReactStars from 'react-stars'
import Button from '@material-ui/core/Button/index';
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

class ProfilePosts extends Component{
    constructor(props){
        super(props);

        this.state = {
            diagOpen: false,
            gridItems:[],
            categories: ['Cat','Dog','Bird','Others'],
            size: [ 'small', 'medium', 'large' ],
            energyLevel : [ 'low', 'medium', 'high' ],

            selectedCate: '',
            selectedSize: '',
            selectedEnergyLevel: '',
            inputName: '',
            inputBreed: '',
            inputAge: '',
            inputGender : '',
            inputDescription: '',
            inputPrice: ''
        }

        this.submitForm = this.submitForm.bind(this);

    }

    handleClickOpen = () => {
        this.setState({ diagOpen: true });
    };

    handleClose = () => {
        this.setState({ diagOpen: false });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    submitForm(){
        const userId = this.props.userId;
        const url = window.localStorage.getItem('baseURL');
        const testImgs = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-sg_Zy3KvCPLENEg6B5tsRS3K5vgPAM56V1tqZg5QdnNdEkpq4g','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTR-_So1YvOntltgcJIOm3TSRAa_OjNwi0Axy6Fn-qrNefWiAjJA']
        // post pet
        const config = {

        };

        const data = {
                user_id: userId,
                name: this.state.inputName,
                category: this.state.selectedCate,
                breed: this.state.inputBreed,
                age: this.state.inputAge,
                gender: this.state.inputGender,
                owner: userId,
                imageURLs: testImgs,
                size: this.state.selectedSize,
                energyLevel: this.state.selectedEnergyLevel,
                description: this.state.inputDescription,
                price: this.state.inputPrice
        }

        axios.post(url+'pets',data)
            .then((response)=>{
                console.log(response)
            })

        this.handleClose()
    }



    render() {


        return(
            <div>
                <Grid container columns={3}>
                    <Grid.Column >
                        <div className={styles.potsNew}>
                            <Fab color="primary" aria-label="Add">
                                <AddIcon onClick={this.handleClickOpen}/>
                            </Fab>
                        </div>
                    </Grid.Column>
                </Grid>

                <Dialog
                    open={this.state.diagOpen}
                    onClose={this.handleClose}
                    fullWidth={true}
                    maxWidth={"md"}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create a new post for pets !</DialogTitle>
                    <DialogContent className={styles.submitForm}>
                        <TextField
                            required
                            error = {this.state.inputName === ''}
                            margin="dense"
                            id="name"
                            label="Pet Name"
                            type="name"
                            variant="outlined"
                            onChange={this.handleChange('inputName')}
                            value={this.state.inputName}
                            className={styles.inputFiled}

                        />

                        <TextField
                            id="select-cate"
                            required
                            error = {this.state.selectedCate === ''}
                            select
                            label="Categories"
                            value={this.state.selectedCate}
                            onChange={this.handleChange('selectedCate')}
                            // helperText="Please select your pet's category"
                            margin="normal"
                            variant="outlined"
                            className={styles.inputFiled}

                        >
                            {this.state.categories.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField

                            margin="dense"
                            id="breed"
                            label="breed"
                            type="breed"
                            variant="outlined"
                            onChange={this.handleChange('inputBreed')}
                            value={this.state.inputBreed}
                            className={styles.inputFiled}

                        />
                        <TextField

                            margin="dense"
                            id="age"
                            label="age"
                            type="age"
                            variant="outlined"
                            onChange={this.handleChange('inputAge')}
                            value={this.state.inputAge}
                            className={styles.inputFiled}

                        />
                        <TextField

                            margin="dense"
                            id="gender"
                            label="gender"
                            type="gender"
                            variant="outlined"
                            onChange={this.handleChange('inputGender')}
                            value={this.state.inputGender}
                            className={styles.inputFiled}

                        />
                        <TextField
                            id="select-size"
                            select
                            label="Size"
                            value={this.state.selectedSize}
                            onChange={this.handleChange('selectedSize')}
                            // helperText="Please select your pet's size"
                            margin="normal"
                            variant="outlined"
                            className={styles.inputFiled}

                        >
                            {this.state.size.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            id="select-energy"
                            select
                            label="EnergyLevel"
                            value={this.state.selectedEnergyLevel}
                            onChange={this.handleChange('selectedEnergyLevel')}
                            // helperText="Please select your pet's category"
                            margin="normal"
                            variant="outlined"
                            className={styles.inputFiled}

                        >
                            {this.state.energyLevel.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField

                            margin="dense"
                            id="price"
                            label="price"
                            type="price"
                            variant="outlined"
                            onChange={this.handleChange('inputPrice')}
                            value={this.state.inputPrice}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            className={styles.inputFiled}

                        />


                        <TextField
                            multiline
                            rows={4}
                            margin="dense"
                            id="description"
                            label="description"
                            variant="outlined"
                            fullWidth
                            value={this.state.inputDescription}
                            onChange={this.handleChange('inputDescription')}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button  color="primary" >
                            UPLOAD
                            <CloudUploadIcon  className={styles.icon} />
                        </Button>
                        <Button onClick={this.submitForm} color="secondary">
                            Submit
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>
        );
    }


}

export default ProfilePosts
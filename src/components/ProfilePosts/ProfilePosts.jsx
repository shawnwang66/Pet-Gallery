import React, { Component } from 'react'
// import {Grid} from 'semantic-ui-react'
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import styled from 'styled-components'
import { Card, Image } from 'semantic-ui-react'
import InfoIcon from '@material-ui/icons/Info';

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

const Images = styled.img`

  max-width: 100%;
  height: auto;
  width: auto;
  &:hover{
    opacity: 0.7;
     transform: scale(1.2);
     transition: 0.2s;

`;
class ProfilePosts extends Component{
    constructor(props){
        super(props);

        this.state = {
            diagOpen: false,
            submittedSuccess: false,
            submittedFailed: false,
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
            inputPrice: '',

            postGrid: [],
            // TODO delete test
            testGrid: []
        }

        this.submitForm = this.submitForm.bind(this);
        this.generatePostsGrid = this.generatePostsGrid.bind(this);
    }

    handleClickOpen = name => event => {
        this.setState({ [name]: true });
    };

    handleClose = name => event =>{
        if (name === 'submittedSuccess'){
            this.setState({ [name]: false ,diagOpen: false});
        }
        else
            this.setState({
                [name]: false,
            });
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
                if (response.status === 200) {
                    this.setState({submittedSuccess: true});
                }
            }).catch((e)=>{
            this.setState({submittedFailed:true});
        });

        this.handleClose('diagOpen')
    }

    generatePostsGrid(){
        // get all pets info
        const url = window.localStorage.getItem('baseURL');
        const postsId = this.props.posts;

        if (this.props.userId !== null){
            // get all pets
            axios.get(`${url}pets?where={"owner":"${encodeURIComponent(this.props.userId)}"}`)
                .then((res)=>{
                    let data = res.data.data;
                    // console.log(data)

                    let girdGroups = data.map((pet)=>
                        <Grid item xs={3} key={pet._id} id={pet._id} className={styles.gridItemContainer} >
                            {/*<Images  src={pet.imageURLs[0]} id={pet._id} />*/}
                            {/*<GridListTile >*/}
                            {/*    <Image  src={pet.imageURLs[0]} id={pet._id} />*/}
                            {/*    <GridListTileBar*/}
                            {/*        className={styles.titleBar}*/}
                            {/*        title={pet.name}*/}
                            {/*        subtitle={<span>Price: {pet.price}</span>}*/}
                            {/*        actionIcon={*/}
                            {/*            <IconButton>*/}
                            {/*                <InfoIcon color={"action"} />*/}
                            {/*            </IconButton>*/}
                            {/*        }*/}
                            {/*    />*/}
                            {/*</GridListTile>*/}

                            <Card
                                color={"red"}
                            >
                                <Image src={pet.imageURLs[0]} fluid></Image>
                                <Card.Content>
                                    <Card.Header>{pet.name}</Card.Header>
                                    <Card.Meta>{"Breed:"+pet.breed}</Card.Meta>
                                    <Card.Description>{"Price: $"+pet.price}</Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid>
                    )

                    this.setState(()=>{
                        return {gridItems: girdGroups}
                    })

                    // // TODO used for test
                    // let gridtest = data.map((pet)=>
                    //     <Grid item xs={3} key={pet._id} id={pet._id} className={styles.gridItemContainer} >
                    //         <Card
                    //             color={"red"}
                    //         >
                    //             <Image src={pet.imageURLs[0]} fluid></Image>
                    //             <Card.Content>
                    //                 <Card.Header>{pet.name}</Card.Header>
                    //                 <Card.Meta>{"Breed:"+pet.breed}</Card.Meta>
                    //                 <Card.Description>{"Price: $"+pet.price}</Card.Description>
                    //             </Card.Content>
                    //         </Card>
                    //     </Grid>
                    // )
                    //
                    // this.setState(()=>{
                    //     return {gridTest: gridtest}
                    // })
                    // // above test
                })
        }


    }


    render() {

        // Build grid for posts
        this.generatePostsGrid();

        return(
            <div>
                <Grid container spacing={24} className={styles.grid}>
                    <Grid item xs={3} className={styles.gridItemContainer}>
                        <div className={styles.potsNew}>
                            <Fab color="primary" aria-label="Add">
                                <AddIcon onClick={this.handleClickOpen('diagOpen')}/>
                            </Fab>
                        </div>
                    </Grid>
                    {this.state.gridItems}
                    {/*{this.state.gridTest}*/}

                </Grid>

                <Dialog
                    open={this.state.submittedSuccess}
                    onClose={this.handleClose('submittedSuccess')}
                    fullWidth={true}
                    maxWidth={"sm"}
                    aria-labelledby="form-dialog-submit"
                >
                    <DialogTitle id="form-dialog-submit">Submission Result</DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                            You have successfully created a new post about your pet!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose('submittedSuccess')} color="secondary">
                            OK
                        </Button>
                    </DialogActions>

                </Dialog>

                <Dialog
                    open={this.state.submittedFailed}
                    onClose={this.handleClose('submittedFailed')}
                    fullWidth={true}
                    maxWidth={"sm"}
                    aria-labelledby="form-dialog-submit"
                >
                    <DialogTitle id="form-dialog-submit">Submission Result</DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                            Your last submission is not successful. Please try again!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose('submittedFailed')} color="secondary">
                            OK
                        </Button>
                    </DialogActions>

                </Dialog>

                <Dialog
                    open={this.state.diagOpen}
                    onClose={this.handleClose('diagOpen')}
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
                        <Button onClick={this.handleClose('diagOpen')} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>
        );
    }


}

export default ProfilePosts
import React, { Component } from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Card, Image , Grid} from 'semantic-ui-react'
import Masonry from 'react-masonry-component';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

import { Link } from 'react-router-dom'
import styles from './ProfilePosts.module.scss'
import axios from "axios/index";
import Button from '@material-ui/core/Button/index';
import InputAdornment from "@material-ui/core/InputAdornment";

const API_URL = "http://pet-gallery.herokuapp.com/api/";

// const API_URL = "http://localhost:4000/api/";

class ProfilePosts extends Component{
    constructor(props){
        super(props);

        this.state = {
            diagOpen: false,
            submittedSuccess: false,
            submittedFailed: false,
            gridItems:[],
            categories: ['cat','dog'],
            catAge: ['Kitten', 'Young','Adult','Senior'],
            dogAge: ['Puppy', 'Young','Adult','Senior'],
            size: [ 'small', 'medium', 'large' ],
            energyLevel : [ 'low', 'medium', 'high' ],
            catBreed : ['Siamese', 'Persian', 'Maine Coon','Ragdoll', 'Bengal', 'Abyssinian','Birman',
                'Oriental Shorthair', 'Sphynx', 'Devon Rex','Himalayan',  'American Shorthair'],
            dogBreed: ['Retrievers','German Shepherd Dogs','American Bobtail Dog', 'French Bulldogs',
                'Bulldogs', 'Beagles', 'Poodles', 'Rottweilers', 'German Shorthaired', 'Yorkshire Terriers', 'Boxers', 'Dachshunds'],
            genderSelection: ['Male','Female'],
            userId : this.props.userId,
            selectedCate: '',
            selectedSize: '',
            selectedEnergyLevel: '',
            inputName: '',
            inputBreed: '',
            inputAge: '',
            inputGender : '',
            inputDescription: '',
            inputPrice: '',
            inputImg:[],

        }

        this.submitForm = this.submitForm.bind(this);
        this.generatePostsGrid = this.generatePostsGrid.bind(this);
        this.updateImageMultiple = this.updateImageMultiple.bind(this);
    }

    handleClickOpen = name => event => {
        this.setState({ [name]: true });
    };

    handleClose = name => event =>{
        if (name === 'submittedSuccess'){
            this.setState({ [name]: false ,diagOpen: false});
            window.location.reload();
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

     updateImageMultiple(){
        let token = window.localStorage.getItem('token');

        let bodyFormData = new FormData();
        let imagefile = document.querySelector('#petInputImage');

        for (var i = 0; i < imagefile.files.length; i++) {
            let file = imagefile.files.item(i);
            bodyFormData.append('petInputImage', file);
        }

         axios.post(API_URL + 'image/upload/multiple', bodyFormData,
            { headers: {'Content-Type': 'multipart/form-data' , 'Authorization': "bearer " + token }})
            .then((respnose)=>{
                let addImgs = respnose.data.img;
                this.setState({inputImg:addImgs});
            })
    }

    submitForm(){
        const userId = this.props.userId;
        const url = window.localStorage.getItem('baseURL');
        const testImgs = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-sg_Zy3KvCPLENEg6B5tsRS3K5vgPAM56V1tqZg5QdnNdEkpq4g','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTR-_So1YvOntltgcJIOm3TSRAa_OjNwi0Axy6Fn-qrNefWiAjJA']
        // post pet
        const config = {

        };

        let ageMapped = 0;
        for(let i=0;i<this.state.dogAge.length;i++){
            if (this.state.inputAge === this.state.dogAge[i]){
                ageMapped  = i;
                break;
            }
        }

        const data = {
                user_id: userId,
                name: this.state.inputName,
                category: this.state.selectedCate,
                breed: this.state.inputBreed,
                age: ageMapped,
                gender: this.state.inputGender,
                owner: userId,
                imageURLs: this.state.inputImg,
                size: this.state.selectedSize,
                energyLevel: this.state.selectedEnergyLevel,
                description: this.state.inputDescription,
                price: this.state.inputPrice
        }


        axios.post(url+'pets',data)
            .then((response)=>{
                console.log("------posted")
                console.log(response)
                if (response.status === 200) {
                    this.setState({submittedSuccess: true});
                }
            }).catch((e)=>{
            this.setState({submittedFailed:true});
        });

        // this.setState(this.state)
        this.handleClose('diagOpen')
        // window.location.reload();
    }

    generatePostsGrid(inputProps){
        // get all pets info
        const url = window.localStorage.getItem('baseURL');
        if (inputProps.userId !== "" && inputProps.userId !== null && !inputProps.isFeatured){
            // get all pets
            axios.get(`${url}pets?where={"owner":"${encodeURIComponent(inputProps.userId)}"}`)
                .then((res)=>{
                    let data = res.data.data;


                    let girdGroups = data.map((pet)=>{
                        let imgConfig = {
                            display: "flex",
                            backgroundImage: `url(${pet.imageURLs[0]})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "100%",
                            height: "100%",
                        };

                        return(
                            <div className={styles.gridCardContainer}>
                                <Link to={{pathname: `/pet/${pet._id}`}}>
                                    <Card
                                        key={pet._id}
                                        color={'grey'}
                                        className={styles.gridCard}
                                    >
                                        <div style={imgConfig}></div>
                                        <Card.Content>
                                            <Card.Header>{pet.name}</Card.Header>
                                            <Card.Meta>{"Breed:"+pet.breed}</Card.Meta>
                                            <Card.Description>{"Price: $"+pet.price}</Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Link>
                            </div>
                        );

                    }
                    );
                    this.setState({gridItems:girdGroups})

                })
        }
        else if (inputProps.userId !== "" && inputProps.userId !== null && inputProps.isFeatured){

            if (inputProps.posts === undefined || inputProps.posts === null || inputProps.posts.length === 0) {
                const grid =
                    <div className={styles.potsNew}>
                        <Fab size="large" color="primary" aria-label="Add">
                            Empty
                        </Fab>
                    </div>
                this.setState({gridItems:grid})
                return;
            }

        // get featured pets

            const param = {
                "_id":{
                    "$in": inputProps.posts
                }
            }
            // console.log(`${url}pets?where=${JSON.stringify(param)}`)
            axios.get(`${url}pets?where=${JSON.stringify(param)}`)
                .then((res)=>{
                    let data = res.data.data;


                    let girdGroups = data.map((pet)=>{
                            let imgConfig = {
                                display: "flex",
                                backgroundImage: `url(${pet.imageURLs[0]})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: "100%",
                                height: "100%",
                            };

                            return(
                                <div className={styles.gridCardContainer}>
                                    <Link to={{pathname: `/pet/${pet._id}`}}>
                                        <Card
                                            key={pet._id}
                                            color={'grey'}
                                            className={styles.gridCard}
                                        >
                                            <div style={imgConfig}></div>

                                            <Card.Content>
                                                <Card.Header>{pet.name}</Card.Header>
                                                <Card.Meta>{"Breed:"+pet.breed}</Card.Meta>
                                                <Card.Description>{"Price: $"+pet.price}</Card.Description>
                                            </Card.Content>
                                        </Card>
                                    </Link>
                                </div>
                            );

                        }
                    );
                    this.setState({gridItems:girdGroups})

                })
        }


    }

    componentDidMount() {
        // Build grid for posts
        this.generatePostsGrid(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.generatePostsGrid(nextProps);
    }


    render() {

        return(
            <div>
                <div className={styles.grid}>
                    <Masonry
                        options={{isFitWidth: true}}
                        className={styles.masoryContainer}
                    >
                        {this.props.isFeatured || !this.props.isSelf  ? [] :
                            <div className={styles.potsNew}>
                                <Fab size="large" color="primary" aria-label="Add" onClick={this.handleClickOpen('diagOpen')}>
                                    <AddIcon/>
                                </Fab>
                            </div>}
                        {
                            this.state.gridItems
                        }
                    </Masonry>
                </div>

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
                            select
                            margin="dense"
                            id="breed"
                            label="Breed"
                            type="breed"
                            variant="outlined"
                            onChange={this.handleChange('inputBreed')}
                            value={this.state.inputBreed}
                            className={styles.inputFiled}

                        >
                            {this.state.selectedCate === 'cat'
                                ? this.state.catBreed.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>))
                                : this.state.dogBreed.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>))
                            }
                        </TextField>
                        <TextField
                            select
                            margin="dense"
                            id="age"
                            label="age"
                            type="age"
                            variant="outlined"
                            onChange={this.handleChange('inputAge')}
                            value={this.state.inputAge}
                            className={styles.inputFiled}

                        >
                            {this.state.selectedCate === 'cat'
                                ? this.state.catAge.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>))
                                : this.state.dogAge.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>))
                            }
                        </TextField>
                        <TextField

                            select
                            margin="dense"
                            id="gender"
                            label="gender"
                            type="gender"
                            variant="outlined"
                            onChange={this.handleChange('inputGender')}
                            value={this.state.inputGender}
                            className={styles.inputFiled}

                        >
                            { this.state.genderSelection.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>))}
                        </TextField>
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
                        <label htmlFor={"petInputImage"}>
                            <Button  size="large" component="span" color="primary" >
                                UPLOAD Images
                                <CloudUploadIcon  className={styles.icon} />
                            </Button>
                        </label>

                        <input id={'petInputImage'} type='file' name='image' multiple className={styles.inputButton}
                            onChange={this.updateImageMultiple}
                        />

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

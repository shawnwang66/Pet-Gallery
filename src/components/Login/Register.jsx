import React, { Component } from "react";
import "./Login.style.scss";
import axios from "axios/index";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AVATAR_PH =
	"http://icons.iconarchive.com/icons/webalys/kameleon.pics/128/Wooden-Horse-icon.png";
const API_URL = "http://pet-gallery.herokuapp.com/api/";
const TITLE = "Welcome";

class Register extends Component {
	constructor() {
		super();
		this.state = {
			disableSubmit: true,
			errorHappened: false,
			requireAllFilled: false,
			validEmail: true,
			redirect: false,
			avatar: AVATAR_PH,
			uploadError: false,
			isUploading: false
		};

		this.userName = "";
		this.password = "";
		this.fullName = "";
		this.userEmail = "";
		this.userLoc = "";

		this.uploadAvatar = this.uploadAvatar.bind(this);
		this.onInputChanged = this.onInputChanged.bind(this);
		this.login = this.login.bind(this);
		this.submitRegisterInfo = this.submitRegisterInfo.bind(this);
	}

	isEmailValid(email) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	onInputChanged(e) {
		const inputName = e.target.name;
		const val = e.target.value;
		let validEmail = this.state.validEmail,
			requireAllFilled = true;

		switch (inputName) {
			case "username":
				this.userName = val;
				break;
			case "pwd":
				this.password = val;
				break;
			case "email":
				this.userEmail = e.target.value;
				validEmail = this.isEmailValid(e.target.value);
				break;
			case "fullname":
				this.fullName = e.target.value;
				break;
			case "loc":
				this.userLoc = e.target.value;
				break;
			default:
				break;
		}

		const inputs = Object.values(
			document.getElementById("input-wrapper").childNodes
		);

		inputs.some((element, _) => {
			if (
				element.className === "required" &&
				(!element.value || element.value === "")
			) {
				requireAllFilled = false;
				return true;
			}
			return false;
		});

		this.setState({
			disableSubmit: requireAllFilled && validEmail ? false : true,
			requireAllFilled: requireAllFilled,
			validEmail: validEmail,
			errorHappened: false,
			uploadError: false
		});
	}

	submitRegisterInfo() {
		axios
			.post(`${API_URL}user`, {
				username: this.userName,
				password: this.password,
				name: this.fullName,
				email: this.userEmail,
				location: this.userLoc,
				imageURL: AVATAR_PH
			})
			.then(res => {
				console.log(`User Created: ${res}`);
				this.login();
			})
			.catch(err => {
				console.log(`Cannot create user: ${err}`);
				this.setState({
					errorHappened: true
				});
			});
	}

	login() {
		axios
			.post(`${API_URL}login`, {
				username: this.userName,
				password: this.password
			})
			.then(res => {
				const token = res.data.token;
				let uid, avatar;

				window.localStorage.setItem("token", token);
				window.localStorage.setItem("username", this.userName);

				axios
					.get(`${API_URL}user`, 
						{
							headers: { 'Authorization': `bearer ${token}` }
						})
					.then((res) => {
						uid = res.data.data._id;
						avatar = res.data.data.imageURL;
						window.localStorage.setItem("uid", uid);
						window.localStorage.setItem("avatar", avatar);
					})
					.catch((_) => {
						window.localStorage.setItem("uid", null);
						window.localStorage.setItem("avatar", null);
					})
					.finally(() => {
						this.setState({
							redirect: true
						});
					});
			})
			.catch(err => {
				console.log(`Error during login: ${err}`);
			});
	}

	uploadAvatar() {
		const uploadInput = document.getElementById("upload-input");
		uploadInput.click();
		uploadInput.onchange = () => {
			const imgFile = uploadInput.files[0];
			uploadInput.value = "";
			if (!imgFile) return;
			if (imgFile.type.search("image") === -1)
				this.setState({ uploadError: true });
			else {
				const form = new FormData();
				form.append("avatar", imgFile);
				this.setState({ isUploading: true });
				axios
					.post(`${API_URL}image/upload`, form)
					.then(res => {
						console.log(res);
						this.setState({ isUploading: false });
					})
					.catch(err => {
						console.log(err);
						this.setState({ isUploading: false, uploadError: true });
					});
			}
		};
	}

	render() {
		const avatarStyle = {
			backgroundImage: `url(${this.state.avatar})`
		};

		const avatarMaskStyle = {
			opacity: this.state.isUploading ? 1 : null
		};

		return (
			<div className="cp-root">
				{this.state.redirect ? <Redirect to="/" /> : []}

				<div className="wrapper form">
					<p className="app-title">{TITLE}</p>
					<div className="avatar-holder" style={avatarStyle}>
						{" "}
						{/* onClick={this.uploadAvatar} */}
						<input id="upload-input" type="file" name="upload-avatar" />
						<div className="avatar-mask" style={avatarMaskStyle}>
							{this.state.isUploading ? (
								<div className="lds-ellipsis">
									<div />
									<div />
									<div />
									<div />
								</div>
							) : (
								<FontAwesomeIcon icon="pencil-alt" />
							)}
						</div>
					</div>
					<div id="input-wrapper" className="input-wrapper">
						<input
							id="usr_box"
							className="required"
							placeholder="Username *"
							name="username"
							type="text"
							onChange={this.onInputChanged}
						/>
						<input
							id="pwd_box"
							className="required"
							placeholder="Password *"
							name="pwd"
							type="password"
							onChange={this.onInputChanged}
						/>
						<input
							id="email_box"
							className="required"
							placeholder="Email *"
							name="email"
							type="text"
							onChange={this.onInputChanged}
						/>
						<input
							id="name_box"
							className="required"
							placeholder="Fullname *"
							name="fullname"
							type="text"
							onChange={this.onInputChanged}
						/>
						<input
							id="loc_box"
							placeholder="Location"
							name="loc"
							type="text"
							onChange={this.onInputChanged}
						/>
					</div>
					<button
						className="submit-bt"
						disabled={this.state.disableSubmit}
						onClick={this.submitRegisterInfo}
					>
						<p className="bt-text">Sign Up</p>
					</button>
					{this.state.uploadError ? (
						<p className="error-text">Invalid image file</p>
					) : this.state.errorHappened ? (
						<p className="error-text">Username or email already taken :(</p>
					) : this.userEmail !== "" && !this.state.validEmail ? (
						<p className="error-text">Invalid email</p>
					) : !this.state.requireAllFilled ? (
						<p className="error-text">Please fill all required fields</p>
					) : (
						[]
					)}
				</div>
				<div className="wrapper register">
					<p className="app-text">Already have an account?</p>
					<Link to={{ pathname: "/login" }}>
						<p>Log in</p>
					</Link>
				</div>
			</div>
		);
	}
}

export default Register;

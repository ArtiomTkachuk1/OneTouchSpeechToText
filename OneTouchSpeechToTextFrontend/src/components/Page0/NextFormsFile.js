import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
export function NextFormsFile(props) {
	const useStyles = makeStyles(theme => ({
		div: {
			display: 'flex',
			flexWrap: 'wrap',
		},
		textField: {
			display:"flex",
			width:props.width,
			marginTop:props.marginTop,
			margin:"auto",
		},
		button: {
			display:"flex",
			width:props.width,
			marginTop:props.marginTop,
			margin:"auto",
		},
		FormHelperText:{
			display:"flex",
			width:props.width,
			margin:"auto",
			marginTop:7,
			color:"red "
		},
		input: {
			display: 'none',
		},
		rightIcon: {
			marginLeft: theme.spacing(1),
		},
		iconSmall: {
			fontSize: 20,
		},
	}));
	const classes = useStyles();
	const uploadButtonText="Upload";
	const [mediaFile, setMediaFile] = React.useState("");
	const uuid = require('uuid/v1');
	let fileUpload=""
	const postreq = (formData) => {
		const axios = require('axios');
		axios.post("/file_from_form", formData)
			.then(res =>{
									props.set_ask_tr();
									console.log(res);
									})
			.catch(err => console.warn(err));
	}
	const handleFileInputChange = (e) => {
		e.preventDefault();
		setMediaFile(fileUpload.files[0]);
	}
	const handleClick1 = (event) =>{
		event.preventDefault();
		if(mediaFile!==''){
			let file = mediaFile;
			let fileId="media"
			let data=props.getConfig()
			if(data!==false){
				let formData = new FormData();
				formData.append(fileId,file);
				let json=JSON.stringify(data)
				const blob = new Blob([json], {
				  type: 'application/json'
				});
				formData.append("settings", blob);
				props.set_page_to_1();
				console.log(data);
				postreq(formData);
			}
		}
		else{
			 props.setErrorMessage(props.errorMessageStrings[2]);
		}
	}
	if(props.values.name===props.types[1]){
		return(
			<div key={uuid()}>
				<Container
					key={uuid()}
				>
					<input
						accept="video/*,audio/*"
						className={classes.input}
						id="contained-button-file"
						multiple
						type="file"
						name="inputFile"
						ref={(ref) => fileUpload = ref}
						onChange={handleFileInputChange}
					/>
				</Container>
				<label
					htmlFor="contained-button-file"
				>
					<Button
						variant="contained"
						component="span"
						className={classes.button}
					>
						{uploadButtonText}
						<CloudUploadIcon
							className={classes.rightIcon}
						/>
					</Button>
					<Button
						type="submit"
						variant="outlined"
						color="primary"
						className={classes.button}
						onClick={handleClick1}
					>
						{props.endButtonText}
					</Button>
					<FormHelperText
						className={classes.FormHelperText}
					>
						{props.errorMessage}
					</FormHelperText>
				</label>
			</div>
		);
	}
	else{
		return(null);
	}
}

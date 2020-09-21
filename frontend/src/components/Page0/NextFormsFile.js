import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
export function NextFormsFile(props) {
	const end_button_text="Go";
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
	const upload_button_text="Upload";
	const [video_file, setvideo_file] = React.useState("");
	const [video_file_name, setvideo_file_name] = React.useState("");
	const uuid = require('uuid/v1');
	const [video_file_id, setvideo_file_id] = React.useState(uuid());
	let fileUpload=""
	const postreq = (formData) => {
		const axios = require('axios');
		axios.post("/file_from_form", formData)
			.catch(err => console.warn(err));
	}
	const handleFileInputChange = (e) => {
		e.preventDefault();
		setvideo_file(fileUpload.files[0]);
		setvideo_file_name(fileUpload.files[0].name);
	}
	const handleClick1 = (event) =>{
		event.preventDefault();
		let ans=props.default_check()
		if(ans!==true){
			props.seterror_mesage(ans);
			return
		}
		if(video_file!==''){
			let file = video_file;
			let file_name=video_file_name;
			let file_id="media"
			let formData = new FormData();
			formData.append(file_id,file);
			let data={"t_model":props.nn}
			let json=JSON.stringify(data)
			const blob = new Blob([json], {
			  type: 'application/json'
			});
			formData.append("settings", blob);
			postreq(formData);
			props.set_page_to_1();
		}
		else{
			 props.seterror_mesage(props.error_mesage_strings[0]);
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
						{upload_button_text}
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
						{end_button_text}
					</Button>
					<FormHelperText
						className={classes.FormHelperText}
					>
						{props.error_mesage}
					</FormHelperText>
				</label>
			</div>
		);
	}
	else{
		return(null);
	}
}

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import urlParser from "js-video-url-parser";
export function NextFormsRef(props) {
	const useStyles = makeStyles(theme => ({
		container: {
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
	const [ref, setRef] = React.useState("");
	const handleTextInputChange = (event) =>{
		setRef(event.target.value);
	}

	const postreq= (formData) =>{
		const axios = require('axios');
		axios.post("/file_from_ref", formData)
		.then(res => {
			props.set_ask_tr();
			console.log(res);
		})
		.catch(err => console.warn(err));
	}

	const isYoutube = (ref) => {
		if(urlParser.parse(ref)!==undefined){
			return(true);
		}
		return(false);
	}

	const handleClick0 = (event) =>{
		event.preventDefault();
		if(isYoutube(ref)===true){
			let data=props.getConfig()
			if(data!==false){
				data.push({"ref":ref})
				let formData = new FormData();
				let json=JSON.stringify(data);
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
			props.setErrorMessage(props.errorMessageStrings[3]);
		}
	}
	if(props.values.name===props.types[0]){
		return (
			<div>
				<TextField
					label={"YouTube url"}
					id="margin-normal"
					defaultValue=""
					className={classes.textField}
					onChange={handleTextInputChange}
					helperText=""
					margin="normal"
				/>
				<Button
					variant="outlined"
					color="primary"
					className={classes.button}
					onClick={handleClick0}
				>
					{props.endButtonText}
				</Button>
				<FormHelperText
					className={classes.FormHelperText}
				>
					{props.errorMessage}
				</FormHelperText>
			</div>
		);
	}
	else{
		return(null);
	}
}

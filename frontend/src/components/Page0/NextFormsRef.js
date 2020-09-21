import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import urlParser from "js-video-url-parser";
export function NextFormsRef(props) {
	const end_button_text="Go";
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
	const [ref, set_ref] = React.useState("");
	const handleTextInputChange = (event) =>{
		set_ref(event.target.value);
	}
	const [num_of_seconds, set_num_of_seconds] = React.useState("");
	const handleTextInputChange2 = (event) =>{
		set_num_of_seconds(event.target.value);
	}
	const postreq=()=>{
		const axios = require('axios');
		axios({
			method: 'post',
			url: '/file_from_ref',
			data: {
				ref: ref,
				t_model:props.nn
			}
		})
		.then(res =>props.set_allow_continue())
		.catch(err => console.warn(err));
	}


	const handleClick0 = (event) =>{
		event.preventDefault();
		console.log(num_of_seconds)
		let ans=props.default_check()
		if(ans!==true){
			props.seterror_mesage(ans);
			return
		}
		/*let numcheck=isNaN(parseInt(num_of_seconds))
		if(numcheck===true){
			numcheck=false
			props.seterror_mesage(props.error_mesage_strings[2]);
			return
		}
		else{
			numcheck=true;
		}*/
		let isYoutube=false;
		let isLink=false;
		let isRTSP=false;
		let isMJPG=false;
		if(urlParser.parse(ref)!==undefined){
			isYoutube=true;
		}
		if(isYoutube===false){
			let end=ref.indexOf(".link");
			let start=ref.indexOf("http://");
			if((start===0)&&(end===(ref.length-5))){
				isLink=true;
			}
		}
		if((isYoutube===false)&&(isLink===false)){
			let start=ref.indexOf("rtsp://");
			if(start===0){
				isRTSP=true;
			}
		}
		if((isYoutube===false)&&(isLink===false)&&(isLink===false)){
			let end=ref.indexOf(".mjpg");
			let start=ref.indexOf("http://");
			if((start===0)&&(end===(ref.length-5))){
				isMJPG=true;
			}
			else{
				props.seterror_mesage(props.error_mesage_strings[3]);
				return
			}
		}
		postreq();
		props.set_page_to_1();
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
					{end_button_text}
				</Button>
				<FormHelperText
					className={classes.FormHelperText}
				>
					{props.error_mesage}
				</FormHelperText>
			</div>
		);
	}
	else{
		return(null);
	}
}
/*
	<TextField
		label={"Number of seconds"}
		id="margin-normal"
		defaultValue=""
		className={classes.textField}
		onChange={handleTextInputChange2}
		helperText=""
		margin="normal"
	/>
*/

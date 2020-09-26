import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {NextFormsRef} from "./NextFormsRef";
import {NextFormsFile} from "./NextFormsFile";
import {NestedSelect} from "./NestedSelect";
import TextField from '@material-ui/core/TextField';

export function Page0(props) {
	const name="Type of video";
	const types=["YouTube","File with record"];
	const helper1="Choose transcribe model";
	const helper2="Choose type of media";
	const width="40%";
	const marginTop="6%";
	const useStyles = makeStyles(theme => ({
		formControl: {
			display:"flex",
			margin:"auto",
			width:width,
			marginTop:marginTop
		}
	}));
	const classes = useStyles();
	const [values, setValues] = React.useState({
		type: "",
		name: "",
	});
	const shownTypesTranscribe=[
		"Deep Speech",
		"Silero English",
		"Silero German",
		"Silero Spanish",
	];
	const typesTranscribe=[
		"deepspeech",
		"silero/en",
		"silero/de",
		"silero/es",
	];
	const error_mesage_strings=[
						"Upload file first",
						"Choose type of transcribe model first",
						"Number of seconds must be natural number",
						"Link is incorrect"
								]
	const [error_mesage, seterror_mesage] = React.useState("");
	const handleChange = event => {
		seterror_mesage("")
		setValues({
			type: event.target.value,
			name:types[event.target.value],
		});
	}
	const [nn, set_nn] = React.useState("");


	const default_check=()=>{
		let nncheck=false
		if(nn!==""){
			nncheck=true
			return true
		}
		else{
			return(error_mesage_strings[1])
		}
	}
	if(props.page===0){
		return(
			<div>
				<div
					className={classes.formControl}
				>
					<NestedSelect
						set_nn={set_nn}
					/>
				</div>
				<FormControl
					className={classes.formControl}
				>
					<TextField
						value={shownTypesTranscribe[nn-1]}
						margin="normal"
						helperText={helper1}
						InputProps={{
							readOnly: true,
						}}
					/>
				</FormControl>
				<FormControl
					className={classes.formControl}
				>
					<InputLabel htmlFor="type-helper">{name}</InputLabel>
					<Select
						value={values.type}
						onChange={handleChange}
						inputProps={{
							name: 'type',
							id: 'type-helper',
						}}
					>
						<MenuItem value="">
						<em>None</em>
						</MenuItem>
						<MenuItem value={0}>{types[0]}</MenuItem>
						<MenuItem value={1}>{types[1]}</MenuItem>
					</Select>
					<FormHelperText>{helper2}</FormHelperText>
				</FormControl>
				<NextFormsRef
					set_im_src={props.set_im_src}
					set_page_to_1={props.set_page_to_1}
					set_ask_tr={props.set_ask_tr}
					width={width}
					values={values}
					types={types}
					nn={typesTranscribe[nn-1]}
					default_check={default_check}
					marginTop={"4%"}
					seterror_mesage={seterror_mesage}
					error_mesage={error_mesage}
					error_mesage_strings={error_mesage_strings}
				/>
				<NextFormsFile
					set_im_src={props.set_im_src}
					set_page_to_1={props.set_page_to_1}
					set_ask_tr={props.set_ask_tr}
					width={width}
					values={values}
					types={types}
					nn={typesTranscribe[nn-1]}
					default_check={default_check}
					marginTop={marginTop}
					seterror_mesage={seterror_mesage}
					error_mesage={error_mesage}
					error_mesage_strings={error_mesage_strings}
				/>
			</div>
		)
	}
	else{
		return(null);
	}
}

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {NextFormsRef} from "./NextFormsRef";
import {NextFormsFile} from "./NextFormsFile";
import {TreeSelect} from "./TreeSelect";


function setOptions(data){
	let mainOptions = []
	let secondarySelects = []
	let secondaryOptions = []
	for(let i in data){
		mainOptions.push(i)
		let secondarySelect=[]
		let secondaryOption=[]
		for(let j in data[i]){
			secondarySelect.push(j)
			secondaryOption.push(data[i][j])
		}
		secondarySelects.push(secondarySelect)
		secondaryOptions.push(secondaryOption)
	}
	return [mainOptions,secondarySelects,secondaryOptions]
}


export function Page0(props) {
	const name="Type of video";
	const types=["YouTube","File with record"];
	const helper1="Choose type of media";
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
	const classes = useStyles();
	var mainOptions = [];
	var secondarySelects = [];
	var secondaryOptions = [];
	const [values, setValues] = React.useState({
		type: "",
		name: "",
	});
	const [error_mesage, seterror_mesage] = React.useState("");
	const handleChange = event => {
		seterror_mesage("")
		setValues({
			type: event.target.value,
			name:types[event.target.value],
		});
	}
	const [chosenMainOption, setChosenMainOption] = React.useState('');
	const [chosenSecondaryOptions, setChosenSecondaryOptions] = React.useState([]);
	const [models, setModels] = React.useState("");

	const default_check=()=>{
		let nncheck=false
		if(models!==""){
			nncheck=true
			return true
		}
		else{
			return(error_mesage_strings[1])
		}
	}
	const handleMainChange = event => {
			setChosenMainOption(event.target.value);
			initSecondaryOptions(secondaryOptions[event.target.value].length);
	}
	const initSecondaryOptions=(len)=>{
			 setChosenSecondaryOptions(new Array(len).fill(''));
			 console.log(chosenSecondaryOptions)
	}
	const handleSecondaryChange = (event) => {
		let i=parseInt(event.target.name.slice(-1));
		console.log(event.target.name)
		console.log(i)
		const newChosenSecondaryOptions = chosenSecondaryOptions.map((item, index) => {
        if (index === i) {
          return event.target.value;
        } else {
          return item;
        }
      });
			console.log(newChosenSecondaryOptions)
			setChosenSecondaryOptions(newChosenSecondaryOptions)
	}
	if(props.page===0){
		[mainOptions,secondarySelects,secondaryOptions]=setOptions(props.config);
		return(
			<div>
				<div
					className={classes.formControl}
				>
					<TreeSelect
						key={"TreeSelect"}
						mainOptions={mainOptions}
						secondarySelects={secondarySelects}
						secondaryOptions={secondaryOptions}
						chosenMainOption={chosenMainOption}
						chosenSecondaryOptions={chosenSecondaryOptions}
						handleMainChange={handleMainChange}
						handleSecondaryChange={handleSecondaryChange}
					/>
				</div>
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
					<FormHelperText>{helper1}</FormHelperText>
				</FormControl>
				<NextFormsRef
					set_im_src={props.set_im_src}
					set_page_to_1={props.set_page_to_1}
					set_ask_tr={props.set_ask_tr}
					width={width}
					values={values}
					types={types}
					nn={typesTranscribe[models-1]}
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
					nn={typesTranscribe[models-1]}
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

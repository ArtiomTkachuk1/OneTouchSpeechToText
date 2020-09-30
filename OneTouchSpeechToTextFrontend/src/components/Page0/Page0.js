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
	const endButtonText="Go";
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
	const errorMessageStrings=[
						"Choose language first",
						"Choose configuration first",
						"Upload file first",
						"Link is incorrect",
								]
	const classes = useStyles();
	let mainOptions = [];
	let secondarySelects = [];
	let secondaryOptions = [];
	const [values, setValues] = React.useState({
		type: "",
		name: "",
	});
	const [errorMessage, setErrorMessage] = React.useState("");
	const handleChange = event => {
		setErrorMessage("")
		setValues({
			type: event.target.value,
			name:types[event.target.value],
		});
	}
	const [chosenMainOption, setChosenMainOption] = React.useState('');
	const [chosenSecondaryOptions, setChosenSecondaryOptions] = React.useState([]);
	const handleMainChange = event => {
			setChosenMainOption(event.target.value);
			if(event.target.value!=='')
				initSecondaryOptions(secondaryOptions[event.target.value].length);
			else{
				setChosenSecondaryOptions([]);
			}
	}
	const initSecondaryOptions=(len)=>{
			 setChosenSecondaryOptions(new Array(len).fill(''));
	}
	const handleSecondaryChange = (event) => {
		let i=parseInt(event.target.name.slice(-1));
		const newChosenSecondaryOptions = chosenSecondaryOptions.map((item, index) => {
        if (index === i) {
          return event.target.value;
        } else {
          return item;
        }
      });
			setChosenSecondaryOptions(newChosenSecondaryOptions);
	}
	const getConfig=()=>{
		let con=[]
		if(chosenMainOption!==''){
			con.push({
			    "Language":mainOptions[chosenMainOption],
			});
			let check=true;
			let lth=chosenSecondaryOptions.length;
			for(let i =0;i<lth;i++){
				console.log(i)
				if(chosenSecondaryOptions[i]===''){
					check=false;
					break;
				}
			}
			if(check===true){
				let lth=secondarySelects[chosenMainOption].length;
				for(let i=0;i<lth;i++){
					let key=secondarySelects[chosenMainOption][i];
					if(key.search(" ") !== -1){
						key=key.replace(" ","_")
					}
					let value=secondaryOptions[chosenMainOption][chosenSecondaryOptions[i]][0]
					console.log(key,value)
					con.push({
					    [key]:value,
					});
				}
				return(con)
			}
			else{
				setErrorMessage(errorMessageStrings[1])
				return(false)
			}
		}
		else{
			setErrorMessage(errorMessageStrings[0])
			return(false)
		}
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
					set_page_to_1={props.set_page_to_1}
					set_ask_tr={props.set_ask_tr}
					width={width}
					values={values}
					types={types}
					getConfig={getConfig}
					marginTop={marginTop}
					setErrorMessage={setErrorMessage}
					errorMessage={errorMessage}
					errorMessageStrings={errorMessageStrings}
					endButtonText={endButtonText}
				/>
				<NextFormsFile
					set_page_to_1={props.set_page_to_1}
					set_ask_tr={props.set_ask_tr}
					width={width}
					values={values}
					types={types}
					getConfig={getConfig}
					marginTop={marginTop}
					setErrorMessage={setErrorMessage}
					errorMessage={errorMessage}
					errorMessageStrings={errorMessageStrings}
					endButtonText={endButtonText}
				/>
			</div>
		)
	}
	else{
		return(null);
	}
}

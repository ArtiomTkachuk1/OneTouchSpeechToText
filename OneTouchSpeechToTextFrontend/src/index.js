import React from 'react';
import ReactDOM from 'react-dom';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/lightBlue';
import {Init} from "./components/Init/Init";
import {Page0} from "./components/Page0/Page0";
import {Page1} from "./components/Page1/Page1";
const color1=green;
const color2=red;


const theme = createMuiTheme({
	spacing: 4,
	palette: {
		type:'light',
		primary: color1,
		secondary: color2,
	},
	status: {
		danger: 'orange',
	},
});


class App extends React.Component{
	constructor(props) {
		super(props);
		this.config={
		  "English": {
		    "Transcribe model": [
		      "DeepSpeech",
		      "Vosk",
		      "Silero"
		    ],
		    "Diagization model": [
		      "Kaldi",
		      "Payonette"
		    ],
		    "Spellchecker": [
		      "Spellchecker1",
		      "Spellchecker2"
		    ]
		  },
		  "German": {
		    "Transcribe model": [
		      "Silero"
		    ]
		  }
		}
		this.state = {
			page:0,
			transcribtion:"",
			askTr:false,
			config:{}
		};
	}
	setPageTo0=()=>{
		this.setState({
			page:0
		});
	}
	setPageTo1=()=>{
		this.setState({
			page:1
		});
	}
	setConfig=(conf)=>{
		this.setState({
			config:conf
		});
	}
	setTranscribtion=(transcr)=>{
		this.setState({
			transcribtion:transcr
		});
	}
	setAskTr=()=>{
		this.setState({
			askTr:true
		});
	}
	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}
	updateWindowDimensions=()=>{
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}
	render(){
		return (
			<MuiThemeProvider theme={theme}>
				<div>
					<Init
						setConfig={this.state.setConfig}
						setPageTo0={this.setPageTo0}
					/>
					<Page0
						page={this.state.page}
						set_ask_tr={this.setAskTr}
						set_page_to_1={this.setPageTo1}
						config={this.config}
					/>
					<Page1
						page={this.state.page}
						transcribtion={this.state.transcribtion}
						ask_tr={this.state.askTr}
						set_transcribtion={this.setTranscribtion}
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

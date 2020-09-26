import React from 'react';
import ReactDOM from 'react-dom';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/lightBlue';
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
		this.state = {
			page:0,
			transcribtion:"",
			ask_tr:false
		};
	}
	set_page_to_1=()=>{
		this.setState({
			page:1
		});
	}
	set_transcribtion=(transcr)=>{
		this.setState({
			transcribtion:transcr
		});
	}
	set_ask_tr=()=>{
		this.setState({
			ask_tr:true
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
					<Page0
						page={this.state.page}
						set_ask_tr={this.set_ask_tr}
						set_page_to_1={this.set_page_to_1}
					/>
					<Page1
						page={this.state.page}
						transcribtion={this.state.transcribtion}
						ask_tr={this.state.ask_tr}
						set_transcribtion={this.set_transcribtion}
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

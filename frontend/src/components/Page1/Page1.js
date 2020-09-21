import React from 'react';

const Loader = () => (
  <div class="divLoader">
    <svg class="svgLoader" viewBox="0 0 100 100" width="10em" height="10em">
      <path stroke="none" d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#51CACC" transform="rotate(179.719 50 51)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51;360 50 51" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path>
    </svg>
  </div>
);

export class Page1 extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
            loading: true
        }
		}
		componentDidMount() {
			const axios = require('axios');
			axios.get('http://127.0.0.1:5000/get_transcribtion')
		          .then(res => {
		                const data = res.data;
										console.log(data)
										this.props.set_transcribtion(data)
		                this.setState({loading: false })
		          })
		}
	render(){
		if(this.props.page===1){
			return(
				<div
					style={{
						width:"100%",
						height:"100%",
						display:"flex",
						margin:"auto"
					}}
				>
					{this.state.loading ? <Loader /> : null}
					{this.props.transcribtion}
				</div>
			);
		}
		else{
			return(null);
		}
	}
}

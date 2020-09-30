import React from 'react';

export class Init extends React.Component {
  constructor(props) {
		super(props);
    const axios = require('axios');
    axios.get('http://127.0.0.1:5000/get_config' )
            .then(res => {
                  const data = res.data;
                  console.log(data);
                  this.props.setConfig(data);
                  this.props.setPageTo0();
            })
		}
  render() {
      return(null)
    }
}

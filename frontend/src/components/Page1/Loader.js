import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


export class Loader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if(this.props.loading===true){
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
             alignItems: "center",
             margin:"auto",
             marginTop: "20%"
          }}
        >
          <CircularProgress
          style={{
            width:"200px",
            height:"200px"
          }}
          />
        </div>
      );
    }
    else{
      return(null)
    }
  }
}
/*render() {
  if(this.props.loadins===true){
    return (
      <CircularProgress/>
    );
  }
  else{
    return(null)
  }
}*/

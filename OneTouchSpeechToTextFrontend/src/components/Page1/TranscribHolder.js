import React from 'react';
import TextField from '@material-ui/core/TextField';

const helper="result of transcribtion"

export class TranscribHolder extends React.Component {
  render() {
    if(this.props.loading===false){
      return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
               alignItems: "center",
               margin:"auto",
               width:"60%"
            }}
          >
            <TextField
                style={{
                   width:"100%"
                }}
                value={this.props.transcribtion}
                margin="normal"
                multiline
                rowsMax={10}
                helperText={helper}
                InputProps={{
                  readOnly: true,
                }}
              />
          </div>
      );
    }
    else{
      return (null);
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

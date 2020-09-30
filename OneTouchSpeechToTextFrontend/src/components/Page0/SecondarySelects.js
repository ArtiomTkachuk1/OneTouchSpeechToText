import React, { Component } from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
export class SecondarySelects extends Component {
  render() {
    if(this.props.mainOption!==""){
      return(
        <div>
        {this.props.secondarySelects.map((item,index) => (
          <div
            key={"secondarySelectsDiv"+index.toString()}
          >
            <Select
              key={"secondarySelect"+index.toString()}
              name={"Option "+index}
              style={{
                width:"100%",
                display:"flex",
                marginTop:"6%",
              }}
              value={this.props.chosenSecondaryOptions[index]}
              onChange={this.props.handleSecondaryChange}
            >
            <MenuItem  value=''><em>None</em></MenuItem>
            {this.props.secondaryOptions[index].map((item,index) => (
                <MenuItem
                  value={index.toString()}
                  key={"SecondaryMenuItem"+index.toString()}
                >
                  {item}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText>{item}</FormHelperText>
          </div>
          ))}
        </div>
      )
    }
    else {
      return null;
    }
  }
}

export default SecondarySelects;

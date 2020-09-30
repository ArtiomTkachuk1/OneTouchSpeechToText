import React, { Component } from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import SecondarySelects from "./SecondarySelects";

const helper="Choose language"
export class TreeSelect extends Component {
  render() {
    return(
      <div
        style={{
          width:"100%",
          marginTop:"6%",
        }}
      >
        <div>
          <Select
          key={"MainSelect"}
            style={{
              width:"100%",
              marginTop:"6%",
            }}
              value={this.props.chosenMainOption}
              onChange={this.props.handleMainChange}
              name={"language"}
            >
              <MenuItem  value=''><em>None</em></MenuItem>
              {this.props.mainOptions.map((item,index) => (
                  <MenuItem
                  value={index.toString()}
                  key={"MainMenuItem"+index.toString()}
                  >
                    {item}
                  </MenuItem>
                ))}
          </Select>
        </div>
        <FormHelperText>{helper}</FormHelperText>
        <div>
          <SecondarySelects
            key={"SecondarySelects"}
            mainOption={this.props.chosenMainOption}
            handleSecondaryChange={this.props.handleSecondaryChange}
            chosenSecondaryOptions={this.props.chosenSecondaryOptions}
            secondarySelects={this.props.chosenMainOption===""?null:this.props.secondarySelects[this.props.chosenMainOption]}
            secondaryOptions={this.props.chosenMainOption===""?null:this.props.secondaryOptions[this.props.chosenMainOption]}
          />
        </div>
      </div>
    )
  }
}

export default TreeSelect;

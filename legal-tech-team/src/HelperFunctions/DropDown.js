import * as React from "react";

import { Grid, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import AddQuotes from "./AddQuotes";
function DropDown(props) {
  const { question, id, value, onChange, options } = props;

  return (
    <>
      <Grid item xs={12} sm={8}>
        <InputLabel
          sx={{
            display: "flex",
            justifyContent: "left",
            fontWeight: 700,
          }}
        >
          {question}
        </InputLabel>
      </Grid>
      <FormControl sx={{ paddingTop: "20px", paddingLeft: "10px" }}>
        <InputLabel sx={{ paddingTop: "10px" }} >
          Select an option
        </InputLabel>
        <Select
          name={id}
          id={id} 
          value={value || ''}
          onChange={onChange}
          sx={{ width: "220px", height: "30px" }}
        >
          {options.map((choice, index) => (
            <MenuItem 
              key={index} 
              value={choice.toLowerCase()}
            >
              {choice}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <AddQuotes />
    </>
  );
}
export default DropDown;

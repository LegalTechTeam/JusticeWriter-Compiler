import * as React from "react";

import { Grid, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import AddQuotes from "./AddQuotes";
function DropDown(props) {
  const [Status, setStatus] = React.useState("");

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
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
          {props.question}
        </InputLabel>
      </Grid>
      <FormControl sx={{ paddingTop: "20px", paddingLeft: "10px" }}>
        <InputLabel sx={{ paddingTop: "10px" }} id={props.id}>
          Select an option
        </InputLabel>
        <Select
          labelId={props.id}
          id={props.id}
          value={Status}
          label={props.id}
          onChange={handleStatusChange}
          sx={{ width: "220px", height: "30px" }}
        >
          {props.options.map((choice, index) => (
            <MenuItem key={index} value={choice.toLowerCase()}>
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

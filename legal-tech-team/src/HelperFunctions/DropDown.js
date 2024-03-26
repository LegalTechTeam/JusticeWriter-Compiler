import * as React from "react";
import { useState, useEffect } from "react";

import { Grid, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import AddQuotes from "./AddQuotes";
function DropDown(props) {
  const { question, id, value, onChange, handleQuotesChange, options, section } = props;

  const [quotes, setQuotes] = useState([]);

  const quotesAdded = (newQuotes) => {
    setQuotes(newQuotes);
    handleQuotesChange(newQuotes);
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
          quotes={quotes}
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
      <AddQuotes quotes={quotes} section={section} id={id} onQuotesChange={quotesAdded} />
    </>
  );
}
export default DropDown;

import { Grid, InputLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import AddQuotes from "./AddQuotes";
function SmallTextInput(props) {
  const { id, handleQuotesChange, section, field } = props;

  const [quotes, setQuotes] = useState([]);

  const quotesAdded = (newQuotes) => {
    setQuotes((prevQuotes) => [...prevQuotes, ...newQuotes]);
    handleQuotesChange(newQuotes);
  };

  return (
    <>
      <Grid item xs={12} sm={2}>
        <InputLabel
          sx={{
            display: "flex",
            justifyContent: "left",
            fontWeight: 700,
          }}
        >
          {field}

          {section !== "caseInformation" && (
            <AddQuotes
              quotes={quotes}
              section={section}
              id={id}
              onQuotesChange={quotesAdded}
            />
          )}
        </InputLabel>
      </Grid>

      {/*First Name text field*/}
      <Grid item xs={12} sm={4}>
        <TextField
          required
          id={props.id}
          label={props.label}
          fullWidth
          size="small"
          variant="outlined"
          value={props.value}
          onChange={props.onChange}
        />
      </Grid>
    </>
  );
}
export default SmallTextInput;

import { Grid, InputLabel, TextField } from "@mui/material";
import AddQuotes from "./AddQuotes";
import { useState } from "react";
import React from "react";
function BigText(props) {
  const { id, handleQuotesChange, section } = props;

  const [quotes, setQuotes] = useState([]);

  const quotesAdded = (newQuotes) => {
    setQuotes((prevQuotes) => [...prevQuotes, ...newQuotes]);
    handleQuotesChange(newQuotes);
  };

  const questionLines = props.question.split("\n").map((line, index) => {
    return (
      <React.Fragment key={index}>
        {line}
        <br></br>
      </React.Fragment>
    );
  });
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
          {questionLines}
          <AddQuotes
            quotes={quotes}
            section={section}
            id={id}
            onQuotesChange={quotesAdded}
          />{" "}
        </InputLabel>
      </Grid>

      <Grid item xs={12} sm={10}>
        <TextField
          required
          multiline={true}
          rows={4}
          id={props.id}
          label={props.label}
          fullWidth
          variant="outlined"
          onChange={props.onChange}
          value={props.value}
        />
      </Grid>
    </>
  );
}
export default BigText;

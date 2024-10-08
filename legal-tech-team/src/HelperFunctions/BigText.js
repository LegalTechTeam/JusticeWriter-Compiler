import { Grid, InputLabel, TextField } from "@mui/material";
import React, { useState } from "react";
import AddQuotes from "./AddQuotes";
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
      <Grid item xs={12} sm={2} sx={{ display: "flex" }}>
        <InputLabel
          sx={{
            display: "flex",
            justifyContent: "left",
            fontWeight: 700,
          }}
        >
          {questionLines}
        </InputLabel>
        <AddQuotes
          quotes={quotes}
          section={section}
          id={id}
          onQuotesChange={quotesAdded}
        />{" "}
      </Grid>

      <Grid item xs={12} sm={10}>
        <TextField
          required
          multiline={true}
          rows={props.rows ? props.rows : 4}
          onChange={props.onChange}
          value={props.value}
          id={props.id}
          label={props.label}
          fullWidth
          variant="outlined"
        />
      </Grid>
    </>
  );
}
export default BigText;

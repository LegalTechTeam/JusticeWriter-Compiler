import * as React from "react";
import { Grid, TextField, InputLabel } from "@mui/material";

function DateOfBirth(props) {
  const { field, id, label, value, onChange } = props;
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
        </InputLabel>
      </Grid>

      {/*Date of Birth Selector*/}

      {/*Date of Birth Selector*/}
      <Grid item xs={12} sm={4}>
        <TextField
          required
          id={id}
          label={label}
          fullWidth
          size="small"
          variant="outlined"
          value={value}
          onChange={onChange}
        />
      </Grid>
    </>
  );
}

export default DateOfBirth;

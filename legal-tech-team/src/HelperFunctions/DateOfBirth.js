import * as React from "react";
import { Grid, TextField, InputLabel } from "@mui/material";

function DateOfBirth() {
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
          Date of Birth
        </InputLabel>
      </Grid>

      {/*Date of Birth Selector*/}

      {/*Date of Birth Selector*/}
      <Grid item xs={12} sm={4}>
        <TextField
          required
          id="DOB"
          label="MM-DD-YYYY"
          fullWidth
          size="small"
          variant="outlined"
        />
      </Grid>
    </>
  );
}

export default DateOfBirth;

import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Header from "../Layouts/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  Typography,
  TextField,
  Box,
  Paper,
  InputLabel,
  Divider,
  MenuItem,
  FormControl,
  Select,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import dayjs from "dayjs";
import themeSubHeading from "../Layouts/Theme";
import AddQuotes from "./AddQuotes";
function RadioYesNo(props) {
  const { question, id, value, onChange, checkedValue, handleQuotesChange, section } = props;

  const [quotes, setQuotes] = useState([]);

  const quotesAdded = (newQuotes) => {
    setQuotes(newQuotes);
    handleQuotesChange(newQuotes);
  };

  return (
    <>
      {/*Question 1 text*/}

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

      {/*Yes/No Radio buttons*/}
      <Grid item xs={12} sm={4} style={{ display: "flex" }}>
        <RadioGroup
          row
          aria-label="answer"
          name="answer"
          value={value}
          onChange={onChange}
          checkedValue={checkedValue}
           >
          <FormControlLabel value="no" control={<Radio id={id} />} label="No" />
          <FormControlLabel value="yes" control={<Radio  id={id} />} label="yes" />
        </RadioGroup>
        <AddQuotes quotes={quotes} section={section} id={id} onQuotesChange={quotesAdded} />
      </Grid>
    </>
  );
}

export default RadioYesNo;

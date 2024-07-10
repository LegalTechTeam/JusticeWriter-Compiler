import * as React from "react";
import { useState } from "react";
import Header from "../Layouts/Header";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  InputLabel,
  Button,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const CrimeStats = () => {
    const navigate = useNavigate();
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const allStatesAbbr = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
        "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA",
        "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
    ];

    const handleChangeState = (event) => {
        setState(event.target.value);
    };

    const handleSubmit = () => {
        const url = `https://crimegrade.org/safest-places-in-${zipCode}/`;
        const summaryURL = `https://www.areavibes.com/${city}-${state}/crime/`;

        // Open the first URL after a delay
        setTimeout(() => {
        const win1 = window.open(url, "_blank");
        if (!win1) {
            alert("Popup blocker prevented opening the first URL.");
        }

        // Open the second URL after another delay
            setTimeout(() => {
                const win2 = window.open(summaryURL, "_blank");
                if (!win2) {
                alert("Popup blocker prevented opening the second URL.");
                }
            }, 2000); 
        }, 1000); 
  };

  return (
    <div>
        <Header />
      <Paper
        elevation={3}
        sx={{
          marginRight: "15%",
          marginLeft: "15%",
          paddingBottom: "5%",
          fontFamily: "Noto Sans",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
          Crime Statistics
        </Typography>
        <Grid item xs={12} sm={2}>
          <InputLabel sx={{ fontWeight: 700 }}>Zip Code</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10} paddingBottom={5}>
          <TextField
            required
            multiline={true}
            fullWidth
            variant="outlined"
            onChange={(e) => {
              setZipCode(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel sx={{ fontWeight: 700 }}>City</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10} paddingBottom={5}>
          <TextField
            required
            multiline={true}
            fullWidth
            variant="outlined"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel sx={{ fontWeight: 700 }}>State</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10} paddingBottom={5}>
          <Select
            fullWidth
            value={state}
            onChange={handleChangeState}
            variant="outlined"
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select State
            </MenuItem>
            {allStatesAbbr.map((abbr, index) => (
              <MenuItem key={index} value={abbr}>
                {abbr}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginBottom: 2 }}
        >
          Submit
        </Button>
        <Button 
            variant="outlined"
            onClick={() => {
                navigate("/")
            }}
            sx={{ marginTop: 2 }}>
                Go Back Home
        </Button>
      </Paper>
    </div>
  );
};

export default CrimeStats;

import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Layouts/Header";
import themeWrapper from "../Layouts/ThemeWrapper";

import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  ThemeProvider,
  Typography
} from "@mui/material";

const CrimeStats = () => {
  const navigate = useNavigate();
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const allStatesAbbr = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const handleChangeState = (event) => {
    setState(event.target.value);
  };

  const handleSubmit = () => {
    const url = `https://crimegrade.org/safest-places-in-${zipCode}/`;
    const summaryURL = `https://www.areavibes.com/${city}-${state}/crime/`;

    setTimeout(() => {
      const win1 = window.open(url, "_blank");
      if (!win1) {
        alert("Popup blocker prevented opening the first URL.");
      }

      setTimeout(() => {
        const win2 = window.open(summaryURL, "_blank");
        if (!win2) {
          alert("Popup blocker prevented opening the second URL.");
        }
      }, 2000);
    }, 1000);
  };

  return (
    <ThemeProvider theme={themeWrapper}>
      <div>
        <Header />
        <Paper
          elevation={3}
          sx={{
            margin: "0% 15%",
            padding: "3%",
            fontFamily: "Noto Sans",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            {/* <img src="" alt="Logo" style={{ height: "60px" }} /> */}
          </Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              paddingBottom: 5,
              fontWeight: "bold",
              fontFamily: "Noto Sans",
            }}
          >
            Crime Statistics
          </Typography>
          <Box sx={{ width: "80%" }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <InputLabel sx={{ fontWeight: 700 }}>Zip Code</InputLabel>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setZipCode(e.target.value)}
                  sx={{ marginTop: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ fontWeight: 700 }}>City</InputLabel>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setCity(e.target.value)}
                  sx={{ marginTop: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ fontWeight: 700 }}>State</InputLabel>
                <Select
                  fullWidth
                  value={state}
                  onChange={handleChangeState}
                  variant="outlined"
                  displayEmpty
                  sx={{ marginTop: 1 }}
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
            </Grid>
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ marginRight: 2, display: "flex", alignItems: "center" }}
                startIcon={<SearchIcon />}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/")}
                sx={{ display: "flex", alignItems: "center" }}
                startIcon={<HomeIcon />}
              >
                Go Back Home
              </Button>
            </Box>
          </Box>
        </Paper>
      </div>
    </ThemeProvider>
  );
};

export default CrimeStats;

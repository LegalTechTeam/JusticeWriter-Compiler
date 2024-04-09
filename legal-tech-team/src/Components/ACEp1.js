import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Paper,
  InputLabel,
  Button,
} from "@mui/material";
import dayjs from "dayjs";

import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import { SaveJSON, ReturnExistingInput } from "../HelperFunctions/formatJSON";
function ACEp1() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  useEffect(() => {
    const existingDataACE = ReturnExistingInput("adverseChildhoodExpriences");
    if (existingDataACE) {
      setFormDataACE(existingDataACE);
    }
  }, []); 

  const [formDataACE, setFormDataACE] = useState({
    emotionalAbuse: "",
    physicalAbuse: "",
    sexualAbuse: "",

    emotionalNeglect: "",
    physicalNeglect: "",
    familyMemberAbusedOrThreatened: "",
    alcoholAbuse: "",
    mentalIllness: "",
    separation: "",
  });

  const handleACEChange = (e) => {
    setFormDataACE({ ...formDataACE, [e.target.id]: e.target.value });
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
        }}
      >
        <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
            Adverse Childhood Experience (cont.)
          </Typography>

          {/*input emotional neglect*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid item xs={12} sm={10}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Emotional neglect
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="emotionalNeglect"
                label="Emotional neglect"
                fullWidth
                variant="outlined"
                value={formDataACE.emotionalNeglect}
                onChange={handleACEChange}
              />
            </Grid>
          </Box>

          {/*input physical neglect*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid item xs={12} sm={10}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Physical neglect
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="physicalNeglect"
                label="Physical neglect"
                fullWidth
                variant="outlined"
                value={formDataACE.physicalNeglect}
                onChange={handleACEChange}
              />
            </Grid>
          </Box>

          {/*input three*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid item xs={12} sm={10}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Family member Abused or Threatened
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="familyMemberAbusedOrThreatened"
                label="Family member abused"
                fullWidth
                variant="outlined"
                value={formDataACE.familyMemberAbusedOrThreatened}
                onChange={handleACEChange}
              />
            </Grid>
          </Box>

          {/*input alcohol abuse*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid item xs={12} sm={10}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Alcohol abuse
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="alcoholAbuse"
                label="Alcohol abuse"
                fullWidth
                variant="outlined"
                value={formDataACE.alcoholAbuse}
                onChange={handleACEChange}
              />
            </Grid>
          </Box>

          {/*input mental illness*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid item xs={12} sm={10}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Mental illness
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="mentalIllness"
                label="Mental illness"
                fullWidth
                variant="outlined"
                value={formDataACE.mentalIllness}
                onChange={handleACEChange}
              />
            </Grid>
          </Box>

          {/*input separation*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid item xs={12} sm={10}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Separation
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="separation"
                label="Separation"
                fullWidth
                variant="outlined"
                value={formDataACE.separation}
                onChange={handleACEChange}
              />
            </Grid>
          </Box>
        </Box>

        <Button variant="contained" onClick={() => navigate("/schooling")}>
          Previous
        </Button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

        <Button variant="contained" onClick={() => { SaveJSON(formDataACE, "adverseChildhoodExpriences"); navigate("/aceTwo"); }}>
          Next
        </Button>
      </Paper>
    </div>
  );
}
export default ACEp1;

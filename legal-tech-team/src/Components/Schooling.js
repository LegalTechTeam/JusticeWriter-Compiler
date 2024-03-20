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
  Divider,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import dayjs from "dayjs";

import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import CheckboxWithAdd from "../HelperFunctions/CheckBoxWithAdd";
import AddQuotes from "../HelperFunctions/AddQuotes";
import { SaveJSON, ReturnExistingInput } from "../HelperFunctions/formatJSON";
function Schooling() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  const schoolList = [
    {
      label: "Suspended",
    },
    {
      label: "Expelled",
    },
    {
      label: "Dropped Out",
    },
    {
      label: "None of the Above",
    },
  ]

  useEffect(() => {
    const existingData = ReturnExistingInput("schooling");
    const existingDataACE = ReturnExistingInput("adverseChildhoodExpriences");
    if (existingData) {
      setFormData(existingData);
    }
    if (existingDataACE) {
      setFormDataACE(existingDataACE);
    }
  }, []); 

  const [formData, setFormData] = useState({
    schoolsAttended: "",
    schoolChanges: "",
    schoolExperiences: "",
    schoolQuality: "",
    wasSuspended: "",
    wasExpelled: "",
    didDropOut: "",
    noDisciplinaryAction: "",
  });

  const [formDataACE, setFormDataACE] = useState({
    emotionalAbuse: "",
    physicalAbuse: "",
    sexualAbuse: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

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
          <Typography variant="h6" sx={{ ...themeTitle }}>
            Schooling
          </Typography>
          {/*input one*/}
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
                List names and school grades of the schools you attended
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="schoolsAttended"
                label="Schools attended"
                fullWidth
                variant="outlined"
                value={formData.schoolsAttended}
                onChange={handleChange}
              />
            </Grid>
          </Box>

          {/*input two*/}
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
                How many times did you change schools?
              </InputLabel>

              <TextField
                required
                multiline={false}
                id="schoolChanges"
                label="School changes"
                fullWidth
                variant="outlined"
                value={formData.schoolChanges}
                onChange={handleChange}
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
                What were your experiences and grades like at school?
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="schoolExperiences"
                label="School experiences"
                fullWidth
                variant="outlined"
                value={formData.schoolExperiences}
                onChange={handleChange}
              />
            </Grid>
          </Box>
          {/*input four*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid item xs={12} sm={8}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Rate the quality of your school
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={3}>
              <RadioGroup
                row
                aria-label="answer"
                name="answer"
                value={formData.schoolQuality}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Poor"
                  control={<Radio id={"schoolQuality"} />}
                  label="Poor"
                />
                <FormControlLabel
                  value="Average"
                  control={<Radio id={"schoolQuality"} />}
                  label="Average"
                />
                <FormControlLabel
                  value="Good"
                  control={<Radio id={"schoolQuality"} />}
                  label="Good"
                />
                <FormControlLabel
                  value="Excellent"
                  control={<Radio id={"schoolQuality"} />}
                  label="Excellent"
                />
                <AddQuotes/>
              </RadioGroup>
            </Grid>
          </Box>
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            {/*input five*/}
            <Grid item xs={12} sm={8}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Have you every been:
              </InputLabel>
            </Grid>
            <FormGroup
              //onChange={handleChange}
            >
              {schoolList.map((action, index) => (
                <CheckboxWithAdd
                  key={index}
                  label={action.label}
                />
              ))}
              {/* <CheckboxWithAdd>
                  <FormControlLabel
                    control={<Checkbox checked={formData.wasSuspended} onChange={handleChange} id="wasSuspended" />}
                    label="Suspended"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={formData.wasExpelled} onChange={handleChange} id="wasExpelled" />}
                    label="Expelled"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={formData.didDropOut} onChange={handleChange} id="didDropOut" />}
                    label="Dropped Out"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={formData.noDisciplinaryAction} onChange={handleChange} id="noDisciplinaryAction" />}
                    label="None of the above"
                  />
                </CheckboxWithAdd> */}
              </FormGroup>
            
          </Box>

          <Divider orientation="horizontal" flexItem />

          <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
            Adverse Childhood Experience
          </Typography>

          {/*emotional abuse input*/}
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
                Emotional Abuse
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="emotionalAbuse"
                label="Emotional Abuse"
                fullWidth
                variant="outlined"
                value={formDataACE.emotionalAbuse}
                onChange={handleACEChange}
              />
            </Grid>
          </Box>

          {/*Physical abuse input*/}
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
                Physical Abuse
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="physicalAbuse"
                label="Physical Abuse"
                fullWidth
                variant="outlined"
                value={formDataACE.physicalAbuse}
                onChange={handleACEChange}
              />
            </Grid>
          </Box>

          {/*Sexual Abuse*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "40px",
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
                Sexual Abuse
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="sexualAbuse"
                label="Sexual Abuse"
                fullWidth
                variant="outlined"
                value={formDataACE.sexualAbuse}
                onChange={handleACEChange}
              />
            </Grid>
          </Box>
        </Box>

        <Button variant="contained" onClick={() => navigate("/community")}>
          Previous
        </Button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

        <Button variant="contained" onClick={() => { SaveJSON(formData, "schooling"); SaveJSON(formDataACE, "adverseChildhoodExpriences"); navigate("/aceOne"); }}>
          Next
        </Button>
      </Paper>
    </div>
  );
}
export default Schooling;

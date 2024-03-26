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
} from "@mui/material";
import dayjs from "dayjs";

import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import RadioYesNo from "../HelperFunctions/RadioYesNo";
import { SaveJSON, ReturnExistingInput } from "../HelperFunctions/formatJSON";
function ACEp2() {
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

    familyMemberPrison: "",
    lossesAndDeaths: "",
    otherTraumaticExperience: "",
    drugUse: "",
    diagnosedSUD: {
      diagnosedSUD: "",
      notes: [],
    },
    treatedOrTestedSUD: {
      treatedOrTestedSUD: "",
      notes: [],
    },
  });

  const handleACEChange = (e) => {
    setFormDataACE({ ...formDataACE, [e.target.id]: e.target.value });
  };

  const handleRadioChange = (e) => {
    const { id, value } = e.target;
    setFormDataACE({
      ...formDataACE,
      [id]: { ...formDataACE[id], [id]: value },
    });
  };

  const handleQuotesChange = (subSection, newQuotes) => {
    setFormDataACE({
      ...formDataACE,
      [subSection]: { ...formDataACE[subSection], ["notes"]: newQuotes },
    });
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
                Family member in prison (if any)
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="familyMemberPrison"
                label="Family in prison"
                fullWidth
                variant="outlined"
                value={formDataACE.familyMemberPrison}
                onChange={handleACEChange}
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
                Any significant losses or deaths
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="lossesAndDeaths"
                label="Losses or deaths"
                fullWidth
                variant="outlined"
                value={formDataACE.lossesAndDeaths}
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
                Other traumatic experiences
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="otherTraumaticExperience"
                label="Other"
                fullWidth
                variant="outlined"
                value={formDataACE.otherTraumaticExperience}
                onChange={handleACEChange}
              />
            </Grid>
          </Box>

          <Divider orientation="horizontal" flexItem />

          <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
            Drug Use
          </Typography>

          {/*drug input*/}
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
                Types of drugs used and how often
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="drugUse"
                label="Drugs used"
                fullWidth
                variant="outlined"
                value={formDataACE.drugUse}
                onChange={handleACEChange}
              />
            </Grid>

            <Grid container spacing={3} marginTop={1}>
              <RadioYesNo
                id={"diagnosedSUD"}
                ection={"adverseChildhoodExpriences"}
                question={
                  "Ever been diagnosed with substance use disorder (SUD)?"
                }
                value={formDataACE.diagnosedSUD?.diagnosedSUD}
                onChange={handleRadioChange}
                checkedValue={formDataACE.diagnosedSUD?.diagnosedSUD}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("diagnosedSUD", newQuotes)
                }
              />
              <RadioYesNo
                id={"treatedSUD"}
                section={"adverseChildhoodExpriences"}
                question={"Ever been tested or treated for SUD?"}
                value={formDataACE.treatedSUD?.treatedSUD}
                onChange={handleRadioChange}
                checkedValue={formDataACE.treatedSUD?.treatedSUD}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("treatedSUD", newQuotes)
                }
              />
            </Grid>
          </Box>
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            SaveJSON(formDataACE, "adverseChildhoodExpriences");
            navigate("/aceOne");
          }}
        >
          Previous
        </Button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
        <Button
          variant="contained"
          onClick={() => {
            SaveJSON(formDataACE, "adverseChildhoodExpriences");
            navigate("/peers-role-models");
          }}
        >
          Next
        </Button>
      </Paper>
    </div>
  );
}
export default ACEp2;

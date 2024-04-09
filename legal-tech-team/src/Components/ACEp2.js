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
import BigText from "../HelperFunctions/BigText";
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
    emotionalAbuse: {
      emotionalAbuse: "",
      notes: [],
    },
    physicalAbuse: {
      physicalAbuse: "",
      notes: [],
    },
    sexualAbuse: {
      sexualAbuse: "",
      notes: [],
    },
    emotionalNeglect: {
      emotionalNeglect: "",
      notes: [],
    },
    physicalNeglect: {
      physicalNeglect: "",
      notes: [],
    },
    familyMembersAbusedOrThreatened: {
      familyMembersAbusedOrThreatened: "",
      notes: [],
    },
    alcoholAbuse: {
      alcoholAbuse: "",
      notes: [],
    },
    mentalIllness: {
      mentalIllness: "",
      notes: [],
    },
    separation: {
      separation: "",
      notes: [],
    },
    familyMembersInPrison: {
      familyMembersInPrison: "",
      notes: [],
    },
    lossesAndDeaths: {
      lossesAndDeaths: "",
      notes: [],
    },
    otherTraumaticExperience: {
      otherTraumaticExperience: "",
      notes: [],
    },
    drugUse: {
      drugUse: "",
      notes: [],
    },
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
    const { id, value } = e.target;
    setFormDataACE({
      ...formDataACE,
      [id]: { ...formDataACE[id], [id]: value },
    });
  };

  const handleRadioChange = (e) => {
    const { id, value } = e.target;
    setFormDataACE({
      ...formDataACE,
      [id]: { ...formDataACE[id], [id]: value },
    });
  };

  const handleQuotesChange = (subSection, newQuotes) => {
    setFormDataACE((prevFormData) => ({
      ...prevFormData,
      [subSection]: {
        ...prevFormData[subSection],
        notes: newQuotes ? [...newQuotes] : [],
      },
    }));
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
            <BigText
              question={"Family members in prison if any"}
              id={"familyMembersInPrision"}
              label={"Family members in prison "}
              onChange={handleACEChange}
              value={formDataACE.familyMembersInPrison?.familyMembersInPrison}
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange("familyMembersInPrison", newQuotes)
              }
              section={"adverseChildhoodExpriences"}
            />
          </Box>

          {/*input two*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <BigText
              question={"Any significant losses or deaths"}
              id={"lossesAndDeaths"}
              label={"Family members in prison "}
              onChange={handleACEChange}
              value={formDataACE.lossesAndDeaths?.lossesAndDeaths}
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange("lossesAndDeaths", newQuotes)
              }
              section={"adverseChildhoodExpriences"}
            />
          </Box>

          {/*input three*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <BigText
              question={"Other traumatic Experiences"}
              id={"otherTraumaticExperience"}
              label={"Other traumatic Experiences"}
              onChange={handleACEChange}
              value={
                formDataACE.otherTraumaticExperience?.otherTraumaticExperience
              }
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange("otherTraumaticExperience", newQuotes)
              }
              section={"adverseChildhoodExpriences"}
            />
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
            <BigText
              question={"Types of drugs used and how often"}
              id={"drugUse"}
              label={"Drug Use"}
              onChange={handleACEChange}
              value={formDataACE.drugUse?.drugUse}
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange("drugUse", newQuotes)
              }
              section={"adverseChildhoodExpriences"}
            />
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

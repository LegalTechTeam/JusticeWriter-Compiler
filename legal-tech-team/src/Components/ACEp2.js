import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  ThemeProvider,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BigText from "../HelperFunctions/BigText";
import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";
import RadioYesNo from "../HelperFunctions/RadioYesNo";
import SectionHeader from "../HelperFunctions/SectionHeader";
import SubSectionHeader from "../HelperFunctions/subSectionHeader";
import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import themeWrapper from "../Layouts/ThemeWrapper";
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

    separation: {
      separation: "",
      notes: [],
    },
    familyMembersInPrision: {
      familyMembersInPrision: "",
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
    <ThemeProvider theme={themeWrapper}>
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
          <SectionHeader
            number="Section 5"
            name="Childhood Trauma and Stressful Life Events"
          />
          <SubSectionHeader name="ACEs" />
          <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
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
                value={
                  formDataACE.familyMembersInPrision?.familyMembersInPrision
                }
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("familyMembersInPrision", newQuotes)
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
                question={
                  "Have you experienced any significant losses or deaths? Please describe."
                }
                id={"lossesAndDeaths"}
                label={"Losses And Deaths "}
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
                question={
                  "Are there any other deeply traumatic or hurtful experiences that we have not discussed? Please describe."
                }
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
              navigate("/cageAid");
            }}
          >
            Next
          </Button>
        </Paper>
      </div>
    </ThemeProvider>
  );
}
export default ACEp2;

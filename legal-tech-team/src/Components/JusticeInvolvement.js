import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  ThemeProvider,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import themeWrapper from "../Layouts/ThemeWrapper";

import AddQuotes from "../HelperFunctions/AddQuotes";
import CheckboxWithAdd from "../HelperFunctions/CheckBoxWithAdd"; // Following schooling.js pattern
import SmallTextInput from "../HelperFunctions/SmallTextInput";
import SectionHeader from "../HelperFunctions/SectionHeader";
import SubSectionHeader from "../HelperFunctions/subSectionHeader";
import Header from "../Layouts/Header";
import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";

function JusticeInvolvement() {
  const navigate = useNavigate();

  useEffect(() => {
    const existingData = ReturnExistingInput("justiceInvolvement");
    if (existingData) {
      setFormData(existingData);
    }
  }, []);

  const [formData, setFormData] = useState({
    ageFirstInvolved: {
      ageFirstInvolved: "", // Under 12 years, 12-15 years, etc.
      notes: [],
    },
    natureOfFirstInvolvement: {
        natureOfFirstInvolvement: "",
    },
    frequencyOfNegativeEncounters: {
      frequencyOfNegativeEncounters: "", // None, Once, 2-3 times, etc.
      notes: [],
    },
    timesReArrested: {
      timesReArrested: "", // Never, Once, 2-3 times, etc.
      notes: [],
    },
    placedInInstitution: {
      placedInInstitution: "", // Yes or No
      notes: [],
    },
    InstitutionalizationImpactLevel: {
      InstitutionalizationImpactLevel: "", // Short-term stay, Long-term stay, etc.
      notes: [],
    },
    accumulationAndComplexity: {
        accumulationAndComplexity: "",
      notes: [],
    },
  });

  const handleRadioChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: { ...prevFormData[id], [id]: value },
    }));
  };
  const handleOptionChange = (option, isChecked) => {
    setFormData((prevFormData) => {
      const accumulationAndComplexity = prevFormData.accumulationAndComplexity || {
        accumulationAndComplexity: [],
      };

      return {
        ...prevFormData,
        accumulationAndComplexity: {
          ...accumulationAndComplexity,
          accumulationAndComplexity: isChecked
            ? [...accumulationAndComplexity.accumulationAndComplexity, option]
            : accumulationAndComplexity.accumulationAndComplexity.filter(
                (id) => id !== option
              ),
        },
      };
    });
  };
  const handleOptionChange2 = (option, isChecked) => {
    setFormData((prevFormData) => {
      const natureOfFirstInvolvement = prevFormData.natureOfFirstInvolvement || {
        natureOfFirstInvolvement: [],
      };

      return {
        ...prevFormData,
        natureOfFirstInvolvement: {
          ...natureOfFirstInvolvement,
          natureOfFirstInvolvement: isChecked
            ? [...natureOfFirstInvolvement.natureOfFirstInvolvement, option]
            : natureOfFirstInvolvement.natureOfFirstInvolvement.filter(
                (id) => id !== option
              ),
        },
      };
    });
  };
 

  const handleQuotesChange = (sectionId, newQuotes) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [sectionId]: {
        ...prevFormData[sectionId],
        notes: newQuotes ? [...newQuotes] : [],
      },
    }));
  };

  const handleSave = () => {
    SaveJSON(formData, "justiceInvolvement");
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
          <SectionHeader number="Section 8" name="Justice Involvement" />
          <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
            <SubSectionHeader name="Justice Involvement" />

            {/* Early Justice Involvement */}
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
              }}
            >
              <SmallTextInput
                field="At what age were you first involved with the justice system?"
                id="ageFirstInvolved"
                label="Age First Involvement"
                onChange={handleRadioChange}
                value={formData.ageFirstInvolved?.ageFirstInvolved}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("ageFirstInvolved", newQuotes)
                }
                section="justiceInvolvement"
              />
            </Box>

            {/* Nature of First Involvement (Select all that apply) */}
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
                  What was the nature of your first involvement with the justice
                  system? (Select all that apply)
                </InputLabel>
              </Grid>
              <FormGroup>
                {[
                  { label: "Arrest", id: "arrest" },
                  { label: "Detention", id: "detention" },
                  { label: "Probation", id: "probation" },
                  { label: "Other", id: "other" },

                ].map((option, index) => (
                    <React.Fragment key={index}>
                    <CheckboxWithAdd
                      label={option.label}
                      id={option.id}
                      checked={
                        formData.natureOfFirstInvolvement &&
                        formData.natureOfFirstInvolvement.natureOfFirstInvolvement.includes(
                          option.id
                        )
                      }
                      onChange={handleOptionChange2}
                      subs={option.subs}
                      handleQuotesChange={(newQuotes) =>
                        handleQuotesChange(option.id, newQuotes)
                      }
                      section={"schooling"}
                    />
                  </React.Fragment>
                ))}
              </FormGroup>
             
            </Box>

            {/* Frequency of Negative Encounters */}
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
              }}
            >
              <SmallTextInput
                field="How many times have you experienced negative encounters with law enforcement?"
                id="frequencyOfNegativeEncounters"
                label="Negative Encounters"
                onChange={handleRadioChange}
                value={formData.frequencyOfNegativeEncounters?.frequencyOfNegativeEncounters}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("frequencyOfNegativeEncounters", newQuotes)
                }
                section="justiceInvolvement"
              />
            </Box>

            {/* Frequency of Re-Arrests */}
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
              }}
            >
              <SmallTextInput
                field="How many times have you been re-arrested?"
                id="timesReArrested"
                label="Re-Arrests"
                onChange={handleRadioChange}
                value={formData.timesReArrested?.timesReArrested}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("timesReArrested", newQuotes)
                }
                section="justiceInvolvement"
              />
            </Box>

            {/* placedInInstitution */}
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
                  Have you even been institutionalized?
                </InputLabel>
              </Grid>
              <RadioGroup
                row
                aria-label="placedInInstitution"
                name="placedInInstitution"
                value={formData.placedInInstitution?.placedInInstitution}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="Yes"
                  control={<Radio id="placedInInstitution" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="No"
                  control={<Radio id="placedInInstitution" />}
                  label="No"
                />
                <AddQuotes
                  quotes={formData.placedInInstitution?.notes}
                  section="justiceInvolvement"
                  id="placedInInstitution"
                  onQuotesChange={(newQuotes) =>
                    handleQuotesChange("placedInInstitution", newQuotes)
                  }
                />
              </RadioGroup>
            </Box>

            {/* Impact of placedInInstitution */}
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
              }}
            >
              <SmallTextInput
                field="How would you describe your experience with institutionalization?"
                id="InstitutionalizationImpactLevel"
                label="Impact of institutionalization"
                onChange={handleRadioChange}
                value={formData.InstitutionalizationImpactLevel?.InstitutionalizationImpactLevel}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("InstitutionalizationImpactLevel", newQuotes)
                }
                section="justiceInvolvement"
              />
            </Box>

            {/* Accumulation and Complexity */}
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
              }}
            >
              <SubSectionHeader name="Accumulation and Complexity" />
              <FormGroup>
                {[
                  { label: "Multiple arrests", id: "multipleArrests" },
                  {
                    label: "Repeated violations of probation",
                    id: "repeatedViolations",
                  },
                  {
                    label: "Incarceration in both juvenile and adult systems",
                    id: "incarcerationJuvenileAdult",
                  },
                  {
                    label: "Multiple periods of incarceration",
                    id: "multiplePeriodsIncarceration",
                  },
                  {
                    label: "Participation in diversion programs",
                    id: "diversionPrograms",
                  },
                  { label: "Frequent police stops", id: "frequentPoliceStops" },
                  { label: "Ongoing legal issues", id: "ongoingLegalIssues" },
                  {
                    label: "Involvement in both criminal and civil matters",
                    id: "involvementCriminalCivil",
                  },
                  { label: "Long-term supervision", id: "longTermSupervision" },
                ].map((option, index) => (
                    <React.Fragment key={index}>
                    <CheckboxWithAdd
                      label={option.label}
                      id={option.id}
                      checked={
                        formData.accumulationAndComplexity &&
                        formData.accumulationAndComplexity.accumulationAndComplexity.includes(
                          option.id
                        )
                      }
                      onChange={handleOptionChange}
                      subs={option.subs}
                      handleQuotesChange={(newQuotes) =>
                        handleQuotesChange(option.id, newQuotes)
                      }
                      section={"schooling"}
                    />
                  </React.Fragment>
                ))}
              </FormGroup>
              <AddQuotes
                quotes={formData.accumulationAndComplexity?.notes}
                section="justiceInvolvement"
                id="accumulationAndComplexity"
                onQuotesChange={(newQuotes) =>
                  handleQuotesChange("accumulationAndComplexity", newQuotes)
                }
              />
            </Box>

            {/* Save and Navigate */}
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => {
                    
                    SaveJSON(formData, "justiceInvolvement");
                    navigate("/peers-role-models");
                  }}
                >
                  {" "}
                  Previous
                </Button>
                <span
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                ></span>

                <Button
                  variant="contained"
                  onClick={() => {
                    SaveJSON(formData, "justiceInvolvement");
                    navigate("/mental-health");
                  }}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </div>
    </ThemeProvider>
  );
}

export default JusticeInvolvement;

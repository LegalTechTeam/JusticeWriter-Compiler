import * as React from "react";
import { useEffect } from "react";
import {
  Grid,
  Box,
  Paper,
  InputLabel,
  Button,
  FormGroup,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import CheckboxWithAdd from "../HelperFunctions/CheckBoxWithAdd";
import OtherNotes from "../HelperFunctions/OtherNotes";
import themeWrapper from "../Layouts/ThemeWrapper";
import BigText from "../HelperFunctions/BigText";
import { useState } from "react";
import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";
import AddQuotes from "../HelperFunctions/AddQuotes";
import SectionHeader from "../HelperFunctions/SectionHeader";
import SubSectionHeader from "../HelperFunctions/subSectionHeader";

function Syndemics() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  const [formData, setFormData] = useState({
    negativelyImpactedBy: {
      Disadvantages: [],
      notes: [],
    },

    otherNotes: {
      otherNotes: "",
      notes: [],
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: { ...formData[id], [id]: value } });
  };
  const disadvantagesList = [
    {
      label: "Mental Health Disorders",
      id: "mentalHealthDisorders",
      subs: [
        {
          label: "Depression",
          id: "depression",
          notes: [],
        },
        {
          label: "Anxiety",
          id: "anxiety",
          notes: [],
        },
        {
          label: "Bipolar Disorder",
          id: "bipolarDisorder",
          notes: [],
        },
        {
          label: "Post-Traumatic Stress Disorder (PTSD)",
          id: "ptsd",
          notes: [],
        },
        {
          label: "Schizophrenia",
          id: "schizophrenia",
          notes: [],
        },
      ],
      notes: [],
    },
    {
      label: "Substance use disorders (e.g, alcohol or drug addiction)",
      id: "substanceUseDisorder",
      subs: [
        {
          label: "Alcohol Use Disorder",
          id: "alcoholUseDisorder",
          notes: [],
        },
        {
          label: "Opioid Use Disorder",
          id: "opioidUseDisorder",
          notes: [],
        },
        {
          label: "Prescription Drug Abuse",
          id: "prescriptionDrugAbuse",
          notes: [],
        },
      ],
      notes: [],
    },
    {
      label: "Fentanyl use or overdose",
      id: "fentanylUseOrOverdose",
      subs: [
        {
          label: "Illicit Fentanyl Use",
          id: "illicitFentanylUse",
          notes: [],
        },
        {
          label: "Fentanyl Overdose Risk",
          id: "fentanylOverdoseRisk",
          notes: [],
        },
      ],
      notes: [],
    },
    {
      label: "Chronic Illness",
      id: "chronicIllness",
      subs: [
        {
          label: "Diabetes",
          id: "diabetes",
          notes: [],
        },
        {
          label: "Cardiovascular Disease",
          id: "cardiovascularDisease",
          notes: [],
        },
        {
          label: "Chronic Pain",
          id: "chronicPain",
          notes: [],
        },
      ],
      notes: [],
    },
    {
      label: "HIV/AIDS",
      id: "hivAids",
      notes: [],
    },
    {
      label: "Poverty or low Income",
      id: "poverty",
      subs: [
        {
          label: "Unemployment",
          id: "unemployment",
          notes: [],
        },
        {
          label: "Underemployment",
          id: "underemployment",
          notes: [],
        },
      ],
      notes: [],
    },
    {
      label: "Housing Instability: High rates of eviction, homelessness, and transience within the community.",
      id: "housingInstability",
      subs: [
        {
          label: "Homelessness",
          id: "homelessness",
          notes: [],
        },
        {
          label: "Eviction",
          id: "eviction",
          notes: [],
        },
        {
          label: "Overcrowded Living Conditions",
          id: "overcrowdedLiving",
          notes: [],
        },
      ],
      notes: [],
    },
    {
      label: "Stigma or discrimination",
      id: "stigmaOrDiscrimination",
      subs: [
        {
          label: "Racial Discrimination",
          id: "racialDiscrimination",
          notes: [],
        },
        {
          label: "LGBTQ+ Discrimination",
          id: "lgbtqDiscrimination",
          notes: [],
        },
        {
          label: "Disability Discrimination",
          id: "disabilityDiscrimination",
          notes: [],
        },
      ],
      notes: [],
    },
    {
      label: "Exposure to violence or trauma",
      id: "exposureToViolenceOrTrauma",
      subs: [
        {
          label: "Domestic Violence",
          id: "domesticViolence",
          notes: [],
        },
        {
          label: "Community Violence",
          id: "communityViolence",
          notes: [],
        },
        {
          label: "Childhood Trauma",
          id: "childhoodTrauma",
          notes: [],
        },
      ],
      notes: [],
    },
    {
      label: "Limited Access to Healthcare",
      id: "limitedAccessToHealthcare",
      subs: [
        {
          label: "Lack of Health Insurance",
          id: "lackOfHealthInsurance",
          notes: [],
        },
        {
          label: "Geographical Barriers",
          id: "geographicalBarriers",
          notes: [],
        },
        {
          label: "Shortage of Healthcare Providers",
          id: "shortageOfProviders",
          notes: [],
        },
      ],
      notes: [],
    },
    {
      label: "Food Insecurity",
      id: "foodInsecurity",
      subs: [
        {
          label: "Limited Access to Affordable Food",
          id: "limitedAffordableFood",
          notes: [],
        },
        {
          label: "Nutritional Deficiencies",
          id: "nutritionalDeficiencies",
          notes: [],
        },
      ],
      notes: [],
    },
    {
      label: "Hurricane or natural disaster",
      id: "hurricaneOrNaturalDisaster",
      subs: [
        {
          label: "Flooding",
          id: "flooding",
          notes: [],
        },
        {
          label: "Property Damage",
          id: "propertyDamage",
          notes: [],
        },
      ],
      notes: [],
    },
    {
      label: "Economic Stagnation: High unemployment rates and lack of job opportunities",
      id: "economicStagnation",
      subs: [
        {
          label: "High Unemployment",
          id: "highUnemployment",
          notes: [],
        },
        {
          label: "Lack of Job Opportunities",
          id: "lackOfOpportunities",
          notes: [],
        },
      ],
      notes: [],
    },
    {
      label: "Environmental Hazards: Poor air quality, lead contamination, and other harmful conditions",
      id: "environmentalHazards",
      subs: [
        {
          label: "Air Pollution",
          id: "airPollution",
          notes: [],
        },
        {
          label: "Water Contamination",
          id: "waterContamination",
          notes: [],
        },
        {
          label: "Lead Exposure",
          id: "leadExposure",
          notes: [],
        },
      ],
      notes: [],
    },
  ];
  

  const handleDisadvantageChange = (disadvantagesId, isChecked) => {
    setFormData((prevFormData) => {
      const negativelyImpactedBy = prevFormData.negativelyImpactedBy || {
        Disadvantages: [],
      };

      return {
        ...prevFormData,
        negativelyImpactedBy: {
          ...negativelyImpactedBy,
          Disadvantages: isChecked
            ? [...negativelyImpactedBy.Disadvantages, disadvantagesId]
            : negativelyImpactedBy.Disadvantages.filter(
                (id) => id !== disadvantagesId
              ),
        },
      };
    });
  };

  const handleQuotesChange = (subSection, newQuotes) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [subSection]: {
        ...prevFormData[subSection],
        notes: newQuotes ? [...newQuotes] : [],
      },
    }));
  };

  const [quotes, setQuotes] = useState([]);

  const quotesAdded = (newQuotes) => {
    setQuotes(newQuotes);
    handleQuotesChange(newQuotes);
  };

  const loadSavedData = () => {
    const savedData = ReturnExistingInput("syndemics");
    console.log("Syndemics " + savedData)
    if (savedData) {
      setFormData(savedData);
    }
  };

  useEffect(() => {
    loadSavedData();
  }, []);

  return (
    <ThemeProvider theme={themeWrapper}>
      <>
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
          <SectionHeader name="Community, Schooling and Syndemics" />
          <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
            <SubSectionHeader name="Syndemics" />

            {/*Question*/}
            <Box
              sx={{
                marginRight: "10%",
                marginLeft: "10%",
                paddingBottom: "40px",
                justifyContent: "left",
              }}
            >
             
              {/*Social Disadvantages*/}
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                    paddingTop: "5%",
                  }}
                >
                  Select all the COMMUNITY social disadvantages experienced in
                  your community: s{" "}
                </InputLabel>
              </Grid>

              <FormGroup>
                {disadvantagesList.map((disadvantage, index) => (
                  <React.Fragment key={index}>
                    <CheckboxWithAdd
                      label={disadvantage.label}
                      id={disadvantage.id}
                      checked={
                        formData.negativelyImpactedBy &&
                        formData.negativelyImpactedBy.Disadvantages.includes(
                          disadvantage.id
                        )
                      }
                      onChange={handleDisadvantageChange}
                      subs={disadvantage.subs}
                      handleQuotesChange={(newQuotes) =>
                        handleQuotesChange(disadvantage.id, newQuotes)
                      }
                      section={"syndemics"}
                    />
                    {formData.negativelyImpactedBy &&
                      formData.negativelyImpactedBy.Disadvantages.includes(
                        disadvantage.id
                      ) && (
                        <React.Fragment>
                          <div style={{ paddingLeft: 30 }}>
                            {disadvantage.subs &&
                              disadvantage.subs.map((sub, subIndex) => (
                                <>
                                  <CheckboxWithAdd
                                    key={subIndex}
                                    label={sub.label}
                                    id={sub.id}
                                    checked={formData.negativelyImpactedBy.Disadvantages.includes(
                                      sub.id
                                    )}
                                    onChange={handleDisadvantageChange}
                                    handleQuotesChange={(newQuotes) =>
                                      handleQuotesChange(sub.id, newQuotes)
                                    }
                                    section={"syndemics"}
                                  />
                                </>
                              ))}
                          </div>
                        </React.Fragment>
                      )}
                  </React.Fragment>
                ))}
              </FormGroup>

              {/*other notes */}
              <OtherNotes
                onChange={handleChange}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("otherNotes", newQuotes)
                }
                value={formData.otherNotes?.otherNotes}
                section={"syndemics"}
                id={"otherNotes"}
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formData, "syndemics");

              navigate("/community");
            }}
          >
            {" "}
            Previous
          </Button>
          <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formData, "syndemics");

              navigate("/schooling");
            }}
          >
            Next
          </Button>
        </Paper>
      </>
    </ThemeProvider>
  );
}

export default Syndemics;

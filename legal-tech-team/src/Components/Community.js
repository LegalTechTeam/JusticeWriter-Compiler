import {
  Box,
  Button,
  FormGroup,
  Grid,
  InputLabel,
  Paper,
  ThemeProvider
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BigText from "../HelperFunctions/BigText";
import CheckboxWithAdd from "../HelperFunctions/CheckBoxWithAdd";
import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";
import OtherNotes from "../HelperFunctions/OtherNotes";
import SectionHeader from "../HelperFunctions/SectionHeader";
import SubSectionHeader from "../HelperFunctions/subSectionHeader";
import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import themeWrapper from "../Layouts/ThemeWrapper";

function Community() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  const [formData, setFormData] = useState({
   
    selectedDisadvantages: {
      Disadvantages: [],
      notes: [],
    },

    NeighborhoodsLivedIn: {
      NeighborhoodsLivedIn: "",
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
      label: "Poverty",
      id: "poverty",
      subs: [],
      notes: [],
    },
    {
      label: "Lack of HealthCare services",
      id: "lackOfHealthCareServices",
      notes: [],

      subs: [
        {
          label: "Limited access to fresh, healthy and affordable food options",
          id: "limitedAccessToHealthyFoodOptions",
          notes: [],
        },
        {
          label:
            "Limited accesss to healthcare: Fewer clinics and hospitals, longer travel times for medical care, and less preventive care.",
          id: "limitedAccesssToHealthcare",
          notes: [],
        },
      ],
    },
    {
      label:
        "Crime: Higher incidences of petty and serious crimes, including theft, burglary, and violent offenses",
      id: "crime",
      subs: [
        {
          label: "Fights/Other violent conflicts",
          id: "fightsViolentConflicts",
          notes: [],
        },
        {
          label:
            "Gun Violence: : Increased risk of injury or death related to firearms, affecting community safety and well-being",
          id: "gunViolence",
          notes: [],
        },
        {
          label: "Substance Abuse: Prevalence of drug and alcohol addiction",
          id: "substanceAbuse",
          notes: [],
        },
      ],
    },
    {
      label: "Unsafe and poor quality schools",
      id: "unsafeSchools",
      subs: [],
      notes: [],
    },
    {
      label:
        "Prostitution: The presence of strippers, sex workers, sex trafficking, and related sex-related criminal activity",
      id: "prostitution",
      subs: [],
      notes: [],
    },
    {
      label:
        "Poor Infrastructure: Lack of maintenance and investment in buildings and public spaces, such as broken windows, abandoned houses",
      id: "poorInfrastructure",
      subs: [],
      notes: [],
    },
    {
      label: "Inadequate public service",
      id: "inadequatePublicService",
      subs: [
        {
          label: "Inadequate public transportation",
          id: "inadequatePublicTransportation",
          notes: [],
        },
        {
          label: "Inadequate public safety",
          id: "inadequatePublicSafety",
          notes: [],
        },
        {
          label: "Inadequate public health",
          id: "inadequatePublicHealth",
          notes: [],
        },
        {
          label: "Inadequate public housing",
          id: "inadequatePublicHousing",
          notes: [],
        },
        {
          label:
            "Insufficient garbage collection, policing, and social services",
          id: "InsufficientGarbageCollectionPolicingAndSocialServices",
          notes: [],
        },
      ],
      notes: [],
    },
    {
      label:
        "Housing Instability: High rates of eviction, homelessness, and transience within the community.",
      id: "housingInstability",
      subs: [],
      notes: [],
    },

    {
      label:
        "Social Isolation: Fewer community spaces and programs can lead to a lack of social cohesion and support networks",
      id: "socialIsolation",
      subs: [],
      notes: [],
    },
    {
      label:
        "Economic Stagnation: High unemployment rates and lack of job opportunities",
      id: "economicStagnation",
      subs: [],
      notes: [],
    },
    {
      label:
        "Environmental Hazards: Poor air quality, lead contamination, and other harmful conditions",
      id: "environmentalHazards",
      subs: [],
      notes: [],
    },
    {
      label:
        "Lack of Safe Outdoor Spaces: There is a shortage of safe recreational areas for children, limiting their opportunities for outdoor play",
      id: "lackOfSafeOutdoorSpaces",
      subs: [],
      notes: [],
    },
    {
      label:
        "Lack of Safe Recreational Areas: Fewer parks and sports facilities, limiting opportunities for physical activity",
      id: "lackOfSafeRecreationalAreas",
      subs: [],
      notes: [],
    },

    {
      label:
        "Residential Segregation:The majority of residents and members of your community belong to a minoritized group.",
      id: "residentialSegregation",
      subs: [],
      notes: [],
    },
  ];

  const handleDisadvantageChange = (disadvantagesId, isChecked) => {
    setFormData((prevFormData) => {
      const selectedDisadvantages = prevFormData.selectedDisadvantages || {
        Disadvantages: [],
      };

      return {
        ...prevFormData,
        selectedDisadvantages: {
          ...selectedDisadvantages,
          Disadvantages: isChecked
            ? [...selectedDisadvantages.Disadvantages, disadvantagesId]
            : selectedDisadvantages.Disadvantages.filter(
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
    const savedData = ReturnExistingInput("community");
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
          <SectionHeader number = "Section 3" name="Community, Schooling and Syndemics"/>
          <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
            <SubSectionHeader name="Community"/>
           
            {/*Question*/}
            <Box
              sx={{
                marginRight: "10%",
                marginLeft: "10%",
                paddingBottom: "40px",
                justifyContent: "left",
              }}
            >
              <BigText
                question={
                  "What are the names of the neighborhoods and cities you grew up in or primarily live in?"
                }
                id={"NeighborhoodsLivedIn"}
                label={"Neighborhoods"}
                onChange={handleChange}
                value={formData.NeighborhoodsLivedIn?.NeighborhoodsLivedIn}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("NeighborhoodsLivedIn", newQuotes)
                }
                section={"community"}
              />
              
              

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
                        formData.selectedDisadvantages &&
                        formData.selectedDisadvantages.Disadvantages.includes(
                          disadvantage.id
                        )
                      }
                      onChange={handleDisadvantageChange}
                      subs={disadvantage.subs}
                      handleQuotesChange={(newQuotes) =>
                        handleQuotesChange(disadvantage.id, newQuotes)
                      }
                      section={"community"}
                    />
                    {formData.selectedDisadvantages &&
                      formData.selectedDisadvantages.Disadvantages.includes(
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
                                    checked={formData.selectedDisadvantages.Disadvantages.includes(
                                      sub.id
                                    )}
                                    onChange={handleDisadvantageChange}
                                    handleQuotesChange={(newQuotes) =>
                                      handleQuotesChange(sub.id, newQuotes)
                                    }
                                    section={"community"}
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
                section={"community"}
                id={"otherNotes"}
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formData, "community");

              navigate("/careTaker");
            }}
          >
            {" "}
            Previous
          </Button>
          <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formData, "community");

              navigate("/syndemics");
            }}
          >
            Next
          </Button>
        </Paper>
      </>
    </ThemeProvider>
  );
}

export default Community;

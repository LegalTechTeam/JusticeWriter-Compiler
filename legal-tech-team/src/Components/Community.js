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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import CheckboxWithAdd from "../HelperFunctions/CheckBoxWithAdd";
import OtherNotes from "../HelperFunctions/OtherNotes";
import BigText from "../HelperFunctions/BigText";
import { useState } from "react";
import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";
import AddQuotes from "../HelperFunctions/AddQuotes";

function Community() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  const [formData, setFormData] = useState({
    selectedDisadvantages: {
      Disadvantages: [],
      notes: [],
    },

    Neighborhoods: {
      NeighborhoodsLivedIn: "",
      notes: [],
    },
    otherInfo: {
      OtherNotes: "",
      notes: [],
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const disadvantagesList = [
    {
      label: "Poverty",
      id: "poverty",
      subs: [],
      notes: [],
    },
    {
      label: "Lack of HealthCare Options",
      id: "lackOfHealthCareOptions",
      notes: [],

      subs: [
        {
          label: "Limited access to healthy food options",
          id: "limitedAccessToHealthyFoodOptions",
          notes: [],
        },
        {
          label: "Limited accesss to healthcare",
          id: "limitedAccesssToHealthcare",
          notes: [],
        },
      ],
    },
    {
      label: "Crime",
      id: "crime",
      subs: [
        {
          label: "Fights/Other violent conflicts",
          id: "fightsViolentConflicts",
          notes: [],
        },
        {
          label: "Gun Violence",
          id: "gunViolence",
          notes: [],
        },
        {
          label: "Substance Abuse",
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
      label: "Prostitution",
      id: "prostitution",
      subs: [],
      notes: [],
    },
    {
      label: "Poor Infrastructure",
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
      ],
      notes: [],
    },
    {
      label: "Housing Instability",
      id: "housingInstability",
      subs: [],
      notes: [],
    },

    {
      label: "Social Isolation",
      id: "socialIsolation",
      subs: [],
      notes: [],
    },
    {
      label: "Economic Stagnation",
      id: "economicStagnation",
      subs: [],
      notes: [],
    },
    {
      label: "Environmental Hazards",
      id: "environmentalHazards",
      subs: [],
      notes: [],
    },
    {
      label: "Residential Segregation",
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
    console.log(savedData);
    if (savedData) {
      console.log("in here");
      setFormData(savedData);
    }
  };

  useEffect(() => {
    loadSavedData();
  }, []);

  return (
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
        <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
            Community
          </Typography>
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
                "What were the names of the Neighborhoods you grew up in?"
              }
              id={"Neighborhoods"}
              label={"Neighborhoods"}
              onChange={handleChange}
              value={
                formData.Neighborhoods &&
                formData.Neighborhoods.NeighborhoodsLivedIn
              }
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange("Neighborhoods", newQuotes)
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
                handleQuotesChange("otherInfo", newQuotes)
              }
              value={formData.otherInfo && formData.otherInfo.OtherNotes}
              section={"community"}
              id={"otherInfo"}
            />
          </Box>
        </Box>
        <Button
          variant="contained"
          onClick={() => {
            SaveJSON(formData, "community");

            navigate("/familyDynamics");
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

            navigate("/schooling");
          }}
        >
          Next
        </Button>
      </Paper>
    </>
  );
}

export default Community;

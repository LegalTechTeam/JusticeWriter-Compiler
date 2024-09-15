import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  ThemeProvider
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import themeWrapper from "../Layouts/ThemeWrapper";

import AddQuotes from "../HelperFunctions/AddQuotes";
import BigText from "../HelperFunctions/BigText";
import CheckboxWithAdd from "../HelperFunctions/CheckBoxWithAdd";
import DropDown from "../HelperFunctions/DropDown";
import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";
import RadioYesNo from "../HelperFunctions/RadioYesNo";
import SectionHeader from "../HelperFunctions/SectionHeader";
import SubSectionHeader from "../HelperFunctions/subSectionHeader";
import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
function PeersRoleModels() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  const [quotes, setQuotes] = useState([]);

  const quotesAdded = (newQuotes) => {
    setQuotes(newQuotes);
    handleQuotesChange(newQuotes);
  };
  const peerList = [
    {
      label: "Association with delinquent peers",
      id: "Association-with-delinquent-peers",
      subs: [],
    },
    {
      label: "Involvement in gangs",
      id: "Involvement-in-gangs",

      subs: [],
    },
    {
      label: "Enjoy or admire street guys in my neighborhood",
      id: "Enjoy-or-admire-street-guys-in-my-neighborhood",

      subs: [],
    },
    {
      label: "Enjoy or admire the gangsta lifestyle",
      id: "Enjoy-or-admire-the-gangsta-lifestyle",

      subs: [],
    },
  ];
  const [formData, setFormData] = useState({
    associationWithPeers: {
      associationWithPeers: "",
      notes: [],
    },
    numberNeighborhoodCollege: {
      numberNeighborhoodCollege: "",
      notes: [],
    },
    numberNeighborhoodPrison: {
      numberNeighborhoodPrison: "",
      notes: [],
    },
    numberRelativesArrested: {
      numberRelativesArrested: "",
      notes: [],
    },
    neighborhoodArrests: {
      neighborhoodArrests: "",
      notes: [],
    },
    arePeopleHungOutWithLawful: {
      arePeopleHungOutWithLawful: "",
      notes: [],
    },
    neighborhoodDegrees: {
      neighborhoodDegrees: "",
      notes: [],
    },
    mentalHealthIssues: {
      mentalHealthIssues: "",
      notes: [],
    },
    affectedByMentalHealth: {
      affectedByMentalHealth: "",
      notes: [],
    },
    otherRiskFactorsExperienced: {
      otherRiskFactorsExperienced: "",
      notes: [],
    },
  });
  useEffect(() => {
    const existingData = ReturnExistingInput("peersAndRoleModels");
    if (existingData) {
      setFormData(existingData);
    }
  }, []);

  const handleDisadvantageChange = (disadvantagesId, isChecked) => {
    setFormData((prevFormData) => {
      const associationWithPeers = prevFormData.associationWithPeers || {
        associationWithPeers: [],
      };

      return {
        ...prevFormData,
        associationWithPeers: {
          ...associationWithPeers,
          associationWithPeers: isChecked
            ? [...associationWithPeers.associationWithPeers, disadvantagesId]
            : associationWithPeers.associationWithPeers.filter(
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: { ...formData[id], [id]: value } });
  };

  const handleRadioChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: { ...formData[id], [id]: value } });
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: { ...formData[name], [name]: value } });
  };

  const options = ["None", "1", "< 5", "More than 5"];

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
          <SectionHeader name="Peers and Role Models"/>

          <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
           

            {/*Check boxes*/}
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "5%",
                paddingBottom: "30px",
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <InputLabel
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      fontWeight: 700,
                      marginTop: 6, // Adjust spacing as needed
                    }}
                  >
                    Which of these statements are true?
                  </InputLabel>
                </Grid>
                <Grid
                  container
                  spacing={4}
                  justifyContent="flex-end"
                  alignItems="center"
                  marginTop="-70px"

                >
                  <Grid item>
                    <FormGroup>
                      {peerList.map((disadvantage, index) => (
                        <React.Fragment key={index}>
                          <CheckboxWithAdd
                            label={disadvantage.label}
                            id={disadvantage.id}
                            checked={
                              formData.associationWithPeers &&
                              formData.associationWithPeers.associationWithPeers.includes(
                                disadvantage.id
                              )
                            }
                            onChange={handleDisadvantageChange}
                            subs={disadvantage.subs}
                            handleQuotesChange={(newQuotes) =>
                              handleQuotesChange(disadvantage.id, newQuotes)
                            }
                            section={"peersAndRoleModels"}
                          />
                        </React.Fragment>
                      ))}
                    </FormGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            {/*Dropdown*/}
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
              }}
            >
              <Grid container>
                <Grid container spacing={3}>
                  <DropDown
                    options={options}
                    id={"numberNeighborhoodCollege"}
                    section={"peersAndRoleModels"}
                    question={
                      "How many peers in your neighborhood went to college?"
                    }
                    placeholder="Select an option"
                    value={
                      formData.numberNeighborhoodCollege
                        ?.numberNeighborhoodCollege
                    }
                    onChange={handleDropdownChange}
                    handleQuotesChange={(newQuotes) =>
                      handleQuotesChange("numberNeighborhoodCollege", newQuotes)
                    }
                  />
                  <DropDown
                    options={options}
                    id={"numberNeighborhoodPrison"}
                    section={"peersAndRoleModels"}
                    question={"How many of them went to prison?"}
                    placeholder="Select an option"
                    value={
                      formData.numberNeighborhoodPrison
                        ?.numberNeighborhoodPrison
                    }
                    onChange={handleDropdownChange}
                    handleQuotesChange={(newQuotes) =>
                      handleQuotesChange("numberNeighborhoodPrison", newQuotes)
                    }
                  />
                  <DropDown
                    options={options}
                    id={"numberRelativesArrested"}
                    section={"peersAndRoleModels"}
                    question={"How many relatives have been arrested?"}
                    placeholder="Select an option"
                    value={
                      formData.numberRelativesArrested?.numberRelativesArrested
                    }
                    onChange={handleDropdownChange}
                    handleQuotesChange={(newQuotes) =>
                      handleQuotesChange("numberRelativesArrested", newQuotes)
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            {/*input one*/}
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
              }}
            >
              <BigText
                question={
                  "In your neighborhood, do most youths and adults get arrested? "
                }
                id={"neighborhoodArrests"}
                label={"neighborhood Arrests"}
                onChange={handleChange}
                value={formData.neighborhoodArrests?.neighborhoodArrests}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("neighborhoodArrests", newQuotes)
                }
                section={"peersAndRoleModels"}
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
                  " In your neighborhood, do most youths and adults have degrees? "
                }
                id={"neighborhoodDegrees"}
                label={"neighborhood Degrees"}
                onChange={handleChange}
                value={formData.neighborhoodDegrees?.neighborhoodDegrees}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("neighborhoodDegrees", newQuotes)
                }
                section={"peersAndRoleModels"}
              />
              <Grid item xs={12} sm={8}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    fontWeight: 700,
                  }}
                >
                  Are the people you hang out with and look up to law-abiding
                  citizens, or do they engage in illicit behavior?{" "}
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={3}>
                <RadioGroup
                  row
                  aria-label="answer"
                  name="answer"
                  value={
                    formData.arePeopleHungOutWithLawful
                      ?.arePeopleHungOutWithLawful
                  }
                  onChange={handleRadioChange}
                  checkedValue={
                    formData.arePeopleHungOutWithLawful
                      ?.arePeopleHungOutWithLawful
                  }
                >
                  <FormControlLabel
                    value="Law-Abiding"
                    control={<Radio id={"arePeopleHungOutWithLawful"} />}
                    label="Law-Abiding"
                  />

                  <FormControlLabel
                    value="Illicit Behaviort"
                    control={<Radio id={"arePeopleHungOutWithLawful"} />}
                    label="Illicit Behavior"
                  />
                  <AddQuotes
                    quotes={quotes}
                    section={"peersAndRoleModels"}
                    id={"arePeopleHungOutWithLawful"}
                    onQuotesChange={quotesAdded}
                  />
                </RadioGroup>
              </Grid>
              <Divider orientation="horizontal" flexItem />

              <SubSectionHeader name="Other Risk Factors"/>


              <Grid container spacing={3}>
                <RadioYesNo
                  id={"mentalHealthIssues"}
                  section={"peersAndRoleModels"}
                  question={"Ever experienced mental health issues?"}
                  value={formData.mentalHealthIssues?.mentalHealthIssues}
                  onChange={handleRadioChange}
                  checkedValue={formData.mentalHealthIssues?.mentalHealthIssues}
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange("mentalHealthIssues", newQuotes)
                  }
                />
                <RadioYesNo
                  id={"affectedByMentalHealth"}
                  section={"peersAndRoleModels"}
                  question={"Ever been affected by mental health issues?"}
                  value={
                    formData.affectedByMentalHealth?.affectedByMentalHealth
                  }
                  onChange={handleRadioChange}
                  checkedValue={
                    formData.affectedByMentalHealth?.affectedByMentalHealth
                  }
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange("affectedByMentalHealth", newQuotes)
                  }
                />
              </Grid>
            </Box>

            {/*last input*/}
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
              }}
            >
              <BigText
                question={"Potential other risk factors experienced"}
                id={"otherRiskFactors"}
                label={"other Risk Factors"}
                onChange={handleChange}
                value={formData.otherRiskFactors?.otherRiskFactors}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("otherRiskFactors", newQuotes)
                }
                section={"peersAndRoleModels"}
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formData, "peersAndRoleModels");
              navigate("/cageAid");
            }}
          >
            Previous
          </Button>
          <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formData, "peersAndRoleModels");
              navigate("/mental-health");
            }}
          >
            Next
          </Button>
        </Paper>
      </div>
    </ThemeProvider>
  );
}
export default PeersRoleModels;

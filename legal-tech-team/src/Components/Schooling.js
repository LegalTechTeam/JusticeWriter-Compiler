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
  ThemeProvider,
} from "@mui/material";
import dayjs from "dayjs";
import themeWrapper from "../Layouts/ThemeWrapper";

import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import CheckboxWithAdd from "../HelperFunctions/CheckBoxWithAdd";
import AddQuotes from "../HelperFunctions/AddQuotes";
import { SaveJSON, ReturnExistingInput } from "../HelperFunctions/formatJSON";
import BigText from "../HelperFunctions/BigText";
import SmallTextInput from "../HelperFunctions/SmallTextInput";
function Schooling() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  const schoolList = [
    {
      label: "Suspended",
      id: "suspended",
      subs: [],
    },
    {
      label: "Expelled",
      id: "expelled",
      subs: [],
    },
    {
      label: "Dropped Out",
      id: "dropped-out",
      subs: [],
    },
    {
      label: "None of the Above",
      id: "none",
      subs: [],
    },
  ];

  const gradesList = [
    {
      label: "A's",
      id: "A",
      subs: [],
    },
    {
      label: "B's",
      id: "B",
      subs: [],
    },
    {
      label: "C's",
      id: "C",
      subs: [],
    },
    {
      label: "D's",
      id: "D",
      subs: [],
    },
    {
      label: "F's",
      id: "F",
      subs: [],
    },
  ];

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
    schoolsAttended: {
      schoolsAttended: "",
      notes: [],
    },
    schoolChanges: {
      schoolChanges: "",
      notes: [],
    },
    schoolExperiences: {
      schoolExperiences: "",
      notes: [],
    },
    schoolQuality: {
      schoolQuality: "",
      notes: [],
    },
    academicPerformance: {
      academicPerformance: [],
      notes: [],
    },

    noDisciplinaryAction: {
      noDisciplinaryAction: [],
      notes: [],
    },
  });

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
    familyMemberAbusedOrThreatened: {
      familyMemberAbusedOrThreatened: "",
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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleACEChange = (e) => {
    const { id, value } = e.target;
    setFormDataACE({
      ...formDataACE,
      [id]: { ...formDataACE[id], [id]: value },
    });
  };

  const handleRadioChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: { ...formData[id], [id]: value } });
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

  const handleDisadvantageChange = (disadvantagesId, isChecked) => {
    setFormData((prevFormData) => {
      const noDisciplinaryAction = prevFormData.noDisciplinaryAction || {
        noDisciplinaryAction: [],
      };

      return {
        ...prevFormData,
        noDisciplinaryAction: {
          ...noDisciplinaryAction,
          noDisciplinaryAction: isChecked
            ? [...noDisciplinaryAction.noDisciplinaryAction, disadvantagesId]
            : noDisciplinaryAction.noDisciplinaryAction.filter(
                (id) => id !== disadvantagesId
              ),
        },
      };
    });
  };

  const handlePerformanceChange = (disadvantagesId, isChecked) => {
    setFormData((prevFormData) => {
      const academicPerformance = prevFormData.academicPerformance || {
        academicPerformance: [],
      };

      return {
        ...prevFormData,
        academicPerformance: {
          ...academicPerformance,
          academicPerformance: isChecked
            ? [...academicPerformance.academicPerformance, disadvantagesId]
            : academicPerformance.academicPerformance.filter(
                (id) => id !== disadvantagesId
              ),
        },
      };
    });
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
              <BigText
                question={
                  "What are the names and school grades (A school – F school) of the schools you attended?"
                }
                id={"schoolsAttended"}
                label={"Schools attended"}
                onChange={handleRadioChange}
                value={formData.schoolsAttended?.schoolsAttended}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("schoolsAttended", newQuotes)
                }
                section={"schooling"}
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
              <SmallTextInput
                field={
                  "How many times did you change schools not including graduations? "
                }
                id={"schoolChanges"}
                label={"School Changes"}
                onChange={handleRadioChange}
                value={formData.schoolChanges?.schoolChanges}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("schoolChanges", newQuotes)
                }
                section={"schooling"}
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
              <SmallTextInput
                field={
                  "Did you have predominantly positive or negative experiences at school?"
                }
                id={"schoolExperiences"}
                label={"School Experiences"}
                onChange={handleRadioChange}
                value={formData.schoolExperiences?.schoolExperiences}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("schoolExperiences", newQuotes)
                }
                section={"schooling"}
              />
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
                  value={formData.schoolQuality?.schoolQuality}
                  onChange={handleRadioChange}
                  checkedValue={formData.schoolQuality?.schoolQuality}
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
                  <AddQuotes
                    quotes={quotes}
                    section={"schooling"}
                    id={"schoolQuality"}
                    onQuotesChange={quotesAdded}
                  />
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
                  What were your grades and academic performance like?
                </InputLabel>
              </Grid>
              <FormGroup
              //onChange={handleChange}
              >
                {gradesList.map((disadvantage, index) => (
                  <React.Fragment key={index}>
                    <CheckboxWithAdd
                      label={disadvantage.label}
                      id={disadvantage.id}
                      checked={formData.academicPerformance?.academicPerformance.includes(
                        disadvantage.id
                      )}
                      onChange={handlePerformanceChange}
                      subs={disadvantage.subs}
                      handleQuotesChange={(newQuotes) =>
                        handleQuotesChange(disadvantage.id, newQuotes)
                      }
                      section={"schooling"}
                    />
                  </React.Fragment>
                ))}
              </FormGroup>
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
                  Have you ever been:
                </InputLabel>
              </Grid>

              <FormGroup
              //onChange={handleChange}
              >
                {schoolList.map((disadvantage, index) => (
                  <React.Fragment key={index}>
                    <CheckboxWithAdd
                      label={disadvantage.label}
                      id={disadvantage.id}
                      checked={
                        formData.noDisciplinaryAction &&
                        formData.noDisciplinaryAction.noDisciplinaryAction.includes(
                          disadvantage.id
                        )
                      }
                      onChange={handleDisadvantageChange}
                      subs={disadvantage.subs}
                      handleQuotesChange={(newQuotes) =>
                        handleQuotesChange(disadvantage.id, newQuotes)
                      }
                      section={"schooling"}
                    />
                  </React.Fragment>
                ))}
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
              <BigText
                question={
                  "Emotional Abuse - Before the age of 18, did a parent or other adult in the household often or very often \n swear at you, insult you, put you down, humiliate you, or act in a way that made you \n afraid that you might be physically hurt? Provide three examples, if possible."
                }
                id={"emotionalAbuse"}
                label={"Emotional Abuse"}
                onChange={handleACEChange}
                value={formDataACE.emotionalAbuse?.emotionalAbuse}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("emotionalAbuse", newQuotes)
                }
                section={"adverseChildhoodExpriences"}
              />
            </Box>

            {/*Physical abuse input*/}
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
              }}
            >
              <BigText
                question={
                  "Physical Abuse - Before the age of 18, did a parent, guardian, or other adult in the household often or very often \n push, grab, slap, or throw something at you, or ever hit you so hard that you had marks or were injured?\n Provide three examples, if possible."
                }
                id={"physicalAbuse"}
                label={"Physical Abuse"}
                onChange={handleACEChange}
                value={formDataACE.physicalAbuse?.physicalAbuse}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("physicalAbuse", newQuotes)
                }
                section={"adverseChildhoodExpriences"}
              />
            </Box>

            {/*Sexual Abuse*/}
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "40px",
              }}
            >
              <BigText
                question={
                  "Sexual Abuse - Before the age of 18, did an adult or person at least five years older than you ever touch \n or fondle you in a sexual way, or have you touch their body in a sexual way, or attempt or actually have oral, \n anal, or vaginal intercourse with you? Provide details, if possible."
                }
                id={"sexualAbuse"}
                label={"Sexual Abuse"}
                onChange={handleACEChange}
                value={formDataACE.sexualAbuse?.sexualAbuse}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("sexualAbuse", newQuotes)
                }
                section={"adverseChildhoodExpriences"}
              />
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formData, "schooling");
              SaveJSON(formDataACE, "adverseChildhoodExpriences");
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
              SaveJSON(formData, "schooling");
              SaveJSON(formDataACE, "adverseChildhoodExpriences");
              navigate("/aceOne");
            }}
          >
            Next
          </Button>
        </Paper>
      </div>
    </ThemeProvider>
  );
}
export default Schooling;

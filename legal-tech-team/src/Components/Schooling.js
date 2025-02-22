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
import CheckboxWithAdd from "../HelperFunctions/CheckBoxWithAdd";
import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";
import SectionHeader from "../HelperFunctions/SectionHeader";
import SmallTextInput from "../HelperFunctions/SmallTextInput";
import SubSectionHeader from "../HelperFunctions/subSectionHeader";
import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
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
    if (existingData) {
      setFormData(existingData);
    }
  }, []);

  const [formData, setFormData] = useState({
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
          <SectionHeader
            number="Section 3"
            name="Community, Schooling and Syndemics"
          />
          <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
            <SubSectionHeader name="Schooling" />

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
          </Box>

          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formData, "schooling");
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
              navigate("/syndemics");
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

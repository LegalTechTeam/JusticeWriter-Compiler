import {
  Box,
  Button,
  FormGroup,
  Grid,
  InputLabel,
  Paper,
  ThemeProvider,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import "react-dropdown/style.css";
import { useNavigate } from "react-router-dom";
import themeWrapper from "../Layouts/ThemeWrapper";

import BigText from "../HelperFunctions/BigText";
import CheckboxWithAdd from "../HelperFunctions/CheckBoxWithAdd";
import RadioYesNo from "../HelperFunctions/RadioYesNo";
import SectionHeader from "../HelperFunctions/SectionHeader";
import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";
import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
function MentalHealth() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  const mentalHealthList = [
    {
      label: "Therapy",
      id: "Therapy",
      subs: [],
    },
    {
      label: "Mental health coaching",
      id: "Mental health coaching",
      subs: [],
    },
    {
      label: "Counseling to address mental health",
      id: "Counseling to address mental health",
      subs: [],
    },
    {
      label: "Services for trauma",
      id: "Services for trauma",
      subs: [],
    },
    {
      label: "Grief counseling",
      id: "Grief counseling",
      subs: [],
    },
    {
      label: "None of the Above",
      id: "none",
      subs: [],
    },
  ];

  const handlePerformanceChange = (disadvantagesId, isChecked) => {
    setFormData((prevFormData) => {
      const addressedMentalHealthIssues =
        prevFormData.addressedMentalHealthIssues || {
          addressedMentalHealthIssues: [],
        };

      return {
        ...prevFormData,
        addressedMentalHealthIssues: {
          ...addressedMentalHealthIssues,
          addressedMentalHealthIssues: isChecked
            ? [
                ...addressedMentalHealthIssues.addressedMentalHealthIssues,
                disadvantagesId,
              ]
            : addressedMentalHealthIssues.addressedMentalHealthIssues.filter(
                (id) => id !== disadvantagesId
              ),
        },
      };
    });
  };
  const [formData, setFormData] = useState({
    receivedMentalHealthTreatment: {
      receivedMentalHealthTreatment: "",
      notes: [],
    },
    participatedMentalHealthOrDrugProgram: {
      participatedMentalHealthOrDrugProgram: "",
      notes: [],
    },
    treatmentOrCounseling: {
      treatmentOrCounseling: "",
      notes: [],
    },
    addressedMentalHealthIssues: {
      addressedMentalHealthIssues: "",
      notes: [],
    },
  });

  useEffect(() => {
    const existingData = ReturnExistingInput("mentalHealth");
    if (existingData) {
      setFormData(existingData);
    }
  }, []);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: { ...formData[id], [id]: value } });
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
            number="Section 10"
            name="Mental Health Diagnosis, Mental Health Services, and Social Services"
          />

          {/* First Yes or No Question */}
          <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
                marginTop: "30px",
              }}
            >
              <Grid container spacing={3}>
                <RadioYesNo
                  id={"participatedMentalHealthOrDrugProgram"}
                  section={"mentalHealth"}
                  question={
                    "Have you ever received behavioral or mental health treatment?"
                  }
                  value={
                    formData.participatedMentalHealthOrDrugProgram
                      ?.participatedMentalHealthOrDrugProgram
                  }
                  onChange={handleRadioChange}
                  checkedValue={
                    formData.participatedMentalHealthOrDrugProgram
                      ?.participatedMentalHealthOrDrugProgram
                  }
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange(
                      "participatedMentalHealthOrDrugProgram",
                      newQuotes
                    )
                  }
                />
                <RadioYesNo
                  id={"receivedMentalHealthTreatment"}
                  section={"mentalHealth"}
                  question={
                    "Have you ever participated in a mental health or drug program?"
                  }
                  value={
                    formData.receivedMentalHealthTreatment
                      ?.receivedMentalHealthTreatment
                  }
                  onChange={handleRadioChange}
                  checkedValue={
                    formData.receivedMentalHealthTreatment
                      ?.receivedMentalHealthTreatment
                  }
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange(
                      "receivedMentalHealthTreatment",
                      newQuotes
                    )
                  }
                />

                <Grid item xs={12} sm={8}>
                  <InputLabel
                    sx={{
                      display: "flex",
                      justifyContent: "left",
                      fontWeight: 700,
                    }}
                  >
                    Have you ever completed therapy, coaching, or counseling to{" "}
                    <br></br>
                    address mental health, trauma, or grief?{" "}
                  </InputLabel>
                </Grid>
                <FormGroup
                //onChange={handleChange}
                >
                  {mentalHealthList.map((disadvantage, index) => (
                    <React.Fragment key={index}>
                      <CheckboxWithAdd
                        label={disadvantage.label}
                        id={disadvantage.id}
                        checked={formData.addressedMentalHealthIssues?.addressedMentalHealthIssues.includes(
                          disadvantage.id
                        )}
                        onChange={handlePerformanceChange}
                        subs={disadvantage.subs}
                        handleQuotesChange={(newQuotes) =>
                          handleQuotesChange(disadvantage.id, newQuotes)
                        }
                        section={"mentalHealth"}
                      />
                    </React.Fragment>
                  ))}
                </FormGroup>
              </Grid>
            </Box>

            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
              }}
            >
              <BigText
                question={"Treatments/Counseling (if any)"}
                id={"treatmentOrCounseling"}
                label={"treatmentOrCounseling"}
                onChange={handleChange}
                value={
                  formData.treatmentOrCounseling &&
                  formData.treatmentOrCounseling.treatmentOrCounseling
                }
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("treatmentOrCounseling", newQuotes)
                }
                section={"mentalHealth"}
              />
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formData, "mentalHealth");
              navigate("/otherRiskFactors");
            }}
          >
            Previous
          </Button>

          <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

          <Button
            variant="contained"
            onClick={() => {
              SaveJSON(formData, "mentalHealth");
              navigate("/evidence");
            }}
          >
            Next
          </Button>
        </Paper>
      </div>
    </ThemeProvider>
  );
}
export default MentalHealth;

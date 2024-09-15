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
    ThemeProvider
  } from "@mui/material";
  import * as React from "react";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import themeWrapper from "../Layouts/ThemeWrapper";
  
  import AddQuotes from "../HelperFunctions/AddQuotes";
  import BigText from "../HelperFunctions/BigText";
  import CheckboxWithAdd from "../HelperFunctions/CheckBoxWithAdd";
  import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";
  import SectionHeader from "../HelperFunctions/SectionHeader";
  import SmallTextInput from "../HelperFunctions/SmallTextInput";
  import SubSectionHeader from "../HelperFunctions/subSectionHeader";
  import Header from "../Layouts/Header";
  import themeSubHeading from "../Layouts/Theme";
  function Mobility() {
    const navigate = useNavigate();
    const themeTitle = themeSubHeading();
  
    useEffect(() => {
      const existingData = ReturnExistingInput("mobility");
      if (existingData) {
        setFormData(existingData);
      }
      
    }, []);
  
    const [formData, setFormData] = useState({
      schoolsAttended: {
        schoolsAttended: "",
        notes: [],
      },
      zipCodesLivedIn: {
        zipCodesLivedIn: "",
        notes: [],
      },
     
  
      anyFeelingsAboutMoveToDifferentSchoolsIfAny: {
        anyFeelingsAboutMoveToDifferentSchoolsIfAny: [],
        notes: [],
      },
      anyFeelingsAboutMoveToDifferentAreasIfAny: {
        anyFeelingsAboutMoveToDifferentAreasAny: [],
        notes: [],
      },
      otherNotes: {
        otherNotes: "",
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
            <SectionHeader number = "Section 4" name="Residential and School Mobility" />
            <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
              <SubSectionHeader name="Residential and School Mobility" />
  
           
  
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
                  section={"mobility"}
                />
                <BigText
                question={"What were the zip codes where you primarily lived?"}
                onChange={handleRadioChange}
                id={"zipCodesLivedIn"}
                label={"zipCodesLivedIn"}
                rows={1}
                value={formData.zipCodesLivedIn?.zipCodesLivedIn}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("zipCodesLivedIn", newQuotes)
                }
                section={"mobility"}
                />
              <BigText
                question={"How did you feel about moving schools (if any)?"}
                onChange={handleRadioChange}
                id={"anyFeelingsAboutMoveToDifferentSchoolsIfAny"}
                label={"anyFeelingsAboutMoveToDifferentSchoolsIfAny"}
                rows={1}
                value={formData.anyFeelingsAboutMoveToDifferentSchoolsIfAny?.anyFeelingsAboutMoveToDifferentSchoolsIfAny}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("anyFeelingsAboutMoveToDifferentSchoolsIfAny", newQuotes)
                }
                section={"mobility"}
                />
              <BigText
                question={"How did you feel about moving to different areas (if any)?"}
                onChange={handleRadioChange}
                id={"anyFeelingsAboutMoveToDifferentAreasIfAny"}
                label={"anyFeelingsAboutMoveToDifferentAreasIfAny"}
                rows={1}
                value={formData.anyFeelingsAboutMoveToDifferentAreasIfAny?.anyFeelingsAboutMoveToDifferentAreasIfAny}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("anyFeelingsAboutMoveToDifferentAreasIfAny", newQuotes)
                }
                section={"mobility"}
                />
              </Box>
  
            </Box>
  
            <Button
              variant="contained"
              onClick={() => {
                SaveJSON(formData, "mobility");
                navigate("/syndemics");
              }}
            >
              {" "}
              Previous
            </Button>
            <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
  
            <Button
              variant="contained"
              onClick={() => {
                SaveJSON(formData, "mobility");
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
  export default Mobility;
  
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Grid, Paper, ThemeProvider, Divider } from "@mui/material";
import BigText from "../HelperFunctions/BigText";
import OtherNotes from "../HelperFunctions/OtherNotes";
import RadioYesNo from "../HelperFunctions/RadioYesNo";
import SectionHeader from "../HelperFunctions/SectionHeader";
import { ReturnExistingInput, SaveJSON } from "../HelperFunctions/formatJSON";
import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import themeWrapper from "../Layouts/ThemeWrapper";
import SubSectionHeader from "../HelperFunctions/subSectionHeader";

function CageAid() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  useEffect(() => {
    const existingData = ReturnExistingInput("cageAID");
    if (existingData) {
      setFormData(existingData);
    }
  }, []);

  const [cageScore, setCageScore] = useState(0);

  const [formData, setFormData] = useState({
    drugUse: {
      drugUse: "",
      notes: [],
    },
    drugUseFrequencyAndSeverity: {
      drugUseFrequencyAndSeverity: "",
      notes: [],
    },
    diagnosedSUD: {
      diagnosedSUD: "",
      notes: [],
    },
    treatedOrTestedSUD: {
      treatedOrTestedSUD: "",
      notes: [],
    },
    feltTheNeedToCutDownOnDrinkingOrDrugUse: {
      feltTheNeedToCutDownOnDrinkingOrDrugUse: "",
      notes: [],
    },
    peopleCritizedYouForDrinkingOrDrugUse: {
      peopleCritizedYouForDrinkingOrDrugUse: "",
      notes: [],
    },
    feltBadOrGuiltyAboutYourDrinkingOrDrugUse: {
      feltBadOrGuiltyAboutYourDrinkingOrDrugUse: "",
      notes: [],
    },
    hadADrinkOrUsedDrugsFirstThingInTheMorning: {
      hadADrinkOrUsedDrugsFirstThingInTheMorning: "",
      notes: [],
    },

    otherInformation: {
      otherInformation: "",
      notes: [],
    },
    score: cageScore,
  });
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      score: cageScore,
    }));
  }, [cageScore]);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: { ...formData[id], [id]: value } });
  };

  const handleRadioChange = (e, questionNumber) => {
    const { id, value } = e.target;

    // Get the current value of the selected question
    const currentValue = formData[id]?.[id];

    // Only increment the score if the previous value was not "yes" and the new value is "yes"
    if (value === "yes" && currentValue !== "yes") {
      setCageScore(cageScore + 1);
    }

    // Only decrement the score if the previous value was "yes" and the new value is "no"
    if (value === "no" && currentValue === "yes") {
      setCageScore(cageScore - 1);
    }

    // Update the form data with the new value
    setFormData({ ...formData, [id]: { ...formData[id], [id]: value } });
    console.log(formData);
  };

  const handleQuotesChange = (subSection, newQuotes) => {
    setFormData({
      ...formData,
      [subSection]: { ...formData[subSection], ["notes"]: newQuotes },
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
            number="Section 6"
            name="Substance abuse and substance use disorders"
          />
          <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
            {/*input one*/}
            <Box
              sx={{
                marginLeft: "10%",
                marginRight: "10%",
                paddingBottom: "30px",
                marginTop: "30px",
              }}
            >
              <BigText
                question={"What types of drugs have you used?"}
                id={"drugUse"}
                label={"Drug Use"}
                onChange={handleChange}
                value={formData.drugUse?.drugUse}
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("drugUse", newQuotes)
                }
                section={"adverseChildhoodExpriences"}
              />
              <BigText
                question={
                  "How would you describe the frequency and severity of your drug use?"
                }
                id={"drugUseFrequencyAndSeverity"}
                label={"Drug Use"}
                onChange={handleChange}
                value={
                  formData.drugUseFrequencyAndSeverity
                    ?.drugUseFrequencyAndSeverity
                }
                handleQuotesChange={(newQuotes) =>
                  handleQuotesChange("drugUseFrequencyAndSeverity", newQuotes)
                }
                section={"adverseChildhoodExpriences"}
              />
              <Grid container spacing={3} marginTop={1}>
                <RadioYesNo
                  id={"diagnosedSUD"}
                  ection={"adverseChildhoodExpriences"}
                  question={
                    "Ever been diagnosed with substance use disorder (SUD)?"
                  }
                  value={formData.diagnosedSUD?.diagnosedSUD}
                  onChange={handleRadioChange}
                  checkedValue={formData.diagnosedSUD?.diagnosedSUD}
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange("diagnosedSUD", newQuotes)
                  }
                />
                <RadioYesNo
                  id={"treatedSUD"}
                  section={"adverseChildhoodExpriences"}
                  question={"Ever been tested or treated for SUD?"}
                  value={formData.treatedSUD?.treatedSUD}
                  onChange={handleRadioChange}
                  checkedValue={formData.treatedSUD?.treatedSUD}
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange("treatedSUD", newQuotes)
                  }
                />
              </Grid>

              <SubSectionHeader name="CAGE-AID" />
              <Box sx={{ marginTop: 3, textAlign: "center" }}>
                <h3> Score: {cageScore}</h3>
              </Box>
              <Grid container spacing={3}>
                {/*Question 1 */}

                <RadioYesNo
                  id={"feltTheNeedToCutDownOnDrinkingOrDrugUse"}
                  section={"cageAID"}
                  question={
                    " C: Have you ever felt you ought to Cut down on your drinking or drug use?"
                  }
                  value={
                    formData.feltTheNeedToCutDownOnDrinkingOrDrugUse
                      ?.feltTheNeedToCutDownOnDrinkingOrDrugUse || ""
                  }
                  onChange={(e) => handleRadioChange(e, 4)}
                  checkedValue={
                    formData.feltTheNeedToCutDownOnDrinkingOrDrugUse
                      ?.feltTheNeedToCutDownOnDrinkingOrDrugUse
                  }
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange(
                      "feltTheNeedToCutDownOnDrinkingOrDrugUse",
                      newQuotes
                    )
                  }
                />

                {/*Question 2 */}

                <RadioYesNo
                  id={"peopleCritizedYouForDrinkingOrDrugUse"}
                  section={"cageAID"}
                  question={
                    " A: Have people Annoyed you by criticizing your drinking or drug use?"
                  }
                  value={
                    formData.peopleCritizedYouForDrinkingOrDrugUse
                      ?.peopleCritizedYouForDrinkingOrDrugUse || ""
                  }
                  onChange={(e) => handleRadioChange(e, 2)}
                  checkedValue={
                    formData.peopleCritizedYouForDrinkingOrDrugUse
                      ?.peopleCritizedYouForDrinkingOrDrugUse
                  }
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange(
                      "peopleCritizedYouForDrinkingOrDrugUse",
                      newQuotes
                    )
                  }
                />

                {/*Question 3 */}

                <RadioYesNo
                  id={"feltBadOrGuiltyAboutYourDrinkingOrDrugUse"}
                  section={"cageAID"}
                  question={
                    " G: Have you ever felt bad or Guilty about your drinking or drug use?"
                  }
                  value={
                    formData.feltBadOrGuiltyAboutYourDrinkingOrDrugUse
                      ?.feltBadOrGuiltyAboutYourDrinkingOrDrugUse || ""
                  }
                  onChange={(e) => handleRadioChange(e, 3)}
                  checkedValue={
                    formData.feltBadOrGuiltyAboutYourDrinkingOrDrugUse
                      ?.feltBadOrGuiltyAboutYourDrinkingOrDrugUse
                  }
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange(
                      "feltBadOrGuiltyAboutYourDrinkingOrDrugUse",
                      newQuotes
                    )
                  }
                />
                {/*Question 3 */}

                <RadioYesNo
                  id={"hadADrinkOrUsedDrugsFirstThingInTheMorning"}
                  section={"cageAID"}
                  question={
                    "E: Have you ever had a drink or used drugs first thing in the morning (as an Eye-opener) to steady your nerves or to get rid of a hangover?"
                  }
                  value={
                    formData.hadADrinkOrUsedDrugsFirstThingInTheMorning
                      ?.hadADrinkOrUsedDrugsFirstThingInTheMorning || ""
                  }
                  onChange={(e) => handleRadioChange(e, 4)}
                  checkedValue={
                    formData.hadADrinkOrUsedDrugsFirstThingInTheMorning
                      ?.hadADrinkOrUsedDrugsFirstThingInTheMorning
                  }
                  handleQuotesChange={(newQuotes) =>
                    handleQuotesChange(
                      "hadADrinkOrUsedDrugsFirstThingInTheMorning",
                      newQuotes
                    )
                  }
                />
              </Grid>
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

            <Button
              variant="contained"
              onClick={() => {
                SaveJSON(formData, "cageAID");
                navigate("/aceTwo");
              }}
            >
              Previous
            </Button>
            <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

            <Button
              variant="contained"
              onClick={() => {
                SaveJSON(formData, "cageAID");
                navigate("/peers-role-models");
              }}
            >
              Next
            </Button>
          </Box>
        </Paper>
      </div>
    </ThemeProvider>
  );
}

export default CageAid;

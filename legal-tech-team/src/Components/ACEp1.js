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
  Button,
} from "@mui/material";

import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
import { SaveJSON, ReturnExistingInput } from "../HelperFunctions/formatJSON";
import BigText from "../HelperFunctions/BigText";
function ACEp1() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  useEffect(() => {
    const existingDataACE = ReturnExistingInput("adverseChildhoodExpriences");
    if (existingDataACE) {
      setFormDataACE(existingDataACE);
    }
  }, []);

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

  const handleACEChange = (e) => {
    const { id, value } = e.target;
    setFormDataACE({
      ...formDataACE,
      [id]: { ...formDataACE[id], [id]: value },
    });
  };
  const handleQuotesChange = (subSection, newQuotes) => {
    setFormDataACE((prevFormData) => ({
      ...prevFormData,
      [subSection]: {
        ...prevFormData[subSection],
        notes: newQuotes ? [...newQuotes] : [],
      },
    }));
  };
  return (
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
          <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
            Adverse Childhood Experience (cont.)
          </Typography>

          {/*input emotional neglect*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <BigText
              question={
                "Emotional Neglect - Before the age of 18, did you often or very often feel that no one in your family loved you \n or thought you were important or special, or your family didn't look out for each other,\n feel close to each other, or support each other? Provide three examples, if possible"
              }
              id={"emotionalNeglect"}
              label={"Emotional Neglect"}
              onChange={handleACEChange}
              value={formDataACE.emotionalNeglect?.emotionalNeglect}
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange("emotionalNeglect", newQuotes)
              }
              section={"adverseChildhoodExpriences"}
            />
          </Box>

          {/*input physical neglect*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <BigText
              question={
                "Physical Neglect - Before the age of 18, did you often or very often feel that your needs for food, shelter, clothing, \n and hygiene were not met, leaving you dirty, without clothes, or living in an unsanitary or\n unsafe environment? Provide details, if possible."
              }
              id={"physicalNeglect"}
              label={"Physical Neglect"}
              onChange={handleACEChange}
              value={formDataACE.physicalNeglect?.physicalNeglect}
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange("physicalNeglect", newQuotes)
              }
              section={"adverseChildhoodExpriences"}
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
            <BigText
              question={
                "Witnessing a Mother Being Abused - Before the age of 18, was your mother or stepmother often or very often \n pushed, grabbed, slapped, or had something thrown at her, or sometimes, often, or very often kicked, bitten, hit \nwith a fist, or hit with something hard, or ever repeatedly hit over at least a few minutes or \nthreatened with a gun or knife? Provide details, if possible."
              }
              id={"familyMemberAbusedOrThreatened"}
              label={"family Member Abused Or Threatened"}
              onChange={handleACEChange}
              value={
                formDataACE.familyMemberAbusedOrThreatened
                  ?.familyMemberAbusedOrThreatened
              }
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange("familyMemberAbusedOrThreatened", newQuotes)
              }
              section={"adverseChildhoodExpriences"}
            />
          </Box>

          {/*input alcohol abuse*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <BigText
              question={
                "A Family Member Who is Addicted to Alcohol or Another Substance - Before the age of 18, did you live \n with anyone who was a problem drinker or alcoholic or who used street drugs? Provide evidence, if possible."
              }
              id={"alcoholAbuse"}
              label={"Alcohol Abuse"}
              onChange={handleACEChange}
              value={formDataACE.alcoholAbuse?.alcoholAbuse}
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange("alcoholAbuse", newQuotes)
              }
              section={"adverseChildhoodExpriences"}
            />
          </Box>

          {/*input mental illness*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <BigText
              question={
                "A Family Member Who is Depressed or Diagnosed with Other Mental Illness - Before the age of 18, \nwas a household member depressed or mentally ill, or did a household member attempt suicide? Provide \nevidence, if possible."
              }
              id={"mentalIllness"}
              label={"Mental Illness"}
              onChange={handleACEChange}
              value={formDataACE.mentalIllness?.mentalIllness}
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange("mentalIllness", newQuotes)
              }
              section={"adverseChildhoodExpriences"}
            />
          </Box>

          {/*input separation*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <BigText
              question={
                "Losing a Parent to Separation, Divorce, or Another Reason - Before the age of 18, were your parents \never separated or divorced, or did you lose a parent for another reason (such as death, abandonment, \nor another form of absence)? Provide details, if possible."
              }
              id={"separation"}
              label={"separation"}
              onChange={handleACEChange}
              value={formDataACE.separation?.separation}
              handleQuotesChange={(newQuotes) =>
                handleQuotesChange("separation", newQuotes)
              }
              section={"adverseChildhoodExpriences"}
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={() => {
            SaveJSON(formDataACE, "adverseChildhoodExpriences");
            navigate("/schooling");
          }}
        >
          Previous
        </Button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

        <Button
          variant="contained"
          onClick={() => {
            SaveJSON(formDataACE, "adverseChildhoodExpriences");
            navigate("/aceTwo");
          }}
        >
          Next
        </Button>
      </Paper>
    </div>
  );
}
export default ACEp1;

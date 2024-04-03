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
import dayjs from "dayjs";

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
              question={"Emotional Neglect"}
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
              question={"Physical Neglect"}
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
              question={"Family member abused or threatened"}
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
              question={"Alcohol Abuse"}
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
              question={"Mental Illness"}
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
              question={"Separtion"}
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

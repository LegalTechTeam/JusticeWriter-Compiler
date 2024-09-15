import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";

import PostAddTwoToneIcon from "@mui/icons-material/PostAddTwoTone";
import { ReturnExistingSubSection } from "./formatJSON";

function AddQuotes(props) {
  const { quotes, onQuotesChange, section, id } = props;

  const [formData, setFormData] = useState({
    notes: [],
  });

  useEffect(() => {
    console.log(section);
    const existingData = ReturnExistingSubSection(section, id);
    console.log(section + " section");
    console.log(id + " id");
    if (existingData) {
      console.log(existingData);
      var data = JSON.parse(existingData);
      console.log("data " + existingData);
      console.log("notest" + data.notes);
      console.log("existing data notes " + data.notes);
      setFormData(data);
      setQuotes(data.notes || []);
      console.log(quotesS);
    } else {
      setQuotes([]);
    }
  }, []);

  // for opening/closing the quotes box?
  const [open, setOpen] = useState(false);

  // for saving/setting input once text is entered
  const [input, setInput] = useState("");

  // for setting/adding quotes to a quotes list
  const [quotesS, setQuotes] = useState([]);

  // for editing saved quotes
  const [editIndex, setEditIndex] = useState(null);

  // opening/closing box based on boolean b
  const handleQuotesBox = (b) => {
    if (b) {
      setEditIndex(null);
      setInput(null);
    }
    setOpen(b);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  // for saving
  const handleSaveClick = () => {
    if (input !== "") {
      if (editIndex != null) {
        const updatedQuotes = [...quotesS];
        updatedQuotes[editIndex] = input;
        setQuotes(updatedQuotes);
        onQuotesChange(updatedQuotes);
        setEditIndex(null);
        setInput("");
      } else {
        const tempQuotes = [...quotesS, input];
        console.log("tempQuotes");
        console.log(tempQuotes);
        setQuotes(tempQuotes);
        onQuotesChange(tempQuotes);
        setInput("");
      }
    }
  };

  // for editing saved quotes
  const handleEditClick = (index) => {
    setInput(quotesS[index]);
    setEditIndex(index);
    setOpen(true);
  };

  return (
    <>
      <IconButton onClick={() => handleQuotesBox(true)}>
        <PostAddTwoToneIcon style={{ fontSize: 20 }} />
      </IconButton>

      <Dialog fullWidth open={open} onClose={() => handleQuotesBox(false)}>
        <DialogContent>
          <div>
            {quotesS &&
              quotesS.map((quote, index) => (
                <>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <li key={index}>{quote}</li>
                    <Button
                      style={{
                        "min-height": "5px",
                        width: "10%",
                        fontSize: "12px",
                      }}
                      onClick={() => handleEditClick(index)}
                    >
                      Edit
                    </Button>
                  </div>
                </>
              ))}
          </div>

          {editIndex !== null ? (
            <div style={{ color: " red", fontSize: "small" }}>
              Edit quote below and click save
            </div>
          ) : (
            <div style={{ color: " red", fontSize: "small" }}>
              Add quote below and click save
            </div>
          )}

          <TextField
            margin="dense"
            label=""
            id="Quote"
            fullWidth
            value={input}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleQuotesBox(false)}>Done</Button>
          <Button onClick={handleSaveClick}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddQuotes;

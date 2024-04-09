import * as React from "react";
import { useState } from "react";
import {
  TextField,
  IconButton,
  Dialog,
  Grid,
  DialogTitle,
  Button,
  DialogContent,
  DialogActions,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import LibraryAddTwoToneIcon from "@mui/icons-material/LibraryAddTwoTone";
import PostAddTwoToneIcon from "@mui/icons-material/PostAddTwoTone";

function AddQuotes() {
  // for opening/closing the quotes box?
  const [open, setOpen] = useState(false);

  // for saving/setting input once text is entered
  const [input, setInput] = useState("");

  // for setting/adding quotes to a quotes list
  const [quotes, setQuotes] = useState([]);

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
        const updatedQuotes = [...quotes];
        updatedQuotes[editIndex] = input;
        setQuotes(updatedQuotes);
        setEditIndex(null);
        setInput("");
      } else {
        const tempQuotes = [...quotes, input];
        setQuotes(tempQuotes);
        setInput("");
      }
    }
  };

  // for editing saved quotes
  const handleEditClick = (index) => {
    setInput(quotes[index]);
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
            {quotes.map((quote, index) => (
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

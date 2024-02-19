import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Grid,
    Typography,
    TextField,
    Box,
    Paper,
    InputLabel,
    Divider,
    FormControl,
    Select,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
} from "@mui/material";
import dayjs from "dayjs";

import Header from "../Layouts/Header";

function ACEp1() {
    const navigate = useNavigate();

    const [sud, setSUD] = useState("no");
    const [treatedSUD, setTreatedSUD] = useState("no");

    const handleSUDChange = (event) => {
        setSUD(event.target.value);
    };

    const handleTreatedSUDChange = (event) => {
        setTreatedSUD(event.target.value);
    };

    return (
        <div>
            <Header />

            <Paper
                elevation={3}
                sx={{ marginRight: "10%", marginLeft: "15%", paddingBottom: "5%" }}
            >
                <Box sx={{ padding: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
                        Adverse Childhood Experience (cont.)
                    </Typography>

                    {/*input emotional neglect*/}
                    <Box
                        sx={{
                            marginLeft: "10%",
                            marginRight: "15%",
                            paddingBottom: "30px",
                        }}
                    >
                        <Grid item xs={12} sm={10}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                    fontWeight: 700,
                                }}
                            >
                                Emotional neglect
                            </InputLabel>

                            <TextField
                                required
                                multiline={true}
                                rows={3}
                                id="Emotional neglect"
                                label="Emotional neglect"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                    </Box>

                    {/*input physical neglect*/}
                    <Box
                        sx={{
                            marginLeft: "10%",
                            marginRight: "15%",
                            paddingBottom: "30px",
                        }}
                    >
                        <Grid item xs={12} sm={10}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                    fontWeight: 700,
                                }}
                            >
                                Physical neglect
                            </InputLabel>

                            <TextField
                                required
                                multiline={true}
                                rows={3}
                                id="Physical neglect"
                                label="Physical neglect"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                    </Box>

                    {/*input three*/}
                    <Box
                        sx={{
                            marginLeft: "10%",
                            marginRight: "15%",
                            paddingBottom: "30px",
                        }}
                    >
                        <Grid item xs={12} sm={10}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                    fontWeight: 700,
                                }}
                            >
                                Family member Abused or Threatened
                            </InputLabel>

                            <TextField
                                required
                                multiline={true}
                                rows={3}
                                id="Family member abused"
                                label="Family member abused"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                    </Box>

                    {/*input alcohol abuse*/}
                    <Box
                        sx={{
                            marginLeft: "10%",
                            marginRight: "15%",
                            paddingBottom: "30px",
                        }}
                    >
                        <Grid item xs={12} sm={10}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                    fontWeight: 700,
                                }}
                            >
                                Alcohol abuse
                            </InputLabel>

                            <TextField
                                required
                                multiline={true}
                                rows={3}
                                id="Alcohol abuse"
                                label="Alcohol abuse"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                    </Box>

                    {/*input mental illness*/}
                    <Box
                        sx={{
                            marginLeft: "10%",
                            marginRight: "15%",
                            paddingBottom: "30px",
                        }}
                    >
                        <Grid item xs={12} sm={10}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                    fontWeight: 700,
                                }}
                            >
                                Mental illness
                            </InputLabel>

                            <TextField
                                required
                                multiline={true}
                                rows={3}
                                id="Mental illness"
                                label="Mental illness"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                    </Box>

                    {/*input separation*/}
                    <Box
                        sx={{
                            marginLeft: "10%",
                            marginRight: "15%",
                            paddingBottom: "30px",
                        }}
                    >
                        <Grid item xs={12} sm={10}>
                            <InputLabel
                                sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                    fontWeight: 700,
                                }}
                            >
                                Separation
                            </InputLabel>

                            <TextField
                                required
                                multiline={true}
                                rows={3}
                                id="Separation"
                                label="Separation"
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                    </Box>
                </Box>

                <Button variant="contained" onClick={() => navigate("/schooling")}>
                    Previous
                </Button>
                <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
                <Button
                    variant="contained"
                    onClick={() => navigate("/aceTwo")}
                >
                    Next
                </Button>
            </Paper>
        </div>
    );
}
export default ACEp1;

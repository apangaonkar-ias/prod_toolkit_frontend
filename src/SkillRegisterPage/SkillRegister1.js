// This page is for the sidebar skills tab

import React, { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Controls from "../Controls/Controls";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
export default function SkillRegister1() {
  const [inputFields, setInputField] = useState([
    { prim_skill: "", prim_skill_rating: "" },
    { prim_skill: "", prim_skill_rating: "" },
  ]);

  const handleChangeInput = (index, event) => {
    console.log(index, event.target.name);
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputField(values);
  };

  const handleAddFields = () => {
    setInputField([...inputFields, { prim_skill: "", prim_skill_rating: "" }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputField(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {inputFields.map((inputField, index) => (
          <div key={index} style={{ width: "800px" }}>
            <Grid container>
              <Grid item xs={4}>
                <TextField
                  name="prim_skill"
                  label="Primary Skill"
                  variant="outlined"
                  value={inputField.prim_skill}
                  onChange={(event) => handleChangeInput(index, event)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="prim_skill_rating"
                  label="Skill Rating"
                  variant="outlined"
                  value={inputField.prim_skill_rating}
                  onChange={(event) => handleChangeInput(index, event)}
                />
              </Grid>
              <Grid
                item
                xs={4}
                style={{ paddingTop: "10px", paddingLeft: "85px" }}
              >
                <Controls.ActionButton color="primary" variant="outlined">
                  <AddCircleIcon
                    fontSize="small"
                    onClick={() => handleAddFields()}
                  />
                </Controls.ActionButton>
                {"                "}
                <Controls.ActionButton color="secondary" variant="outlined">
                  <RemoveCircleIcon
                    fontSize="small"
                    onClick={() => handleRemoveFields(index)}
                  />
                </Controls.ActionButton>
              </Grid>
            </Grid>
          </div>
        ))}
        <Controls.Button
          type="submit"
          text="Submit"
          onClick={handleSubmit}
          style={{ float: "left", marginTop: "35px", marginLeft: "7px" }}
          startIcon={<SendIcon />}
        />
      </form>
    </div>
  );
}

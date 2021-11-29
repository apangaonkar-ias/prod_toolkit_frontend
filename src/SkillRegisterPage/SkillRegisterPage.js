import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useForm, Form } from "../useForm";
import Controls from "../Controls/Controls";
import Select from "../Controls/Select";
import axios from "axios";
import { Grid } from "@material-ui/core";
// import * as employeeService from "../Services/employeeService";
// import * as MyTeam from "../MyTeamPage/MyTeam1";
import MyTeam1 from "../MyTeamPage/MyTeam1";
// import {findAllUsers} from "../MyTeamPage/MyTeam1";
import Popup from "../Popup";
import PrimarySkill from "./PrimarySkill";

import Notification from "../Notification";
import Trial from "../Trial";

const initialFValues = {

  employee_name: "",
 

};

export default function SkillRegisterPage(props) {

  const {recordForEdit} = props;
    const [e_id, set_e_id] = useState('');
   const [employee_name, set_employee_name] = useState('');
   const [p_skills, setP_skills] = useState('');
   const [p_self_rating, setP_self_rating] = useState('');
   const [p_manager_rating, setP_manager_rating] = useState('');
   const [p_proficiency_level, setP_proficiency_level] = useState('');
   const [p_rating_delta, setP_rating_delta] = useState('');
   const [a_skills, setA_skills] = useState('');
   const [a_self_rating, setA_self_rating] = useState('');
   const [a_proficiency_level, setA_proficiency_level] = useState('');
   const [comments, setComments] = useState("");

   const [openPopup, setOpenPopup] = useState(false);

   const [flag, setFlag] = useState(-1);
   const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("employee_name" in fieldValues)
      temp.employee_name = fieldValues.employee_name
        ? ""
        : "This field is required.";
    if ("p_skills" in fieldValues)
      temp.p_skills =
        fieldValues.p_skills.length != 0 ? "" : "This field is required.";
    if ("p_self_rating" in fieldValues) {
      temp.p_self_rating = fieldValues.p_self_rating ? "" : "This field is required";
    }
    if ("p_manager_rating" in fieldValues) {
      temp.p_manager_rating = fieldValues.p_manager_rating ? "" : "This field is required";
    }
    if ("p_proficiency_level" in fieldValues) {
      temp.p_proficiency_level = fieldValues.p_proficiency_level
        ? ""
        : "This field is required";
    }
    if ("p_rating_delta" in fieldValues) {
      temp.p_rating_delta = fieldValues.p_rating_delta ? "" : "This field is required";
    }
    if ("a_skills" in fieldValues) {
      temp.a_skills = fieldValues.a_skills
        ? ""
        : "This field is required";
    }
    if ("a_self_rating" in fieldValues) {
      temp.a_self_rating = fieldValues.a_self_rating ? "" : "This field is required";
    }
    if ("comments" in fieldValues) {
        temp.comments = fieldValues.comments ? "" : "This field is required";
      }
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm} = 
  useForm(initialFValues, true, validate );

  // const findAllUsers = MyTeam1();
  const { index, setIndex} = Trial();

  const handleEdit = (e) => {

        e.preventDefault();
        console.log("Handling Edit funtionality"); 

        // var postData = new FormData();
        
        // postData.append("employee_name", values.employee_name)
        // postData.append("team", values.team)
        // postData.append("email", values.email)
        // postData.append("p_skills", values.p_skills)
        // postData.append("p_self_rating", values.p_self_rating)
        // postData.append("p_manager_rating", values.p_manager_rating)
        // postData.append("p_proficiency_level", values.p_proficiency_level)
        // postData.append("p_rating_delta", values.p_rating_delta)
        // postData.append("a_skills", values.a_skills)
        // postData.append("a_self_rating", values.a_self_rating)
        // postData.append("certifications", values.certifications)
        // postData.append("projects", values.projects)
        // postData.append("hireDate", values.hireDate)
        // console.log(employee_name);

        // for (var pair of postData.entries()) {
        //   console.log(pair[0]+ " "+ pair[1]);
        // }

        // console.log("Put ke andar ho sir");
        // var config =  {
        //   method: 'put',
        //   url: ''+values.e_id,   
        //   data : postData,
        //   headers: {
        //     // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJLZXZpblBldGVyIiwicm9sZXMiOlsiUk9MRV9tYW5hZ2VyIl0sImlhdCI6MTYzNTIzMDg3NCwiZXhwIjoxNjM1MjMxMDU0fQ.f87PVTkPUgz2vL16xE7Ak0DyoAQeR1jVuzRg60F-W5dFccepNZL9Xt9en_Gjt8EC5mV8LzEFocMQaHBJjY2Lng',
        //     "Content-Type": "multipart/form-data",
        //   },
        // };

        // console.log(config.data);
        // console.log("Put ke andar ho sir");

        // axios(config);

        // setOpenPopup(false);

        // console.log("Put ke andar ho sir");
          
        //   setNotify({
        //     isOpen:true,
        //     message:"Submitted Succesfully",
        //     type:"success"
        //   })
        //   // setOpenPopup(false);
        //   window.location.reload();

  }
  

  const handleSubmit = (e) => {

        e.preventDefault();
        console.log("In handle Submit");
    //     if (validate()) { 

    //     var postData = new FormData();

    //     postData.append("employee_name", values.employee_name)
    //     postData.append("p_skills", values.p_skills)
    //     postData.append("p_self_rating", values.p_self_rating)
    //     postData.append("p_manager_rating", values.p_manager_rating)
    //     postData.append("p_proficiency_level", values.p_proficiency_level)
    //     postData.append("p_rating_delta", values.p_rating_delta)
    //     postData.append("a_skills", values.a_skills)
    //     postData.append("a_self_rating", values.a_self_rating)


        
    //       console.log("Inside Add");
    //       console.log(postData);

    //       for (var pair of postData.entries()) {
    //         console.log(pair[0]+ " "+ pair[1]);
    //       }
     
    //       axios({
    //         method: "post",
    //         url: "",
    //         data: postData,
    //         headers: { "Content-Type": "multipart/form-data" },
    //       })
    //       .then((response) => response.data)
    //       .then((data) => {
    //         console.log(data);
    //         setValues(initialFValues);
    //         setOpenPopup(false);
        
    //       });
          
    //     }
    //    // findAllUsers();

  };

  useEffect(() => {
    console.log("Inside Useeffect");
    console.log(recordForEdit);
    if(recordForEdit != null){
      setFlag(1);
      setValues({
        ...recordForEdit
      })
    }
  }, [recordForEdit])


  return (
    <>
    <Form >
      <Grid container>
        <Grid item xs={6}>

          <Controls.Input
            name="employee_name"
            label="Full Name"
            // value= {recordForEdit === null ? employee_name : values.employee_name}
            value= {values.employee_name}
            // onChange={(e) => set_employee_name(e.target.value)}
            onChange = { handleInputChange } 
            error={errors.employee_name}
          />

          {/* <Controls.Input
            label="Email"
            name="email"
            // value= {recordForEdit=== null ? email : values.email}
            value= {values.email}
            // onChange={(e) => setEmail(e.target.value)}
            onChange = {handleInputChange}

            error={errors.email}
          /> */}

          {/* <Controls.Select
            name="p_skills"
            value= {recordForEdit=== null ? p_skills : values.p_skills}
            
            label="p_skills"
            onChange={(e) => setp_skills(e.target.value)}
            options={employeeService.getp_skillsCollection()}
            error={errors.p_skills}
          /> */}

          <Controls.Input
          label = "Primary Skills"
          name="p_skills"
          // value= {recordForEdit=== null ? p_skills : values.p_skills}
          value= {values.p_skills}
          errors={errors.p_skills} 
          // onChange={(e) => setp_skills(e.target.value)}
          onChange = {handleInputChange}/>

          
        
          <Controls.Input
            label="Primary Skill Self Rating"
            name="p_self_rating"
            // value= {recordForEdit=== null ? p_self_rating : values.p_self_rating}
            value= {values.p_self_rating}
            // onChange={(e) => setp_self_rating(e.target.value)}
            onChange = {handleInputChange}
            error={errors.p_self_rating}
          />{" "}

          <Controls.Button  text="Add Primary Skills"  variant = "outlined"
           onClick={() => {
            console.log("in on click");
            setOpenPopup(true);
            console.log("after on click");
          }}/>

          <Controls.Input
            label="Primary Skill Manager Rating"
            name="p_manager_rating"
            // value= {recordForEdit=== null ? p_manager_rating : values.p_manager_rating}
            // onChange={(e) => setp_manager_rating(e.target.value)}
            value= {values.p_manager_rating}
            onChange = {handleInputChange}
            error={errors.p_manager_rating}
          />

            <Controls.Input
            label="Comments"
            name="comments"
            // value= {recordForEdit=== null ? a_skills : values.a_skills}
            value= {values.comments}
            // onChange={(e) => seta_skills(e.target.value)}
            onChange = {handleInputChange}
            error={errors.comments}
          />{" "}

       

        </Grid>
        <Grid item xs={6}>

        <Controls.Input
            label="Primary Skill Proficiency Level"
            name="p_proficiency_level"
            // value= {recordForEdit=== null ? p_proficiency_level : values.p_proficiency_level}
            value= {values.p_proficiency_level}
            // onChange={(e) => setp_proficiency_level(e.target.value)}
            onChange = {handleInputChange}
            error={errors.p_proficiency_level}
          />

          <Controls.Input
            label="Manager VS Self Rating Delta"
            name="p_rating_delta"
            // value= {recordForEdit=== null ? p_rating_delta : values.p_rating_delta}
            value= {values.p_rating_delta}
            // onChange={(e) => setp_rating_delta(e.target.value)}
            onChange = {handleInputChange}
            error={errors.p_rating_delta}
          />
          
          <Controls.Input
            label="Aspired Skill"
            name="a_skills"
            // value= {recordForEdit=== null ? a_skills : values.a_skills}
            value= {values.a_skills}
            // onChange={(e) => seta_skills(e.target.value)}
            onChange = {handleInputChange}
            error={errors.a_skills}
          />{" "}

          {/* <Controls.Input
            label="Team"
            name="team"
            // value= {recordForEdit=== null ? team : values.team}
            value= {values.team}
            onChange = {handleInputChange}
            error={errors.team}
          /> */}

          <Controls.Input
            label="Aspired Skill Self Rating"
            name="a_self_rating"
            // value= {recordForEdit=== null ? a_self_rating : values.a_self_rating}
            value= {values.a_self_rating}
            // onChange={(e) => seta_self_rating(e.target.value)}
            onChange = {handleInputChange}
            error={errors.a_self_rating}
          />

           <Controls.Button  text="Add Primary Skills"  variant = "outlined"
           onClick={() => {
            console.log("in on click");
            setOpenPopup(true);
            console.log("after on click");
          }}/>

          <div>
          <Controls.Button type="submit" text="Update Skills" onClick={flag  === -1 ?handleSubmit:handleEdit}/>
            <Controls.Button text="Reset" color="default" onClick={resetForm} />

          </div>
        </Grid>
      </Grid>
    </Form>
    <Popup
          title="Add Primary Skills "
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <PrimarySkill />
    </Popup>
  <Notification notify={notify} setNotify={setNotify} />
  </>

  );
}

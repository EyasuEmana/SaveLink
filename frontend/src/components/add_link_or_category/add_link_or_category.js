import { FormControlLabel,FormControl, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
function Add_link_or_category() {
    const [add_link_or_category,setadd_link_or_category]=useState("add_link");
    const navigate=useNavigate();
    function addHandler(e){
         setadd_link_or_category(e.target.value);
        if(add_link_or_category==="add_category"){
            navigate("")
        }
        if(add_link_or_category==="add_link"){
            navigate("add-cat")
        }
    }
  return (
    <div className="row justify-content-center mt-3">
      <div className="col-10">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="add_link"
            name="radio-buttons-group"
            value={add_link_or_category}
            row
            onChange={(e)=>addHandler(e)}
          >
            <FormControlLabel
              value="add_link"
              control={<Radio />}
              label="Add Link"
            />
            <FormControlLabel
              value="add_category"
              control={<Radio />}
              label="Add Category"
            />
          </RadioGroup>
        </FormControl>
        <Outlet />
      </div>
    </div>
  );
}

export default Add_link_or_category;

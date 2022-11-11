import { Button, Grid, Snackbar, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import {useNavigate} from "react-router-dom"
import BackspaceIcon from "@mui/icons-material/Backspace";
import { connect, useSelector } from "react-redux";
import { addCategory } from "../../actions/categoryAction";
import CloseIcon from "@mui/icons-material/Close";


function AddCat({addCategory}) {
  
  const navigate=useNavigate();
  const [category,setCategory]=useState();
  const [openSnack, setOpenSnack] = useState(false);
  const [snackmessage, setSnackMessage] = useState("");

 const authstate=useSelector((state=>state.authReducer));
  const {user}=authstate

  const addlinkstate=useSelector((state)=>state.catReducer)
  const {isCatAdded}=addlinkstate

  const mydata = {
    id: null,
    owner:user.id,
    category: category,
  };

 

  const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const handleClose = () => {
    setOpenSnack(!openSnack);
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    addCategory(mydata).then(()=>{
      setSnackMessage("Category successfully added!")
      setOpenSnack(true)
    })
    // var csrftoken = getCookie("csrftoken");
    // var url = "http://127.0.0.1:8000/api/service/add-category/";
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //     "X-CSRFToken": csrftoken,
    //   },
    //   body: JSON.stringify(mydata),
    // })

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            id="outlined-basic"
            label="Add Category"
            variant="outlined"
            color="warning"
            onChange={(e) => setCategory(e.target.value)}
          />
          <Snackbar
          message={snackmessage}
          autoHideDuration={3000}
          open={openSnack}
          onClose={handleClose}
          action={<CloseIcon onClick={handleClose} />}
        />
          <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={2}
        >
          <Grid item>
            <Stack direction="row" spacing={2}>
              <Button
                startIcon={<BackspaceIcon />}
                variant="outlined"
                color="error"
                size="medium"
                onClick={() => navigate("/")}
              >
                {" "}
                Back
              </Button>
              <Button
                startIcon={<SaveIcon />}
                variant="outlined"
                type="submit"
                color="info"
                size="medium"
              >
                Save
              </Button>
            </Stack>
            {/* <Stack>{show && <h1>{mydata.title}</h1>}</Stack> */}
          </Grid>
        </Grid>
        </Stack>
      </form>
    </div>
  );
}

export default connect(null,{addCategory})(AddCat);

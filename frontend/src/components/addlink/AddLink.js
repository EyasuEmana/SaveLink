import React, { useEffect, useState,Component } from "react";
import TextField from "@mui/material/TextField";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import {
  Autocomplete,
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import LinkCard from "../linkCards/LinkCard";
import { connect, useDispatch, useSelector } from "react-redux";
import { addLinkAction } from "../../actions/linkActions";
import { catReducer } from "../../reducers/categoryReducer";
import { getCategoies } from "../../actions/categoryAction";
import { load_user } from "../../actions/auth";

function AddLink() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [show, setshow] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackmessage, setSnackMessage] = useState("");
  const [user_id, setUserId] = useState(0);
  const [options, setOptions] = useState([]);

  const userid = JSON.parse(localStorage.getItem("currentUser")).id;

  const catstate = useSelector((state) => state.catReducer);
  const { cats, categoryOption, isCatLoaded } = catstate;
  const [mydatastate,setmydatastate]=useState({});
  const authstate = useSelector((state) => state.authReducer);
  const { user, isAuthenticated } = authstate;

  const addlinkstate = useSelector((state) => state.linkReducer);
  const { isLinkAdded } = addlinkstate;

  var mydata = {};
  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  useEffect(() => {
    categoryFetch();
    if (categoryOption !== undefined) {
      setOptions(categoryOption);
    }
  }, [isCatLoaded]);

  function categoryFetch() {
    if (userid) {
      dispatch(getCategoies(userid));
    }
  }

  const handleClose = () => {
    setOpenSnack(!openSnack);
  };
  
  function handleSubmit(e){
    e.preventDefault();
    
    mydata={
      id: "",
      title: title,
      link: link,
      description: description,
      owner: user.id,
      category: category.id,
    }

     dispatch(addLinkAction(mydata)).then((response)=>{
      console.log("is link added",response);
      if (response === "successfully added") {
         setSnackMessage("Saved successfully!");
         setOpenSnack(true);
       } else {
         setSnackMessage("Error occur, try again!");
         setOpenSnack(true);
       }
    })
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          id="outlined-basic"
          label="Add Title"
          variant="outlined"
          color="warning"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Add Link"
          variant="outlined"
          color="warning"
          required
          onChange={(e) => setLink(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <ContentPasteIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormHelperText error>The above field is required *</FormHelperText>
        <TextField
          multiline
          id="outlined-basic"
          label="Description"
          rows={3}
          variant="outlined"
          color="warning"
          onChange={(e) => setDescription(e.target.value)}
        />

        <Autocomplete
          required
          value={category}
          sx={{ color: "warning" }}
          onChange={(event, value) => {
            setCategory(value);
          }}
          options={options}
          renderInput={(params) => <TextField {...params} label="Category" />}
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
            <Stack>{show && <h1>{mydata.title}</h1>}</Stack>
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
}


export default connect(null, { load_user })(AddLink);

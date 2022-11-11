import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getCategoies, getCategoryLinks } from "../../actions/categoryAction";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Swal from "sweetalert2";
import { catReducer } from "../../reducers/categoryReducer";

function CatCard({ ctgs }) {
  const [isCoppied, setIsCoppied] = useState();

  const userid = JSON.parse(localStorage.getItem("currentUser")).id;
  const dispatch = useDispatch();

  const catstate = useSelector((state) => state.catReducer);
  const { cats, isCatLoaded } = catstate;

  
  const navigate=useNavigate();
  useEffect(() => {
    categoryFetch();
  }, [isCatLoaded]);

  async function categoryFetch() {
    if (userid) {
      await dispatch(getCategoies(userid));
    }
  }

  function deleteLink(link) {}
  function copy(event) {
    setIsCoppied(true);
  }

 

  return (
    <div>
      {isCatLoaded ? (
        <Grid container>
          {cats.map((cat, index) => (
            <Grid
              item
              sm={12}
              md={6}
              lx={3}
              key={index}
              onClick={(e) =>navigate('/cat-link-cards', { state: { cat: cat, user_id:userid} })}
            >
              <Paper
                elevation={4}
                sx={{
                  background:
                    "linear-gradient(45deg, #5E6B8B 30%, #FF8E53 90%)",
                  width: 380,
                  p: 1,
                  m: 2,
                  borderRadius: 3,
                  height: 100,
                  border: "1px solid",
                  borderColor: "primary.dark",
                }}
              >
                <Stack
                  sx={{ paddingLeft: "5px" }}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  divider={
                    <Divider
                      sx={{ backgroundColor: "white" }}
                      orientation="vertical"
                      flexItem
                    />
                  }
                >
                  <div style={{ width: "85%" }}>
                    {cat.cat}
                    <br />
                  </div>

                  <div style={{ width: "15%" }}>
                    <IconButton
                      onClick={() => {
                        copy(index);
                      }}
                    >
                      {!isCoppied ? (
                        <ContentCopyIcon sx={{ color: "white" }} />
                      ) : (
                        <DoneAllIcon />
                      )}
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deleteLink(cat);
                            Swal.fire({
                              position: "center",
                              icon: "success",
                              title: "Link has been successfully deleted",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                          }
                        })
                      }
                    >
                      {/* deleteLink(link) */}
                      <DeleteIcon sx={{ color: "#F44" }} />
                    </IconButton>
                  </div>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default CatCard;

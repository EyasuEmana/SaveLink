import { Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getCategoryLinks } from "../../actions/categoryAction";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Swal from "sweetalert2";

function CatLinkCard() {
  const { state } = useLocation();
  const { cat, user_id } = state;
  console.log(cat);
  const cat_id = cat.id;
  const cat_title = cat.cat;
  const [catLinkState, setCatLinks] = useState([]);
  const [isCatLinkLoadedState, setIsCatLinkLoadedState] = useState(false);
  const [isCoppied, setIsCoppied] = useState();
  const catlinkstate = useSelector((state) => state.catReducer);
  const { catLinks, isCatLinkLoaded } = catlinkstate;

  const dispatch = useDispatch();
  useEffect(() => {
    categoryLinkFetch();
  }, [isCatLinkLoaded]);

  function categoryLinkFetch() {
    if (user_id) {
      dispatch(getCategoryLinks(cat_id, user_id)).then(() => {
        console.log(catLinks);
        setCatLinks(catLinks);
        setIsCatLinkLoadedState(isCatLinkLoaded);
      });
    }
  }
  function deleteLink() {}
  function copy(event) {
    setIsCoppied(true);
  }
  return (
    <div>
      {isCatLinkLoadedState ? (
        <div>
          <Grid container>
            <Grid item sm={12}>
            <h3>{cat_title}</h3>
            </Grid>
            {catLinkState.map((link, index) => (
              <Grid item sm={12} md={6} lx={3} key={index}>
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
                      {link.title}
                      <br />
                      <Typography noWrap>
                        <Link
                          style={{ textDecoration: "none", color: "white" }}
                          to={`${link.link}`}
                        >
                          {link.link}
                        </Link>
                      </Typography>
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
                        onClick={(e) =>
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
                              deleteLink(link);
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
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default CatLinkCard;

import { React, useState, useEffect, useCallback } from "react";
import { Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useDispatch, useSelector } from "react-redux";
import { deleteLink, getLinks } from "../../actions/linkActions";

function LinkCard() {
  const [isCoppied, setIsCoppied] = useState();
  const [LinkList, setLinkList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const userid = JSON.parse(localStorage.getItem("currentUser")).id;
  const dispatch = useDispatch();

  const linkstate = useSelector((state) => state.linkReducer);
  const { links, islinkloaded,islinkdeleted } = linkstate;

  useEffect(() => {
    linkFetch();
  }, [islinkloaded, islinkdeleted]);

  function linkFetch() {
    if (userid) {
      dispatch(getLinks(userid)).then(() => {
        setLinkList(links);
        setIsLoaded(islinkloaded);
      });
    }
  }
  const fetchdata = useCallback(async () => {
    if (userid) {
      await dispatch(getLinks(userid)).then(() => {
        console.log("fetching data...",links);
        setLinkList(links);
        setIsLoaded(islinkloaded);
      });
    }
  }, [links]);

  function deleteLinkHandler(link) {
    dispatch(deleteLink(link.primary_id)).then(()=>fetchdata());
  }

  function copy(event) {
    setIsCoppied(true);
  }
  return (
    <div>
      <Grid container>
        {links.map((link, index) => (
          <Grid item sm={12} md={6} lx={3} key={index}>
            <Paper
              elevation={4}
              sx={{
                background: "linear-gradient(45deg, #5E6B8B 30%, #FF8E53 90%)",
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
                          deleteLinkHandler(link);
                          fetchdata();
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
  );
}

export default LinkCard;

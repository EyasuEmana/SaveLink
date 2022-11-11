import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SortIcon from "@mui/icons-material/Sort";
import { connect, Connect, useDispatch, useSelector } from "react-redux";

import {
  CircularProgress,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CategoryIcon from "@mui/icons-material/Category";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {getLinks} from "../../actions/linkActions"

export default function Content() {
  const navigate = useNavigate();
  const [lookUp, setLookUp] = useState(null);
  const [fullData, setFUllData] = useState([]);
  const [LinkList, setLinkList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigation=useNavigate();
  const dispatch=useDispatch();
  const settings = [{id:1,title:"Fetch Links",route:"/"}, {id:2, title:"Fetch Categories",route:"cat-cards"}];

  const linkstate = useSelector((state) => state.linkReducer);
  const { links, islinkloaded } = linkstate;

  const userid=JSON.parse(localStorage.getItem("currentUser")).id

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    setFUllData(LinkList);
  }, []);

  function linkFetch() {
    if(userid){
      dispatch(getLinks(userid)).then(() => {
      setLinkList(links);
      setIsLoaded(islinkloaded);
    });
    }
    
  }

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-10">
          <Stack
            direction="row-reverse"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
            sx={{ p: 2, backgroundColor: "#f3e5f5" }}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
            >
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search links"
                input={{ "aria-label": "search links" }}
                onChange={(e) => {
                  setLookUp(e.target.value);
                }}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={() => {
                  if (true) {
                    setLinkList(
                      LinkList.filter((search) =>
                        search.title.toLowerCase().includes(lookUp)
                      )
                    );
                  } else {
                    setLinkList(fullData);
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
              <Divider
                sx={{ height: 28, m: 0.5 }}
                orientation="vertical"
                color="#345"
              />

              <Box sx={{ flexGrow: 0 }}>
                <IconButton
                  onClick={handleOpenUserMenu}
                  color="primary"
                  sx={{ p: "10px" }}
                  aria-label="directions"
                >
                  <SortIcon />
                </IconButton>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.id}
                      onClick={(e) => {
                        navigate(setting.route);
                        handleCloseUserMenu(e)
                        }}
                    >
                      <Typography textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Paper>
            <div>
              <IconButton
                aria-label="add-link"
                onClick={(event) => {
                  navigate("/add-link");
                }}
              >
                <AddCircleIcon fontSize="large" color="warning" />
              </IconButton>
              <IconButton aria-label="add-category" color="success">
                <CategoryIcon fontSize="large" />
              </IconButton>
            </div>
          </Stack>
          {/* </div> */}
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-10">
          {islinkloaded ? (
            <div style={{ width: "100%" }}></div>
          ) : (
            <CircularProgress color="success" />
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

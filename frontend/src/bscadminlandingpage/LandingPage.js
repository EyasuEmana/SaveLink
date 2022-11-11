import React, { useEffect } from "react";
import cooprunning from "../images/runninigCoop.jpg";
import logo from "../images/logo.png";
import michu from "../images/michu.jpg";
import grlcoop from "../images/grlcoop.jpg";
import runningimage from "../images/runningimage.jpg";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button, Grid, Menu, MenuItem, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const { t, i18n } = useTranslation();

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  const handleChage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    let abortController = new AbortController();
    // your async action is here
    return () => {
      abortController.abort();
    };
  }, []);

  const MyAppBar = () => {
    return (
      <Box sx={{ flexGrow: 1, opacity: 1, marginTop: "0px" }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <img src={logo} style={{ width: "180px" }}></img>
            </Typography>

            <Box sx={{ display: "flex" }}>
              <select
                onChange={(e) => handleChage(e.target.value)}
                style={{
                  backgroundColor: "inherit",
                  border: "none",
                  marginTop: "8px",
                  width: "100px",
                  height: "30px",
                }}
                class="form-select form-select-sm"
                aria-label=".form-select-sm example"
              >
                <option selected value="">
                  lang
                </option>
                <option value="en">en</option>
                <option value="afan_oromo">Afan Oromo</option>
                <option value="amharic">Amharic</option>
              </select>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  };

  return (
    <div>
      <MyAppBar />
      <Grid container spacing={2}>
        {/* <div class="row d-flex justify-content-center align-item-center"> */}
          <Grid item md={5}>
            <div
              className="jumbotron"
              style={{
                marginTop: "15%",
                marginLeft: "10%",
                padding: "10px",
                // backgroundColor: "#BBB",
                height: "99%",
                boxSizing: "border-box",
              }}
            >
              <h1 className="display-4">{t("what_screen.1")}</h1>
              <p className="lead">
                <q>{t("slogan.1")}</q>
              </p>
              <hr className="my-4" />
              <p></p>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-end"
                spacing={2}
              >
                <p className="lead">
                  <Button
                    color="info"
                    variant="contained"
                    to={"/login"}
                    role="button"
                  >
                    {t("sign_in.1")}
                  </Button>
                </p>
              </Stack>
            </div>
          </Grid>
          <Grid item md={7}>
            <img
              src={runningimage}
              style={{
                width: "80%",
                marginLeft: "-10%",
                // height: "110%",
                marginTop: "80px",
                borderRadius: "0%",
              }}
            ></img>
            {/* <Slider {...settings}>
              <div>
                <img
                  src={cooprunning}
                  style={{
                    width: "65%",
                    height: "110%",
                    marginTop: "80px",
                    borderRadius: "50%",
                  }}
                ></img>
              </div>
              <div>
                <img
                  src={grlcoop}
                  style={{
                    width: "65%",
                    height: "110%",
                    marginTop: "80px",
                    borderRadius: "50%",
                  }}
                ></img>
              </div>
              <div>
                <img
                  src={michu}
                  style={{
                    width: "65%",
                    height: "110%",
                    marginTop: "80px",
                    borderRadius: "50%",
                  }}
                ></img>
              </div>
            </Slider> */}
          </Grid>
      </Grid>
    </div>
  );
}

export default LandingPage;

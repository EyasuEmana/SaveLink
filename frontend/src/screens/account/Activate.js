import React from "react";
import { connect, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { verify } from "../../actions/auth";
import { authReducer } from "../../reducers/auth";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Button, IconButton } from "@mui/material";

function Activate({ verify }) {
  const [verified, setVerified] = React.useState(false);
  const params = useParams();
  const authstate = useSelector((state) => state.authReducer);
  const { isActivated } = authstate;
  const verify_account = (e) => {
    e.preventDefault();
    const uid = params.uid;
    const token = params.token;
    const detail = params.detail;
    verify(uid, token);
    setVerified(true);
  };

  return (
    <div>
      <div className="container">
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ marginTop: "200px" }}
        >
          {!isActivated ? (
            <h1>Verify your Account:</h1>
          ) : (
            <div>
              <h1>Successfully Verified!</h1>
            </div>
          )}

          {!isActivated ? (
            <button
              onClick={verify_account}
              style={{ marginTop: "50px" }}
              type="button"
              className="btn btn-primary"
            >
              Verify
            </button>
          ) : (
            <div>
              <IconButton variant="outlined" color="success">
                <CheckCircleRoundedIcon />
              </IconButton>{" "}
              <Link to={"/login"}>Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default connect(null, { verify })(Activate);

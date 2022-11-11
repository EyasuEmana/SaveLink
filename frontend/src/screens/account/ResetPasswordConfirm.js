import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useNavigate,useParams  } from "react-router-dom";
import { reset_password_confirm } from "../../actions/auth";

function ResetPasswordConfirm({ match, reset_password_confirm }) {
  const [requestSent, setRequestSent] = useState(false);
  const authState = useSelector((state) => state.authReducer);
  const isAuthenticated = authState.isAuthenticated;
  const [authErrorAlert, setAuthErrorAlert] = useState(false);
  const navigate = useNavigate();
  const params=useParams()
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password:""
  });

  const { new_password,re_new_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const uid = params.uid;
    const token = params.token;
    reset_password_confirm(uid, token, new_password, re_new_password).then(
      () => {
        if (!requestSent) {
          setRequestSent(true);
        }
      }
    );
  };

  // if (requestSent) {
  //   navigate("/");
  // }
  // useEffect(() => {
  //   // first
  //   // if (isAuthenticated) {
  //   //   navigate("/");
  //   // }
  //   return () => {
  //     navigate("/");
  //   };
  // }, [isAuthenticated]);

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row justify-content-center">
          <div className="col-md-6  text-start shadow-lg p-2 mb-5 bg-body rounded">
            {authErrorAlert && (
              <Alert severity="error">
                <p>Wrong username or password!</p>
              </Alert>
            )}
            <input
              required
              type="password"
              name="new_password"
              placeholder="New password"
              className="form-control"
              value={new_password}
              minLength="6"
              onChange={(e) => onChange(e)}
            />
            <input
              required
              type="password"
              name="re_new_password"
              placeholder="Confirm New password"
              className="form-control"
              value={re_new_password}
              minLength="6"
              onChange={(e) => onChange(e)}
            />
            <button className="btn btn-sm  mt-3 mb-3" type="submit">
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// const mapStateToProps = (state) => {
// //  return{ isAuthenticated: state.isAuthenticated}
// };

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);

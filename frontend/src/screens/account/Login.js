import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
function Login({ login }) {
  const authState = useSelector((state) => state.authReducer);
  const isAuthenticated = authState.isAuthenticated;
  const [authErrorAlert, setAuthErrorAlert] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
}
  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password).then(() => {
      if (!isAuthenticated) {
        setAuthErrorAlert(true);
      }
    });

    // reset_password(email);
    // setRequestSent(true);
  };

  // useEffect(() => {
  //   // first
  //   // if (isAuthenticated) {
  //   //   navigate("/");
  //   // }
  //   return () => {
  //     navigate("/");
  //   };
  // }, [isAuthenticated]);
if(isAuthenticated){
  navigate("/");
}
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row justify-content-center mt-5">
          <div className="col-md-6  text-start shadow-lg p-3 mb-5 bg-body rounded">
            {authErrorAlert && (
              <Alert severity="error">
                <p>Wrong username or password!</p>
              </Alert>
            )}
            <input
              type="email"
              placeholder="email"
              name="email"
              required
              className="form-control mb-3"
              onChange={(e) => onChange(e)}
              value={email}
            />
            <input
              required
              type="password"
              name="password"
              placeholder="password"
              className="form-control"
              value={password}
              minLength="6"
              onChange={(e) => onChange(e)}
            />
            <button className="btn btn-sm btn-danger mt-3 mb-3" type="submit">
              Login
            </button>
            <p>
              Don't have an account?
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={"/register"}
              >
                Register
              </Link>
            </p>
            <p>
              Forgot your Password?
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={"/reset-password"}
              >
                Reset Password
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

// const mapStateToProps = (state) => {
// //  return{ isAuthenticated: state.isAuthenticated}
// };

export default connect(null, { login })(Login);

import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { reset_password, signup } from "../../actions/auth";
import { connect, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
function Register({ signup }) {
  const authState = useSelector((state) => state.authReducer);
  const isSignedUp = authState.isSignedUp;
  const [authErrorAlert, setAuthErrorAlert] = useState(false);
  const [accountCreated,setAccountCreated]=useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username:"",
    email: "",
    password: "",
    re_password:"",
  });

  const { username, email, password,re_password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
   if(password === re_password){
    signup(username, email, password,re_password).then((res) => {
      setAccountCreated(true);
      // if (!isAuthenticated) {
      //   setAuthErrorAlert(true);
      // }
    });
   }
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

  // if(accountCreated){
  //   navigate("/");
  // }
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} method="POST">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6  text-start shadow-lg p-2 mb-5 bg-body rounded">
            {accountCreated && (
              <Alert severity="success">
                <p>Account created successfully</p>
              </Alert>
            )}
            <h1>Signup</h1>
            <p>Create Your Account</p>
            <input
              type="text"
              placeholder="name"
              name="username"
              required
              className="form-control mb-2"
              onChange={(e) => onChange(e)}
              value={username}
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              required
              className="form-control mb-2"
              onChange={(e) => onChange(e)}
              value={email}
            />
            <input
              required
              type="password"
              name="password"
              placeholder="password"
              className="form-control mb-2"
              value={password}
              minLength="6"
              onChange={(e) => onChange(e)}
            />
            <input
              required
              type="password"
              name="re_password"
              placeholder="Confirm password"
              className="form-control mb-2"
              value={re_password}
              minLength="6"
              onChange={(e) => onChange(e)}
            />
            <button className="btn btn-sm  mt-3 mb-3" type="submit">
              Register
            </button>
            <p>
              Already have an account?
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={"/login"}
              >
                Login
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

export default connect(null, { signup })(Register);

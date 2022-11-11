import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { reset_password } from '../../actions/auth';

function ResetPassword({reset_password}) {
  const [requestSent,setRequestSent]=useState(false);
  const [authErrorAlert, setAuthErrorAlert] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    reset_password(email).then(() => {
      if (!requestSent) {
        setRequestSent(true);
      }
    });
  };

    //  if (requestSent) {
    //    navigate("/");
    //  }
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
            <h1>Request Password Reset: </h1>
            <input
              type="email"
              placeholder="email"
              name="email"
              required
              className="form-control"
              onChange={(e) => onChange(e)}
              value={email}
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


export default connect(null,{reset_password})(ResetPassword);
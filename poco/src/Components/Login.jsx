//vs code


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../Models/Login.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleSuccessSnackbarOpen = () => {
    setOpenSuccessSnackbar(true);
  };

  const handleErrorSnackbarOpen = () => {
    setOpenErrorSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            fetch("http://localhost:8000/user/" + username).then((res) => {
                return res.json();
            }).then((resp) => {
                if (Object.keys(resp).length === 0) {
                    alert('Please Enter valid username');
                } else {
                    if (resp.password === password) {
                        alert('Success');
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('userrole', resp.role);
                        usenavigate('/');
                    } else {
                        alert('Please Enter valid credentials');
                    }
                }
            }).catch((err) => {
                alert('Login Failed due to :' + err.message);
            });
        }
    }

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            let inputobj = {
                "username": username,
                "password": password
            };
            fetch("https://localhost:44308/User/Authenticate", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                if (Object.keys(resp).length === 0) {
                    alert('Login failed, invalid credentials');
                } else {
                    alert('Success');
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('jwttoken', resp.jwtToken);
                    usenavigate('/');
                }
            }).catch((err) => {
                alert('Login Failed due to :' + err.message);
            });
        }
    }

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            alert('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            alert('Please Enter Password');
        }
        return result;
    }

return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
        <form onSubmit={ProceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>Logowanie</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>User Name <span className="errmsg">*</span></label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Password <span className="errmsg">*</span></label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Login
              </button>{' '}
              ||
              <Link className="btn btn-success" to={'/register'}>
                New User
              </Link>
            </div>
          </div>
        </form>

        {/* Success Snackbar */}
        <Snackbar
          open={openSuccessSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Login Successful!
          </Alert>
        </Snackbar>

        {/* Error Snackbar */}
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
            Login Failed. Please try again.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Login;
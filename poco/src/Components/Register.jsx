import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
  const [id, idchange] = useState('');
  const [name, namechange] = useState('');
  const [password, passwordchange] = useState('');
  const [email, emailchange] = useState('');
  
  const [country, countrychange] = useState('');
  
 

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const displaySnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = 'Please enter the value in ';
    if (id === null || id === '') {
      isproceed = false;
      errormessage += ' Username';
    }
    if (name === null || name === '') {
      isproceed = false;
      errormessage += ' Fullname';
    }
    if (password === null || password === '') {
      isproceed = false;
      errormessage += ' Password';
    }

    if (email === '' || !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      displaySnackbar('error', 'Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let regobj = { id, name, password, email, country };

    if (IsValidate()) {
      fetch('http://localhost:8000/user', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          displaySnackbar('success', 'Registered successfully.');
          navigate('/login');
        })
        .catch((err) => {
          displaySnackbar('error', 'Failed: ' + err.message);
        });
    }
  };

  return (
    <div>
        <div className="offset-lg-3 col-lg-6">
            <form className="container" onSubmit={handlesubmit}>
            <div className="card">
                    <div className="card-header">
                        <h1>Rejestracja</h1>
                    </div>
                    <div className="card-body">

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Nazwa <span className="errmsg">*</span></label>
                                    <input value={id} onChange={e => idchange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Hasło <span className="errmsg">*</span></label>
                                    <input value={password} onChange={e => passwordchange(e.target.value)} type="password" className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Imie i Nazwisko <span className="errmsg">*</span></label>
                                    <input value={name} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Email <span className="errmsg">*</span></label>
                                    <input value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Kraj <span className="errmsg">*</span></label>
                                    <select value={country} onChange={e => countrychange(e.target.value)} className="form-control">
                                        <option value="Polska">Polska</option>
                                        <option value="Niemcy">Niemcy</option>
                                        <option value="francja">Francja</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Register</button> |
              <Link to={'/login'} className="btn btn-danger">Close</Link>
            </div>
          </div>
        </form>
      </div>
      {/* Material-UI Snackbar */}
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default Register;

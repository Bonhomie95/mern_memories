import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from './Input';
import useStyles from './style';
import { useState } from 'react';
import Icon from './icon';
import {signup, signin} from '../../actions/auth'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
   if(isSignedUp){
    dispatch(signup(formData, navigate))
   }else{
    dispatch(signin(formData, navigate))
   }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignedUp((prev) => !prev);
    // showPassword(false);
    // showCPassword(false);
  };
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleShowCPassword = () => {
    setShowCPassword((prev) => !prev);
  };
  const googleSuccess = async (res) => {
    // console.log(res)
    const result = res?.clientId;
    const token = res?.credential;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log('Google Sign in unsuccessful. Try again later');
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">
          {' '}
          {isSignedUp ? 'Sign Up' : 'Sign In'}{' '}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignedUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autofocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignedUp && (
              <Input
                name="password"
                label="Confirm Password"
                handleChange={handleChange}
                type={showCPassword ? 'text' : 'password'}
                handleShowPassword={handleShowCPassword}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignedUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <div style={{ margin: '2rem 1rem' }}>
            <GoogleOAuthProvider clientId="314234697569-j5lr2f9stomafq819v53hfe6krg919b9.apps.googleusercontent.com">
              <GoogleLogin
                render={(renderProps) => (
                  <Button
                    className={classes.googleButton}
                    color="primary"
                    fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<Icon />}
                    variant="contained"
                  >
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onError={googleFailure}
                cookiePolicy="single_host_origin"
              />
            </GoogleOAuthProvider>
          </div>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignedUp
                  ? 'Already have an account? Sign In'
                  : 'Dont have an account? Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

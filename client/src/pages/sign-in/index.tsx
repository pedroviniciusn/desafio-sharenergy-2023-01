import React, { FormEvent, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { session } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';

import useStyles from './index.style';
import { rememberMe } from '../../hooks/remenberMe';

interface IResponse {
  token: string;
  message: string;
}

interface IResponseCheck {
  usernameSaved?: string | null;
  passwordSaved?: string | null;
  checked?: boolean | null;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/pedroviniciusn">
        Pedro Vinícius
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const classes = useStyles();
  const [username, setUsername] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [classAlert, setClassAlert] = useState(classes.rootNone);
  const [errorLogin, setErrorLogin] = useState("");

  const [checked, setChecked] = useState(false);
  const [responseCheck, setReponseCheck] = useState<IResponseCheck>({
    usernameSaved: "",
    passwordSaved: "",
    checked: false
  })

  const navigate = useNavigate();

  useEffect(() => {
    async function check() {
      const response = await rememberMe(
        username as string,
        password as string,
        checked,
      )
      
      if (response.check) {
        setReponseCheck({
          checked: response.check,
          passwordSaved: response.passwordSaved,
          usernameSaved: response.usernameSaved,
        })
        
      setUsername(responseCheck.usernameSaved as string);
      setPassword(responseCheck.passwordSaved as string)
      console.log(responseCheck)
      }

    }

    check()
  }, [])

  async function handleSession(event: FormEvent) {
    event.preventDefault();
    
    const response  = await session(username as string, password as string) as IResponse
    
    if (response.token) {
      if (checked) {
        localStorage.setItem("USERNAME", username as string);
        localStorage.setItem("PASSWORD", password as string);
        localStorage.setItem("CHECKED", checked.toString());
      } else if (!checked) {
          if (responseCheck.checked) {
            localStorage.removeItem("USERNAME");
            localStorage.removeItem("PASSWORD");
            localStorage.removeItem("CHECKED");
          }
      }
      navigate("/home");
      login(response.token);
      setUsername("");
      setPassword("");
    }

    setErrorLogin(response.message);
    setClassAlert(classes.root);
  }

  async function handleCloseButton() {
    setClassAlert(classes.rootNone)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        { responseCheck.checked ? (
          <form className={classes.form} onSubmit={handleSession}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" 
            color="primary" 
            checked={checked}
            onChange={handleChange} />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        ) : <form className={classes.form} onSubmit={handleSession}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="usersname"
          autoFocus
          onChange={event => setUsername(event.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={event => setPassword(event.target.value)}
        />
        <FormControlLabel
          control={<Checkbox value="remember" 
          color="primary" 
          checked={checked}
          onChange={handleChange} />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form> }
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <div className={classAlert}>
        <Alert severity="error" onClose={handleCloseButton}>{errorLogin}</Alert>
      </div>
    </Container>
  );
}
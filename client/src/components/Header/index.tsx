import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import { logout, isAuthenticated } from '../../services/auth';
import NavTabs from '../navTabs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }),
);

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const classes = useStyles();

  const handleLogoutButton = () => {
    logout()
    
    const session = isAuthenticated()

    if (!session) {
      navigate("/")
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Sharenergy
          </Typography>
            <NavTabs />
          <Button variant="contained" color="primary" onClick={handleLogoutButton}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
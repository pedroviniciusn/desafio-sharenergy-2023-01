import { useEffect, useState } from "react";
import { findUser, listUsersByPage } from "../../hooks/useApi";
import { TemplateDefault } from "../../TemplateDefault";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

import Pagination from "@material-ui/lab/Pagination";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';

import useStyles from './index.style';

interface IUserProps {
  full_name?: string;
  username?: string;
  email?: string;
  age?: number;
  picture?: string;
}

export default function Home() {
  const navigate = useNavigate();
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<IUserProps[]>([]);
  const [user, setUser] = useState<IUserProps>(Object);
  const [data, setData] = useState<string>();

  useEffect(() => {
    async function getData() {
      const response = await listUsersByPage(page.toString());
      if (response.status === 500 || response.status === 401) {
        navigate("/")
        logout();
      }
      setUsers(response);
    }

    getData();
  }, [page]);

  const handleChange = (e: any, value: number) => {
    setPage(value);
  };

  const handleButtonSearch = async (event: any) => {
    event.preventDefault();

    const response = await findUser(data as string);
    
    if (response.username) {
      setUser(response);
    }
  };

  const handleButtonClean = () => {
    setUser({});
  };

  return (
    <TemplateDefault>
      <div className={classes.mainHeader}>
        <h2 className={classes.h2}>Usuários</h2>
        <Paper component="form" className={classes.containerInput}>
          <InputBase
            className={classes.input}
            placeholder="Procure um usuário"
            inputProps={{ "aria-label": "search google maps" }}
            onChange={(event) => setData(event.target.value)}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            onClick={handleButtonSearch}
          >
            <SearchIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
          <Button variant="contained" onClick={handleButtonClean}>
            Limpar
          </Button>
        </Paper>
      </div>

      <main className={classes.main}>
        {user.username ? (
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe">
                  <img src={user.picture} alt="picture" />
                </Avatar>
              }
              title={user.full_name}
              subheader={user.email}
            />
            <CardContent className={classes.cardContent}>
              <span>
                <strong>username:</strong> {user.username}
              </span>
              <span>
                <strong>age:</strong> {user.age}
              </span>
            </CardContent>
          </Card>
        ) : (
          users.map((user, index) => {
            return (
              <Card className={classes.card} key={index}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe">
                      <img src={user.picture} alt="picture" />
                    </Avatar>
                  }
                  title={user.full_name}
                  subheader={user.email}
                />
                <CardContent className={classes.cardContent}>
                  <span>
                    <strong>username:</strong> {user.username}
                  </span>
                  <span>
                    <strong>age:</strong> {user.age}
                  </span>
                </CardContent>
              </Card>
            );
          })
        )}
      </main>
      {user.username ? (
        <div className={classes.root}>
          <Pagination count={3} page={page} onChange={handleChange} disabled />
        </div>
      ) : (
        <div className={classes.root}>
          <Pagination count={3} page={page} onChange={handleChange} />
        </div>
      )}
    </TemplateDefault>
  );
}

import { useEffect, useState } from "react";
import { listUsersByPage } from "../../hooks/useApi";
import { TemplateDefault } from "../../TemplateDefault";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

interface IUserProps {
  full_name: string;
  username: string;
  email: string;
  age: number;
  picture: string;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(3),
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      maxWidth: 330,
      maxHeight: 140,
      margin: 15
    },
    cardContent: {
      display: "grid",
    },
    main: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr"
    }
  })
);

export default function Home() {
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<IUserProps[]>([]);
  useEffect(() => {
    async function getData() {
      const response = await listUsersByPage(page.toString());
      setUsers(response);
    }

    getData();
  }, [page]);

  const handleChange = (e: any, value: number) => {
    setPage(value);
  };

  return (
    <TemplateDefault>
      <div>
        <h2>Usuários</h2>
      </div>

      <main className={classes.main}>
        {users.map((user) => {
          return (
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
                <span><strong>username:</strong> {user.username}</span>
                <span><strong>age:</strong> {user.age}</span>
              </CardContent>
            </Card>
          )
        })}

      </main>
      <div className={classes.root}>
        <Pagination count={3} page={page} onChange={handleChange} />
      </div>
    </TemplateDefault>
  );
}

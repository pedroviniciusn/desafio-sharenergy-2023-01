import { TemplateDefault } from "../../TemplateDefault";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { useEffect, useState } from 'react';
import useStyles from './index.style';
import { isAuthenticated } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

export default function HttpCat() {
  const navigate = useNavigate();
  const classes = useStyles();

  const [statusCode, setStatusCode] = useState("");

  useEffect(() => {
    const response = isAuthenticated() 

    if (response == false) {
      navigate("/")
    }
  },[navigate]);

  return (
    <TemplateDefault>
      <main className={classes.main}>
        <div className={classes.content}>
          <Paper component="form" className={classes.containerInput}>
            <InputBase
              className={classes.input}
              placeholder="Digite um códgo HTTP"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(event) => setStatusCode(event.target.value)}
            />
          </Paper>
          <div style={{ display: "block" }}>
            <img src={!statusCode ? "" : `https://http.cat/${statusCode}`} className={classes.img}/>
          </div>
        </div>
      </main>
    </TemplateDefault>
  );
}

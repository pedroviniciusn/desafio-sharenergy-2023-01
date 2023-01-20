import { TemplateDefault } from "../../TemplateDefault";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { useState } from 'react';
import useStyles from './index.style';

export default function HttpCat() {
  const classes = useStyles();

  const [statusCode, setStatusCode] = useState("");

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

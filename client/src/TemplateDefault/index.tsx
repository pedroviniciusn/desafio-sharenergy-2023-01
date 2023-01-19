import { Container, createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import Header from "../components/Header"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "95%",
      margin: "0 auto",
      padding: "15px 0",
    },
  }),
);

export function TemplateDefault({children}: any) {
  const classes = useStyles();
  
  return (
    <>
      <Header/>
      <Container className={classes.container}>
        { children }
      </Container>
    </>
  )
}
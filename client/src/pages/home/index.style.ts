import { makeStyles, createStyles } from '@material-ui/core';

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
  containerInput: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  card: {
    maxWidth: 330,
    maxHeight: 140,
    margin: 15,
  },
  cardContent: {
    display: "grid",
  },
  main: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
  },
  mainHeader: {
    display: "flex",
    alignItems: "center",
  },
  h2: {
    flexGrow: 1
  }
})
);

export default useStyles;
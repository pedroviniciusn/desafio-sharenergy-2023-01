import { makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    modalForm: {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      backgroundColor: "white",
      border: "2px solid #000",
      boxShadow: "24",
      p: 4,
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
      maxHeight: 500,
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
      justifyContent: "space-between",
    },
    editAndDelete: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px 10px"  
    }
  })
);

export default useStyles;
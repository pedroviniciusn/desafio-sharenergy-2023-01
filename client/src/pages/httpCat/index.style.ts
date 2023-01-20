import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      display: "Flex",
      flexDirection: "column"
    },
    img: {
      marginTop: 20,
      maxWidth: 600,
      maxHeight: 600,
    },
    containerInput: {
      display: "flex",
      alignItems: "center",
      margin: "0 auto", 
      padding: "2px 4px",
      width: 400,
      border: "1px solid black"
    },
    input: {
      marginLeft: theme.spacing(1),
      width: "100%"
    }
  }) 
);

export default useStyles;
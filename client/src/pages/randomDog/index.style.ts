import { makeStyles, createStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
createStyles({
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    display: "Flex",
    flexDirection: "column"
  },
  img: {
    maxWidth: 600,
    maxHeight: 600
  }
}),
);

export default useStyles;
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import { useNavigate } from "react-router-dom";

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  const navigate = useNavigate();
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();

        switch (props.label) {
          case "Home":
            navigate("/home");
            break;
          case "Random Dog":
            navigate("/randomdog");
            break;
          case "Http Cats":
            navigate("/codecat");
            break;
          case "Clientes":
            navigate("/customers");
            break;
        }
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function NavTabs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinkTab label="Home" />
      <LinkTab label="Random Dog" />
      <LinkTab label="Http Cats" />
      <LinkTab label="Clientes" />
    </div>
  );
}

import { TemplateDefault } from "../../TemplateDefault";
import {
  Divider,
  IconButton,
  InputBase,
  Paper,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { createClient, findClient, getClients } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";

import useStyles from './index.style';

interface IClientsProps {
  _id?: string;
  name?: string;
  email?: string;
  phone_number?: number;
  address?: string;
  cpf?: number;
}

export default function Customers() {
  const navigate = useNavigate();
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cpf, setCpf] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [username, setUsername] = useState("");

  const [clients, setClients] = useState<IClientsProps[]>([]);
  const [client, setClient] = useState<IClientsProps>(Object);

  const [responseError, setResponseError] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickCreate = async () => {
    const response = await createClient({
      name,
      email,
      address,
      cpf: parseInt(cpf),
      phone_number: parseInt(phoneNumber),
    });

    if (response.status === 500 || response.status === 401) {
      navigate("/");
      logout();
    }

    handleClose()
  };

  useEffect(() => {
    async function getData() {
      const response = await getClients();
      if (response.status === 500 || response.status === 401) {
        navigate("/");
        logout();
      } else if (response.status === 400) {
        setResponseError(response.data.message);
      }
      setClients(response);
    }

    getData();
  }, [open]);

  const handleButtonSearch = async (event: any) => {
    event.preventDefault();

    const response = await findClient(username as string);
    
    if (response.name) {
      setClient(response);
    }
  };

  const handleButtonClean = () => {
    setClient({});
  };


  return (
    <TemplateDefault>
      <div className={classes.mainHeader}>
        <h2>Clientes</h2>
        <Button onClick={handleOpen}>Adicionar Cliente</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.modalForm}>
            <form style={{ display: "grid", padding: "15px" }}>
              <TextField
                style={{ margin: "5px" }}
                type="text"
                label="Nome"
                variant="outlined"
                onChange={(event) => setName(event.target.value)}
              />
              <br />
              <TextField
                style={{ margin: "5px" }}
                type="text"
                label="email"
                variant="outlined"
                onChange={(event) => setEmail(event.target.value)}
              />
              <br />
              <TextField
                style={{ margin: "5px" }}
                type="text"
                label="Endereço"
                variant="outlined"
                onChange={(event) => setAddress(event.target.value)}
              />
              <br />
              <TextField
                style={{ margin: "5px" }}
                type="text"
                label="CPF"
                variant="outlined"
                inputProps={{
                  maxLength: 11,
                }}
                onChange={(event) => setCpf(event.target.value)}
              />
              <br />
              <TextField
                style={{ margin: "5px" }}
                type="text"
                label="Telefone"
                variant="outlined"
                inputProps={{
                  maxLength: 11,
                }}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickCreate}
              >
                Criar
              </Button>
            </form>
          </Box>
        </Modal>
        <Paper component="form" className={classes.containerInput}>
          <InputBase
            className={classes.input}
            placeholder="Procure um usuário"
            inputProps={{ "aria-label": "search google maps" }}
            onChange={(event) => setUsername(event.target.value)}
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
          <Button variant="contained" onClick={handleButtonClean}>Limpar</Button>
        </Paper>
      </div>
      <main>
        {responseError ? (
          <h1>{responseError}</h1>
        ) : client.name ? (
          <Card className={classes.card}>
            <CardHeader title={client.name} subheader={client.email} />
            <CardContent className={classes.cardContent}>
              <span>
                <strong>Endereço:</strong> {client.address}
              </span>
              <span>
                <strong>CPF:</strong> {client.cpf}
              </span>
              <span>
                <strong>Telefone:</strong> {client.phone_number}
              </span>
            </CardContent>
          </Card>
        ) : (
          clients.map((client) => {
            return (
              <Card className={classes.card} key={client._id}>
                <CardHeader title={client.name} subheader={client.email} />
                <CardContent className={classes.cardContent}>
                  <span>
                    <strong>Endereço:</strong> {client.address}
                  </span>
                  <span>
                    <strong>CPF:</strong> {client.cpf}
                  </span>
                  <span>
                    <strong>Telefone:</strong> {client.phone_number}
                  </span>
                </CardContent>
              </Card>
            );
          })
        )}
      </main>
    </TemplateDefault>
  );
}

import { app } from './app';

const port = 5432;

app.listen(port, () => console.log(`Server is listening in port ${port}`));
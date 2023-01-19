import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutesApp from '../routes/routes';
import SignIn from './sign-in';

function App() {
  return (
    <BrowserRouter>
      <RoutesApp />  
    </BrowserRouter>
  );
}

export default App;

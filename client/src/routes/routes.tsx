import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Customers from '../pages/customers';
import Home from '../pages/home';
import SignIn from '../pages/sign-in';

export default function RoutesApp() {
  return (
    <Routes>
      <Route element={< SignIn/> } path="/"/>
      <Route element={ < Home/> } path="/home" />
      <Route element={ < Customers/> } path="/customers" />
    </Routes>
  )
};
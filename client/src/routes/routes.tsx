import { Route, Routes } from 'react-router-dom';
import Customers from '../pages/customers';
import Home from '../pages/home';
import HttpCat from '../pages/httpCat';
import RandomDog from '../pages/randomDog';
import SignIn from '../pages/sign-in';

export default function RoutesApp() {
  return (
    <Routes>
      <Route element={< SignIn/> } path="/"/>
      <Route element={ < Home/> } path="/home" />
      <Route element={ < Customers/> } path="/customers" />
      <Route element={ < RandomDog/> } path="/randomdog" />
      <Route element={ < HttpCat/> } path="/codecat" />
    </Routes>
  )
};
// Définition des routes : HomePage (/), AccountPage (/account), Login (/login), Register (/register).
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
//import { AccountPage } from '../pages/AccountPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/*<Route path="/account" element={<AccountPage />} />*/}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};


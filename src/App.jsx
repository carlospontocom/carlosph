import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Componentes/Header';
import Home from './Componentes/Home';
import Contato from './Componentes/Contato';
import Footer from './Componentes/Footer';
import Login from './Componentes/Login';
import ForgotPassword from './Componentes/ForgotPassword';
import Cadastro from './Componentes/Cadastro';
import DashboardUsuario from './Componentes/DashboardUsuario';
import AdminDashboard from './Componentes/AdminDashboard';

// Componente para agrupar o conteúdo da página inicial
const HomePage = () => (
  <>
    <Home />
    <Contato />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/esqueci-senha" element={<ForgotPassword />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboard" element={<DashboardUsuario />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Header from "./components/Header";
import InvoiceCreate from "./components/InvoiceCreate";
import InvoiceDetail from "./components/InvoiceDetail";
import InvoiceList from "./components/InvoiceList";
import InvoiceUpdate from "./components/InvoiceUpdate";
import LoginForm from "./components/LoginForm";
import PasswordResetForm from "./components/PasswordResetForm";
import SignUpForm from "./components/SignUpForm";
import "./tailwind.css";

function App() {
  const { loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <AuthProvider>
      <Router>
        <Header></Header>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUpForm />
              </PublicRoute>
            }
          />
          <Route
            path="/password-reset"
            element={
              <PublicRoute>
                <PasswordResetForm />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <InvoiceList />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoice/:invoiceId"
            element={
              <PrivateRoute>
                <InvoiceDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/invoice/:invoiceId/update"
            element={
              <PrivateRoute>
                <InvoiceUpdate />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-invoice"
            element={
              <PrivateRoute>
                <InvoiceCreate />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

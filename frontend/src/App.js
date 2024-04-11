import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthProvider";
import InvoiceCreate from "./components/InvoiceCreate";
import InvoiceDetail from "./components/InvoiceDetail";
import InvoiceList from "./components/InvoiceList";
import InvoiceUpdate from "./components/InvoiceUpdate";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { DataProvider } from "./models/DataContext";
import "./tailwind.css";

// 認証が必要なルートを管理するコンポーネント
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      {" "}
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />{" "}
            <Route path="/signup" element={<SignUpForm />} />
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
      </DataProvider>
    </AuthProvider>
  );
}

export default App;

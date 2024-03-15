import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import InvoiceDetail from "./components/InvoiceDetail";
import InvoiceList from "./components/InvoiceList";
import "./tailwind.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoiceList />} />
        <Route path="/invoice/:invoiceId" element={<InvoiceDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

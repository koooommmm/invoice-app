import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import InvoiceList from "./components/InvoiceList";
import "./tailwind.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoiceList />} />
      </Routes>
    </Router>
  );
}

export default App;

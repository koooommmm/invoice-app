import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import InvoiceDetail from "./components/InvoiceDetail";
import InvoiceList from "./components/InvoiceList";
import InvoiceUpdate from "./components/InvoiceUpdate";
import { DataProvider } from "./models/DataContext";
import "./tailwind.css";

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<InvoiceList />} />
          <Route path="/invoice/:invoiceId" element={<InvoiceDetail />} />
          <Route
            path="/invoice/:invoiceId/update"
            element={<InvoiceUpdate />}
          />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;

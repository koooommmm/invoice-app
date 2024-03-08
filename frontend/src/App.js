import React from "react";
import InvoiceComponent from "./components/InvoiceComponent";
import "./tailwind.css";

function App() {
  return (
    <div className="App">
      <InvoiceComponent invoiceId={1} />
      <InvoiceComponent invoiceId={2} />
      <InvoiceComponent invoiceId={3} />
    </div>
  );
}

export default App;

import React from "react";
import InvoiceForm from "./InvoiceForm";

const InvoiceCreate = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">請求書の作成</h1>
      </div>
      <InvoiceForm></InvoiceForm>
    </div>
  );
};

export default InvoiceCreate;

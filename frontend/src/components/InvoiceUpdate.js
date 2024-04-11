import React from "react";
import InvoiceForm from "./InvoiceForm";

const InvoiceUpdate = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">請求書の編集</h1>
      </div>
      <InvoiceForm></InvoiceForm>
    </div>
  );
};

export default InvoiceUpdate;

import React from "react";
import { useParams } from "react-router-dom";
import { invoices } from "../models/invoices";

const InvoiceDetail = () => {
  let { invoiceId } = useParams();
  const invoice = invoices.find((inv) => inv.id === parseInt(invoiceId, 10));

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">
        {invoice.companyName}の請求書詳細
      </h1>
      <ul className="list-disc pl-5">
        {invoice.items.map((item, index) => (
          <li key={index} className="mb-2">
            {item.itemName}:{" "}
            <span className="font-semibold">
              {item.amount.toLocaleString()}円
            </span>
          </li>
        ))}
      </ul>
      <h2 className="text-lg font-bold mt-4">
        合計金額:{" "}
        <span className="text-green-600">
          {invoice.getTotalAmount().toLocaleString()}円
        </span>
      </h2>
    </div>
  );
};

export default InvoiceDetail;

import React from "react";
import { Link } from "react-router-dom";
import { invoices } from "../models/invoices";

const InvoiceList = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 shadow-lg rounded-lg">
      <h1 className="text-xl font-bold mb-4">請求書一覧</h1>
      <ul className="list-disc pl-5">
        {invoices.map((invoice) => (
          <li key={invoice.id} className="mb-2">
            <Link
              to={`/invoice/${invoice.id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              {invoice.companyName} - 合計金額:{" "}
              {invoice.getTotalAmount().toLocaleString()}円
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;

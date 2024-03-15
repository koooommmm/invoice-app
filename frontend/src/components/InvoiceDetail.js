import React from "react";
import { Link, useParams } from "react-router-dom";
import { invoices } from "../models/invoices";

const InvoiceDetail = () => {
  let { invoiceId } = useParams();
  const invoice = invoices.find((inv) => inv.id === parseInt(invoiceId, 10));
  return (
    <div>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">請求書リスト</h1>
          <Link
            to={`/invoice/${invoice.id}/update`}
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 transition duration-300"
          >
            編集
          </Link>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="p-5 bg-white shadow-md rounded-lg">
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl font-bold mb-4">請求先情報</h1>
              <p className="mb-2">取引先: {invoice.companyName}</p>
              <p className="mb-2">請求書番号: {invoice.id}</p>
              <p className="mb-2">
                請求日: {invoice.billingDate.toLocaleDateString()}
              </p>
              <p>お支払い期間: {invoice.dueDate.toLocaleDateString()}</p>
            </div>
            <div>
              <h1 className="text-xl font-bold mb-4">自社情報</h1>
              <p>自社名: {invoice.author}</p>
            </div>
          </div>
        </div>
        <div className="p-5 bg-white shadow-md rounded-lg">
          <h1 className="text-xl font-bold mb-4">請求書</h1>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;

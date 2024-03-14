import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { invoices } from "../models/invoices";

const InvoiceList = () => {
  const navigate = useNavigate(); // useNavigateフックを使ってnavigate関数を取得

  // 行をクリックしたときに実行する関数
  const handleRowClick = (invoiceId) => {
    navigate(`/invoice/${invoiceId}`); // 該当する請求書の詳細ページへ遷移
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="p-5 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">請求書リスト</h1>
          <Link
            to="/create-invoice"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            請求書作成
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(invoice.id)}
                >
                  <td>
                    <text className="border-2 border-indigo-500 text-indigo-700 font-bold py-2 px-4 rounded">
                      {invoice.status}
                    </text>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-xl">
                      {invoice.companyName} 様<br />
                    </div>
                    {invoice.billingDate.toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-xl">
                      {invoice.getTotalAmount().toLocaleString()}円 <br />
                    </div>
                    ({invoice.getTotalAmountWithTax().toLocaleString()}円)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;

import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { database } from "../firebase";
import { deleteInvoice } from "../firebaseFunctions";
import Invoice from "../models/Invoice";
import InvoiceItem from "../models/InvoiceItem";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const invoicesRef = ref(database, "invoices"); // "invoices"というデータベースの参照を作成

    const unsubscribe = onValue(invoicesRef, (snapshot) => {
      const invoicesData = [];
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        // Invoiceクラスのインスタンスを作成し、データを格納
        const invoice = new Invoice(
          childSnapshot.key,
          data.companyName,
          data.billingDate ? new Date(data.billingDate) : null,
          data.dueDate ? new Date(data.dueDate) : null,
          data.author,
          data.items.map(
            (itemData) =>
              new InvoiceItem(
                itemData.itemName,
                itemData.quantity,
                itemData.unit,
                itemData.unitPrice,
                itemData.taxRate
              )
          ),
          data.status
        );
        invoicesData.push(invoice);
      });
      setInvoices(invoicesData);
    });

    return () => unsubscribe(); // コンポーネントのアンマウント時にリスナーを解除
  }, []);

  // 行をクリックしたときに実行する関数
  const handleRowClick = (invoiceId) => {
    navigate(`/invoice/${invoiceId}`); // 該当する請求書の詳細ページへ遷移
  };

  const handleDeleteInvoice = (invoiceId) => {
    deleteInvoice(invoiceId);
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto mt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">請求書リスト</h1>
          <Link
            to="/create-invoice"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            請求書作成
          </Link>
        </div>
        <div className="p-5 bg-white shadow-md rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left ">
              <thead className="text-xsuppercase bg-gray-50">
                <tr>
                  <th scope="col"></th>
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
                      <span className="border-2 border-indigo-500 text-indigo-700 font-bold py-2 px-4 rounded">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-xl">
                        {invoice.companyName} 様<br />
                      </div>
                      {invoice.billingDate
                        ? invoice.billingDate.toLocaleDateString()
                        : ""}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-xl"></div>
                    </td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteInvoice(invoice.id);
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <span className="i-lucide-trash"></span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
